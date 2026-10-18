# Google Search Console — Page indexing & reports (this site)

How **nextcoresoft.com** aligns with Google’s Page indexing report, URL Inspection, sitemaps, and common statuses.

## What the codebase controls

| GSC topic | Implementation |
|-----------|----------------|
| **Indexed URLs only in sitemap** | `shared/indexable-paths.mjs` → `scripts/generate-sitemap.mjs` → `public/sitemap.xml` (**19** URLs, 7 blog posts) |
| **robots.txt allows crawl** | `public/robots.txt` — `Allow: /`, `Sitemap:` line |
| **noindex on errors** | `NotFoundPage` + `applyMeta({ robots: "noindex, follow" })`; invalid `/services/:slug` keeps URL, shows 404 UI |
| **Soft 404 (HTTP 200 + “not found”)** | `functions/_middleware.js` (Cloudflare Pages) and `middleware.js` (Vercel) return **HTTP 404** + `X-Robots-Tag: noindex` for paths not in `INDEXABLE_PATHS` |
| **Trailing slash on Cloudflare Pages** | `_redirects` serves both `/path` and `/path/` as 200 → same prerendered HTML; do not 301-strip slashes in Pages middleware (308↔301 loop with directory `index.html`) |
| **www duplicate** | **Not fixed in `_redirects`** — use Cloudflare Redirect Rule: `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md` |
| **User canonical** | `<link rel="canonical">` via `applyMeta()` — HTTPS apex, **trailing slash** on non-root routes (`preferredPath()` / `docs/SEO.md`) |
| **403 Googlebot** | Not fixable in repo — Cloudflare WAF; see `CLOUDFLARE-403-GOOGLEBOT.md` |
| **Structured data / rich results** | Org, WebSite, FAQPage, Service, BreadcrumbList — check **Rich results** in GSC after deploy |
| **Core Web Vitals** | App performance (Vite bundle); monitor in GSC after traffic |

## GSC reports you use (not in code)

| Report | Your action |
|--------|-------------|
| **Overview** | Watch manual actions, security, indexing summary, clicks drop |
| **Performance** | Queries, pages, countries — content/SEO decisions |
| **URL Inspection** | Live test → fix → **Request indexing** (see `GSC-URL-INSPECTION.md`) |
| **Page indexing** | Fix rows where **Source = Website**; validate fixes after deploy |
| **Sitemaps** | Submit only `https://nextcoresoft.com/sitemap.xml` on property `https://nextcoresoft.com/` |
| **Settings → robots.txt** | Should match live `robots.txt` |
| **Manual actions / Security** | Fix on site + request review in GSC |

## Common “Not indexed” reasons → this site

| Reason | Expected here |
|--------|----------------|
| **Soft 404** | Fixed with real **404** status for unknown paths (after deploy + middleware active) |
| **Not found (404)** | Old/dead links; no action unless you had a real page — optional 301 if you moved content |
| **Blocked by robots.txt** | Should not happen for indexable pages |
| **noindex** | Only 404/unknown URLs (intentional) |
| **Duplicate / alternate with proper canonical** | OK for `/privacy`, `/terms`; www should 301 to apex |
| **Crawled – currently not indexed** | Normal for new/small sites; improve content + internal links; request indexing for key URLs |
| **Discovered – currently not indexed** | Wait or request indexing; ensure sitemap + internal links |
| **403** | Cloudflare — allow verified Googlebot |
| **Redirect page** | Use only www→apex; no redirect chains on content URLs |

## After deploy checklist

1. Cloudflare WAF exception for Googlebot + `/sitemap.xml` (if still 403).
2. GSC **Sitemaps** → `sitemap.xml` status **Success**.
3. URL Inspection: `/`, `/contact`, one `/services/*` → **Test live URL** → **Request indexing**.
4. **Page indexing** → open **Why pages aren’t indexed** → fix any **Website** issues → **Validate fix** when clean.
5. **Settings → robots.txt** → test fetch.

## Adding a new public page

1. Add route in `App.tsx`.
2. Add path to `shared/indexable-paths.mjs` (`INDEXABLE_PATHS` + `SITEMAP_ENTRIES`).
3. Add `ROUTE_SEO` (or service meta) in `src/lib/seo.ts`.
4. Run `npm run build` (regenerates sitemap).
5. Request indexing for the new URL in GSC.
