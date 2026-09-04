import { useEffect } from "react";
import { SITE_URL } from "@/data/siteData";

/**
 * Lightweight, dependency-free SEO manager.
 * Updates document title, meta description, canonical link and injects
 * page-specific JSON-LD structured data on route change.
 *
 * NOTE: Because this is a client-rendered SPA, these tags are applied after
 * JS executes. Core Organization/LocalBusiness schema and default meta tags
 * are also hard-coded into public/index.html so they exist in the initial
 * server-delivered HTML payload for crawlers that don't execute JavaScript.
 */
const SEO = ({ title, description, path = "/", jsonLd }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | Polar Vortex Home Services` : "Polar Vortex Home Services";
    document.title = fullTitle;

    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("property", "og:title", fullTitle);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("property", "og:url", `${SITE_URL}${path}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);

    let ldScript = document.getElementById("page-jsonld");
    if (jsonLd) {
      if (!ldScript) {
        ldScript = document.createElement("script");
        ldScript.type = "application/ld+json";
        ldScript.id = "page-jsonld";
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(jsonLd);
    } else if (ldScript) {
      ldScript.remove();
    }

    return () => {
      const el = document.getElementById("page-jsonld");
      if (el) el.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
};

export default SEO;
