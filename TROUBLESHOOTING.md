# Troubleshooting

The site is static HTML/CSS/JS on GitHub Pages. The only moving part is the two
Formspree-backed forms. Most problems are Formspree configuration or DNS.

## Forms

### A submission shows the inline error message

`js/main.js` shows the error when the `fetch` to Formspree returns a non-2xx status or
throws. Check:

1. **Browser console / Network tab** — look at the request to `formspree.io`. The response
   body usually explains the failure.
2. **Formspree dashboard** — is the form active? Is the monthly submission limit hit?
3. **Endpoint** — `FORMSPREE_ENDPOINT` in `js/main.js` must match the dashboard.
4. **Email not arriving** but the dashboard shows the submission → notification settings or
   spam folder, not a site bug.

### Submission "succeeds" but nothing is received

If the honeypot field (`_gotcha`) is somehow populated — a browser extension autofilling
every field, for instance — the JS intentionally reports success and sends nothing. The
field is visually hidden and `tabindex="-1"`; a normal user never fills it.

### CORS or mixed-content errors in the console

-   GitHub Pages serves HTTPS by default; make sure you're visiting the `https://` URL.
-   Formspree allows cross-origin POSTs from any origin, so a CORS error almost always means
    the request never reached Formspree (offline, blocked by an extension, bad endpoint).

## Theme

-   **Wrong theme on load / flash of the other theme** — the inline script in `<head>` sets
    `data-theme` before the stylesheet applies. If it's misbehaving, check that the script
    still runs (it's wrapped in `try/catch`; a thrown error falls back to light).
-   **Toggle doesn't persist** — `localStorage` is unavailable (private mode, blocked
    cookies). The toggle still works for the session; persistence is best-effort.

## Layout / assets

-   **Icons missing** — Font Awesome loads from cdnjs; a blocked CDN or offline dev
    environment removes all icons. Text labels remain.
-   **Profile image not showing** — path is `assets/image.jpeg`, case-sensitive on GitHub
    Pages.
-   **Custom domain 404** — check the `CNAME` file (`www.thakur.io`) and that the DNS
    `CNAME` record for `www` points at `<username>.github.io`.

## Quick checks

-   [ ] Site loads over HTTPS at the custom domain
-   [ ] Console shows no errors on load
-   [ ] Contact form submits and the success message appears
-   [ ] Session request form submits and the success message appears
-   [ ] Formspree dashboard shows both test submissions
-   [ ] `prefers-reduced-motion` disables the entrance animations (OS setting)
-   [ ] Print preview shows a clean resume (no nav, booking, or contact form)
