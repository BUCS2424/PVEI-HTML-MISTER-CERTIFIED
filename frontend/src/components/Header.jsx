import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { business, nav } from "@/data/siteData";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          transparent
            ? "bg-transparent py-5"
            : "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(10,26,47,0.25)] py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" data-testid="header-logo-link" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/images/logo.png"
              alt="Polar Vortex Home Services logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
              width="220"
              height="52"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => {
              if (item.children) {
                const active = item.children.some((c) => c.path === location.pathname);
                return (
                  <div key={item.label} className="relative group">
                    <button
                      type="button"
                      data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors relative pb-1 ${
                        transparent ? "text-white hover:text-sky-200" : "text-navy-900 hover:text-sky-600"
                      } ${active ? (transparent ? "text-sky-200" : "text-sky-600") : ""}`}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                      {active && (
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" />
                      )}
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-50">
                      <div className="w-64 rounded-2xl bg-white shadow-2xl shadow-navy-900/25 border border-slate-100 p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            data-testid={`nav-link-${child.label.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors normal-case tracking-normal ${
                              location.pathname === child.path
                                ? "bg-sky-50 text-sky-600"
                                : "text-navy-800 hover:bg-slate-50 hover:text-sky-600"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors relative pb-1 ${
                    transparent ? "text-white hover:text-sky-200" : "text-navy-900 hover:text-sky-600"
                  } ${active ? (transparent ? "text-sky-200" : "text-sky-600") : ""}`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div
              className={`flex flex-col items-start rounded-2xl px-5 py-2 shadow-lg shadow-sky-900/10 ${
                transparent ? "bg-white text-navy-900" : "bg-gradient-to-r from-sky-500 to-sky-700 text-white"
              }`}
            >
              <a
                href={business.phoneHref}
                data-testid="header-phone-link"
                className="inline-flex items-center gap-2 text-sm font-bold hover:scale-105 transition-transform"
              >
                <Phone className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
              <a
                href={business.salesPhoneHref}
                data-testid="header-sales-phone-link"
                className={`text-[11px] font-semibold leading-tight hover:underline ${
                  transparent ? "text-navy-900/70" : "text-white/80"
                }`}
              >
                {business.salesPhoneLabel}: {business.salesPhoneDisplay}
              </a>
            </div>
          </div>

          <button
            type="button"
            data-testid="mobile-menu-button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className={`md:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl transition-colors ${
              transparent ? "text-white" : "text-navy-900"
            }`}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
