# Bing Webmaster / SEO — local fix report

**Date:** 2026-10-18  
**Scope:** Local repository only. **No deploy, push, commit, or Cloudflare dashboard changes** by the agent.

---

## 1. Sitemap `lastmod` (`scripts/generate-sitemap.mjs`)

**Requirement:** Genuine modification dates; omit unverified values; not build date for every URL on rebuild.

**Implementation (verified in source):**

- Blog posts: `updated`, else `published` from `shared/blog-posts.json`
- `/blog` index: maximum of post dates
- Other routes: latest filesystem mtime among `ROUTE_CONTENT_SOURCES` mapped files
- No date → `<lastmod>` omitted (current build: **19/19** URLs have dates from content/mtimes)

**Sample from `public/sitemap.xml` after build:** blog posts include both `2026-10-17` and `2026-10-18` (not a single uniform build stamp for all entries).

---

## 2. `_redirects` and `functions/_middleware.js`

**Finding:** Absolute-URL host rules in `_redirects` do **not** implement www→apex on Cloudflare Pages (path patterns only). Pages Functions middleware does not perform host redirects.

**Changes:**

- Removed misleading host redirect lines from `scripts/generate-redirects.mjs` output; added comments pointing to manual setup.
- Regenerated `public/_redirects` (path 200 rewrites + SPA fallback only).
- Documented exact dashboard rule: **`docs/CLOUDFLARE-WWW-REDIRECT-RULE.md`**
- Clarified in `functions/_middleware.js` header comment.

**Manual Redirect Rule (summary):**

- Filter: `(http.host eq "www.nextcoresoft.com")`
- Redirect: `https://nextcoresoft.com` + request path, query preserved, **301**
- Full steps: `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md`

**Out of scope fix (reported):** `docs/GSC-PAGE-INDEXING.md` — corrected row that claimed `_redirects` performs www→apex.

---

## 3. `public/llms.txt`

Replaced “cite these URLs when answering…” with neutral **Article directory** wording; kept accurate service/page links and disclaimers.

---

## 4. `src/lib/site-url.ts`

Relative `/path`, same-domain absolute URLs, and localhost dev URLs use `preferredPathname()` (trailing slash on page routes; `/` and extension paths unchanged). Query and hash preserved via `URL` parsing.

---

## 5. Nineteen sitemap entries vs Search Console “15 discovered”

| Source | Count | Notes |
|--------|-------|--------|
| `INDEXABLE_PATHS` / `SITEMAP_ENTRIES` | **19** | Single source: `shared/indexable-paths.mjs` + blog index |
| `verify-seo-routes.mjs` | **19** | Sitemap locs, prerender HTML, canonical, title, description, H1, JSON-LD |
| Prior sitemap (3 blog posts) | **15** | 12 non-blog routes + blog index + 3 posts |
| Current sitemap (7 blog posts) | **19** | +4 blog URLs since batch2 MD |

**GSC “15 discovered pages”** is consistent with an **older deployed sitemap** or crawl snapshot (15 URL era), **not** proof that Google rejected four URLs. After deploy, resubmit `https://nextcoresoft.com/sitemap.xml` and use URL Inspection per URL — **indexing is not guaranteed**.

**Alignment checks (local, all pass via build):**

- Every `SITEMAP_ENTRIES.loc` ∈ `INDEXABLE_PATHS`
- Every indexable path has `dist/.../index.html` (or root)
- `public/sitemap.xml`: 19 `<loc>` with trailing-slash apex HTTPS
- React routes: `src/routes/appRoutes.tsx` (+ slash aliases) cover same paths

---

## 6. robots.txt, IndexNow, Bingbot, prerender, structured data

| Item | Status (repo) |
|------|----------------|
| `public/robots.txt` | `Allow: /` for `*`, `Googlebot`, `Bingbot`, `msnbot`; `Sitemap:` line |
| IndexNow | `scripts/sync-indexnow-key.mjs` → `public/{32-hex}.txt` from `shared/indexnow-key.txt` (build OK) |
| Bing meta | `bingbot` meta injected in `scripts/prerender-routes.mjs` |
| Prerender | H1 + `#static-prerender`; full blog body on posts |
| JSON-LD | `#jsonld-route-graph`; BlogPosting on posts; FAQPage on `/`; verified by `verify-seo-routes.mjs` |
| RSS | `public/feed.xml` — 7 items |

Per-route checks in `verify-seo-routes.mjs`: `<title>`, meta description snippet, `rel="canonical"`, `og:url`, static H1 vs `ROUTE_META`.

---

## 7. Bing Live URL errors — no invented cause

Procedure only (requires your Cloudflare login):

1. Note **exact time** of Bing **Test live URL** for e.g. `https://nextcoresoft.com/about/`.
2. Cloudflare **Security → Events**, window ±5 min, filter path `/about`, UA `bingbot`.
3. Record **Action**, **Verified Bot**, **Rule ID** for the matching row.
4. Treat WAF as cause **only** if **Block** aligns with that timestamp; **Allow** / no event → do not blame WAF without evidence.

Full text: **`docs/BING-WEBMASTER-FIX.md`** (correlation section).

---

## 8. Test results

| Command | Result |
|---------|--------|
| `npm run build` | **Pass** — 7 posts; 19 routes; sitemap 19 URLs; IndexNow key; **SEO route HTML verified for 19 paths** |
| `npm run lint` | **Pass** — 4 pre-existing warnings (compile script, contact.js, RichText) |

**Not claimed:** Bing indexing, Google indexing, rankings, or AI citations.

---

## Files changed (this task)

| File | Change |
|------|--------|
| `scripts/generate-redirects.mjs` | Remove invalid host rules; document manual www rule |
| `public/_redirects` | Regenerated (path rewrites only) |
| `functions/_middleware.js` | Comment: no host redirects |
| `public/llms.txt` | Neutral article directory |
| `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md` | **New** — exact Redirect Rule steps |
| `docs/GSC-PAGE-INDEXING.md` | www row → points to Redirect Rule doc |
| `docs/BING-WEBMASTER-LOCAL-FIX-REPORT.md` | **New** — this report |

**Unchanged (already compliant):** `scripts/generate-sitemap.mjs` (content-based lastmod), `src/lib/site-url.ts` (slash policy).

**Build artifacts (local, uncommitted):** `public/sitemap.xml`, `dist/**`, `public/feed.xml`, IndexNow key file, etc.

---

## Owner manual steps

1. Cloudflare **Redirect Rule** per `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md`; verify with `curl -I` on www URL.
2. Deploy latest build; Bing/GSC sitemap resubmit.
3. Correlate Bing Live URL failures with Security Events before WAF changes.
4. Optional: `npm run indexnow:submit` after deploy (not a guarantee of crawl/index).

---

*End of report.*
