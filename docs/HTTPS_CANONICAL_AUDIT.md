# HTTPS & Canonical URL Audit — NextCoreSoft (Local)

**Date:** 2026-10-18 (documentation refresh: 2026-10-18 late — URL/blog counts)
**Scope:** Local `nextcoresoft` marketing repo only. No Cloudflare, DNS, certificate, or production changes made by this audit task.
**Preferred URL (decision):** Apex HTTPS + **trailing slash** — `https://nextcoresoft.com/<path>/` (root: `https://nextcoresoft.com/`). This is the final URL the live server actually settles on, so canonical/sitemap/internal links now match it exactly instead of fighting Cloudflare Pages' redirect.

---

## 1. Confirmed live behaviour (read-only, 2026-10-18)

| Request | Chain (observed) | Final |
|---|---|---|
| `http://nextcoresoft.com/portfolio` | 301 → `https://nextcoresoft.com/portfolio`, then 308 → `/portfolio/` | `https://nextcoresoft.com/portfolio/` **200** |
| `https://nextcoresoft.com/portfolio` | 308 → `/portfolio/` | `https://nextcoresoft.com/portfolio/` **200** |
| `https://nextcoresoft.com/portfolio/` | — | **200** (direct) |
| `https://nextcoresoft.com/about`, `/services/ai-automation` | 308 → trailing slash | **200** at slash URL |
| `http://www.nextcoresoft.com/portfolio` | 301 → `https://www.nextcoresoft.com/portfolio`, then 308 → slash | `https://www.nextcoresoft.com/portfolio/` **200 (www host!)** |
| `https://www.nextcoresoft.com/portfolio` | 308 → `/portfolio/` | `https://www.nextcoresoft.com/portfolio/` **200 (www host!)** |

**Findings:**

1. **Trailing-slash 308 is Cloudflare Pages directory behaviour** (`dist/<path>/index.html`). The final served URL always has a trailing slash. Fighting it (301-stripping in middleware) previously caused redirect loops — see comment in `functions/_middleware.js`.
2. **Canonical mismatch (confirmed defect, fixed in repo):** live/prerendered pages had declared `https://nextcoresoft.com/portfolio` (no slash) while the final URL is `…/portfolio/`. Same on all non-root indexable routes (**18** non-root paths at the time of the fix; **19** sitemap URLs today including **7** blog posts).
3. **http → https works:** 301 upgrade on both hosts, plus `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (`public/_headers`, confirmed in live response headers). No evidence of an HTTPS serving failure or certificate problem (TLS handshake + HTTPS 200 via curl; no cert errors observed). **No certificate change is warranted.**
4. **www → apex does NOT happen live (confirmed gap, owner action):** `www` URLs serve 200 on the `www` host after only a scheme upgrade + slash redirect. Host-based lines in `_redirects` were **removed** (Cloudflare Pages does not support them); use **`docs/CLOUDFLARE-WWW-REDIRECT-RULE.md`**. Duplicate www/apex serving dilutes canonical signals even though the canonical tag points to apex.
5. **GSC "Page is not served over HTTPS":** the page fetches over HTTPS 200 with valid HSTS, so this is most consistent with a **stale/unevaluated GSC status or an old http:// URL variant in the index**, not a current serving failure. It is **not claimed fixed** — it must be rechecked in GSC after deploy + recrawl (URL Inspection → Test Live URL on the exact reported URL).

---

## 2. Local implementation before this fix

| Area | File | Before |
|---|---|---|
| Canonical source | `shared/route-meta.mjs` `canonicalUrl()` | `https://nextcoresoft.com<path>` (no slash) |
| Sitemap | `scripts/generate-sitemap.mjs` + `shared/indexable-paths.mjs` | Non-slash `<loc>`s; verify script *forbade* slash URLs |
| JSON-LD URLs | `shared/jsonld-graph.mjs` `pageUrl()` | Non-slash |
| Client meta | `src/lib/seo.ts` `applyMeta()` | Canonical explicitly stripped trailing slash |
| Address bar | `src/components/layout/ScrollToTop.tsx` | Rewrote `/portfolio/` → `/portfolio` client-side |
| Internal links | `NAV_LINKS`, footer, pages/components | Non-slash (`/portfolio`, `/contact?intent=quote`, …) |
| Redirects | `scripts/generate-redirects.mjs` → `public/_redirects` | Both slash variants rewrite 200 to prerendered HTML; www/http host rules present but ineffective live (see §1.4) |
| Prerender | `scripts/prerender-routes.mjs` | Injected canonical/og from `canonicalUrl()` (non-slash) |

**Internal route keys stay non-slash** (`INDEXABLE_PATHS`, `ROUTE_META` keys, React Router paths) — only the *public preferred form* changed, via one helper.

---

## 3. Changes made (local, uncommitted)

