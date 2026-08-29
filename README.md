# Personal Website — Manikant Thakur

A lightweight, responsive personal site built with plain HTML, CSS, and JavaScript.
No build step, no framework. Hosted on GitHub Pages at **https://www.thakur.io/**.

## Sections

1. **Hero** — introduction and call-to-action buttons
2. **About** — bio and a grid of skill-category cards
3. **Resume** — experience timeline, key projects, PDF download
4. **Book a Session** — a _request_ form (not a live calendar); submissions go to Formspree and are confirmed manually by email
5. **Contact** — contact details and a message form (also Formspree)

## Features

-   Light/dark theme with a manual toggle, persisted in `localStorage`, applied before first paint (no flash)
-   Fully themable via CSS custom properties in `css/style.css` (`:root` and `:root[data-theme="dark"]`)
-   Responsive layout down to ~320px
-   Accessibility: skip link, semantic landmarks, labelled controls, focus-visible styles, `prefers-reduced-motion` support, keyboard-operable nav
-   Two Formspree-backed forms with inline status messages, client-side validation, and a `_gotcha` honeypot; both also work as a plain POST if JavaScript is disabled
-   `@media print` stylesheet that reduces the page to a clean resume; `@media (forced-colors: active)` support
-   Self-hosted fonts: Inter (variable, latin subset) and Font Awesome 6 — no third-party requests
-   Responsive profile image via `<picture>` (AVIF / WebP / JPEG)
-   SEO: meta description, Open Graph / Twitter tags, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, custom `404.html`

## File structure

```
personal-website/
├── index.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── image.jpeg / image.webp / image.avif    # profile photo (800x800)
│   ├── Manikant_Thakur_Resume.pdf
│   ├── fonts/
│   │   └── inter-latin.woff2                    # Inter variable, latin subset
│   └── fontawesome/
│       ├── css/all.min.css                      # TTF fallbacks stripped; woff2 only
│       └── webfonts/*.woff2
├── favicon.svg / favicon.ico / favicon-16.png / favicon-32.png / apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── LICENSE
├── CNAME                                        # www.thakur.io
├── .editorconfig / .prettierrc.json / .prettierignore
├── FORMSPREE_SETUP.md
├── GITHUB_PAGES_SETUP.md
└── TROUBLESHOOTING.md
```

## Customizing

| What                   | Where                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------ |
| Colors / theme         | CSS custom properties at the top of `css/style.css`                                  |
| Fonts                  | `@font-face` in `css/style.css` + files in `assets/fonts/` and `assets/fontawesome/` |
| Copy, resume, projects | `index.html`                                                                         |
| Form endpoint          | `FORMSPREE_ENDPOINT` constant in `js/main.js`                                        |
| Resume PDF             | `assets/Manikant_Thakur_Resume.pdf`                                                  |
| Favicon                | `favicon.svg` (source); regenerate the PNG/ICO with `rsvg-convert` + ImageMagick     |

## Formatting

`.editorconfig` and `.prettierrc.json` define the house style (4-space indent, single quotes, 100-column width). Run `npx prettier --check .` in CI and `npx prettier --write .` before committing.

## Deployment (GitHub Pages)

1. Push to `main`.
2. Repository **Settings → Pages → Deploy from a branch**, branch `main`, folder `/`.
3. The `CNAME` file maps the site to `www.thakur.io`; point the DNS `CNAME` record for `www` at `<username>.github.io` and add an apex redirect if you want `thakur.io` to work too.

See `FORMSPREE_SETUP.md` for the form configuration and `TROUBLESHOOTING.md` if submissions misbehave.

## Regenerating assets

-   **Favicons** — edit `favicon.svg`, then:
    `rsvg-convert -w 16 favicon.svg -o favicon-16.png` (and 32, 180 → `apple-touch-icon.png`),
    `magick favicon-16.png favicon-32.png favicon-512.png favicon.ico`.
-   **Profile image** — `magick image.jpeg -quality 82 image.webp` and `magick image.jpeg -quality 50 image.avif`.
-   **Inter** — `assets/fonts/inter-latin.woff2` is Fontsource's `inter:vf` latin-wght file.
-   **Font Awesome** — `assets/fontawesome/` mirrors cdnjs 6.0.0 with the `.ttf` `url()` fallbacks removed from `all.min.css`.

## License

MIT — see [LICENSE](LICENSE).

## Browser support

Latest Chrome, Firefox, Safari, Edge, and mobile equivalents. Progressive fallbacks: `favicon.ico` for browsers without SVG favicons, a solid accent color where `background-clip: text` is unsupported, and JPEG where AVIF/WebP aren't.
