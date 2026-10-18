# NextCoreSoft — AEO / GEO Implementation Report (Local Only)

**Date:** 2026-10-17 (Phase 6/7 update: 2026-10-18; documentation refresh: 2026-10-18 late)  
**Branch/worktree:** Historical note — early Phase 6/7 work started uncommitted; repo now includes prerender fallback, trailing-slash canonicals, **7** blog posts, and **19** sitemap URLs per latest `npm run build`. Deploy/push status is owner-controlled.  
**Audit baseline:** `docs/NEXTCORESOFT_AEO_GEO_AUDIT.md` (counts aligned with `shared/indexable-paths.mjs` + `public/sitemap.xml`)

---

## Summary

Implemented answer-first blocks on all four service pages, a homepage engagement overview, services hub enrichments, About quick-answer + accessibility fix, softened contact response wording, and owner guidance comments in `robots.txt`. Blog index + posts compile from Markdown (**7** articles from two source files); build verifies **19** indexable URLs (sitemap + `verify-seo-routes.mjs`), prerender, and preview rendering.

No guaranteed rankings, AI citations, or live production changes claimed.

---

## Files changed (this AEO/GEO pass)

| File | Change |
|------|--------|
| `src/components/services/ServiceAnswerBlock.tsx` | **New** — Quick answer, who it suits, quote checklist |
| `src/data/service-details.ts` | `aeo` objects for all four services |
| `src/pages/ServicePage.tsx` | Renders `ServiceAnswerBlock`; breadcrumb Services → `/services` |
| `src/components/home/HomeEngagementOverview.tsx` | **New** — Who we help / problems / project path |
| `src/pages/HomePage.tsx` | Inserts overview after `CompanySummary` |
| `src/pages/AboutPage.tsx` | Quick answer box; principle text color fix |
| `src/pages/ServicesIndexPage.tsx` | Typical deliverables + good-fit snippets per card |
| `src/pages/ContactPage.tsx` | Softer reply SLA wording |
| `src/components/contact/InquiryForm.tsx` | Matching SLA wording on helper/success text |
| `src/data/content.ts` | Services hub FAQ answer aligned with SLA |
| `shared/route-meta.mjs` | Contact `staticLead` aligned with SLA |
| `public/robots.txt` | Comments: OAI-SearchBot vs GPTBot/ClaudeBot; WAF note |
| `docs/NEXTCORESOFT_AEO_GEO_AUDIT.md` | **New** — Phase 1 audit |
| `docs/NEXTCORESOFT_AEO_GEO_IMPLEMENTATION_REPORT.md` | **New** — this report |
| `scripts/prerender-routes.mjs` *(2026-10-18)* | Static `#root` fallback (`#static-prerender`): H1+lead all routes, full blog text, services catalog; removes old `<noscript>`-only block |
| `scripts/verify-seo-routes.mjs` *(2026-10-18)* | Asserts static fallback present; blog fallback not truncated |
| `docs/NEXTCORESOFT_AEO_GEO_AUDIT.md` §12 *(2026-10-18)* | Phase 6 AI-visibility diagnosis |

**Build outputs regenerated (not committed):** `shared/blog-posts.json`, `shared/blog-index.mjs`, `shared/route-meta-snapshot.json`, `public/sitemap.xml`, `public/_redirects`, `dist/**`

*(Earlier conversation also touched JSON-LD, contact API, blog rendering, Reveal — see git diff for full history.)*

---

## Route-level content changes

| Route | Before (summary) | After (summary) |
|-------|------------------|-----------------|
| `/` | Hero + company summary | Added **Who we help and how projects work** with links to services/portfolio |
| `/about` | Studio narrative only | **Quick answer** callout; readable principle body text |
| `/services` | Card summaries | + first deliverables + **Good fit when** from `service-details.aeo` |
| `/services/*` | Long-form only | **Quick answer** block at top (all four slugs) |
| `/contact` | Firm 1-day reply | **Aim** to reply within one business day **when volume allows** |
| `/portfolio` | Already showcase-labeled | No structural change (data already conservative) |
| `/blog/*` | Existing MD-driven posts | Verified compile + render; no silent copy rewrites |

---

## Metadata before / after (contact example)

| Field | Before | After |
|-------|--------|-------|
| Contact `staticLead` (prerender noscript) | “We reply within one business day…” | “We **aim** to reply… **when volume allows**” |
| Visible contact page | Same firm wording | Softened (matches form) |

Other routes: titles/descriptions unchanged unless rebuilt from existing `route-meta.mjs`.

---

## Crawler / training bot policy

