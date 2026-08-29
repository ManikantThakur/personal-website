# GitHub Pages Setup

The site is plain static files — no build, no server. Deploying is just enabling Pages.

## Deploy

1. Push to `main`.
2. **Settings → Pages → Build and deployment**
    - Source: **Deploy from a branch**
    - Branch: **main**, folder **/ (root)**
    - Save.
3. First build takes a minute or two. The site then serves at
   `https://<username>.github.io/<repo>/` (or the custom domain below).

## Custom domain

-   The `CNAME` file in the repo root contains `www.thakur.io`. GitHub Pages reads it on
    every deploy.
-   DNS: point a `CNAME` record for `www` at `<username>.github.io`.
-   To also serve the apex (`thakur.io`), add the four GitHub Pages `A` records (or an
    `ALIAS`/`ANAME`) and enable **Enforce HTTPS** once the certificate is issued.

## Forms

Form submissions are handled entirely client-side by Formspree — nothing to configure on
the Pages side. See `FORMSPREE_SETUP.md`.

## What works and what doesn't

Works: everything the site does — theme toggle, animations, both forms, responsive layout,
print stylesheet.

Not possible on Pages (and not needed): server-side code, a database, live calendar
integration. The "Book a Session" section is a request form, confirmed manually by email.

## Troubleshooting

See `TROUBLESHOOTING.md`.
