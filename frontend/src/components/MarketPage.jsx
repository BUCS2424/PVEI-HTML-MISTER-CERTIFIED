import { Link } from "react-router-dom";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Home,
  Building2,
  TrafficCone,
  Hammer,
  Layers3,
  PaintRoller,
  GraduationCap,
  Route,
  Camera,
} from "lucide-react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { business, SITE_URL } from "@/data/siteData";

const heroIconMap = { Home, Building2, TrafficCone };
const placeholderIconMap = { Hammer, Layers3, PaintRoller, GraduationCap, Route, TrafficCone };

/**
 * Shared template for the Residential / Commercial / Industrial market pages.
 * Layout is identical across the three; only the `market` data object differs.
 */
const MarketPage = ({ market }) => {
  const HeroIcon = heroIconMap[market.icon];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: market.heroTitle,
    provider: { "@type": "HomeAndConstructionBusiness", name: business.legalName },
    areaServed: business.serviceArea,
    url: `${SITE_URL}${market.path}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: market.heroTitle,
      itemListElement: market.workOffered.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  return (
    <>
      <SEO title={market.seoTitle} description={market.seoDescription} path={market.path} jsonLd={jsonLd} />

      {/* HERO */}
      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {HeroIcon && (
            <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-900/20">
              <HeroIcon className="h-7 w-7 text-white" />
            </div>
          )}
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">{market.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">{market.heroTitle}</h1>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-relaxed">{market.heroLead}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white text-navy-900 font-bold px-7 py-3.5 shadow-xl shadow-black/20 hover:scale-105 transition-transform"
            >
              <Phone className="h-4 w-4" /> {business.phoneDisplay}
            </a>
            <Link
              to="/contact-pvei-home-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-bold px-7 py-3.5 hover:bg-white/10 transition-colors"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK LOOK */}
      <section className="py-16 sm:py-20 bg-frost">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 text-center">
            {market.navLabel} Work Offered
          </h2>
          <p className="mt-3 text-center text-slate-500">A quick look at what we handle in this market.</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 rounded-2xl bg-white p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.12)]">
            {market.workOffered.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-[15px] font-medium text-navy-800 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      {market.sections.map((s, idx) => (
        <section key={s.heading} className={`py-16 sm:py-20 ${idx % 2 === 0 ? "bg-white" : "bg-frost"}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900">{s.heading}</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{s.body}</p>
          </div>
        </section>
      ))}

      {/* PHOTOS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 text-center mb-10">
            {market.navLabel} Project Work
          </h2>

          {market.gallery && market.gallery.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {market.gallery.map((g) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="rounded-3xl shadow-2xl shadow-navy-900/20 w-full object-cover aspect-[4/3]"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {market.galleryPlaceholders.map((g) => {
                  const Icon = placeholderIconMap[g.icon];
                  return (
                    <div
                      key={g.label}
                      className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 aspect-square flex flex-col items-center justify-center text-center p-5 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.3)]"
                    >
                      {Icon && <Icon className="h-9 w-9 text-sky-300 mb-3" />}
                      <span className="text-sm font-semibold text-white leading-snug">{g.label}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                <Camera className="h-4 w-4" /> Project photos coming soon
              </p>
            </>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative py-20 sm:py-28 bg-navy-950 overflow-hidden">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start relative z-10">
          <div className="text-white lg:pt-8 order-2 lg:order-1">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Contact Us Today</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Ready to talk about your {market.navLabel.toLowerCase()} project? We pride ourselves on customer
              service that exceeds expectations, and we do jobs big and small across Florida. Get in touch for an
              obligation-free quote. License # {business.license}
            </p>
            <a
              href={business.phoneHref}
              className="mt-8 inline-flex items-center gap-2 text-xl font-display font-extrabold text-sky-300"
            >
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

export default MarketPage;
