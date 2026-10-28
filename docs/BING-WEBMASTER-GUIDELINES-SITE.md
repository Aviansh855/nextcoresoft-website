# Bing Webmaster Guidelines — how this site complies

Based on [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmasters-guidelines-30fbc237) and Bing sitemap/IndexNow documentation.

| Bing requirement | This site |
|------------------|-----------|
| Public, crawlable URLs | `robots.txt` allows `*` and `Bingbot`; indexable routes return **200** with prerender HTML |
| Accurate sitemap | `https://nextcoresoft.com/sitemap.xml` in robots; **28** canonical URLs; **`lastmod` from content dates** (not “build time only”) |
| IndexNow after changes | `public/{key}.txt` + `npm run indexnow:submit`; auto on Cloudflare Pages via `maybe-submit-indexnow.mjs` |
| Unique title & meta description per URL | `ROUTE_META` + blog posts; build fails if description ∉ **25–160** chars (`verify-meta-description-length.mjs`) |
| Canonical URLs | Apex HTTPS + trailing slash; www/non-slash **301** to canonical |
| Content without requiring JS | `#static-prerender` in every prerendered `index.html` + full HTML site map list |
| RSS for discovery | `/feed.xml` linked in `index.html` and prerender head |
| No crawl blocks on sitemap/feed | `_headers` sets correct types; do not block `/sitemap.xml` in Cloudflare WAF |

## If Bing shows “Discovered but not crawled”

1. **Live URL** in Bing must succeed (not only “Bing Index” history from an old failed fetch).
2. **Cloudflare:** allow **verified** Bingbot — `docs/BING-WEBMASTER-FIX.md`.
3. Submit **`https://nextcoresoft.com/sitemap.xml`** on property **`https://nextcoresoft.com/`**.
4. **Request indexing** per URL after Live URL is green.
5. Queue delay is normal for new sites; IndexNow + internal HTML links speed discovery.

No ranking or index guarantee.
