# Local audit fix report — NextCoreSoft

**Date:** 2026-10-18  
**Scope:** Read-only production; local repo verification only. **No commit, push, deploy, DNS, or Cloudflare WAF changes** were performed as part of this report.

---

## Executive summary

The uploaded findings mixed **already-fixed local work** with **edge/production items** that cannot be proven from the repo alone. After inspection and local `npm run build` + `npm run lint`:

| Finding | Status in repo |
|---------|----------------|
| A. Relative URL normalization in `site-url.ts` | **Fixed** — `href.startsWith("/")` uses `URL` + `preferredPathname()`; query/hash preserved |
| B. Single canonical format (slash, apex HTTPS) | **Consistent** across route-meta, seo.ts, sitemap, prerender output |
| C. Sitemap `lastmod` = build date for all URLs | **Fixed** — blog dates + source mtimes; omit if unavailable |
| D. Stale audit doc counts / canonical text | **Updated** (AEO/GEO audit, implementation report, HTTPS audit, GSC page indexing) |
| E. Techwheels public name | **Neutral label** applied; internal `id` unchanged |
| F. Bing Live URL error | **Documented correlation procedure** — rule not guessed |
| G. www → apex | **Documented** — requires live verification; likely Cloudflare Redirect Rule |

---

## Files changed (this audit pass)

| File | Reason |
|------|--------|
| `src/lib/site-url.ts` | Confirmed relative-path slash policy; localhost rewrite now also uses `preferredPathname()` |
| `scripts/generate-sitemap.mjs` | Content-based `lastmod` (prior); removed unused `readFileSync` import |
| `src/data/portfolio.ts` | Display name → **Dealership Service Management System** (prior); `id` kept |
| `docs/NEXTCORESOFT_AEO_GEO_AUDIT.md` | 19 URLs, 7 posts, trailing-slash policy (prior refresh) |
| `docs/NEXTCORESOFT_AEO_GEO_IMPLEMENTATION_REPORT.md` | Build counts, blog slugs, status wording (prior refresh) |
| `docs/HTTPS_CANONICAL_AUDIT.md` | 19 sitemap URLs, lastmod note (prior refresh) |
| `docs/GSC-PAGE-INDEXING.md` | 19 sitemap URLs; canonical = trailing slash |
| `docs/BING-WEBMASTER-FIX.md` | Bing inspection ↔ Cloudflare Events correlation steps; no assumed rule ID |

**Generated on build (not committed):** `public/sitemap.xml`, `public/_redirects`, `public/feed.xml`, `dist/**`, `shared/blog-posts.json`, `shared/route-meta-snapshot.json`.

---

## A. `src/lib/site-url.ts`

**Policy:** Page routes (no file extension) get a trailing slash; `/` and paths like `/file.xml` unchanged; external URLs unchanged.

**Implementation:** For relative `href`, `new URL(href, origin)` then `preferredPathname(u.pathname)` + `u.search` + `u.hash`. Same-domain absolute URLs on `nextcoresoft.com` already used this path.

**Example:** `/contact?intent=quote` → `https://nextcoresoft.com/contact/?intent=quote`.

---

## B. Canonical consistency

| Layer | Mechanism | Format |
|-------|-----------|--------|
| Route keys | `shared/indexable-paths.mjs` | Internal keys **without** trailing slash |
| Public URLs | `preferredPath()` / `canonicalUrl()` | Apex HTTPS + slash (non-root) |
| Client | `src/lib/seo.ts` `preferredUrl()` / `applyMeta()` | Matches prerender |
| Sitemap | `scripts/generate-sitemap.mjs` | `<loc>` via `preferredPath()` |
| JSON-LD | `shared/jsonld-graph.mjs` | `pageUrl()` aligned with slash policy |
| Redirects | `public/_redirects` | 200 rewrites for both slash variants; does not strip slashes |
| Prerender | `scripts/prerender-routes.mjs` | Injects canonical, og:url, static links |

**Local spot-check (after build):**

- `dist/about/index.html` — `canonical` and `og:url` = `https://nextcoresoft.com/about/`
- `dist/portfolio/index.html` — `https://nextcoresoft.com/portfolio/`
- `public/sitemap.xml` — **19** `<loc>` entries, all apex HTTPS with trailing slash on non-root paths

---

## C. Sitemap `lastmod`

**Before (finding):** Single build date for every URL on each rebuild.

**Now:** `scripts/generate-sitemap.mjs`:

