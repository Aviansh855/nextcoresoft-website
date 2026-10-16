# Search Console reports — nextcoresoft.com

Quick map: **what Google shows**, **what this site does**, **what you do in GSC**.

---

## Video indexing report

**This site has no `<video>`, YouTube embeds, or `VideoObject` schema.** The 3D hero is WebGL (not a video). Google will usually **not list pages** in the Video indexing report — that is normal, not an error.

| Google requirement | This project |
|--------------------|--------------|
| Watch page (one main video per page) | N/A — no watch pages |
| Video structured data / sitemap video tags | **Not added** (would cause errors if faked) |
| Thumbnail, contentURL, embedURL | N/A |

**URL Inspection:** On `/` or `/contact`, the **Video indexing** section will **not appear** — expected.

**If you add marketing videos later** (one dedicated page per video):

1. Create a **watch page** whose main content is that single video (not a blog with a small embed).
2. Use `<video>` or a crawlable embed; avoid “click image to play” only.
3. Add `VideoObject` JSON-LD (`name`, `description`, `thumbnailUrl`, `contentUrl` or `embedUrl`) — same URLs in HTML and schema.
4. Optional: video entries in sitemap (`video:video` tags) — only then run a **video sitemap**; keep page URLs in the main sitemap too.
5. Thumbnail: JPG/PNG, ≥160×120, not transparent, not blocked by robots.txt.
6. GSC → Video indexing → fix issues → **Validate fix**.

**Do not** add video sitemap tags today — Google would report missing title/thumbnail errors.

---

## Sitemaps report

| Item | Value |
|------|--------|
| Submit in GSC | `https://nextcoresoft.com/sitemap.xml` only |
| Property | URL prefix `https://nextcoresoft.com/` (not `www`, not homepage URL) |
| Discovery | `Sitemap:` line in `public/robots.txt` |
| URLs | 9 pages — see `shared/indexable-paths.mjs` |
| Format | Standard urlset, W3C `lastmod` date, HTTPS apex URLs |
| Video/news/image tags | None (correct for this site) |

**Common mistakes (avoid):**

- Submitting `https://nextcoresoft.com/` or `https://www.nextcoresoft.com/` as a sitemap → **Could not fetch** / wrong type.
- www URLs inside sitemap while property is apex → **URL not allowed** / path mismatch.

**If status is “Could not fetch” (403):** Cloudflare WAF blocking Googlebot — `docs/CLOUDFLARE-403-GOOGLEBOT.md`.

**After fix:** Sitemaps → open sitemap → **View index coverage** → filter by this sitemap in **Page indexing**.

**Parsed videos in sitemap report:** Will be **0** — expected.

---

## Page indexing & URL Inspection

See `GSC-PAGE-INDEXING.md` and `GSC-URL-INSPECTION.md`.

---

## Rich results (Enhancements)

Structured data in code:

| Type | Where | GSC report (if detected) |
|------|--------|---------------------------|
| Organization | `index.html` | May appear under various types |
| WebSite | `index.html` | — |
| FAQPage | Home (`JsonLd`) | FAQ / Q&A style |
| Service | Service pages | Depends on Google |
| BreadcrumbList | About, Contact, Services | **Breadcrumbs** |

**Not used (on purpose):** Review, AggregateRating, Product, Video, LocalBusiness address, AMP.

**Check:** [Rich Results Test](https://search.google.com/test/rich-results) on live URLs after deploy. GSC → **Enhancements** → fix **critical** issues → **Validate**.

---

## Core Web Vitals

Report uses **real user (CrUX)** data. New/small sites often show **“No data available”** until enough traffic exists.

**Already in the app:**

- Lazy-loaded Three.js hero (`HeroVisual.tsx`) — skipped on mobile, reduced motion, save-data, no WebGL.
- Code-split vendor chunk (`vite.config.ts`).
- `display=swap` on Google Fonts in `index.html`.

**You monitor:** GSC → **Experience** → Core Web Vitals (mobile first). For a single URL before CrUX exists: [PageSpeed Insights](https://pagespeed.web.dev/).

**Heavy by design:** Desktop homepage 3D scene — can affect LCP on desktop; mobile uses CSS fallback.

---

## HTTPS report

**Target:** Zero HTTP URLs indexed; canonical HTTPS apex.

**Site:**

- All links/canonicals use `https://nextcoresoft.com`.
- `public/_redirects` + `vercel.json`: HTTP and `www` → HTTPS apex.
- `Strict-Transport-Security` in `public/_headers` (after deploy).

**GSC:** Domain property or HTTPS URL prefix; fix any “HTTP marked canonical” or “sitemap redirects to HTTP” (should not apply if sitemap is HTTPS).

---

## AMP

**Not used.** No AMP pages — ignore AMP report and AMP Test unless you add AMP later.

---

## URL removal tool

**Not in code.** GSC → **Removals** only when you must **temporarily** hide a URL (≈6 months). For permanent removal: **404/410**, or **noindex**, or delete content — do **not** rely on robots.txt alone for de-indexing.

404 pages on this site: real **404** status + **noindex** (middleware + meta).

---

## Manual actions, Security, Performance, Links

| Report | Action |
|--------|--------|
| Manual actions | Fix site → Request review in GSC |
| Security issues | Fix malware/hacks → Request review |
| Performance | Queries/clicks — content & SEO |
| Links | External links to your site — optional review |

---

## Checklist after each deploy

1. Cloudflare: Googlebot + `/sitemap.xml` not 403.
2. GSC Sitemaps: **Success** on `sitemap.xml`.
3. URL Inspection: `/` live test → Request indexing if clean.
4. Page indexing: **Website**-source issues → fix → Validate.
5. Rich Results Test on `/` and one `/services/*` URL.
6. (Optional) `curl -I` unknown URL → **404**.
