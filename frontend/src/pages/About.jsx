import { Link } from "react-router-dom";
import {
  DoorOpen,
  Hammer,
  ChefHat,
  Droplets,
  TreePine,
  Lightbulb,
  ShieldCheck,
  Bath,
  CloudRain,
  Phone,
  ArrowRight,
  Home as HomeIcon,
  Building2,
  TrafficCone,
  Award,
  Clock,
  HardHat,
  GraduationCap,
} from "lucide-react";
import SEO from "@/components/SEO";
import { business, aboutCategories, markets, SITE_URL } from "@/data/siteData";

const iconMap = { DoorOpen, Hammer, ChefHat, Droplets, TreePine, Lightbulb, ShieldCheck, Bath, CloudRain };
const marketIcons = { Home: HomeIcon, Building2, TrafficCone };

const credentials = [
  { icon: Award, label: `License # ${business.license}` },
  { icon: Clock, label: `${business.yearsExperience} Years in the Construction Industry` },
  { icon: ShieldCheck, label: "Fully Insured & Vetted" },
  { icon: HardHat, label: "Dedicated Safety Consulting" },
  { icon: GraduationCap, label: "OSHA 10 & 30-Hour Certified Teams" },
];

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Polar Vortex Home Services",
    url: `${SITE_URL}/general-contractor-services`,
    description:
      "Polar Vortex is a licensed general contractor with 40+ years in the construction industry, serving residential, commercial, and industrial & infrastructure clients — including DOTs and municipalities — across Pinellas County and the Greater Tampa Bay Area, Florida.",
  };

  return (
    <>
      <SEO
        title="About Us — General Contractor for Residential, Commercial & Industrial"
        description="40+ years in the construction industry. Polar Vortex Home Services is a licensed, insured general contractor serving residential, commercial, and industrial & infrastructure clients — including DOTs and municipalities — across Pinellas County and the Greater Tampa Bay Area."
        path="/general-contractor-services"
        jsonLd={jsonLd}
      />

      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">About Us</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            {business.yearsExperience} Years of Licensed General Contracting
          </h1>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From homeowners to commercial property managers to DOTs and municipalities, {business.name} brings the
            same licensed, insured craftsmanship to every project across Pinellas County and the Greater Tampa Bay
            Area. License # {business.license}.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {credentials.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2.5 backdrop-blur-sm"
              >
                <c.icon className="h-4 w-4 text-sky-300 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-100 font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed text-center">
            {business.name} is a full-scope general contractor &mdash; not just a residential handyman. We
            self-perform work for homeowners, commercial property owners and general contractors, and public
            agencies alike: everything from kitchen remodels and new home construction, to commercial framing and
            tenant build-outs, to DOT and municipal infrastructure work like mast arm and bridge painting, traffic
            striping, and Maintenance of Traffic (MOT). Every crew operates under dedicated safety consulting and
            holds current OSHA 10 &amp; 30-Hour certification.
          </p>
        </div>
      </section>

      {/* WHAT WE DO — three markets, drawn from the same data as the dedicated market pages */}
      <section className="py-4 pb-24 bg-frost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-navy-900 text-center mb-4">What We Do</h2>
          <p className="text-center text-slate-500 mb-14">
            Residential, commercial, and industrial &amp; infrastructure &mdash; one licensed contractor.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((m) => {
              const Icon = marketIcons[m.icon];
              return (
                <div
                  key={m.key}
                  className="rounded-2xl bg-white p-7 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.12)] hover:shadow-[0_20px_50px_-15px_rgba(10,26,47,0.22)] transition-shadow flex flex-col"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-900/20 mb-4">
                    {Icon && <Icon className="h-6 w-6 text-white" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy-900 mb-3">{m.navLabel}</h3>
                  <ul className="space-y-1.5 flex-1">
                    {m.workOffered.slice(0, 6).map((it) => (
                      <li key={it} className="text-sm text-slate-600 leading-snug">
                        {it}
                      </li>
                    ))}
                    {m.workOffered.length > 6 && (
                      <li className="text-sm text-slate-400 leading-snug">+ {m.workOffered.length - 6} more</li>
                    )}
                  </ul>
                  <Link
                    to={m.path}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
                  >
                    View {m.navLabel} Capabilities <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESIDENTIAL TASK LIST — the detailed homeowner service list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sky-600 font-bold tracking-[0.2em] uppercase text-sm mb-3 text-center">Residential</p>
          <h2 className="font-display text-3xl font-extrabold text-navy-900 text-center mb-4">
            {business.name} Handles Your Small to Medium-Sized Jobs
          </h2>
          <p className="text-center text-slate-500 mb-14">Including, but certainly not limited to:</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutCategories.map((cat, idx) => {
              const Icon = iconMap[cat.icon];
              return (
                <div
                  key={cat.title}
                  data-testid={`about-category-${idx}`}
                  className="rounded-2xl bg-frost p-7 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(10,26,47,0.18)] transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-900/20 mb-4">
                    {Icon && <Icon className="h-6 w-6 text-white" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy-900 mb-3">{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {cat.items.map((it) => (
                      <li key={it} className="text-sm text-slate-600 leading-snug">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-frost">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Whether you&rsquo;re a homeowner, a commercial property manager, or a public agency planning
            infrastructure work, {business.name} takes care of what needs to be done so every item on your list gets
            checked &mdash; reliably, on schedule, and to spec.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold px-7 py-3.5 shadow-lg shadow-sky-900/20 hover:scale-105 transition-transform">
              <Phone className="h-4 w-4" /> Call {business.phoneDisplay}
            </a>
            <Link to="/contact-pvei-home-services" className="inline-flex items-center gap-2 rounded-full border border-navy-200 text-navy-900 font-bold px-7 py-3.5 hover:bg-white transition-colors">
              Request a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