- Blog posts: `updated`, else `published` from `shared/blog-posts.json`
- Blog index: max of post dates
- Other routes: max mtime of mapped source files under `ROUTE_CONTENT_SOURCES`
- No reliable date → **omit** `<lastmod>` (current build: 19/19 have dates from content/mtimes)

Rebuilding without touching sources does **not** refresh all `lastmod` values to “today.”

---

## D. Documentation

Primary audit docs now state **19 indexable/sitemap URLs**, **7 blog posts**, and **trailing-slash apex canonical** policy. Wording avoids claiming unverified production deploys (“live may lag until owner deploys”).

Remaining doc that correctly says “3 posts” only in the sense of **first MD file** (3 + 4 in batch2 = 7) in `NEXTCORESOFT_AEO_GEO_AUDIT.md` §6.

---

## E. Portfolio (Techwheels)

| Field | Value |
|-------|--------|
| `id` | `techwheels-service-management` — **unchanged** (linked from `service-details.ts` `portfolioIds`) |
| Public `name` | **Dealership Service Management System** — neutral showcase; no NextCoreSoft ownership claim |
| Copy | Still “project showcase,” not a named client case study |

No written third-party rebrand authorization on file; neutral label used per owner approval in chat.

---

## F. Bing Live URL error (`/about/`)

**Not proven in repo:** Which Cloudflare rule blocked a specific Bing fetch.

**Procedure:** `docs/BING-WEBMASTER-FIX.md` — match Bing **Test live URL** timestamp to **Security → Events** for path `/about/`, User-Agent `bingbot`, record Action / Rule ID / Verified Bot. Only treat WAF as root cause if a **Block** aligns in time.

**Not done:** Production WAF edits, broad bot skip rules, or claiming successful Bing crawl/index.

---

## G. www → apex

`public/_redirects` includes host rules for `www` → apex. Prior audit (`docs/HTTPS_CANONICAL_AUDIT.md` §1) recorded **www still serving 200 on www host** in live curl tests — repo rules alone were insufficient.

**Manual (production):** Cloudflare **Redirect Rule** `www.nextcoresoft.com/*` → `https://nextcoresoft.com/$1` (301), then verify:

```powershell
curl.exe -I https://www.nextcoresoft.com/about/
```

Expect single hop to apex HTTPS slash URL. **Not verified in this local-only pass.**

---

## Test results (local)

| Command | Result |
|---------|--------|
| `npm run build` | **Pass** — 7 blog posts compiled; **19** routes in snapshot; sitemap 19 URLs; prerender 18 folders + root; `SEO route HTML verified for 19 paths (sitemap + canonical policy OK)` |
| `npm run lint` (oxlint) | **Pass** — 4 pre-existing warnings (compile script unused params, RichText export, contact.js context); sitemap unused-import warning cleared |

**Not run:** Live Bing/Google indexing, rankings, AI citations, production curl after deploy.

---

## Manual steps still required (owner)

1. **Deploy** latest build to Cloudflare Pages when ready (robots Bing lines, 7 posts, sitemap lastmod, portfolio name, prerender, contact fixes if included).
2. **Cloudflare:** Correlate Bing Live URL failure with Security Events; if verified Bingbot **Block**, apply **narrow** verified-bot skip per `docs/CLOUDFLARE-403-GOOGLEBOT.md` / `docs/BING-WEBMASTER-FIX.md` — not broad WAF off.
3. **www → apex:** Add/verify Cloudflare Redirect Rule; curl-test www URLs.
4. **Bing / Google WMT:** Resubmit sitemap; URL Inspection on `/about/` after edge fix; `npm run indexnow:submit` after deploy (optional acceleration, not guaranteed index).
5. **GSC:** URL Inspection on flagged HTTPS URLs after deploy; see `docs/GSC-PAGE-INDEXING.md`.
6. **Commit/push** when satisfied — **not performed by agent**.

---

## Findings vs uploaded list (closure)

1. **19-URL sitemap, 7 posts, robots, llms, RSS, JSON-LD, prerender** — present; build verifies.
2. **robots.txt** — Googlebot and Bingbot allowed at policy layer in repo.
3. **site-url relative branch** — normalized to slash policy (finding was stale vs current source).
4. **Trailing-slash canonical** — implemented repo-wide.
5. **Stale docs** — corrected in named audit + GSC indexing doc.
6. **Sitemap lastmod** — no longer all-build-date.
7. **_redirects www rules** — in repo; live effectiveness requires production check (G).
8. **Techwheels display name** — neutral replacement; id preserved.
9. **Bing `/about/` error** — investigation guide only; no production WAF change.

---

*End of local audit fix report.*
