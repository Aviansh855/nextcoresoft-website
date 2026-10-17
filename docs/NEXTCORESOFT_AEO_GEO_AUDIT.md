# NextCoreSoft — AEO / GEO / Technical SEO Audit (Local Repository)

**Date:** 2026-10-17  
**Scope:** Read-only audit of the `nextcoresoft` marketing site repo (React 19 + Vite + TypeScript + Tailwind, Cloudflare Pages).  
**Production URL (reference only):** https://nextcoresoft.com — not modified during this task.  
**Canonical policy:** `shared/indexable-paths.mjs` — 15 indexable paths; sitemap/canonical use **no trailing slash** except `/`.

---

## 1. Routes and source map

| Path | Page component | Primary content / SEO sources |
|------|----------------|------------------------------|
| `/` | `src/pages/HomePage.tsx` | `src/data/content.ts`, `shared/page-headings.json`, `shared/site.json` |
| `/about` | `AboutPage.tsx` | `content.ts` (principles, process) |
| `/contact` | `ContactPage.tsx` | `InquiryForm.tsx`, `functions/api/contact.js` (prod proxy) |
| `/portfolio` | `PortfolioPage.tsx` | `src/data/portfolio.ts` |
| `/blog` | `BlogIndexPage.tsx` | `shared/blog-posts.json` ← `content/nextcoresoft_3_seo_blog_posts.md` |
| `/blog/custom-software-development-cost-india` | `BlogPostPage.tsx` | Same JSON + `BlogArticleBody.tsx` / `RichText.tsx` |
| `/blog/mobile-app-development-cost-india` | `BlogPostPage.tsx` | Same |
| `/blog/mvp-vs-full-product` | `BlogPostPage.tsx` | Same |
| `/services` | `ServicesIndexPage.tsx` | `content.ts` (`SERVICES`, hub FAQs) |
| `/services/custom-software` | `ServicePage.tsx` | `src/data/service-details.ts` |
| `/services/mobile-apps` | `ServicePage.tsx` | `service-details.ts` |
| `/services/ai-automation` | `ServicePage.tsx` | `service-details.ts` |
| `/services/cloud-api` | `ServicePage.tsx` | `service-details.ts` |
| `/privacy`, `/terms` | `LegalPage.tsx` | Legal copy in page/data |
| `*` | `NotFoundPage.tsx` | Not indexable |

**Router:** `src/routes/appRoutes.tsx` — flat `<Route>` list (no invalid `<Routes>` wrappers). Each indexable path has a trailing-slash alias route.

**Navigation:** `NAV_LINKS` in `content.ts` includes **Blog** (`/blog`). Live production nav may lag deploy; local/preview shows Blog.

---

## 2. Page titles, descriptions, canonicals, H1s

**Source of truth:** `shared/route-meta.mjs` → build writes `shared/route-meta-snapshot.json` → `scripts/prerender-routes.mjs` injects into `dist/**/index.html`.

| Path | Title (abridged) | H1 (prerender / meta) |
|------|------------------|------------------------|
| `/` | NextCoreSoft \| Custom Software, Web & App Development… | Custom software, web development, mobile apps and AI automation |
| `/about` | About NextCoreSoft \| Software & AI Automation Studio | A software studio focused on how businesses actually operate |
| `/contact` | Contact NextCoreSoft \| Free Software Consultation | Discuss your project or request a quote |
| `/portfolio` | Project Portfolio \| NextCoreSoft | Software and apps we can show you today |
| `/services` | Software Development Services \| Web, Mobile & AI… | Software development services for web, mobile, and AI automation |
| Four service slugs | Service-specific titles | Service-specific H1s in `route-meta.mjs` |
| `/blog` + 3 posts | From blog compile + route meta | Post `h1` from MD front matter |
| `/privacy`, `/terms` | Legal titles | Privacy Policy / Terms of Service |

**Canonical:** `https://nextcoresoft.com{path}` without trailing slash (see `docs/SEO.md`).  
**Client updates:** `src/lib/seo.ts` + `RouteMeta` on navigation; prerendered shell matches on first load.

