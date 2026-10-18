# Bing Webmaster — “Discovered but not crawled” / Live URL error

## What you see in Bing

- **Discovered but not crawled** → URL cannot appear on Bing  
- **Crawl** step: red ✗  
- **Live URL inspection:** “Error encountered while inspecting Live URL” (e.g. `https://nextcoresoft.com/about/`)

## Do not guess the blocking rule from Bing UI alone

A Bing **Live URL** failure only proves Microsoft’s fetch did not return usable HTML at inspection time. It does **not** by itself identify which Cloudflare rule fired. Treat WAF as a **hypothesis** until you match **one Security Event** to **one Bing inspection timestamp**.

### Correlate Bing inspection time → Cloudflare Security Events

1. In **Bing Webmaster Tools** → **URL Inspection** → open the failed run for `https://nextcoresoft.com/about/` (or `/about/` as entered). Note the **exact UTC/local time** of **Test live URL** / **Fetch** (screenshot or copy time from the UI).
2. In **Cloudflare** → **Security** → **Events** (or **Analytics & logs** → **Security events**, depending on plan):
   - Set the time window to **±5 minutes** around that Bing action.
   - Filter **Path** (or URI) contains `/about` (or equals `/about/`).
   - Filter **User agent** contains `bingbot` (case-insensitive) if the column is available.
   - Sort by time; find the row closest to the Bing inspection moment.
3. For that row, record **Action** (Allow / Block / Challenge / Managed Challenge), **Service** (e.g. WAF, Bot Fight, Rate limiting), **Rule ID** / rule name, **Verified Bot** (yes/no), and **Ray ID**.
4. **Interpretation (evidence-based only):**
   - **Block** + **Verified Bot: Yes** on `/about/` at the same minute → edge block is a plausible cause of Live URL error; fix is a **narrow** verified-bot allow/skip (see below), not repo changes.
   - **Allow** or **Mitigation: Not mitigated** + verified Bingbot → edge likely **not** blocking; re-check Bing-side delay, DNS, or retry inspection; do not assume WAF without a matching Block event.
   - **No events** in the window → widen to ±30 minutes, check `/` and `/sitemap.xml`, confirm zone and that Bing used apex HTTPS; absence of events is inconclusive, not proof of “no block.”
5. Optional cross-check: same Ray ID in **Cloudflare** → **Analytics** → **Traffic** request log if your plan retains it.

**This repository audit did not run Step 1–3 against your Cloudflare account** — only you can tie a specific rule to a specific Bing fetch.

## Likely layers (repo vs edge)

| Check | Result |
|-------|--------|
| `robots.txt` blocks Bingbot? | **No** in local repo — `User-agent: *` and explicit `Bingbot` → `Allow: /` |
| Page HTML valid for `/about/` after local build? | **Yes** — prerendered title, trailing-slash canonical, `#static-prerender` H1 |
| Spoofed `bingbot` curl from home IP? | **Not equivalent** to Microsoft’s verified crawler path through Cloudflare |
| Edge WAF | **Possible** blocker when Security Events show **Block** for verified Bingbot on the inspected path — **verify with Step 1–3 above** |

**robots.txt changes alone cannot fix an edge WAF block.**

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

- **www → apex:** configure Cloudflare Redirect Rule — `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md` (not via `_redirects`)
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
