import { ChefHat, DoorOpen, TreePine, Bath, Droplets, ShieldCheck, Layers3, Grid2x2, Phone } from "lucide-react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { business, services, SITE_URL } from "@/data/siteData";

const iconMap = { ChefHat, DoorOpen, TreePine, Bath, Droplets, ShieldCheck, Layers3, Grid2x2 };

const Services = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Home Repair and General Contracting",
    provider: { "@type": "HomeAndConstructionBusiness", name: business.legalName },
    areaServed: business.serviceArea,
    url: `${SITE_URL}/handyman-services-in-pasco`,
  };

  return (
    <>
      <SEO
        title="Our Services — Kitchens, Bathrooms, Plumbing & More"
        description="Explore Polar Vortex Home Services' full range of handyman and contracting services: kitchens, bathrooms, plumbing, flooring, drywall, home security and outdoor living."
        path="/handyman-services-in-pasco"
        jsonLd={jsonLd}
      />

      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob-slow" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">Our Services</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">Home Improvement Solutions</h1>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether it be your home or rental property, we can take care of that &ldquo;to-do&rdquo; list for you. No
            job is too much or too little for us to tackle reasonably &amp; reliably.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => {
            const Icon = iconMap[s.icon];
            return (
              <div
                key={s.title}
                data-testid={`service-card-${idx}`}
                className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(10,26,47,0.25)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-900/20 mb-5 group-hover:scale-110 transition-transform">
                  {Icon && <Icon className="h-7 w-7 text-white" />}
                </div>
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-navy-950 overflow-hidden">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start relative z-10">
          <div className="text-white lg:pt-8 order-2 lg:order-1">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Contact Us Today</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              We pride ourselves on providing customer service that exceeds expectations. We service most of
              Florida, we do all jobs big and small. Get in touch for an obligation-free quote today. License #{" "}
              {business.license}
            </p>
            <a href={business.phoneHref} className="mt-8 inline-flex items-center gap-2 text-xl font-display font-extrabold text-sky-300">
              <Phone className="h-5 w-5" /> Call Us Today! {business.phoneDisplay}
            </a>
          </div>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
