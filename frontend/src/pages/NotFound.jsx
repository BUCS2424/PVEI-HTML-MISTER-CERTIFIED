import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import SEO from "@/components/SEO";
import { business } from "@/data/siteData";

const NotFound = () => (
  <>
    <SEO title="Page Not Found" description="The page you're looking for could not be found." path="/404" />
    <section className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-center px-4">
      <div>
        <p className="text-sky-300 font-display text-7xl font-extrabold">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">This page took a detour.</h1>
        <p className="mt-3 text-slate-300 max-w-md mx-auto">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold px-7 py-3.5">
            Back to Home
          </Link>
          <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-bold px-7 py-3.5">
            <Phone className="h-4 w-4" /> {business.phoneDisplay}
          </a>
        </div>
        <a href={business.salesPhoneHref} className="mt-3 inline-block text-xs font-semibold text-slate-400 hover:text-slate-200">
          {business.salesPhoneLabel}: {business.salesPhoneDisplay}
        </a>
      </div>
    </section>
  </>
);

export default NotFound;
