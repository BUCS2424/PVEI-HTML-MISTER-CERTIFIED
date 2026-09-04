from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Polar Vortex (PVEI Home Services) API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Very small in-memory rate limiter (per-IP) to reduce spam/abuse on the contact form.
# Not a replacement for a WAF, but stops naive bots without adding external dependencies.
_RATE_LIMIT_WINDOW_SECONDS = 60
_RATE_LIMIT_MAX_REQUESTS = 5
_rate_limit_bucket = {}


def _is_rate_limited(ip: str) -> bool:
    now = time.time()
    window_start = now - _RATE_LIMIT_WINDOW_SECONDS
    timestamps = [t for t in _rate_limit_bucket.get(ip, []) if t > window_start]
    timestamps.append(now)
    _rate_limit_bucket[ip] = timestamps
    return len(timestamps) > _RATE_LIMIT_MAX_REQUESTS


# ---------------------------------------------------------------------------
# Status check models (kept for platform health-check compatibility)
# ---------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Polar Vortex (PVEI Home Services) API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------------------------------------------------------------------------
# Contact form (Polar Vortex / PVEI Home Services)
# ---------------------------------------------------------------------------
class ContactCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    full_name: str = Field(..., min_length=2, max_length=120)
    contact_number: str = Field(..., min_length=7, max_length=30)
    email: EmailStr
    best_time: str = Field(default="", max_length=60)
    ampm: str = Field(default="am", max_length=5)
    message: str = Field(..., min_length=2, max_length=3000)
    # Honeypot field: real users never see or fill this (hidden via CSS on the frontend).
    # If it's non-empty, the submission is almost certainly from a bot.
    website: Optional[str] = Field(default="", max_length=200)

    @field_validator("full_name", "contact_number", "message")
    @classmethod
    def strip_and_check(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("This field cannot be empty")
        return v

    @field_validator("ampm")
    @classmethod
    def validate_ampm(cls, v: str) -> str:
        v = (v or "am").strip().lower()
        if v not in ("am", "pm"):
            raise ValueError("ampm must be 'am' or 'pm'")
        return v


class ContactSubmission(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    source: str = "pvei-website"


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate, request: Request):
    client_ip = request.client.host if request.client else "unknown"

    if _is_rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again in a minute.")

    # Honeypot check: silently pretend success so bots don't learn they were caught.
    if payload.website:
        logger.warning(f"Honeypot triggered on contact form from IP {client_ip}")
        return {"success": True, "message": "Thank you! We'll be in touch shortly."}

    submission = ContactSubmission(**payload.model_dump(exclude={"website"}))
    doc = submission.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["ip"] = client_ip

    await db.contact_submissions.insert_one(doc)
    logger.info(f"New contact submission from {submission.email} ({submission.full_name})")

    # NOTE: On the live cPanel deployment, form submissions are sent via the
    # included PHP mail handler (public/cpanel-contact-handler.php) using PHP's
    # native mail() function, which notifies the admin immediately. In this
    # sandbox environment we persist submissions to MongoDB for verification.
    return {"success": True, "message": "Thank you! We'll be in touch shortly."}


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contact_submissions(limit: int = 50):
    """Utility endpoint to verify submissions were captured (for internal QA only)."""
    limit = max(1, min(limit, 200))
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
