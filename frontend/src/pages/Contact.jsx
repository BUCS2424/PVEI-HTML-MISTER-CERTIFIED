import { Phone, Mail, MapPin, Clock, Award } from "lucide-react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import { business, SITE_URL } from "@/data/siteData";

const Contact = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact-pvei-home-services`,
    about: { "@type": "HomeAndConstructionBusiness", name: business.legalName, telephone: "+17276397070", email: business.email },
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Polar Vortex Home Services for a free, obligation-free quote on your home repair or remodeling project in Pinellas County & the Greater Tampa Bay Area, Florida."
        path="/contact-pvei-home-services"
        jsonLd={jsonLd}
      />

      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-10 right-10 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">Contact Us</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Contact Us For Your Family&rsquo;s Home Improvement Needs
          </h1>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-frost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-3xl bg-navy-950 text-white p-8 shadow-2xl shadow-navy-900/30">
              <h2 className="font-display text-2xl font-extrabold mb-2">Tampa Bay Florida Construction Services</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Part of our amazing service begins right now! Get in touch for an obligation-free quote today.
              </p>
              <ul className="space-y-4">
                <li>
                  <a href={business.phoneHref} data-testid="contact-page-phone-link" className="flex items-center gap-3 text-lg font-bold hover:text-sky-300 transition-colors">
                    <span className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-sky-300" />
                    </span>
                    {business.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={business.emailHref} data-testid="contact-page-email-link" className="flex items-center gap-3 font-semibold hover:text-sky-300 transition-colors">
                    <span className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-sky-300" />
                    </span>
                    {business.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-sky-300" />
                  </span>
                  {business.serviceArea}
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-sky-300" />
                  </span>
                  {business.hours}
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4 text-sky-300" />
                  </span>
                  License # {business.license}
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-[0_10px_40px_-15px_rgba(10,26,47,0.15)]">
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you want to start your project today or next week, drop us a message, introduce yourself and
                let us know how we can help you get started on your project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