| File | Change |
|---|---|
| `shared/indexable-paths.mjs` | Policy comment rewritten; new `preferredPath()` helper (`/` → `/`, else trailing slash) |
| `shared/route-meta.mjs` | `canonicalUrl()` now returns apex HTTPS + trailing slash; noscript links use it |
| `scripts/generate-sitemap.mjs` | `<loc>` built with `preferredPath()` — all **19** sitemap URLs end with `/`; `<lastmod>` from blog dates or content-source mtimes (not build date for every URL) |
| `shared/jsonld-graph.mjs` | `pageUrl()`/`entityBase()` emit trailing-slash URLs; offer/blog `url`s slashed |
| `src/lib/seo.ts` | New `preferredUrl()`; `applyMeta` canonical + `og:url`, `articleSchema`, `serviceSchema`, `webPageSchema`, `breadcrumbSchema`, offer/contact URLs all trailing-slash |
| `src/lib/site-url.ts` | Absolute on-site URLs normalised to preferred slash form |
| `src/components/layout/ScrollToTop.tsx` | No longer rewrites `/path/` → `/path` in the address bar |
| `scripts/prerender-routes.mjs` | Static-fallback nav/blog/service links use canonical (slash) URLs |
| `scripts/verify-seo-routes.mjs` | Now *requires* trailing-slash apex-HTTPS canonicals and sitemap locs (was the opposite) |
| `src/data/content.ts`, `src/components/layout/Footer.tsx`, `Navbar`, home/service/blog/portfolio/contact/legal pages & components | Internal `Link`/`href` targets updated to trailing-slash form, incl. `/contact/?intent=quote`, `/portfolio/#<id>`, dynamic `/services/<slug>/`, `/blog/<slug>/` templates |
| `public/llms.txt` | Page/blog/contact URLs updated to trailing-slash form |
| `docs/SEO.md` | Canonical/sitemap/trailing-slash policy sections updated |
| `public/sitemap.xml`, `public/_redirects`, `index.html`, `dist/**` | Regenerated by `npm run build` |

**Not changed:** `public/_redirects` route rules (no new redirects added, no loop risk introduced), `functions/_middleware.js` (404/noindex logic untouched), certificates, Cloudflare/DNS.

*Contact email in current `shared/site.json`:* `hello@nextcoresoft.com` (Organization JSON-LD and visible contact copy align with this).

---

## 4. Final URL format per route

All **19** indexable routes in `SITEMAP_ENTRIES`: `https://nextcoresoft.com/` (root) and `https://nextcoresoft.com/<path>/` for `/about`, `/contact`, `/portfolio`, `/blog`, **seven** `/blog/<slug>/` posts (see `shared/blog-posts.json`), `/services`, four `/services/<slug>/` pages, `/privacy`, `/terms`. Non-slash variants still resolve (308 → slash at the edge; both rewrite 200 in `_redirects`), but the slash URL is the only one declared in canonical/sitemap/og/JSON-LD/internal links.

## 5. Mixed content

Searched `src/`, `public/`, `shared/`, `index.html` for `http://`: only XML namespace identifiers (`www.w3.org`, sitemap schema) and the intentional `http://…` *source* patterns in `_redirects` host rules. Fonts/CSS/JS/images are HTTPS or relative. Rendered-DOM check on local preview showed only `127.0.0.1` asset URLs (preview itself is http) — production serves the same relative assets over HTTPS. **No mixed-content resources found.**

## 6. Test results

| Check | Result |
|---|---|
| `npm run build` (incl. `tsc -b`, prerender, `verify-seo-routes`) | ✅ Pass — "SEO route HTML verified for **19** paths (sitemap + canonical policy OK)" |
| `npm run lint` (oxlint) | ✅ Pass — only pre-existing warnings (unused vars, RichText export) |
| `dist/portfolio/index.html` | canonical + og:url = `https://nextcoresoft.com/portfolio/`, title `Project Portfolio \| NextCoreSoft` |
| `dist/about`, `dist/services/ai-automation`, `dist/blog/mvp-vs-full-product`, `dist/index.html` | canonical/og all apex-HTTPS trailing-slash; titles unchanged |
| `public/sitemap.xml` | **19** `<loc>`s, all `https://nextcoresoft.com/…/` (7 blog posts + 12 other indexable routes) |
| Preview (`127.0.0.1:4173`) `/portfolio/` | Renders, URL keeps trailing slash, H1 correct, rendered canonical/og = `https://nextcoresoft.com/portfolio/` |
| Live redirect traces (curl, read-only) | Recorded in §1 — no production behaviour changed by this task |

## 7. Remaining manual checks (owner, after deploy)

1. **GSC:** URL Inspection on the exact URL GSC flagged → Test Live URL → confirm "Page is served over HTTPS"; request recrawl. Do not consider the HTTPS warning resolved until GSC re-evaluates.
2. **www → apex:** Cloudflare Dashboard → Rules → Redirect Rules: add single redirect `www.nextcoresoft.com/*` → `https://nextcoresoft.com/$1` (301), or attach www as a redirect-only host. Verify with `curl -I https://www.nextcoresoft.com/portfolio`. The repo `_redirects` host lines alone demonstrably do not do this today.
3. **GSC sitemap:** resubmit `sitemap.xml` after deploy (URLs changed to slash form).
4. **Spot-check live:** `curl -I` on `/portfolio`, `/about`, one blog post — expect 308 → slash 200, and view-source canonical matching the slash URL.
5. **Cloudflare 403 history:** if GSC sitemap fetch still 403s, follow `docs/CLOUDFLARE-403-GOOGLEBOT.md` (verified-bot rule) — unrelated to this change but blocks recrawl.

---

*No guaranteed indexing/ranking outcome is claimed. Canonical alignment removes a conflicting signal; Google may still take time to recrawl and re-select canonicals.*