---

## 3. Initial HTML vs client-rendered body

**Method:** Inspected `dist/**/index.html` after `npm run build` + `scripts/prerender-routes.mjs`; spot-checked `npm run preview` (127.0.0.1:4173) with browser accessibility tree.

| Route type | In prerendered HTML | Full page body |
|------------|---------------------|----------------|
| All indexable routes | `<title>`, meta description, robots, canonical, OG/Twitter, `#jsonld-route-graph`, root Organization/WebSite JSON-LD blocks | **Mostly React client-rendered** after `#root` hydrates |
| All indexable routes | `<noscript>` with H1 + short **staticLead** (+ blog excerpt truncated) | N/A without JS |
| Blog posts | `og:type=article`, `article:published_time` / `modified_time` when set in source | Full article from JSON in client |
| Service / home | Noscript lead is summary only | ServiceAnswerBlock, FAQs, portfolio cards, 3D hero on home |

**Confirmed:** Blog and service **full** copy is not duplicated in static HTML — crawlers that execute JS (Googlebot) see full content; noscript-only agents see summary. **Not assumed:** production “empty body” from third-party extractors without JS.

**Performance note:** Main bundle ~604 kB + three.js ~929 kB (Vite build warning) — may slow LCP/interaction on low-end mobile; hero uses WebGL (`HeroScene`).

---

## 4. robots.txt, sitemap, redirects, slash policy

| Asset | Location | Notes |
|-------|----------|--------|
| `robots.txt` | `public/robots.txt` | `Allow: /` for `*` and `Googlebot`; sitemap URL; commented guidance for GPTBot/ClaudeBot vs search bots; **no active Disallow for AI training bots** until owner opts in |
| `sitemap.xml` | Generated → `public/sitemap.xml` | 15 URLs from `SITEMAP_ENTRIES` |
| `_redirects` | `public/_redirects` | Cloudflare Pages trailing-slash handling for app routes |
| `llms.txt` | `public/llms.txt` | First-party page list; optional, not a Google ranking requirement |

**WAF / edge (live-only risk):** `docs/CLOUDFLARE-403-GOOGLEBOT.md` documents GSC **403 on `/sitemap.xml`** for verified Googlebot via Managed Rules. **Local robots changes cannot fix edge blocks.** Owner must apply Cloudflare custom rule for verified bots on SEO paths.

**Production blog URLs (read-only, prior check):** HTTP **308** to trailing-slash variants — not evidence of 404. **Do not claim blog is live** until owner deploys and verifies.

---

## 5. Structured data (JSON-LD)

| Layer | Files | Types |
|-------|-------|--------|
| Global shell | `index.html` markers, `shared/jsonld-static.mjs` | Organization, WebSite |
| Per-route graph | `shared/jsonld-graph.mjs`, `shared/jsonld-by-route.mjs`, prerender + `RouteJsonLd.tsx` | WebPage, BreadcrumbList, Service (service pages), FAQPage (where FAQs exist), BlogPosting (posts), ProfessionalService (home) |
| FAQs data | `shared/seo-faqs.json` | Matched to visible FAQ accordions on service/hub pages |

**Consistency checks (local):**

- Organization name/url/logo from `shared/site.json` — matches footer and visible branding.
- No fabricated `AggregateRating` / Review schema.
- BlogPosting uses post title, dates, and canonical from compiled blog JSON when present.
- Contact email in footer: `hello@nextcoresoft.com` — **no street address or phone** in `site.json`; schema should not invent them.

**External validation still required:** Google Rich Results Test / Schema.org validator per URL after deploy.

---

## 6. Blog implementation status

| Item | Status |
|------|--------|
| MD source | `content/nextcoresoft_3_seo_blog_posts.md` present |
| Compile | `scripts/compile-blogs-from-md.mjs` → `shared/blog-posts.json` (3 posts) + `shared/blog-index.mjs` |
| Routes | `/blog`, `/blog/:slug` (+ slash variants) |
| Index UI | `BlogIndexPage.tsx` with summaries and links |
| Article UI | `BlogPostPage.tsx`, `BlogArticleBody.tsx`, internal links via `src/lib/site-url.ts` |
| Sitemap | Blog index + 3 slugs in `SITEMAP_ENTRIES` |
| Prerender | Per-post HTML with article meta + noscript excerpt |
| Authors/dates | Only as declared in MD — **do not fabricate** |

