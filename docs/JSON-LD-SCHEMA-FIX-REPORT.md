# JSON-LD schema fix report

**Date:** 2026-10-21  
**Context:** Schema Markup Validator reported **0 errors, 13 warnings** on production homepage-style graph (Organization + ProfessionalService + OfferCatalog pattern).

Fixing schema warnings does **not** guarantee higher rankings or rich-result eligibility.

---

## Where schema is created

| Entity | Primary source | Also emitted |
|--------|----------------|--------------|
| **Organization** | `shared/jsonld-static.mjs` → `organizationJsonLd()` | Synced into `index.html` via `scripts/sync-index-seo-shell.mjs`; mirrored in `src/lib/seo.ts` `organizationSchema()` for sync checks only |
| **WebSite** | `shared/jsonld-static.mjs` → `websiteJsonLd()` | `index.html` static block |
| **ProfessionalService** | `shared/jsonld-graph.mjs` → `professionalServiceNode()` | Homepage `@graph` only (prerender + `RouteJsonLd`) |
| **OfferCatalog + Service** | `shared/jsonld-graph.mjs` | Homepage `@graph`; per-route **Service** on each `/services/*` page |
| **Route @graph** | `buildRouteJsonLdGraph()` in `shared/jsonld-graph.mjs` | `shared/jsonld-by-route.mjs` → `scripts/prerender-routes.mjs`; client `src/lib/route-jsonld.ts` |

**Single Organization `@id`:** `https://nextcoresoft.com/#organization` (constant `ORG_ID` in `jsonld-graph.mjs` / `jsonld-static.mjs`).

---

## Before (validator-oriented issues)

Homepage route graph previously included:

1. **ProfessionalService** with **`serviceType`** array (often flagged on that type).
2. **`hasOfferCatalog`** embedding a full **OfferCatalog** with **`Offer`** items using invalid **`position`** (position belongs on **ListItem**, not **Offer**).
3. **Nested full `Service` objects** inside each Offer (`itemOffered`) — duplicated service definitions vs standalone service pages.
4. **BlogPosting** **`author` / `publisher`** as inline **Organization** objects (duplicate Organization alongside `index.html` Organization block).

Static **Organization** + **WebSite** in `index.html` were already correct and unchanged in role.

---

## After (local build / `dist/index.html`)

Homepage prerender now has **3** JSON-LD scripts:

1. Organization (static shell)
2. WebSite (static shell)
3. `@graph` with: BreadcrumbList, WebPage, FAQPage, **ProfessionalService**, **OfferCatalog**, **4× Service**

Checks on built homepage:

| Check | Result |
|-------|--------|
| `ProfessionalService.serviceType` | **Absent** |
| `Offer` nodes in `@graph` | **0** |
| `OfferCatalog.itemListElement` | **ListItem** with `position` + `item: { "@id": …#service }` |
| `ProfessionalService.hasOfferCatalog` | **`{ "@id": "https://nextcoresoft.com/#offer-catalog" }`** (no nested duplicate catalog) |
| Service offerings | **4** nodes with `serviceType`, `provider: { "@id": ORG_ID }`, stable `@id` `…/services/{slug}/#service` |
| Organization in `@graph` | **0** (blog posts use `author`/`publisher` **@id** refs only) |

Service page example (`dist/services/custom-software/index.html`): one **Service** node with `serviceType`, `@id`, `provider` → Organization.

---

## Files changed

| File | Change |
|------|--------|
| `shared/jsonld-graph.mjs` | Refactored ProfessionalService, OfferCatalog, Service nodes; blog @id refs |
| `src/lib/seo.ts` | Aligned legacy helpers (`professionalServiceSchema`, `offerCatalogSchema`, `serviceSchema`, `articleSchema`) |
| `scripts/verify-seo-routes.mjs` | Homepage graph assertions (no ProfessionalService `serviceType`, no Offer, catalog by @id) |

**Not changed:** Page copy, CSS, routing, titles/canonicals beyond JSON-LD graph content.

---

## Validation

| Step | Result |
|------|--------|
| `npm run build` | **Pass** — includes `verify-jsonld-sync.mjs` + `verify-seo-routes.mjs` (19 paths) |
| Local structural inspect | Homepage graph matches table above |
| Schema Markup Validator (live URL) | **Re-run after deploy** on `https://nextcoresoft.com/` — expect fewer warnings on ProfessionalService/Offer/duplicate Organization; exact count depends on validator version |

**Before/after validator counts on live URL:** This pass was validated against **local `dist/` output** structurally equivalent to production after deploy. Production may still show the old graph until the next Cloudflare Pages deploy.

---

## Manual step

Deploy the build, then paste view-source or Rich Results Test / [Schema Markup Validator](https://validator.schema.org/) on `https://nextcoresoft.com/` to confirm warning count vs the prior **13** baseline.

---

*End of report.*
