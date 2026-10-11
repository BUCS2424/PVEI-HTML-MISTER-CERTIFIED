# Polar Vortex Home Services (PVEI) — cPanel Deployment Guide

This site is built with React (Create React App) which compiles down to plain,
static **HTML, CSS and JavaScript** — exactly what a cPanel shared-hosting
account needs. No Node.js server is required in production.

## 1. Build the static site

```bash
cd frontend
yarn install
yarn build
```

This produces a `frontend/build/` folder containing minified, production-ready
`index.html`, CSS, JS bundles, the PWA `manifest.json`, `sw.js` (service worker),
`robots.txt`, `sitemap.xml`, `.htaccess`, and the `assets/` images (logo, icons,
photos, partner logos).

**Important:** Before building for production, leave `REACT_APP_BACKEND_URL`
empty/unset in `frontend/.env` (or remove it) so the contact form automatically
posts to `cpanel-contact-handler.php` instead of the sandbox FastAPI backend.

## 2. Upload to cPanel

1. Log into cPanel → File Manager (or use FTP/SFTP).
2. Upload **all contents** of `frontend/build/` into `public_html/` (or your
   domain's document root for `pvei.org`).
3. Upload `cpanel-contact-handler.php` into the same directory as `index.html`.
4. Open `cpanel-contact-handler.php` and set `$TO_EMAIL` to where submissions
   should land (defaults to `info@pvei.org`) and `$SMTP_FROM` to an address on
   your own domain (e.g. `noreply@pvei.org` — doesn't need to be a real
   mailbox). No password or mailbox setup required: the handler talks SMTP
   straight to cPanel's own local Exim mail server (`localhost:25`), which
   trusts connections from the same host and relays on your behalf
   unauthenticated — the panel's own sender identity.
5. Confirm `.htaccess` was uploaded (enables SPA routing for slugs like
   `/general-contractor-services`, gzip compression, and browser caching).

## 3. Verify

- Visit `https://pvei.org/` and confirm the homepage, About, Services and
  Contact pages load directly by URL (not just via in-app navigation).
- Submit the contact form and confirm the admin inbox receives the email.
  If your host blocks outbound port 25 for local scripts (rare, but some
  do), set `$SMTP_USER`/`$SMTP_PASS` to a real mailbox's credentials —
  the handler will automatically switch to authenticated STARTTLS.
- Open Chrome DevTools → Application → Manifest to confirm the PWA install
  prompt and service worker are registered.
- Run a Lighthouse audit for Performance/PWA/SEO scores.

## 4. SEO slugs (kept identical to the source site)

| Page       | URL                                          |
|------------|-----------------------------------------------|
| Home       | `/`                                            |
| About      | `/general-contractor-services`                 |
| Services   | `/construction-services` (old `/handyman-services-in-pasco` now redirects here) |
| Residential| `/residential-contracting-services`            |
| Commercial | `/commercial-contracting-services`             |
| Industrial | `/industrial-infrastructure-contracting`       |
| Contact    | `/contact-pvei-home-services`                  |

## 5. Files included for this purpose

- `public/.htaccess` — SPA rewrite rules, gzip, cache headers, force HTTPS
- `public/sw.js` — service worker (offline support + asset caching)
- `public/manifest.json` — PWA manifest (installable app)
- `public/robots.txt`, `public/sitemap.xml` — SEO
- `public/cpanel-contact-handler.php` — production email handler (SMTP via cPanel's own local mail server, no mailbox password needed)
