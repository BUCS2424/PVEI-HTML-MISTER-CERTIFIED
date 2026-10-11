import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Phone, Mail } from "lucide-react";
import { business, nav } from "@/data/siteData";

/**
 * Right-side slide-out mobile navigation.
 * - Smooth transform transition (translate-x)
 * - Backdrop overlay that fades in/out
 * - Swipe-right-to-close touch gesture
 * - Body scroll lock while open
 */
const MobileMenu = ({ open, onClose }) => {
  const location = useLocation();
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    if (delta > 0 && panelRef.current) {
      panelRef.current.style.transform = `translateX(${delta}px)`;
      panelRef.current.style.transition = "none";
    }
  };

  const handleTouchEnd = () => {
    if (panelRef.current) {
      panelRef.current.style.transition = "";
      panelRef.current.style.transform = "";
    }
    if (touchDeltaX.current > 80) {
      onClose();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <>
      <div
        data-testid="mobile-menu-overlay"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      />

      <aside
        ref={panelRef}
        data-testid="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 right-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <img src="/assets/images/logo.png" alt="Polar Vortex Home Services logo" className="h-9 w-auto" />
          <button
            type="button"
            data-testid="mobile-menu-close"
            aria-label="Close menu"
            onClick={onClose}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-slate-100 text-navy-900 hover:bg-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1">
          {nav.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="pt-2">
                  <p className="px-4 pb-1 text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</p>
                  {item.children.map((child) => {
                    const active = location.pathname === child.path;
                    return (
                      <Link
                        key={child.path}
                        to={child.path}
                        data-testid={`mobile-nav-link-${child.label.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={onClose}
                        className={`block px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                          active ? "bg-sky-50 text-sky-600" : "text-navy-900 hover:bg-slate-50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              );
            }

            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={onClose}
                className={`px-4 py-3.5 rounded-xl text-base font-semibold uppercase tracking-wide transition-colors ${
                  active ? "bg-sky-50 text-sky-600" : "text-navy-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-5 py-6 border-t border-slate-100 space-y-3">
          <a
            href={business.phoneHref}
            data-testid="mobile-menu-phone-link"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold py-3.5 shadow-lg shadow-sky-900/20"
          >
            <Phone className="h-4 w-4" /> {business.phoneDisplay}
          </a>
          <a
            href={business.salesPhoneHref}
            data-testid="mobile-menu-sales-phone-link"
            className="flex items-center justify-center gap-1.5 w-full text-xs font-semibold text-slate-500"
          >
            {business.salesPhoneLabel}: {business.salesPhoneDisplay}
          </a>
          <a
            href={business.emailHref}
            className="flex items-center justify-center gap-2 w-full rounded-full border border-slate-200 text-navy-900 font-semibold py-3"
          >
            <Mail className="h-4 w-4" /> {business.email}
          </a>
          <p className="text-center text-xs text-slate-400 pt-1">Swipe right to close</p>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
