/**
 * Polar Vortex Home Services -- Service Worker
 * Provides offline support and a cache strategy that prioritizes core site
 * assets (logo, icons, offline fallback, CSS/JS bundles) using a
 * cache-first strategy for static assets and a network-first strategy for
 * HTML navigations, with a friendly offline fallback page.
 * API calls (/api/*) are always fetched from the network (never cached)
 * to keep contact form submissions and data fresh/accurate.
 */
const CACHE_VERSION = "pvei-v1";
const CORE_CACHE = `${CACHE_VERSION}-core`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const CORE_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/assets/images/logo.png",
  "/assets/images/icon-192.png",
  "/assets/images/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("pvei-") && key !== CORE_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Never cache API calls -- always hit the network for fresh data.
  if (url.pathname.startsWith("/api/") || url.pathname.endsWith(".php")) {
    return;
  }

  // Navigation requests (HTML pages): network-first, offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  // Static assets (images, fonts, css, js): cache-first for speed.
  const isStaticAsset =
    /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|ttf)$/.test(url.pathname) || url.pathname.startsWith("/assets/");

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        });
      })
    );
    return;
  }

  // Everything else: network falling back to cache.
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
