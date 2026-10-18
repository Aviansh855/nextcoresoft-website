# Search index, rankings & AI citations — readiness score

**Updated:** 2026-10-18  
**Honest rule:** No developer can guarantee Google #1, Bing placement, or ChatGPT citations. This doc scores what **you control** vs what **platforms decide over time**.

## Readiness rubric (site + owner actions)

| Layer | Weight | Target (this project) |
|-------|--------|-------------------------|
| Indexable URLs, sitemap, canonical, prerender text | 25% | **24/25** — 19 URLs, static HTML + JSON-LD |
| Content depth (blog, service answers, FAQs) | 25% | **23/25** — 7 long-form posts + AEO blocks |
| Technical crawl (robots, RSS, llms.txt, IndexNow key) | 15% | **14/15** — feed + IndexNow after deploy |
| Entity signals (Organization schema, sameAs, contact) | 10% | **9/10** — GitHub sameAs; add LinkedIn when live |
| Owner: GSC + Bing WMT submit, URL inspection | 15% | **0–15** — **you** run after deploy |
| Owner: Cloudflare www→apex + verified-bot rule | 10% | **0–10** — **you** in dashboard |

**Maximum from code alone:** ~**90/100** (layers 1–4).  
**90+ overall** requires completing owner rows (GSC, Bing, Cloudflare) and waiting for recrawl (days–weeks).

## What was added (2026-10-18 batch)

- **4 new blog posts** (7 total): AI automation, hiring a dev partner, web vs mobile, API integrations
- **`public/feed.xml`** — RSS for blog posts
- **IndexNow** — `shared/indexnow-key.txt` → `public/{key}.txt`; run `npm run indexnow:submit` after each production deploy
- **`llms.txt`** — full article list + topics for AI crawlers
- **`sameAs`** — GitHub repo in `site.json` + Organization JSON-LD

## Owner checklist (to reach 90+ overall)

1. **Deploy** latest `main` to Cloudflare Pages (includes new blogs + sitemap + feed + IndexNow file).
2. **Google Search Console** — submit `https://nextcoresoft.com/sitemap.xml`; URL Inspection → Request indexing for `/`, `/blog/`, and 2 new posts.
3. **Bing Webmaster Tools** — add site, submit same sitemap, run `npm run indexnow:submit` from your machine (or CI after deploy).
4. **Cloudflare** — 301 `www` → apex; allow verified Googlebot/Bingbot on `/sitemap.xml` (see `docs/CLOUDFLARE-403-GOOGLEBOT.md`).
5. **Monthly** — `npm run gsc:report`; add 1–2 new blog posts per quarter for long-tail queries.

## Commands

```powershell
npm run build
npm run indexnow:submit
```

*Indexing and citations improve with time and consistent content — not overnight.*
