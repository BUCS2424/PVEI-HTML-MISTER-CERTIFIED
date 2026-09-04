# Deploying PVEI to the Static Site panel

- **Publish Directory:** `frontend/build`
  This is the already-built, production-ready static output (index.html,
  JS/CSS bundles, images, manifest, sitemap, etc.). The panel doesn't need
  to run a build step — point it straight at this folder.
- **Deploy branch:** `main` — this is the branch with the real, finished
  site. Don't point the panel at any other branch.
- **No Dockerfile included** — the panel generates its own for Static Site
  deploys.
- **No PHP/backend needed** — `frontend/build/cpanel-contact-handler.php`
  and `.htaccess` are leftovers from the cPanel deployment target and are
  inert here (nginx won't execute the PHP file; harmless to leave in place).
  The contact form in this build already POSTs to same-origin `/contact`
  with `{ name, email, message }` and expects `{status:"ok"}` /
  `{error:"..."}` back, matching the panel's built-in handler — no server
  code needed on the panel side.

## Rebuilding after source changes

If `frontend/src` changes and `frontend/build` needs to be regenerated for
this target specifically:

```bash
cd frontend
yarn install
REACT_APP_STATIC_PANEL=true yarn build
```

Then commit the updated `frontend/build` folder. (For the separate cPanel
deployment target, build without `REACT_APP_STATIC_PANEL` — see
`deliverables/CPANEL_DEPLOYMENT.md`.)
