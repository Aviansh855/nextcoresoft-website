# NextCoreSoft — AEO / GEO / Technical SEO Audit (Local Repository)

**Date:** 2026-10-17 (Phase 6 addendum: 2026-10-18; counts/policy refresh: 2026-10-18 late)  
**Scope:** Read-only audit of the `nextcoresoft` marketing site repo (React 19 + Vite + TypeScript + Tailwind, Cloudflare Pages).  
**Production URL (reference only):** https://nextcoresoft.com — not modified during this task.  
**Canonical policy:** `shared/indexable-paths.mjs` — **19 indexable paths** (12 marketing routes + blog index + **7** posts). Internal route keys stay without a trailing slash; public canonical, sitemap `<loc>`, `og:url`, and JSON-LD use apex HTTPS + **`preferredPath()` trailing slash** (see `docs/SEO.md`, `docs/HTTPS_CANONICAL_AUDIT.md`).

---

## 1. Routes and source map

| Path | Page component | Primary content / SEO sources |
|------|----------------|------------------------------|
| `/` | `src/pages/HomePage.tsx` | `src/data/content.ts`, `shared/page-headings.json`, `shared/site.json` |
| `/about` | `AboutPage.tsx` | `content.ts` (principles, process) |
| `/contact` | `ContactPage.tsx` | `InquiryForm.tsx`, `functions/api/contact.js` (prod proxy) |
| `/portfolio` | `PortfolioPage.tsx` | `src/data/portfolio.ts` |
| `/blog` | `BlogIndexPage.tsx` | `shared/blog-posts.json` ← `content/nextcoresoft_3_seo_blog_posts.md` + `content/nextcoresoft_seo_blog_posts_batch2.md` |
| `/blog/custom-software-development-cost-india` | `BlogPostPage.tsx` | Same JSON + `BlogArticleBody.tsx` / `RichText.tsx` |
| `/blog/mobile-app-development-cost-india` | `BlogPostPage.tsx` | Same |
| `/blog/mvp-vs-full-product` | `BlogPostPage.tsx` | Same |
| `/blog/ai-automation-small-business-india` | `BlogPostPage.tsx` | Same |
| `/blog/hire-custom-software-development-company-india` | `BlogPostPage.tsx` | Same |
| `/blog/web-app-vs-mobile-app-for-business` | `BlogPostPage.tsx` | Same |
| `/blog/api-integration-business-systems-guide` | `BlogPostPage.tsx` | Same |
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
| `/blog` + 7 posts | From blog compile + route meta | Post `h1` from MD front matter |
| `/privacy`, `/terms` | Legal titles | Privacy Policy / Terms of Service |

**Canonical:** `https://nextcoresoft.com` + `preferredPath(routeKey)` — trailing slash on all non-root routes (e.g. `https://nextcoresoft.com/portfolio/`). See `docs/SEO.md`.  
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

**Confirmed (2026-10-17):** Blog and service **full** copy was not in static HTML — JS-executing crawlers (Googlebot) see full content; non-JS agents saw only meta/JSON-LD + short `<noscript>` lead.

**Fixed in repo (2026-10-18):** `scripts/prerender-routes.mjs` injects a faithful static fallback inside `#root` (`#static-prerender`): H1 + lead on every route, services catalog on service routes, and **full blog article text (headings, paragraphs, lists, tables, FAQs, author/dates from `blog-posts.json`)** on posts. React `createRoot` replaces it on load (verified in preview — single H1, full article). Old `<noscript>`-only block removed to avoid duplicate H1s for no-JS visitors; `verify-seo-routes.mjs` asserts the static fallback and trailing-slash canonicals for **19** sitemap paths. Live production may lag until the owner deploys the latest build.

**Performance note:** Main bundle ~604 kB + three.js ~929 kB (Vite build warning) — may slow LCP/interaction on low-end mobile; hero uses WebGL (`HeroScene`).

---

## 4. robots.txt, sitemap, redirects, slash policy

| Asset | Location | Notes |
|-------|----------|--------|
| `robots.txt` | `public/robots.txt` | `Allow: /` for `*` and `Googlebot`; sitemap URL; commented guidance for GPTBot/ClaudeBot vs search bots; **no active Disallow for AI training bots** until owner opts in |
| `sitemap.xml` | Generated → `public/sitemap.xml` | **19 URLs** from `SITEMAP_ENTRIES`; `<loc>` uses `preferredPath()`; `<lastmod>` from blog `updated`/`published` or source-file mtimes (`scripts/generate-sitemap.mjs`) — not “today” on every build |
| `_redirects` | `public/_redirects` | Cloudflare Pages trailing-slash handling for app routes |
| `llms.txt` | `public/llms.txt` | First-party page list; optional, not a Google ranking requirement |

