# Google URL Inspection — what this site supports

| GSC requirement | In this project |
|-----------------|-----------------|
| URL in your property | Add `https://nextcoresoft.com/` in GSC (your step) |
| Crawl allowed (robots.txt) | `public/robots.txt` — `Allow: /`, `Googlebot` allowed, `Sitemap:` line |
| Not blocked by noindex (indexable pages) | `index, follow` in `index.html` + `applyMeta()` per route |
| 404 / unknown URLs | `noindex, follow` + real path in `NotFoundPage.tsx` |
| Canonical URLs | `applyMeta()` updates `<link rel="canonical">` (HTTPS, non-www) |
| Title & description | `ROUTE_SEO` + service meta in `src/lib/seo.ts` |
| Structured data | Org + WebSite in `index.html`; FAQ / Service / Breadcrumbs via `JsonLd` |
| Sitemap with lastmod | `scripts/generate-sitemap.mjs` on `npm run build` |
| Real 404 (not soft 404) | `functions/_middleware.js` / `middleware.js` + `shared/indexable-paths.mjs` |
| Live test fetch (no login) | Public site; **Cloudflare WAF must not 403 Googlebot** — see `CLOUDFLARE-403-GOOGLEBOT.md` |
| JavaScript rendering | React SPA; Google-InspectionTool runs JS — allow JS/CSS/fonts in firewall |
| Request indexing | GSC button after **Test live URL** succeeds (manual) |

**Not in code (GSC / Google side):** manual actions, security issues, legal removals, quality ranking, guaranteed index.

## URLs to test live (in order)

1. `https://nextcoresoft.com/`
2. `https://nextcoresoft.com/contact`
3. `https://nextcoresoft.com/services/custom-software`

Use **Test live URL** → then **Request indexing** (homepage first). Do not request indexing for `sitemap.xml` as a page.
