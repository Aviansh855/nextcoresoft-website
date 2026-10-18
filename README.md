# NextCoreSoft

Marketing website for [NextCoreSoft](https://nextcoresoft.com) — a studio building custom
software, Android & iOS applications, and AI automations for growing businesses.

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Three Fiber · Framer Motion

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # type-check and build for production (output in dist/)
npm run preview  # serve the production build locally
npm run lint     # run oxlint
```

## Project structure

```
src/
  components/
    home/        # homepage sections (hero, services, workflow, process, ...)
    layout/      # navbar, footer, logo
    three/       # the 3D hero scene and its CSS fallback
    contact/     # the inquiry form
    ui/          # buttons, section layout, scroll reveal, tilt card
    seo/         # consent-gated analytics
  pages/         # route-level pages
  data/          # all website copy in one place (content.ts)
  lib/           # per-route metadata helper
public/          # favicon, robots.txt, sitemap.xml
```

All visitor-facing copy lives in `src/data/content.ts`. Edit it there.

## Contact form setup

The inquiry form validates in the browser, then POSTs JSON to **`/api/contact`**
(same origin). A **Cloudflare Pages Function** (`functions/api/contact.js`)
forwards the message to Formspree using the server environment variable
**`FORMSPREE_FORM_URL`**. That URL is **not** in the frontend bundle or this
repository.

1. In [Formspree](https://formspree.io), create or open your form. Set the form’s
   **notification / target email** to `hello@nextcoresoft.com` (must match
   `shared/site.json` → `contactEmail`). Under **Settings → Allowed domains**, include
   `nextcoresoft.com`. If you use **Form Rules**, add an **Always → Send email** rule
   to `hello@nextcoresoft.com` — otherwise rules can block notifications even when
   submissions appear in the dashboard.
2. In **Cloudflare Pages** → your project → **Settings** → **Environment
   variables** → **Production** (and Preview if needed), add:
   - Name: `FORMSPREE_FORM_URL`
   - Value: `https://formspree.io/f/yourFormId` (your real form URL)
3. Redeploy the site after saving the variable.

**Local dev:** copy `.env.example` to `.env.local` and set `FORMSPREE_FORM_URL`
there (never commit `.env.local`). Restart `npm run dev`.

**If the old form ID was ever committed to git**, create a **new** Formspree form
and use the new URL in `FORMSPREE_FORM_URL` only — the old public ID may still
receive spam until you disable or delete that form in Formspree.

**Never use `VITE_` for Formspree URLs** — those values are embedded in client JS.

## Analytics

Optional, privacy-friendly, and off by default.

1. Register the domain at [plausible.io](https://plausible.io).
2. Set `VITE_PLAUSIBLE_DOMAIN=nextcoresoft.com` in `.env.local`.
3. Rebuild. A consent banner appears for new visitors; the analytics script
   loads only after they click "Allow", and the choice is remembered.

Leave the variable empty to ship with no analytics at all.

## Deployment on Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
   The framework preset is detected as Vite automatically.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables** for the Production environment.
4. Deploy. `vercel.json` rewrites all non-file routes to `index.html`, so
   direct links like `/contact` and page refreshes work.

Subsequent pushes to the main branch deploy automatically.

### Custom domain (nextcoresoft.com)

The canonical version of the site is the apex domain, `nextcoresoft.com`.
`www.nextcoresoft.com` should redirect to it.

1. In the Vercel project, go to **Settings → Domains** and add both
   `nextcoresoft.com` and `www.nextcoresoft.com`.
2. At your DNS registrar, add the records Vercel displays:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`
3. Set `nextcoresoft.com` as the primary domain and enable the redirect from
   `www` to the apex (Vercel offers this when you add the second domain).
4. Wait for DNS to propagate. Vercel provisions the TLS certificate
   automatically.

Canonical URLs, the sitemap, and `robots.txt` all point at
`https://nextcoresoft.com`, so no code changes are needed once the domain is
connected.

## Deployment on Cloudflare Pages

The live site is hosted on Cloudflare Pages. `vercel.json` is not read there.

1. Create a Pages project from the GitHub repository.
2. Build command: `npm run build`. Output directory: `dist`.
3. `npm run build` generates `public/_redirects` from `shared/indexable-paths.mjs`
   so **every** indexable route works as `/contact`, `/contact/`, `/services/custom-software/`,
   etc., without redirect loops. **`functions/_middleware.js` must not 301-strip trailing
   slashes** (that caused `/contact` ↔ `/contact/` loops). Deploy both `dist/` and `functions/`.
4. Unknown paths fall back to `index.html` (SPA); **`functions/_middleware.js`** returns real **404**
   + `X-Robots-Tag: noindex` for junk URLs. Confirm the latest deploy includes the `functions/` folder.
5. Optional Cloudflare **Production** env vars (then redeploy): `VITE_GSC_SITE_VERIFICATION` (Search Console HTML tag),
   `VITE_PLAUSIBLE_DOMAIN`, and Cloudflare `FORMSPREE_FORM_URL` for the contact form.
6. The contact form posts to Formspree (`InquiryForm.tsx`); no env var required for the default endpoint.

**After every production deploy**, spot-check:

- `https://nextcoresoft.com/sitemap.xml` lists all indexable URLs (see `shared/indexable-paths.mjs` — blog posts come from `shared/blog-posts.json`).
- `https://nextcoresoft.com/blog` and `https://nextcoresoft.com/services` return **200** (not 404).
- Homepage `<title>` includes **Web & App Development**.
- If GSC sitemap fetch fails with **403**, see `docs/CLOUDFLARE-403-GOOGLEBOT.md`.

## 3D hero and performance

The hero centerpiece is a real Three.js scene (React Three Fiber) with
pointer-driven parallax. It is lazy-loaded. Phones under 768px,
`prefers-reduced-motion`, data-saver mode, and browsers without WebGL get a
CSS fallback. A touch-screen laptop still gets the 3D scene, because treating
every coarse pointer as "no WebGL" was hiding the animation in production.

## Notes on content

- No client logos, testimonials, statistics, or case studies are fabricated.
  The portfolio shows three clearly labeled **demonstration projects** with
  concept mockups; replace them in `src/data/content.ts` when real projects
  can be shown.
- The email address `hello@nextcoresoft.com` and the social links in the footer
  are marked placeholders. Update them before launch.
- Structured data includes only the organization name, URL, and description.
