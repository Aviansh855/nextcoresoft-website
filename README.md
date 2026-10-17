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

The inquiry form validates input in the browser, then POSTs it as form data to
Formspree at `https://formspree.io/f/xzedydog`. Success is shown only after
Formspree accepts the submission.

In the Formspree dashboard, confirm the notification email is the inbox you
read, and that email notifications are turned on. The form includes a
`_gotcha` honeypot; leave Formspree's spam filter enabled.

**Submissions not showing?**

1. Log in at [formspree.io](https://formspree.io) with the **same account that
   owns form `xzedydog`** (Forms → open the form → **Submissions**). Submissions
   do not appear in a different Formspree login.
2. Check the form's **Spam** tab in Formspree.
3. Under form **Settings**, confirm **Allowed domains** includes
   `nextcoresoft.com` (or turn domain restriction off while testing).
4. On Cloudflare Pages, if you set `VITE_FORM_ENDPOINT`, it must be exactly
   `https://formspree.io/f/yourFormId` — then trigger a **new deploy**. A wrong
   value is baked into the build.
5. If the site shows a red error after submit, read the message (ad blockers
   often block `formspree.io`).

To point the form somewhere else, set `VITE_FORM_ENDPOINT` in `.env.local` to
another URL that accepts a multipart POST and returns HTTP 2xx, then restart
the dev server.

**Never put secret keys in `VITE_` variables** — anything with that prefix is
embedded in the client bundle. The Formspree endpoint URL is designed to be
public; your Formspree account password and API keys are not needed and must
not be added here.

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
   `VITE_PLAUSIBLE_DOMAIN`, `VITE_FORM_ENDPOINT` if you change Formspree.
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
