# SEO, AEO & GEO — NextCoreSoft

## Rendering note (important)

This site is a **client-rendered SPA** (React + Vite) on Cloudflare Pages. `index.html` includes baseline Organization and WebSite JSON-LD and default meta tags. Per-route titles, descriptions, canonical URLs, and additional JSON-LD are updated in the browser via `applyMeta()` and `JsonLd` when users navigate.

Google generally renders JavaScript, but **crawl and index timing can lag** compared with SSR. This project **prerenders static HTML** per indexable route at build time (`scripts/prerender-routes.mjs`) so each URL has the correct title, description, and canonical before JS runs. Bing and some social crawlers may not execute JS fully. For maximum reliability, consider later: static prerender of key URLs, Cloudflare Workers prerender, or SSR — none of these are required for launch but they improve predictability.

## Google Search Console

1. Add property: **URL prefix** `https://nextcoresoft.com/` (or **Domain** `nextcoresoft.com` with DNS TXT verification).
2. Verify using HTML file upload, DNS TXT, or Google Analytics — follow the in-console instructions.
3. Submit sitemap: **https://nextcoresoft.com/sitemap.xml**
4. Use **URL Inspection** for `/`, `/contact`, and each `/services/*` page → **Request indexing** after deploys (no guarantee of index or rank).
5. Check **Page indexing** report; unknown paths should be **404** + `noindex` (see `docs/GSC-PAGE-INDEXING.md`).
6. Other GSC reports (Video, Sitemaps, CWV, HTTPS, Rich results): `docs/GSC-ALL-REPORTS.md`.
7. Official indexing checklist (URL Inspection 9012289): `docs/GSC-INDEXING-9012289.md`.
8. Performance monitoring (28-day clicks/impressions/queries): `npm run gsc:report` — `docs/GSC-PERFORMANCE.md`.

## Indexable URLs (in sitemap)

- `/`
- `/about`
- `/contact`
- `/services/custom-software`
- `/services/mobile-apps`
- `/services/ai-automation`
- `/services/cloud-api`
- `/privacy`
- `/terms`

Not in sitemap: client-side 404, hash routes (`/#services` are sections on `/`).

## Structured data implemented

| Type | Where |
|------|--------|
| Organization | `index.html` (static) |
| WebSite | `index.html` (static) |
| FAQPage | Homepage (`JsonLd`) |
| Service | Each service page |
| BreadcrumbList | About, Contact, Service pages |

No Review, AggregateRating, LocalBusiness address, VideoObject, or SoftwareApplication (not a downloadable product; no watch-page videos).

## llms.txt

Factual summary for AI crawlers: https://nextcoresoft.com/llms.txt — optional, not a Google ranking requirement.

## Regenerate sitemap

```bash
node scripts/generate-sitemap.mjs
```

Runs automatically before `npm run build`.
