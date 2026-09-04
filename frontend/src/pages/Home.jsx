import { Link } from "react-router-dom";
import { Phone, ShieldCheck, Clock, MapPin, Award, ArrowRight, CheckCircle2, Home as HomeIcon, Building2, TrafficCone } from "lucide-react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import PartnersMarquee from "@/components/PartnersMarquee";
import { business, numberedServices, trustPoints, markets, SITE_URL } from "@/data/siteData";

const trustIcons = { Award, Clock, ShieldCheck, MapPin };
const marketIcons = { Home: HomeIcon, Building2, TrafficCone };

const Home = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.legalName,
    url: SITE_URL,
    telephone: "+17276397070",
    email: business.email,
    areaServed: business.serviceArea,
    image: `${SITE_URL}/assets/images/logo.png`,
    priceRange: "$$",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      identifier: business.license,
    },
  };

  return (
    <>
      <SEO
        title="Florida General Contracting & Handyman Services"
        description="Polar Vortex Home Services provides trusted home repair, remodeling and handyman services across Tampa Bay & Pasco County, Florida. Licensed, insured, 25+ years experience."
        path="/"
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-950">
        <img
          src="/assets/images/hero-home.jpg"
          alt="Pasco County Florida home repair and general contracting services"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl frost-blob" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl frost-blob-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-4">Florida</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
            General Contracting <span className="text-gradient-ice">Services</span>
          </h1>
          <p className="mt-6 max-w-xl text-slate-200 text-base sm:text-lg leading-relaxed">
            Our customers know we care about their homes. That&rsquo;s why we are proud to be called{" "}
            <span className="font-semibold text-white">&ldquo;{business.tagline}&rdquo;</span>. Give us a call today.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={business.phoneHref}
              data-testid="hero-cta-call"
              className="inline-flex items-center gap-2 rounded-full bg-white text-navy-900 font-bold px-7 py-3.5 shadow-xl shadow-black/20 hover:scale-105 transition-transform"
            >
              <Phone className="h-4 w-4" /> {business.phoneDisplay}
            </a>
            <Link
              to="/contact-pvei-home-services"
              data-testid="hero-cta-quote"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-bold px-7 py-3.5 hover:bg-white/10 transition-colors"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {trustPoints.map((t) => {
              const Icon = trustIcons[t.icon];
              return (
                <div key={t.label} className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-3 py-3 backdrop-blur-sm">
                  {Icon && <Icon className="h-4 w-4 text-sky-300 shrink-0" />}
                  <span className="text-xs sm:text-sm text-slate-100 font-medium leading-tight">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-100 to-sky-50 -z-10 hidden sm:block" />
            <img
              src="/assets/images/hero-home.jpg"
              alt="Home repair project in Pasco County Florida"
              loading="lazy"
              className="rounded-3xl shadow-2xl shadow-navy-900/20 w-full object-cover aspect-[4/5]"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 leading-tight">
              Professional Contractor Services for Every Task
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              {business.name} provides <strong className="text-navy-900">home repair services</strong> for all your
              home projects, no matter how big or small. From flooring and carpentry to drywall and painting,
              repairs, renovations, and custom work on kitchens, bathrooms, and wood or tile flooring. We also
              maintain windows, stairs and gutters, keeping them in working order and your family safe. For{" "}
              {business.yearsExperience} years we have served homeowners across the Tampa Bay Area, earning the name
              &ldquo;{business.tagline}&rdquo;.
            </p>
            <h3 className="mt-8 font-display text-xl font-bold text-navy-900">
              Residential &amp; Commercial Contracting Services
            </h3>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We are fully insured and vetted to give you peace of mind. We&rsquo;ll clean up after ourselves and
              treat you and your property with respect. At {business.name}, we strive to do every job right the
              first time and provide the very best customer experience.
            </p>
            <ul className="mt-6 space-y-2">
              {["Licensed & fully insured", "25+ years serving Tampa Bay", "Respectful, tidy craftsmanship"].map((li) => (
                <li key={li} className="flex items-center gap-2 text-sm font-medium text-navy-800">
                  <CheckCircle2 className="h-4 w-4 text-sky-500" /> {li}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MARKETS WE SERVE */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sky-600 font-bold tracking-[0.2em] uppercase text-sm mb-3">Markets We Serve</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900">
              Residential, Commercial &amp; Industrial
            </h2>
            <p className="mt-4 text-slate-600">
              From homeowners to DOTs and municipalities, here&rsquo;s where {business.name} works.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-3 gap-6">
            {markets.map((m) => {
              const Icon = marketIcons[m.icon];
              return (
                <Link
                  key={m.key}
                  to={m.path}
                  data-testid={`market-card-${m.key}`}
                  className="group rounded-2xl bg-frost p-8 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(10,26,47,0.25)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-900/20 mb-5 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="h-7 w-7 text-white" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy-900 mb-2">{m.navLabel}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{m.heroLead}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky-600">
                    Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NUMBERED SERVICES */}
      <section className="py-20 sm:py-28 bg-frost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900">
              Our Pasco Home Repair &amp; Contractor Services
            </h2>
            <p className="mt-4 text-slate-600">
              If you&rsquo;re looking to upgrade your home, or rental property, we can renew any part of your home.
              No job is too big or small for us.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {numberedServices.map((s) => (
              <div
                key={s.number}
                data-testid={`numbered-service-${s.number}`}
                className="group rounded-2xl bg-white p-7 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(10,26,47,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl font-display font-extrabold text-sky-100 group-hover:text-sky-200 transition-colors">
                  {s.number}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative py-20 sm:py-28 bg-navy-950 overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start relative z-10">
          <ContactForm />
          <div className="text-white lg:pt-8">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Contact Us Today</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Part of our amazing service begins right now! We pride ourselves on providing customer service that
              exceeds expectations. We service most of Florida, we do all jobs big and small. Get in touch for an
              obligation-free quote today. License # {business.license}
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Whether you want to start your project today or next week, drop us a message, introduce yourself and
              let us know how we can help you get started on your project.
            </p>
            <a href={business.phoneHref} className="mt-8 inline-flex items-center gap-2 text-xl font-display font-extrabold text-sky-300">
              <Phone className="h-5 w-5" /> Call Us Today! {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-14 bg-white border-t border-slate-100">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
          Trusted Brands We Work With
        </p>
        <PartnersMarquee />
      </section>
    </>
  );
};

export default Home;
