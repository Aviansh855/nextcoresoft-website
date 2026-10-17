# NextCoreSoft — AEO / GEO Implementation Report (Local Only)

**Date:** 2026-10-17  
**Branch/worktree:** Local uncommitted changes — **not pushed, not deployed.**  
**Audit baseline:** `docs/NEXTCORESOFT_AEO_GEO_AUDIT.md`

---

## Summary

Implemented answer-first blocks on all four service pages, a homepage engagement overview, services hub enrichments, About quick-answer + accessibility fix, softened contact response wording, and owner guidance comments in `robots.txt`. Blog (3 articles + index) was already wired from Markdown source; validated build, prerender, and preview rendering.

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
| `npm run build` | **Pass** — 15 SEO paths verified (`verify-seo-routes.mjs`), prerender 14 route folders + root |
| `npm run lint` | **Pass** (4 warnings: unused params, RichText export) |
| `tsc -b` | Part of build — **Pass** |

---

## Local browser verification (preview `http://127.0.0.1:4173`)

| URL | Check |
|-----|--------|
| `/` | Title OK; nav includes **Blog**; heading “Who we help and how projects work” present |
| `/services/custom-software` | H1 OK; **Quick answer**, Who it suits, quote list, decision checklist, FAQ buttons |
| Other routes | Not every route clicked in this session; build + prerender verify covers 15 paths — **owner should spot-check** `/contact`, `/portfolio`, `/blog`, three articles, `/privacy`, `/terms` before deploy |

**Console/network:** Not exhaustively logged in this pass; no React Router `<Routes>` regression observed.

**Contact form on preview:** `/api/contact` requires Cloudflare function or dev `.env.local` `FORMSPREE_FORM_URL` — test submit on **production** or `npm run dev` with env, not only static preview.

---

## Blog source integrity

- Source: `content/nextcoresoft_3_seo_blog_posts.md`
- Build: `Wrote … blog-posts.json (3 posts from MD source)`
- Slugs: `custom-software-development-cost-india`, `mobile-app-development-cost-india`, `mvp-vs-full-product`
- **Live status:** Unknown until owner deploys; external inspection did not confirm readable production blog HTML.

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

*End of implementation report.*
