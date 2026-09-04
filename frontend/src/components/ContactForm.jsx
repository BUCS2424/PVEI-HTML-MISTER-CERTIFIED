import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// Static-panel hosts (nginx-only, no PHP/backend) provide their own built-in
// contact handler at same-origin /contact — set REACT_APP_STATIC_PANEL=true
// at build time when deploying there.
const STATIC_PANEL = process.env.REACT_APP_STATIC_PANEL === "true";
// In this sandbox we call the FastAPI backend. On the live cPanel deployment
// (no Node/Python runtime), leave both env vars unset at build time and this
// automatically falls back to the included PHP mail handler.
const ENDPOINT = BACKEND_URL ? `${BACKEND_URL}/api/contact` : STATIC_PANEL ? "/contact" : "/cpanel-contact-handler.php";

// The static-panel handler only accepts { name, email, message }; fold the
// extra fields our form collects into the message body for that target.
const buildPayload = (data) => {
  if (!STATIC_PANEL || BACKEND_URL) return data;
  return {
    name: data.full_name,
    email: data.email,
    message: `${data.message}\n\nPhone: ${data.contact_number}\nBest time to call: ${data.best_time} ${String(
      data.ampm || ""
    ).toUpperCase()}`,
  };
};

const ContactForm = ({ variant = "default" }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (data) => {
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(data)),
      });
      const json = await res.json().catch(() => ({}));
      const failed = STATIC_PANEL && !BACKEND_URL ? Boolean(json.error) || !res.ok : !res.ok || json.success === false;
      if (failed) {
        throw new Error(json.message || json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setFeedback(json.message || "Thank you! We'll be in touch shortly.");
      reset();
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Unable to send your message right now. Please call us instead.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all";
  const labelClass = "block text-sm font-semibold text-navy-900 mb-1.5";
  const errorClass = "mt-1 text-xs font-medium text-red-500";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="contact-form"
      className={`space-y-5 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(10,26,47,0.25)] ${
        variant === "compact" ? "" : ""
      }`}
      noValidate
    >
      <div>
        <label className={labelClass} htmlFor="full_name">
          Full Name <span className="text-sky-500">*</span>
        </label>
        <input
          id="full_name"
          data-testid="contact-form-full-name"
          className={inputClass}
          placeholder="Jane Doe"
          {...register("full_name", { required: "Please enter your full name" })}
        />
        {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="contact_number">
            Contact Number <span className="text-sky-500">*</span>
          </label>
          <input
            id="contact_number"
            data-testid="contact-form-contact-number"
            className={inputClass}
            placeholder="(727) 000-0000"
            {...register("contact_number", { required: "Please enter your phone number" })}
          />
          {errors.contact_number && <p className={errorClass}>{errors.contact_number.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email Address <span className="text-sky-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            data-testid="contact-form-email"
            className={inputClass}
            placeholder="you@example.com"
            {...register("email", {
              required: "Please enter your email",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
            })}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5">
        <div>
          <label className={labelClass} htmlFor="best_time">
            Best Time to Call <span className="text-sky-500">*</span>
          </label>
          <input
            id="best_time"
            data-testid="contact-form-best-time"
            className={inputClass}
            placeholder="e.g. 2:00"
            {...register("best_time", { required: "Please share a best time to call" })}
          />
          {errors.best_time && <p className={errorClass}>{errors.best_time.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="ampm">
            AM/PM <span className="text-sky-500">*</span>
          </label>
          <select
            id="ampm"
            data-testid="contact-form-ampm"
            className={inputClass}
            defaultValue="am"
            {...register("ampm")}
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Question / Comments <span className="text-sky-500">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          data-testid="contact-form-message"
          className={inputClass}
          placeholder="Tell us about your project..."
          {...register("message", { required: "Please tell us a bit about your project" })}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {/* Honeypot field — hidden from real users, catches simple bots. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: 0, width: "1px", height: "1px", overflow: "hidden", opacity: 0 }}
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-testid="contact-form-honeypot"
          {...register("website")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        data-testid="contact-form-submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold py-3.5 shadow-lg shadow-sky-900/25 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit
          </>
        )}
      </button>

      {status === "success" && (
        <div data-testid="contact-form-success" className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text-sm font-medium">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> {feedback}
        </div>
      )}
      {status === "error" && (
        <div data-testid="contact-form-error" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm font-medium">
          <AlertCircle className="h-5 w-5 shrink-0" /> {feedback}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
