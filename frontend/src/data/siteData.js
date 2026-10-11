// Central content/config for the Polar Vortex (PVEI Home Services) site.
// Keeping this data-driven makes it trivial to update copy without touching layout code.

export const SITE_URL = "https://pvei.org";

export const business = {
  name: "Polar Vortex",
  legalName: "Polar Vortex Home Services",
  shortName: "Polar Vortex",
  tagline: "The Trusted Handyman",
  phoneDisplay: "(727) 639-7070",
  phoneHref: "tel:+17276397070",
  email: "info@pvei.org",
  emailHref: "mailto:info@pvei.org?subject=Website%20Contact",
  license: "CGC1517808",
  serviceArea: "Pinellas County & the Greater Tampa Bay Area, Florida",
  hours: "Mon \u2013 Sat: 7:00 AM \u2013 6:00 PM",
  yearsExperience: "40+",
};

export const nav = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/general-contractor-services" },
  { label: "Our Services", path: "/construction-services" },
  {
    label: "Markets We Serve",
    children: [
      { label: "Residential", path: "/residential-contracting-services" },
      { label: "Commercial", path: "/commercial-contracting-services" },
      { label: "Industrial & Infrastructure", path: "/industrial-infrastructure-contracting" },
    ],
  },
  { label: "Contact Us", path: "/contact-pvei-home-services" },
];