**WAF / edge (live-only risk):** `docs/CLOUDFLARE-403-GOOGLEBOT.md` documents GSC **403 on `/sitemap.xml`** for verified Googlebot via Managed Rules. **Local robots changes cannot fix edge blocks.** Owner must apply Cloudflare custom rule for verified bots on SEO paths.

**Production check (read-only, 2026-10-18):** All canonical (trailing-slash) URLs returned **200**: `/`, `/about/`, `/contact/`, `/portfolio/`, `/services/`, four service pages, `/blog/` + **seven** articles, `/privacy/`, `/terms/`, `/robots.txt`, `/sitemap.xml` (**19** `<loc>` entries in local build), `/llms.txt`. Non-slash paths typically **308 → slash** at the edge; declared canonical/sitemap URLs match the slash form. Live `robots.txt` may lag local (e.g. explicit `Bingbot` lines) until deploy. Earlier 308 observations were redirects, not 404s.

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
- Contact email: `hello@nextcoresoft.com` (`shared/site.json`, footer, JSON-LD) — **no street address or phone**; schema should not invent them. `sameAs`: GitHub repo URL only (no LinkedIn/X in repo yet).

**External validation still required:** Google Rich Results Test / Schema.org validator per URL after deploy.

---

## 6. Blog implementation status

| Item | Status |
|------|--------|
| MD sources | `content/nextcoresoft_3_seo_blog_posts.md` (3 posts) + `content/nextcoresoft_seo_blog_posts_batch2.md` (4 posts) |
| Compile | `scripts/compile-blogs-from-md.mjs` → `shared/blog-posts.json` (**7 posts**) + `shared/blog-index.mjs` |
| Routes | `/blog`, `/blog/:slug` (+ slash variants) |
| Index UI | `BlogIndexPage.tsx` with summaries and links |
| Article UI | `BlogPostPage.tsx`, `BlogArticleBody.tsx`, internal links via `src/lib/site-url.ts` |
| Sitemap | Blog index + **7** slugs via `blogSitemapEntries()` in `SITEMAP_ENTRIES` (**19** URLs total) |
| Prerender | Per-post HTML with article meta + full static `#root` fallback |
| Authors/dates | Only as declared in MD / compile output — **do not fabricate** |
| RSS | `scripts/generate-feed.mjs` → `public/feed.xml` (7 items; part of `npm run build`) |

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
| Footer social | GitHub in `site.json` `sameAs`; other profiles not published in footer — no fake links |

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
- Official LinkedIn/X URLs (GitHub repo in `sameAs` only)  
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

## 12. Phase 6 — Why AI tools may not mention NextCoreSoft (2026-10-18)

**Method & limits:** Read-only production HTTP checks (curl), live `robots.txt`/sitemap fetch, local + live HTML inspection, one manual Bing web-search sample in browser, Google Search attempt (blocked by Google `/sorry/` bot challenge — recorded as tool limitation, **not** a site defect). No private APIs, no scraping, no credentials used. ChatGPT Search / Perplexity / Copilot / Gemini were **not directly testable** in this environment — see manual checklist in the implementation report. Non-browsing chat answers were **not** used as visibility evidence.

### A. Baseline sample (label: single sample, results vary by time/region/account)

| Date | Tool / mode | Query | NextCoreSoft appeared? | Cited URL | Notes |
|------|-------------|-------|------------------------|-----------|-------|
| 2026-10-18 | Bing Web Search (browser) | `NextCoreSoft` (branded) | **No** `nextcoresoft.com` result in page-1 snapshot | — | Similar-name firms dominate (NextCore HR, Next Core Technologies, CoreSoft…); only the GitHub repo `Aviansh855/nextcoresoft-website` appeared |
| 2026-10-18 | Bing Web Search (browser) | `site:nextcoresoft.com` | **No results listed** in snapshot | — | Suggests weak/absent Bing index at sample time; owner must confirm in Bing Webmaster Tools — a snapshot is not proof of deindexing |
| 2026-10-18 | Google Search (browser) | `NextCoreSoft` | Not testable | — | Google returned `/sorry/` automated-query challenge to this browser |
| 2026-10-18 | ChatGPT Search / Perplexity / Copilot / Gemini | — | Not tested | — | No permitted access in this session; manual checklist provided |

