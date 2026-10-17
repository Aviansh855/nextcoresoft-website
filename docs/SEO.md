# SEO, AEO & GEO — NextCoreSoft

## Rendering note (important)

This site is a **client-rendered SPA** (React + Vite) on Cloudflare Pages. `index.html` includes baseline Organization and WebSite JSON-LD. **Per-route `@graph` JSON-LD** is injected at build time into each prerendered `index.html` (`shared/jsonld-graph.mjs` + `scripts/prerender-routes.mjs`). React `RouteJsonLd` keeps the same graph on client navigations. Titles, descriptions, and canonical URLs are updated via `applyMeta()`.

Google generally renders JavaScript, but **crawl and index timing can lag** compared with SSR. This project **prerenders static HTML** per indexable route at build time (`scripts/prerender-routes.mjs`) so each URL has the correct title, description, and canonical before JS runs. Bing and some social crawlers may not execute JS fully. For maximum reliability, consider later: static prerender of key URLs, Cloudflare Workers prerender, or SSR — none of these are required for launch but they improve predictability.

### Build pipeline (`npm run build`)

1. `generate-redirects.mjs` / `generate-sitemap.mjs` from `shared/indexable-paths.mjs`
2. `verify-jsonld-sync.mjs` — `shared/site.json` matches static JSON-LD
3. `sync-index-seo-shell.mjs` — Organization/WebSite JSON-LD + root noscript from `shared/route-meta.mjs`
4. Vite build → `prerender-routes.mjs` → `verify-seo-routes.mjs` (14 URLs, canonical, noscript H1)

Copy and H1 strings: `shared/site.json`, `shared/page-headings.json` (imported by React via `src/data/content.ts`).

**Blog content:** edit `content/nextcoresoft_3_seo_blog_posts.md`, then run `npm run blogs:compile` (or full `npm run build`) to regenerate `shared/blog-posts.json`.

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

Canonical URLs are **HTTPS apex, non-www, no trailing slash** (except homepage `https://nextcoresoft.com/`). The sitemap lists exactly these paths — see `shared/indexable-paths.mjs`.

- `/`
- `/about`
- `/contact`
- `/portfolio`
- `/services` (hub linking to all four service pages)
- `/blog`
- `/blog/{slug}` (one post per entry in `shared/blog-posts.json`)
- `/services/custom-software`
- `/services/mobile-apps`
- `/services/ai-automation`
- `/services/cloud-api`
- `/privacy`
- `/terms`

Not in sitemap: client-side 404, hash routes (`/#services` are sections on `/`).

### Trailing slashes (Cloudflare Pages)

Cloudflare may **308** `/portfolio` → `/portfolio/` when `portfolio/index.html` exists. We **do not** 301-strip slashes in Pages middleware (that caused redirect loops).

SEO-safe behavior:

1. **`public/_redirects`** — both `/path` and `/path/` rewrite with **200** to the same prerendered `index.html`.
2. **Prerender + `applyMeta()`** — each file sets `<link rel="canonical">` and `og:url` to the **non-trailing** URL (e.g. `https://nextcoresoft.com/portfolio`).
3. **Sitemap** — only non-trailing URLs (never `/portfolio/`).
4. **React Router** — client redirect from `/path/` → `/path` for a consistent address bar (optional for crawlers; canonical tag is what Google uses for deduplication).

Internal links and GSC URL Inspection should use the **sitemap** URLs. Rich results are not guaranteed.

## Structured data implemented

| Type | Where |
|------|--------|
| Organization | `index.html` (static, `shared/jsonld-static.mjs`) |
| WebSite | `index.html` (static) |
| Route `@graph` | Prerender + `RouteJsonLd` — `shared/jsonld-graph.mjs` |
| WebPage / AboutPage / ContactPage / CollectionPage | Per route in `@graph` |
| FAQPage | Home, `/services`, `/blog`, each service page, each blog post |
| ProfessionalService + OfferCatalog | Homepage `@graph` |
| BlogPosting | Each blog post `@graph` |
| Service | Each `/services/*` `@graph` |
| BreadcrumbList | All indexable routes (in `@graph`) |

FAQ copy for JSON-LD: `shared/seo-faqs.json` (keep aligned with `src/data/content.ts` and `service-details.ts`).

No Review, AggregateRating, or LocalBusiness street address (no verified public office on site). No guaranteed rankings — SEO improves discoverability over time; map-pack “near me” needs Google Business Profile separately.

## Search intent we target (honestly)

Homepage and service copy mention **custom software development**, **web development**, **mobile app development**, and **AI automation company** in natural language — not keyword stuffing. Blog and `/services` hub support long-tail queries. **#1 on Google is not promised**; continue GSC monitoring with `npm run gsc:report`.

## llms.txt

Factual summary for AI crawlers: https://nextcoresoft.com/llms.txt — optional, not a Google ranking requirement.

## Regenerate sitemap

```bash
node scripts/generate-sitemap.mjs
```

Runs automatically before `npm run build`.
