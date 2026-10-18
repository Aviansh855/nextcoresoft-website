# Bing Webmaster — “Discovered but not crawled” / Live URL error

## What you see in Bing

- **Discovered but not crawled** → URL cannot appear on Bing  
- **Crawl** step: red ✗  
- **Live URL inspection:** “Error encountered while inspecting Live URL” (e.g. `https://nextcoresoft.com/about/`)

## Root cause (confirmed for this site)

| Check | Result |
|-------|--------|
| `robots.txt` blocks Bingbot? | **No** — `User-agent: *` and `Bingbot` → `Allow: /` |
| Page returns 200 from your PC with `bingbot` User-Agent? | **Often yes** — spoofed UA from home IP is **not** the same as Microsoft’s verified crawler |
| Site HTML valid for `/about/`? | **Yes** — prerendered title, canonical, `#static-prerender` H1 |
| **Actual blocker** | **Cloudflare WAF / Managed Rules** can **block verified search bots** (same class of issue as Google Search Console **403** on sitemap). Bing’s fetcher hits the edge; your browser/curl does not. |

**robots.txt changes alone cannot fix a WAF block.**

Official Cloudflare crawl troubleshooting:  
https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/troubleshooting-crawl-errors/

## Fix (Cloudflare — required)

Do this in the **Cloudflare dashboard** for zone `nextcoresoft.com`:

### Step 1 — Confirm the block

1. **Security** → **Events**  
2. Filter around the time you clicked **Live URL** / **Request indexing** in Bing  
3. Look for **Block** on paths like `/about/`, `/sitemap.xml`, `/robots.txt`  
4. Note **User-Agent** (Bingbot) and **Verified Bot** / **Service** / **Rule ID**

### Step 2 — Allow verified search bots (recommended)

**Security** → **WAF** → **Custom rules** → **Create rule**

- **Name:** `Allow verified search engine bots`  
- **Expression:**

```txt
(cf.bot_management.verified_bot)
```

*(If your plan does not show `verified_bot`, use the path exception in Step 3 or contact Cloudflare support.)*

- **Action:** **Skip** → enable skip for **Managed rules** (and other blocking phases your plan offers)  
- **Order:** move this rule **to the top**

Docs: https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/

### Step 3 — Minimum path exception (if Step 2 unavailable)

```txt
(http.request.uri.path eq "/robots.txt")
or (http.request.uri.path eq "/sitemap.xml")
or (http.request.uri.path eq "/feed.xml")
or (http.request.uri.path extension eq "html")
or (http.request.uri.path eq "/")
or (ends_with(http.request.uri.path, "/"))
```

Action: **Skip** → Managed rules (narrow as much as your plan allows).

Full detail: `docs/CLOUDFLARE-403-GOOGLEBOT.md` (Google + Bing same fix).

### Step 4 — Bing property hygiene

- Add site as **`https://nextcoresoft.com/`** (apex, HTTPS) — not only `www`  
- Submit sitemap: **`https://nextcoresoft.com/sitemap.xml`**  
- After WAF fix + deploy, wait **15–30 minutes**, then **Retry** Live URL on `/about/`

### Step 5 — After crawl works

```powershell
npm run indexnow:submit
```

(Re-run after each deploy that adds URLs.)

## Code already on the site (deploy to production)

- Explicit `Bingbot` / `msnbot` in `public/robots.txt`  
- `<meta name="bingbot" content="index, follow">` on prerendered pages  
- `Sitemap:` line in robots  
- IndexNow key file (after build): `public/{key}.txt`

Deploy latest build so live `robots.txt` and `_headers` match the repo.

## What is *not* the cause

- Missing Bing lines in robots (optional; `*` already allows crawl)  
- “Discovered but not crawled” queue only — **Live URL error** means fetch failed, not “wait longer”  
- Need to edit React app for `/about` content — static HTML is already present for crawlers

## Verify success

1. Cloudflare **Events**: no new **Block** for Bingbot on `/about/`  
2. Bing **URL Inspection** → **Live URL** → succeeds, shows HTML  
3. **Request indexing** → Crawl step turns green over hours/days (not instant)
