import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import { business, jobGallery, SITE_URL } from "@/data/siteData";

const JobGallery = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + jobGallery.length) % jobGallery.length)),
    []
  );
  const next = useCallback(() => setOpenIndex((i) => (i === null ? i : (i + 1) % jobGallery.length)), []);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Polar Vortex Job Gallery",
    url: `${SITE_URL}/job-gallery`,
  };

  return (
    <>
      <SEO
        title="Job Gallery — Our Work"
        description="See real residential, commercial, and industrial & infrastructure job photos from Polar Vortex Home Services across Pinellas County & the Greater Tampa Bay Area."
        path="/job-gallery"
        jsonLd={jsonLd}
      />

      <section className="relative bg-navy-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl frost-blob" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sky-300 font-bold tracking-[0.2em] uppercase text-sm mb-3">Job Gallery</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">Our Work</h1>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A look at real jobs from {business.name} &mdash; residential, commercial, and industrial &amp;
            infrastructure work across {business.serviceArea}. Tap any photo to view it full size.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
            {jobGallery.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                data-testid={`job-gallery-thumb-${idx}`}
                onClick={() => setOpenIndex(idx)}
                className="mb-4 block w-full break-inside-avoid rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(10,26,47,0.25)] hover:shadow-[0_18px_40px_-12px_rgba(10,26,47,0.4)] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Job photo viewer"
          data-testid="job-gallery-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-sm px-4 py-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            data-testid="job-gallery-modal-close"
            className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <img
            src={jobGallery[openIndex].src}
            alt={jobGallery[openIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
          />

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-300">
            {openIndex + 1} / {jobGallery.length}
          </p>
        </div>
      )}
    </>
  );
};

export default JobGallery;
