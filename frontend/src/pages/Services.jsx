import { Link } from "react-router-dom";
import {
  ChefHat,
  DoorOpen,
  TreePine,
  Bath,
  Droplets,
  ShieldCheck,
  Layers3,
  Grid2x2,
  Phone,
  CheckCircle2,
  ArrowRight,
  Home as HomeIcon,
  Building2,
  TrafficCone,
} from "lucide-react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { business, services, markets, SITE_URL } from "@/data/siteData";

const iconMap = { ChefHat, DoorOpen, TreePine, Bath, Droplets, ShieldCheck, Layers3, Grid2x2 };
const marketIcons = { Home: HomeIcon, Building2, TrafficCone };

const commercial = markets.find((m) => m.key === "commercial");
const industrial = markets.find((m) => m.key === "industrial");
const residentialMarket = markets.find((m) => m.key === "residential");

const Services = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Residential, Commercial & Industrial General Contracting",
    provider: { "@type": "HomeAndConstructionBusiness", name: business.legalName },
    areaServed: business.serviceArea,
    url: `${SITE_URL}/construction-services`,
  };

  return (
    <>
      <SEO
        title="Our Services — Residential, Commercial & Industrial"
        description="Explore Polar Vortex Home Services' full range of services: residential remodeling and repair, commercial build-outs, and industrial & infrastructure work for DOTs and municipalities."
        path="/construction-services"
        jsonLd={jsonLd}
      />

      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob-slow" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">Our Services</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Residential, Commercial &amp; Industrial Services
          </h1>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you&rsquo;re a homeowner, a commercial contractor, or a municipality or DOT representative
            planning infrastructure work, here&rsquo;s what {business.name} specializes in.
          </p>
        </div>
      </section>

      {/* RESIDENTIAL */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sky-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">Residential</p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900">
                Home Improvement Solutions
              </h2>
            </div>
            <Link
              to={residentialMarket.path}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              View Residential Capabilities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* COMMERCIAL */}
      <section className="py-20 sm:py-24 bg-frost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sky-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">Commercial</p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900">
                {commercial.heroTitle}
              </h2>
            </div>
            <Link
              to={commercial.path}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              View Commercial Capabilities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 rounded-2xl bg-white p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.1)]">
            {commercial.workOffered.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-[15px] font-medium text-navy-800 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIAL & INFRASTRUCTURE */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sky-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">
                Industrial / Infrastructure
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900">
                {industrial.heroTitle}
              </h2>
            </div>
            <Link
              to={industrial.path}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              View Industrial Capabilities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 rounded-2xl bg-frost p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.1)]">
            {industrial.workOffered.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-[15px] font-medium text-navy-800 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-navy-950 overflow-hidden">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start relative z-10">
          <div className="text-white lg:pt-8 order-2 lg:order-1">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Contact Us Today</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              We pride ourselves on providing customer service that exceeds expectations, whether the job is
              residential, commercial, or industrial. We service most of Florida, we do all jobs big and small. Get
              in touch for an obligation-free quote today. License #{" "}
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