- **Local `robots.txt`:** Still `Allow: /` for all and Googlebot. Added documentation comments only; **GPTBot / ClaudeBot Disallow blocks remain commented** pending owner approval.
- **Cloudflare:** No WAF or production changes. Owner must follow `docs/CLOUDFLARE-403-GOOGLEBOT.md` if sitemap/HTML fetches 403 at edge.
- **Distinction preserved:** Search/discovery bots (e.g. OAI-SearchBot, Claude-SearchBot) vs training crawlers (GPTBot, ClaudeBot) documented in comments — not conflated.

---

## Structured data

- No new fake Review/Rating schema.
- Existing per-route `@graph` in prerender + client `RouteJsonLd` unchanged in this pass except contact page text consistency in visible HTML only.
- **Still required after deploy:** Rich Results Test per URL; confirm BlogPosting dates match visible bylines.

---

## Internal linking

- Homepage overview links to four service pages + portfolio.
- Service breadcrumb **Services** points to `/services` (was `/#services`).
- Blog index and posts unchanged; `public/llms.txt` lists blog URLs.

---

## Build / lint / SEO verify

| Command | Result |
|---------|--------|
| `npm run build` | **Pass** — **19** SEO paths verified (`verify-seo-routes.mjs`), prerender **18** route folders + root `index.html` |
| `npm run lint` | **Pass** (4 warnings: unused params, RichText export) |
| `tsc -b` | Part of build — **Pass** |

---

## Local browser verification (preview `http://127.0.0.1:4173`)

| URL | Check |
|-----|--------|
| `/` | Title OK; nav includes **Blog**; heading “Who we help and how projects work” present |
| `/services/custom-software` | H1 OK; **Quick answer**, Who it suits, quote list, decision checklist, FAQ buttons |
| `/blog/custom-software-development-cost-india` *(2026-10-18)* | Single H1, full article + tables in rendered DOM, Marketlube/Clutch links, FAQs; React cleanly replaced static fallback (no duplicate H1) |
| `/contact?service=custom-software&intent=quote` *(2026-10-18)* | Form heading “Request a quote”, service preselected, description prefilled, labels/required markers present |
| All **19** indexable routes + contact-prefill *(2026-10-18)* | Preview HTTP sweep: **200** for every sitemap route (SPA preview returns 200 for unknown paths too; production `functions/_middleware.js` returns real 404 + `noindex` — by design) |

**Console/network:** No React Router `<Routes>` error observed in rendered snapshots. Full console capture not retained — owner should glance at DevTools console on deploy preview.

**Contact form on preview:** `/api/contact` requires Cloudflare function or dev `.env.local` `FORMSPREE_FORM_URL` — test submit on **production** or `npm run dev` with env, not only static preview.

---

## Blog source integrity

- Sources: `content/nextcoresoft_3_seo_blog_posts.md` (3) + `content/nextcoresoft_seo_blog_posts_batch2.md` (4)
- Build: `Wrote … blog-posts.json (7 posts from MD source)` (first line of `npm run build`)
- Slugs: `custom-software-development-cost-india`, `mobile-app-development-cost-india`, `mvp-vs-full-product`, `ai-automation-small-business-india`, `hire-custom-software-development-company-india`, `web-app-vs-mobile-app-for-business`, `api-integration-business-systems-guide`
- Sitemap: blog index + 7 posts = **19** total URLs in `public/sitemap.xml`
- **Live status:** May lag repo until owner deploys latest build.

---

## Owner actions before / after deploy

1. Confirm contact response SLA matches operations (or further soften copy).
2. Deploy to Cloudflare Pages; verify **Blog** in production nav.
3. Fix Cloudflare **verified bot** allow rule if GSC sitemap still 403.
4. Decide training-crawler policy → uncomment specific `Disallow` blocks in `robots.txt` if desired.
5. Provide verified address, phone, social URLs if GEO schema should expand.
6. Run Rich Results / URL Inspection on deployed URLs.
7. Review and **commit** local changes when satisfied (not done by agent).

---

## Commands run

```powershell
cd c:\Users\gedar\OneDrive\Desktop\nextcoresoft
npm run build
npm run lint
node scripts/export-route-meta-json.mjs
node scripts/prerender-routes.mjs
npm run preview -- --host 127.0.0.1 --port 4173
```

---

## Phase 6/7 addendum (2026-10-18) — AI visibility

### AI visibility baseline (sample only)