---

## 7. Forms, CTAs, accessibility, mobile

| Area | Finding |
|------|---------|
| Contact form | `InquiryForm.tsx` — labels, required fields, loading/success/error; posts to `/api/contact` (Cloudflare function + dev proxy) |
| Formspree URL | Server env `FORMSPREE_FORM_URL` only — not in client bundle |
| Query prefill | Service pages link to contact with service context (verify `?service=` still wired) |
| Reply SLA copy | Was absolute “within one business day” in multiple places — **softened locally** to “aim… when volume allows” (owner must confirm ops) |
| FAQs | `<button>` accordion pattern with visible question text — good for AT |
| Skip link | “Skip to main content” present in preview snapshot |
| Footer social | Placeholder text: profiles not published yet — honest, not fake links |

---

## 8. Portfolio

- All items use `label: "Project showcase"` in `portfolio.ts`.
- Problem/solution copy is descriptive; **features/stack often empty** until owner verifies — disclaimers on items.
- No invented client logos, metrics, or testimonials in data file.

---

## 9. Prioritized findings and proposed changes

| Sev | Finding | Evidence | Path / area | Proposed change | Test |
|-----|---------|----------|-------------|-----------------|------|
| **High** | Cloudflare WAF may block Googlebot on sitemap | GSC 403 doc | Edge (not repo) | Owner: allow verified bots on `/sitemap.xml` and HTML paths | GSC “Fetch sitemap” + URL Inspection |
| **High** | Full article/service body not in static HTML | `dist/.../index.html` + empty `#root` | Prerender pipeline | Accept for SPA; ensure meta + JSON-LD + noscript summary; optional future SSR/static body | View source vs rendered DOM |
| **Med** | Large JS bundles (three.js) | Build warning | `HeroScene`, vendors | Consider lazy-load or reduced motion path (future) | Lighthouse mobile |
| **Med** | Contact SLA may be over-promise | contact page, form, route-meta | Copy | Softened locally — owner confirm | — |
| **Med** | Live nav may omit Blog | Prior external inspection vs `NAV_LINKS` | Deploy lag | Deploy local build | Production nav check |
| **Low** | AI training bots not disallowed | `robots.txt` | Owner policy | Commented templates only; no change without approval | — |
| **Low** | Lint warnings | oxlint | compile script, contact.js, RichText | Optional cleanup | `npm run lint` |
| **Done** | Service pages lacked answer-first block | UX / AEO | `ServiceAnswerBlock`, `service-details.aeo` | Implemented | Preview `/services/*` |
| **Done** | Homepage missing “who/how” | AEO | `HomeEngagementOverview.tsx` | Implemented | Preview `/` |
| **Done** | About principles low contrast | a11y | `AboutPage.tsx` | `text-slate-600` fix | Visual check |
| **Done** | Services hub thin selector | AEO | `ServicesIndexPage.tsx` | Deliverables + “good fit” snippets | Preview `/services` |

---

## 10. Verified business data gaps (owner input)

Not in repo or not verified for public schema:

- Physical office address  
- Phone number  
- Official LinkedIn/GitHub/X URLs (footer states not published yet)  
- Founder names / credentials beyond generic studio copy  
- Guaranteed response SLA  

Use placeholders in planning; do not invent in content or JSON-LD.

---

## 11. Commands used for this audit

```bash
npm run build
npm run lint
node scripts/export-route-meta-json.mjs
node scripts/prerender-routes.mjs
npm run preview -- --host 127.0.0.1 --port 4173
```

---

*End of audit document. Implementation details: `docs/NEXTCORESOFT_AEO_GEO_IMPLEMENTATION_REPORT.md`.*