Unbranded queries (`custom software development company in India…`, etc.) were **not** run as a mass test; they are highly competitive and a small sample would not be diagnostic. Owner should run the full branded + unbranded list manually (see report).

### B. Layer-by-layer blockers

| # | Layer | Evidence | Verdict |
|---|-------|----------|---------|
| 1 | Public availability | All canonical prod URLs 200 on 2026-10-18; no login/challenge for curl/browser | ✅ Not a blocker now |
| 2 | Robots / meta / headers | Local+live `robots.txt`: `Allow: /` (`*`, Googlebot); indexable routes `index, follow`; `X-Robots-Tag: noindex` **only** on unknown/404 paths via `functions/_middleware.js` | ✅ No accidental noindex found |
| 3 | ChatGPT Search (OAI-SearchBot) | No explicit OAI-SearchBot rule, but `User-agent: * Allow: /` does not disallow it. Per OpenAI docs, OAI-SearchBot (search) ≠ GPTBot (training); opting out of OAI-SearchBot removes sites from ChatGPT search answers | ⚠️ Allowed by default; **WAF/edge behaviour unverified** — a UA string test is not a verified-bot check. No change made without owner policy decision |
| 4 | Other AI crawlers | Same `* Allow: /` covers Claude-SearchBot/Claude-User/PerplexityBot/Bingbot at robots level; training bots (GPTBot, ClaudeBot) only in commented templates | ⚠️ Robots OK; edge/WAF unknown for each |
| 5 | Search index coverage | Historical GSC 403 on `/sitemap.xml` (Cloudflare Managed Rules, `docs/CLOUDFLARE-403-GOOGLEBOT.md`); Bing sample suggests little/no Bing presence | 🔴 **Likely blocker (esp. Bing/Copilot)** — owner: GSC + Bing WMT index/sitemap checks |
| 6 | Entity clarity | Consistent name/offerings/email (`hello@nextcoresoft.com`) across site, footer, Organization JSON-LD; **no** address/phone/founder; `sameAs` GitHub only; name collides with many similar firms on Bing page 1 | ⚠️ Thin entity footprint + name ambiguity |
| 7 | Independent corroboration | No verified third-party profiles/listings/reviews in repo; GitHub repo is the only off-site hit in Bing sample | 🔴 **Gap** — only legitimate, owner-controlled profiles should be created; no fake listings |
| 8 | Content usefulness | Service answer blocks, process, FAQs, **7** blog guides (original 3 + batch2; external sources cited where present, ranges labelled estimates); portfolio features/stack often intentionally blank pending owner verification | ⚠️ Improving; differentiation still generic vs established firms |
| 9 | Technical readability | **Was:** full body JS-only. **Fixed 2026-10-18:** static `#root` fallback with full blog text on all **19** indexable routes. Google renders JS; several AI retrieval crawlers may not | 🔴→⚠️ Fixed in repo; live after deploy |
| 10 | Measurement | No GSC/Bing WMT data accessible here (`.env.example` only lists optional GSC API vars; no `.env.local`) | ⚠️ Owner to record baselines in GSC Generative-AI report + Bing AI Performance |

**Official guidance consulted:** Google AI optimization guide (SEO fundamentals apply; `llms.txt`/special GEO markup **not required**; indexing ≠ guaranteed AI citation), OpenAI bots overview (OAI-SearchBot vs GPTBot independence; ~24h robots propagation), Bing AI Performance (owner tool).

### C. Confirmed reasons (separated)

- **Technical blockers:** (historical) Cloudflare 403 for verified Googlebot on sitemap; JS-only body (fixed locally, pending deploy); possible Bing non-indexing.
- **Content/entity gaps:** new/thin entity, ambiguous brand name vs similar firms, few original proof assets (portfolio details withheld pending owner verification).
- **Limited third-party evidence:** essentially no independent corroboration found in sample.
- **Normal variability:** even indexed pages are not guaranteed citation; generic queries favour established firms; non-browsing models answer from training and cannot cite a new site.

---

*End of audit document. Implementation details: `docs/NEXTCORESOFT_AEO_GEO_IMPLEMENTATION_REPORT.md`.*
