# SEO / GEO / AEO — regular updates (NextCoreSoft)

**Hindi summary:** Har deploy ke baad GSC/Bing par “Test live URL” karo. Har hafte Performance → Queries dekho. Is repo mein `npm run seo:check` chalao — meta, JSON-LD, aur `llms.txt` sync ho jata hai. Naye search queries aaye to `shared/seo-query-topics.mjs` update karo, phir `npm run build` + push.

## Generative AI tab in GSC shows 0?

That is **normal** until Google shows your links inside **AI Overviews / AI Mode**. Read **`docs/GSC-GENERATIVE-AI-ZERO.md`** and set **Settings → Search generative AI → Include**. Run `npm run gsc:gen-ai-check`.

## Weekly (~10 minutes)

| Step | Command / action |
|------|------------------|
| Automated checks | `npm run seo:check` |
| Generative AI readiness | `npm run gsc:gen-ai-check` |
| GSC Performance | `npm run gsc:report` **or** Search Console → Performance → Queries & Pages |
| New blog or meta change? | `npm run build` → push `main` → Cloudflare deploy Success |
| After deploy | URL Inspection on changed URLs → **Request indexing** (Google + Bing) |

## After every content or meta change

1. Edit source (e.g. `content/*.md`, `shared/route-meta.mjs`, `shared/seo-faqs.json`).
2. `npm run build` (runs sitemap, feed, `llms.txt` sync, meta length gate, prerender, IndexNow on CF).
3. Push to GitHub → confirm Cloudflare Pages deployment.
4. Resubmit sitemap if many URLs changed: `https://nextcoresoft.com/sitemap.xml`.

## Monthly

1. Export or note **top 10 GSC queries** (impressions / CTR).
2. Update `shared/seo-query-topics.mjs` and, if needed, FAQs in `shared/seo-faqs.json` + `src/data/content.ts`.
3. Add a dated note in `docs/GSC-QUERY-ACTION-YYYY-MM-DD.md` (copy from latest example).
4. Bing Webmaster: check **SEO reports** (meta description length should stay green if build passes).
5. Optional: refresh directory listings using `docs/STARTUP-LISTING-PACK.md` and log in `docs/marketing/submissions-log.md`.

## Files that stay in sync automatically on build

| Output | Generator |
|--------|-----------|
| `public/sitemap.xml` | `scripts/generate-sitemap.mjs` |
| `public/feed.xml` | `scripts/generate-feed.mjs` |
| `public/llms.txt` | `scripts/sync-llms-txt.mjs` |
| Prerender HTML + JSON-LD | `scripts/prerender-routes.mjs` |
| IndexNow ping (production) | `scripts/maybe-submit-indexnow.mjs` when `CF_PAGES=1` |

## GEO / AI discovery (optional, not a Google ranking requirement)

- `https://nextcoresoft.com/llms.txt` — first-party summary for AI crawlers
- `robots.txt` — comments point to llms, RSS, IndexNow key
- FAQPage JSON-LD on home, services, blog — keep aligned with visible FAQ text

## Startup / directory listings

Use copy from `shared/marketing-listing.json` and `docs/STARTUP-LISTING-PACK.md`.  
Reference list (local clone, not deployed): `_PlacesToPostYourStartup/README.md`.

## When something breaks

| Symptom | Doc |
|---------|-----|
| Bing/Google Live URL fails | `docs/BING-WEBMASTER-FIX.md`, `docs/CLOUDFLARE-403-GOOGLEBOT.md` |
| Canonical / redirect issues | `docs/GSC-PAGE-INDEXING.md`, `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md` |
| Zero clicks, some impressions | `docs/GSC-PERFORMANCE.md`, latest `docs/GSC-QUERY-ACTION-*.md` |
