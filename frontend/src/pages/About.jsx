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
} from "lucide-react";
import SEO from "@/components/SEO";
import { business, aboutCategories, SITE_URL } from "@/data/siteData";

const iconMap = { DoorOpen, Hammer, ChefHat, Droplets, TreePine, Lightbulb, ShieldCheck, Bath, CloudRain };

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Polar Vortex Home Services",
    url: `${SITE_URL}/general-contractor-services`,
    description:
      "Polar Vortex can build, install, repair, or improve just about anything around your home \u2014 licensed general contractor and handyman services based in Pinellas County, serving the Greater Tampa Bay Area, Florida.",
  };

  return (
    <>
      <SEO
        title="About Us — Licensed General Contractor in Pinellas County"
        description="Learn about Polar Vortex Home Services, Pinellas County's trusted licensed general contractor and handyman with 40+ years of experience in the construction industry, serving the Greater Tampa Bay Area."
        path="/general-contractor-services"
        jsonLd={jsonLd}
      />

      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">About Us</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Friendly, Reliable Home Repair Services
          </h1>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Contact us for your family&rsquo;s home improvement needs &mdash; obligation-free quotes, honest advice,
            and craftsmanship you can trust. License # {business.license}.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed text-center">
            {business.name} can build, install, repair, or improve just about anything around your home. If you need
            door repairs and installation, plumbing, drywall, or house renovations &mdash; our licensed general
            contractor and all-around handyman team can fix all the small tasks your home needs.
          </p>
        </div>
      </section>

      <section className="py-4 pb-24 bg-frost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="rounded-2xl bg-white p-7 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.12)] hover:shadow-[0_20px_50px_-15px_rgba(10,26,47,0.22)] transition-shadow"
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

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {business.name} takes care of what needs to be done so that each item on your &ldquo;to-do&rdquo; list is
            checked. After we complete your general repairs, we can move on to tile repair, installing countertops,
            sheetrock &amp; drywall repairs, and more &mdash; your trusted Tampa Bay Handyman can take care of it all.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold px-7 py-3.5 shadow-lg shadow-sky-900/20 hover:scale-105 transition-transform">
              <Phone className="h-4 w-4" /> Call {business.phoneDisplay}
            </a>
            <Link to="/contact-pvei-home-services" className="inline-flex items-center gap-2 rounded-full border border-navy-200 text-navy-900 font-bold px-7 py-3.5 hover:bg-slate-50 transition-colors">
              Request a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