// Residential / Commercial / Industrial market pages — capability-statement style
// pages built from the client's official "work offered" lists per sector.
export const markets = [
  {
    key: "residential",
    navLabel: "Residential",
    eyebrow: "Residential",
    path: "/residential-contracting-services",
    icon: "Home",
    heroImage: "/assets/images/Pvei-contracting-services.jpg",
    seoTitle: "Residential Contracting — Design-Build, Remodeling & Additions",
    seoDescription:
      "Polar Vortex delivers residential design-build, full and partial remodeling, additions, and new construction across Pinellas County & the Greater Tampa Bay Area, Florida.",
    heroTitle: "Residential Design-Build & Remodeling",
    heroLead:
      "From a single room refresh to a ground-up new build, we deliver design-build residential contracting across Pinellas County & the Greater Tampa Bay Area — licensed, insured, and built to last.",
    workOffered: [
      "Design-Build",
      "Full or Partial Remodeling",
      "Waterproofing",
      "Painting",
      "Additions",
      "New Construction",
      "Outdoor & Exterior Finishes",
      "Epoxy Flooring",
      "Construction Management",
    ],
    sections: [
      {
        heading: "Design-Build, Start to Finish",
        body: "Whether you're planning a full remodel, a room addition, or a new home from the ground up, our design-build approach keeps one licensed team accountable for the whole project — from initial concept through final walkthrough. We coordinate design decisions, permitting, and construction management under one roof, so your project stays on schedule and on budget without the back-and-forth of hiring separate designers and contractors.",
      },
      {
        heading: "Built to Withstand Florida Weather",
        body: "Florida homes take a beating from humidity, storms, and sun — that's why waterproofing, quality exterior finishes, and durable flooring are core to how we build. We handle everything from epoxy garage and patio flooring to full exterior renovations, protecting your investment long after the crew leaves. Every project is backed by our license (CGC1517808) and 40+ years of hands-on experience in the construction industry.",
      },
    ],
    gallery: [
      { src: "/assets/images/hero-home.jpg", alt: "Residential home exterior renovation in the Tampa Bay Area, Florida" },
      { src: "/assets/images/about-handyman.jpg", alt: "Residential remodeling and repair work by Polar Vortex" },
    ],
  },
  {
    key: "commercial",
    navLabel: "Commercial",
    eyebrow: "Commercial",
    path: "/commercial-contracting-services",
    icon: "Building2",
    heroImage: "/assets/images/pvei-commercial.webp",
    seoTitle: "Commercial Construction — Framing, Drywall & Finishes",
    seoDescription:
      "Polar Vortex self-performs commercial framing, drywall, insulation, finishes, and safety consulting for build-outs and renovations across Florida.",
    heroTitle: "Commercial Construction Services",
    heroLead:
      "We support commercial build-outs, renovations, and tenant improvements across Pinellas County & the Greater Tampa Bay Area — from framing and drywall to finishes that meet code and deadline.",
    workOffered: [
      "Rough Carpentry",
      "Cold-Form Metal Framing",
      "Insulation (Excluding Spray Foam)",
      "Drywall",
      "Waterproofing",
      "Fireproofing",
      "Joint Sealants",
      "Painting",
      "Wall Coverings",
      "Acoustical Ceilings",
      "Epoxy Flooring",
      "Construction Management",
      "Safety Consulting",
      "OSHA 10-Hour Training (In-Person or Virtual)",
      "OSHA 30-Hour Training (In-Person or Virtual)",
    ],
    sections: [
      {
        heading: "Framing to Finish, Under One Contractor",
        body: "We self-perform the full envelope of interior commercial construction — rough carpentry, cold-form metal framing, insulation, drywall, and acoustical ceilings — so building owners, property managers, and general contractors get one accountable crew instead of coordinating a dozen trades. Joint sealants, fireproofing, and wall coverings are handled to spec and inspection-ready, keeping your project moving through code review without delays.",
      },
      {
        heading: "Safety-First Job Sites",
        body: "Every commercial job runs under active safety consulting, and our crews carry current OSHA 10- and 30-Hour certifications — also available as in-person or virtual training for your own team. Combined with construction management oversight from day one, that means fewer surprises, fewer change orders, and a job site that passes inspection the first time.",
      },
    ],
    gallery: [],
    galleryPlaceholders: [
      { icon: "Hammer", label: "Rough Carpentry & Framing" },
      { icon: "Layers3", label: "Drywall & Acoustical Ceilings" },
      { icon: "PaintRoller", label: "Painting & Wall Coverings" },
      { icon: "GraduationCap", label: "OSHA 10 & 30-Hour Training" },
    ],
  },
  {
    key: "industrial",
    navLabel: "Industrial & Infrastructure",
    eyebrow: "Industrial / Infrastructure",
    path: "/industrial-infrastructure-contracting",
    icon: "TrafficCone",
    heroImage: "/assets/images/pvei-Industrial.webp",
    seoTitle: "Industrial & Infrastructure Contracting — DOT & Municipal Work",
    seoDescription:
      "Polar Vortex partners with DOTs, municipalities, and public agencies on mast arm and bridge painting, traffic striping, MOT, and safety training across Florida.",
    heroTitle: "Industrial & Infrastructure Contracting",
    heroLead:
      "We partner with DOTs, municipalities, and public agencies on infrastructure work across Florida — from mast arm and bridge painting to traffic control and public-agency safety training.",
    workOffered: [
      "Mast Arm Painting",
      "Bridge Painting",
      "Traffic Striping",
      "Maintenance of Traffic (MOT)",
      "Anti-Graffiti Coatings",
      "Street Light Pole Painting",
      "Construction Management",
      "Safety Consulting",
      "OSHA 10-Hour Training (In-Person or Virtual)",
      "OSHA 30-Hour Training (In-Person or Virtual)",
    ],
    sections: [
      {
        heading: "Built for Public Agency Work",
        body: "Mast arm, bridge, and street light pole painting; anti-graffiti coatings; and traffic striping all require crews who understand public right-of-way work, specification compliance, and agency documentation — not just paint. We plan and execute Maintenance of Traffic (MOT) to keep motorists and crews safe while work is underway, and manage every project against DOT and municipal specifications from bid to closeout.",
      },
      {
        heading: "Safety & Compliance Built In",
        body: "Public infrastructure work runs on documentation and safety compliance as much as craftsmanship. Our teams operate under dedicated safety consulting and hold current OSHA 10- and 30-Hour certifications, which we also deliver as in-person or virtual training for agency and contractor staff. Construction management oversight keeps every phase — from mobilization to MOT to final inspection — on schedule and audit-ready.",
      },
    ],
    gallery: [],
    galleryPlaceholders: [
      { icon: "PaintRoller", label: "Mast Arm & Bridge Painting" },
      { icon: "Route", label: "Traffic Striping" },
      { icon: "TrafficCone", label: "Maintenance of Traffic (MOT)" },
      { icon: "GraduationCap", label: "OSHA 10 & 30-Hour Training" },
    ],
  },
];

// Home page — "Our Tampa Bay Home Repair & Contractor Services" numbered list
export const numberedServices = [
  {
    number: "01",
    title: "General Repairs and Remodels",
    text: "From your foundation to your drywall, we can help you overcome any repair your home may need.",
  },
  {
    number: "02",
    title: "Kitchen Renovations",
    text: "We are contractors who specialize in altering the structure of an existing space, we take your ideas and bring them to life.",
  },
  {
    number: "03",
    title: "Window and Door Replacement",
    text: "Licensed & bonded service professionals who will either repair or replace the broken system at no further cost.",
  },
  {
    number: "04",
    title: "Plumbing",
    text: "Installation and repairs \u2014 we repair, maintain, and install pipe systems, water heaters, bathtubs, toilets, drains, showers and much more.",
  },
  {
    number: "05",
    title: "Bathroom Remodels",
    text: "Installation and repairs \u2014 upgrade your space to make it more energy efficient and secure.",
  },
  {
    number: "06",
    title: "Flooring",
    text: "Installation and repair, from your trusted local pros.",
  },
];