| Date | Tool / mode (web search?) | Query | Appeared? | Cited URL | Limitation |
|------|---------------------------|-------|-----------|-----------|------------|
| 2026-10-18 | Bing Web Search — yes | `NextCoreSoft` | No | — | Single sample; similar-name firms dominate page 1; GitHub repo appeared |
| 2026-10-18 | Bing Web Search — yes | `site:nextcoresoft.com` | No results listed | — | Snapshot may omit results; confirm in Bing Webmaster Tools |
| 2026-10-18 | Google Search — yes (attempt) | `NextCoreSoft` | Not testable | — | Google `/sorry/` bot challenge in this browser |
| 2026-10-18 | ChatGPT Search / Perplexity / Copilot / Gemini | Branded + unbranded list | Not tested | — | No permitted access here; use manual checklist below |

**Production availability (read-only, 2026-10-18 sample):** core marketing URLs returned 200; local build now lists **19** sitemap URLs (7 blog posts). Live sitemap/post count may lag until deploy. Earlier “blog not readable” was extractor/redirect behaviour, not a current 404.

### Confirmed reasons AI tools may not mention the site

- **Technical:** historical Cloudflare 403 for verified Googlebot on sitemap; JS-only body (fixed locally 2026-10-18, pending deploy); possible weak Bing indexing.
- **Content/entity:** young, thin entity footprint; brand name collides with many similar firms; portfolio proof details withheld pending owner verification.
- **Third-party evidence:** no verified independent profiles/citations found in sample (GitHub only).
- **Normal variability:** indexing ≠ citation; generic queries are competitive; non-browsing chat cannot cite the site and must not be used as a visibility test.

**No guarantee:** local changes cannot guarantee future AI citation, ranking, or indexing.

### Exact manual checks for owner (after approved deploy)

1. **ChatGPT (Search on):** ask `NextCoreSoft`, `NextCoreSoft custom software development`, plus one unbranded query; note whether `nextcoresoft.com` is cited and which URL. Repeat logged-out if possible.
2. **Google:** Search Console → URL Inspection for `/`, service pages, blog posts; Generative AI performance report; check sitemap fetch succeeds (Cloudflare verified-bot rule per `docs/CLOUDFLARE-403-GOOGLEBOT.md` if 403 persists).
3. **Bing:** Bing Webmaster Tools → submit/verify sitemap, check index coverage, AI Performance report; re-run `site:nextcoresoft.com`.
4. **Cloudflare:** Security → Events, filter by verified bot + path, confirm OAI-SearchBot/Googlebot/Bingbot are not blocked (robots `Allow: /` does not override edge blocks). Do **not** add broad WAF skips.
5. **Rich Results Test:** one service page + one blog post after deploy.

### Commands run (2026-10-18)

```powershell
npm run build   # pass — 19 paths verified, static #root fallback asserted
npm run lint    # pass — 4 pre-existing warnings
npm run preview -- --host 127.0.0.1 --port 4173
curl.exe <production URLs>  # read-only 200/robots/sitemap checks
```

### Files changed in Phase 6/7 addendum (representative)

- `scripts/prerender-routes.mjs`, `scripts/verify-seo-routes.mjs`
- `scripts/compile-blogs-from-md.mjs`, batch2 MD, `scripts/generate-sitemap.mjs` (canonical `<loc>` + content-based `<lastmod>`)
- `docs/NEXTCORESOFT_AEO_GEO_AUDIT.md`, `docs/NEXTCORESOFT_AEO_GEO_IMPLEMENTATION_REPORT.md`, `docs/HTTPS_CANONICAL_AUDIT.md`
- Regenerated on build: `dist/**`, `public/sitemap.xml` (**19** URLs), `public/_redirects`, `public/feed.xml`, `shared/blog-posts.json`, `shared/route-meta-snapshot.json`

### Canonical / URL count reference (current repo)

| Item | Value | Source |
|------|-------|--------|
| Indexable paths | **19** | `shared/indexable-paths.mjs` → `INDEXABLE_PATHS` / `SITEMAP_ENTRIES` |
| Blog posts | **7** | `shared/blog-posts.json` after compile |
| Public URL form | Apex HTTPS + trailing slash (non-root) | `preferredPath()` — `docs/SEO.md` |
| SEO verify | `SEO route HTML verified for 19 paths` | `scripts/verify-seo-routes.mjs` after `npm run build` |

**Failures/limitations:** Google Search baseline blocked by Google bot challenge; ChatGPT/Perplexity/Copilot/Gemini not accessible; contact-form live submit not re-tested (backend is remote Cloudflare/Formspree via `FORMSPREE_FORM_URL` — only `.env.example` present locally, no production DB involved).

---

*End of implementation report.*
