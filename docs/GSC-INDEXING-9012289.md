# Google URL Inspection & indexing — official checklist (9012289)

Based on [Google’s URL Inspection documentation](https://support.google.com/webmasters/answer/9012289).  
**“URL is available to Google” in a live test does not guarantee indexing** — quality, duplicates, manual actions, and legal blocks are decided later.

## Live test must pass (your site)

| Inspection field | Requirement | nextcoresoft.com |
|------------------|-------------|------------------|
| **Crawl allowed?** | `robots.txt` must not block | `public/robots.txt` — Allow `/`, Googlebot allowed |
| **Page fetch** | HTTP 200, no 403/5xx | Fix Cloudflare WAF for Googlebot if 403 (`CLOUDFLARE-403-GOOGLEBOT.md`) |
| **Indexing allowed?** | No `noindex` on indexable URLs | `index, follow` + `googlebot` meta; 404 URLs `noindex` |
| **Login / firewall** | Public, no auth | Public marketing site |
| **SSL** | Valid HTTPS certificate | Host/CDN responsibility |
| **User-declared canonical** | `<link rel="canonical">` | `index.html` + per-route `applyMeta()` + **prerender HTML** per route |
| **Soft 404** | Real 404 for missing URLs | `functions/_middleware.js` / `middleware.js` |
| **JavaScript** | Renderable content | React SPA; static route HTML + `noscript` links on `/` |

## Discovery (so Google finds URLs)

| Method | Implementation |
|--------|----------------|
| **Sitemap** | `https://nextcoresoft.com/sitemap.xml` — submit in GSC; line in `robots.txt` |
| **Internal links** | Footer + homepage sections → all services, about, contact, legal |
| **Referring page** | GSC may show homepage or external links — not controlled in code |

## Indexed URL data (not live test)

| Field | Notes |
|-------|--------|
| **Google-selected canonical** | Apex HTTPS, non-www — www 301 in `_redirects` |
| **Sitemaps row in inspection** | May show “No referring sitemap” briefly; submit sitemap in GSC |
| **Enhancements** | FAQ, Breadcrumbs, Service, WebPage JSON-LD |

## What code cannot do (you in GSC)

- **Request indexing** — URL Inspection → Test live URL → Request indexing (daily limit).
- **Validate fix** — Page indexing / Rich results after deploy.
- **Verify property** — GSC ownership; optional `VITE_GSC_SITE_VERIFICATION` in `.env` for HTML tag method.
- **Quality / spam / manual actions** — content and policy, not tags.
- **Guarantee rank or index** — Google decision.

## Build pipeline (SEO)

```bash
npm run build
```

1. `generate-sitemap.mjs` → `public/sitemap.xml`
2. Vite → `dist/index.html` + assets
3. `prerender-routes.mjs` → `dist/about/index.html`, `dist/services/.../index.html`, etc. (correct title/canonical **before JS**)

## After deploy — “Will I be indexed?” workflow

1. Cloudflare: Googlebot can fetch `/` and `/sitemap.xml` (no 403).
2. GSC property: `https://nextcoresoft.com/`
3. Sitemaps: add `sitemap.xml` → **Success**
4. URL Inspection: `https://nextcoresoft.com/` → **Test live URL** → expect **URL is available to Google**
5. **Request indexing** for `/`, `/contact`, one service URL
6. Wait days; check **Page indexing** — fix **Website** issues
7. Search Google for `site:nextcoresoft.com` to confirm appearance

## Related docs

- `GSC-URL-INSPECTION.md` — tool usage
- `GSC-PAGE-INDEXING.md` — coverage errors
- `GSC-ALL-REPORTS.md` — Video, CWV, HTTPS, etc.
- `SEO.md` — structured data list
