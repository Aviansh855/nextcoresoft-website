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

## 3D hero and performance

The hero centerpiece is a real Three.js scene (React Three Fiber) with
pointer-driven parallax. It is lazy-loaded and only mounted on desktop
browsers that support WebGL. Phones, tablets, `prefers-reduced-motion`, and
data-saver mode get a lightweight CSS version instead, so the 3D code never
blocks the main content on those devices.

## Notes on content

- No client logos, testimonials, statistics, or case studies are fabricated.
  The portfolio shows three clearly labeled **demonstration projects** with
  concept mockups; replace them in `src/data/content.ts` when real projects
  can be shown.
- The email address `hello@nextcoresoft.com` and the social links in the footer
  are marked placeholders. Update them before launch.
- Structured data includes only the organization name, URL, and description.
