import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { business, nav } from "@/data/siteData";

const Footer = () => {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block mb-4">
            <img
              src="/assets/images/logo.png"
              alt="Polar Vortex Home Services logo"
              className="h-12 w-auto bg-white rounded-lg p-2"
              loading="lazy"
            />
          </Link>
          <p className="text-sm leading-relaxed max-w-md text-slate-400">
            Part of our amazing service begins right now! We pride ourselves on providing customer service that
            exceeds expectations. We service most of Florida — we do all jobs big and small. Get in touch for an
            obligation-free quote today.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-200">Pasco &amp; Tampa Bay Florida Construction Services</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-sky-300">
            <ShieldCheck className="h-4 w-4" />
            License # {business.license}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-sky-300 transition-colors" data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-4">Get In Touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={business.phoneHref} data-testid="footer-phone-link" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
                <Phone className="h-4 w-4 text-sky-400" /> {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={business.emailHref} data-testid="footer-email-link" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
                <Mail className="h-4 w-4 text-sky-400" /> {business.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-400" /> {business.serviceArea}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {business.legalName}. All rights reserved. License # {business.license}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
