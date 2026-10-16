# Cloudflare 403 — Googlebot blocked on `/sitemap.xml`

## Confirmed symptom (Search Console)

- Sitemap: `https://nextcoresoft.com/sitemap.xml`
- GSC status: **Couldn't fetch** (HTTP **403**)
- Security Event (example):
  - IP `66.249.77.71`, ASN 15169 (Google LLC)
  - User-Agent: Googlebot/2.1
  - **Verified Bot Category: Search Engine Crawler**
  - **Mitigation: Block by Managed rules**

**Important:** A normal browser or `curl -A Googlebot` from your PC may still return **200**. Cloudflare validates bots differently at the edge. Do **not** treat a local 200 as proof that Google’s fetcher is allowed.

## 1. Pull the exact rule (dashboard)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → zone **nextcoresoft.com**
2. **Security** → **Events**
3. Filter: time of the GSC failure, path `/sitemap.xml`, action **Block**
4. Open the event → expand **Service**, **Rule ID**, **Ruleset**, **Rule name**, **Action**
5. Save a screenshot (needed for support or a targeted exception)

Do **not** disable the entire Managed Ruleset unless support advises it.

Official troubleshooting:  
https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/troubleshooting-crawl-errors/

## 2. Narrowest fixes (try in this order)

### A. Allow verified search bots (preferred)

**Security** → **WAF** → **Custom rules** → **Create rule**

- **Name:** `Allow verified bots — SEO paths`
- **Expression** (adjust if your plan uses different fields):

```txt
(cf.bot_management.verified_bot)
```

If your plan does not expose `cf.bot_management.verified_bot`, use a **path-only** exception (B) instead.

- **Action:** **Skip** → select **All remaining custom rules** and **Managed rules** (or the narrowest skip options your plan offers)

Place this rule **first** in the list.

Docs:  
https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/

### B. Path-only exception (minimal scope)

Use only if (A) is unavailable or still blocks:

```txt
(http.request.uri.path eq "/sitemap.xml") or (http.request.uri.path eq "/robots.txt")
```

- **Action:** **Skip** → Managed rules (and other relevant phases)

This does **not** spoof-proof User-Agent; it only opens two public static files.

### C. Managed rule exception (when rule ID is known)

**Security** → **WAF** → **Managed rules** → open the ruleset from the event → find **Rule ID** → **Configure** → **Add exception** for:

- URI Path equals `/sitemap.xml` (and optionally `/robots.txt`)

### D. Do not do this

- Turn off all WAF / set Security Level to “I'm Under Attack” for the whole zone
- Allow all User-Agents containing `Googlebot` without verified-bot signals
- Remove Cloudflare Managed `robots.txt` content entirely

## 3. Verify after the rule change

1. Wait **5–15 minutes**
2. **Security** → **Events** → trigger a test:
   - GSC → **URL Inspection** → `https://nextcoresoft.com/sitemap.xml` → **Test live URL**
3. Confirm a **new event** shows **Allow** or no block for Googlebot on `/sitemap.xml`
4. GSC → **Sitemaps** → remove wrong entries (`https://www.nextcoresoft.com/` is **not** a sitemap)
5. On property **`https://nextcoresoft.com/`** (URL prefix), submit only: `sitemap.xml`
6. Status should move to **Success** (may take hours; “Last read” should populate)

Sitemap help:  
https://support.google.com/webmasters/answer/7451001

## 4. If Free plan cannot skip managed rules

- Open a **Cloudflare Support** ticket (Billing → Support) with:
  - Zone: `nextcoresoft.com`
  - URL: `https://nextcoresoft.com/sitemap.xml`
  - Event timestamp (UTC), IP `66.249.77.71`, screenshot with Rule ID
  - Request: exception for **verified search engine crawlers** on `/sitemap.xml` and `/robots.txt`

## 5. GSC property hygiene

| Property | Use for sitemap? |
|----------|------------------|
| **Domain** `nextcoresoft.com` | OK — submit full URL or path per GSC UI |
| **URL prefix** `https://nextcoresoft.com/` | **Recommended** — submit `sitemap.xml` only |
| **URL prefix** `https://www.nextcoresoft.com/` | Do **not** submit homepage as sitemap |

Wrong submission to remove: `https://www.nextcoresoft.com/` (homepage, not XML).

## 6. Code-side (already in repo)

- Valid `public/sitemap.xml` (9 canonical URLs, non-www)
- `public/robots.txt` includes `Sitemap: https://nextcoresoft.com/sitemap.xml`
- `public/_headers` sets XML/plain content types for crawlers
- `npm run build` regenerates sitemap via `scripts/generate-sitemap.mjs`

Deploy **`_headers`** and latest build to Cloudflare Pages after WAF fix.