// Services page — "OUR SERVICES / Home Improvement Solutions"
export const services = [
  {
    icon: "ChefHat",
    title: "Kitchens",
    text: "Cabinetry, tile, caulk & grout, backsplash, flooring, updates & full remodels, and miscellaneous repairs.",
  },
  {
    icon: "DoorOpen",
    title: "Window and Door",
    text: "Add curb appeal and help cut utility costs without spending a fortune \u2014 partial or full installations, caulk & seal.",
  },
  {
    icon: "TreePine",
    title: "Outdoor Living",
    text: "Siding, outdoor kitchens, concrete, masonry, exterior paint, stucco, roofing, lighting, security, porches & decks.",
  },
  {
    icon: "Bath",
    title: "Bathrooms",
    text: "Updating, plumbing repairs, flooring, tile, grout, caulk, vanities, lighting, mirrors, closets, tubs & showers.",
  },
  {
    icon: "Droplets",
    title: "Plumbing",
    text: "Toilets, tubs, sinks \u2014 new installs & repairs, septic, updating & re-routing.",
  },
  {
    icon: "ShieldCheck",
    title: "Home Security",
    text: "Entry doors & locks, alarms & cameras.",
  },
  {
    icon: "Layers3",
    title: "Drywall",
    text: "New installation, removal & replacement, mold detection & removal, finishing & painting.",
  },
  {
    icon: "Grid2x2",
    title: "Flooring",
    text: "Vinyl, ceramic, hardwood, laminate, concrete \u2014 refinishing & sealing/coating, replacement & repairs, new installation.",
  },
];

// About page — grouped from the full handyman task list on the source site
export const aboutCategories = [
  {
    icon: "DoorOpen",
    title: "Doors & Entryways",
    items: [
      "Door repairs & installation",
      "Door handles & lock installs",
      "Door jamb installation",
      "Hanging doors",
      "Flyscreens for windows & doors",
      "Break-in & storm damage repairs",
      "Board-ups",
    ],
  },
  {
    icon: "Hammer",
    title: "Decking, Fencing & Carpentry",
    items: [
      "Decking & porches",
      "Extensions & renovations",
      "Fencing",
      "Carpentry work",
      "Hanging curtains & blinds",
    ],
  },
  {
    icon: "ChefHat",
    title: "Kitchen & Laundry",
    items: ["Kitchen & laundry repairs", "Cupboard door repairs"],
  },
  {
    icon: "Droplets",
    title: "Plumbing & Drainage",
    items: [
      "Blocked drains & sinks",
      "Downpipe repairs & replacement",
      "New tapware & leaking taps",
      "Tap mixer installations",
      "Leaking drain repairs",
      "Sink & toilet repairs / installation",
      "Hot water system installs",
    ],
  },
  {
    icon: "TreePine",
    title: "Outdoor & Landscaping",
    items: [
      "Gardening & landscaping",
      "Lawn mowing & mulching",
      "Paving & outdoor tiling",
      "Pressure cleaning",
      "Pruning & weeding",
      "Retaining walls",
      "Concrete driveways",
      "Tiling repairs",
    ],
  },
  {
    icon: "Lightbulb",
    title: "Electrical & Lighting",
    items: [
      "Additional power points",
      "Bulb replacement",
      "Ceiling fan installation",
      "Extractor fan install & repair",
      "Indoor, outdoor & downlight installation",
      "Safety switches",
    ],
  },
  {
    icon: "ShieldCheck",
    title: "Safety & Painting",
    items: [
      "Smoke alarm checks & installation",
      "Plaster patching (walls & ceilings)",
      "Internal & external painting",
      "Cement render crack repairs",
      "Storm damage repairs",
    ],
  },
  {
    icon: "Bath",
    title: "Bathroom Renovations",
    items: [
      "Full bathroom renovation & redesign",
      "Cement rendering walls",
      "Waterproofing",
      "Tiling & grouting",
      "Vanity installation",
      "Shower screens",
      "Bathtub installation",
    ],
  },
  {
    icon: "CloudRain",
    title: "Gutters & Roofing",
    items: [
      "Gutter cleaning & guards",
      "Gutter repair & replacement",
      "Flashing & downpipe repairs",
      "Roof painting",
      "Wood staining & varnishing",
    ],
  },
];

export const partners = [
  { name: "Shaw", src: "/assets/partners/shaw.png" },
  { name: "Mohawk", src: "/assets/partners/mohawk.png" },
  { name: "Makita", src: "/assets/partners/makita.png" },
  { name: "Shenandoah", src: "/assets/partners/shenandoah.png" },
  { name: "Moen", src: "/assets/partners/moen.png" },
];

export const trustPoints = [
  { icon: "Award", label: `License # ${business.license}` },
  { icon: "Clock", label: `${business.yearsExperience} Years Experience` },
  { icon: "ShieldCheck", label: "Fully Insured & Vetted" },
  { icon: "MapPin", label: business.serviceArea },
];
