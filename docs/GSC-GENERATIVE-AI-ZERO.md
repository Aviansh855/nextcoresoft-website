# Generative AI Performance = 0 — root cause & fix (NextCoreSoft)

**Hindi (seedha jawab):** Ye report **alag** hai normal Performance se. Yahan **sirf impressions** dikhte hain jab Google ke **AI Overview / AI Mode** answer ke andar **aapki site ka link** dikhe. Abhi aapke paas regular Search mein bhi **bahut kam impressions / 0 clicks** hain — isliye AI features mein link dikhna **abhi rare** hai. Iska matlab site “broken” nahi hai; **Google ne abhi tak aapko AI answer mein cite nahi kiya**. Code se “data force” nahi hota — pehle indexing + normal search visibility badhani padti hai.

## What Google says (official)

- Report shows **impressions only** (no clicks, no queries, no position in this tab).
- **Zero / empty** usually means: **not enough impressions in AI Overviews or AI Mode yet**.
- Or: site is **Excluded** from Search generative AI features (Settings).
- Technical requirement: page must be **indexed** and eligible for a **snippet** — same as normal Search. No extra schema or `llms.txt` required for AI Overviews.

Sources: [Generative AI performance report (Help)](https://support.google.com/webmasters/answer/16984139), [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).

## Root causes for NextCoreSoft (most likely → less likely)

| # | Cause | Evidence / why |
|---|--------|----------------|
| 1 | **No AI Overview citations yet** | Small/new brand; regular GSC shows impressions but **0 clicks** and low volume — AI picks established, highly relevant pages for overview links. |
| 2 | **Search generative AI = Exclude or inherited Exclude** | GSC → **Settings → Search generative AI** must be **Include** (default). Domain property parent can override child. |
| 3 | **Weak index coverage** | Historical Cloudflare **403 for Googlebot** on sitemap (`docs/CLOUDFLARE-403-GOOGLEBOT.md`); some URLs “Crawled – currently not indexed”. |
| 4 | **Wrong GSC property** | Use **`https://nextcoresoft.com/`** (apex), not `www`, not http. |
| 5 | **Expecting clicks/queries in this report** | That data lives in **Performance → Web**, not Generative AI tab. |
| 6 | **Date range too short** | AI report needs events over time; try **Last 28 days** after you have any AI impressions. |

## Owner fixes (do today — 15 minutes)

1. **GSC → Settings → Search generative AI → Include**  
   Also open **domain property** `nextcoresoft.com` (if you have it) and set **Include** there too so child URL-prefix does not inherit Exclude.

2. **Page indexing**  
   - Submit `https://nextcoresoft.com/sitemap.xml`  
   - URL Inspection → **Test live URL** → Request indexing for:  
     `/`, `/services/ai-automation/`, `/blog/generative-ai-business-software-india/`

3. **Cloudflare**  
   - WAF skip for **verified bots** (Googlebot, Bingbot) — `docs/CLOUDFLARE-403-GOOGLEBOT.md`  
   - `www` → apex redirect — `docs/CLOUDFLARE-WWW-REDIRECT-RULE.md`

4. **After deploy**  
   ```bash
   npm run indexnow:submit
   ```

5. **Track the right metric**  
   - **Generative AI tab:** AI-only impressions (may stay 0 for weeks).  
   - **Performance → Web:** total clicks/impressions (grow this first).  
   - Optional: `npm run gsc:report` with API creds — `docs/GSC-PERFORMANCE.md`.

## What we improve in the repo (discovery, not guaranteed AI citations)

- Internal links to `/blog/generative-ai-business-software-india/` and `/services/ai-automation/`
- FAQ + BlogPosting JSON-LD on generative AI article
- `npm run gsc:gen-ai-check` — local readiness checklist

## Realistic timeline

- **Days–weeks:** indexing fixes, first regular Search impressions (you already have some).  
- **Weeks–months:** first **Generative AI** impressions (only if Google shows your URLs inside AI Overviews for queries you rank for).  
- **Not fixable by code alone:** brand authority, competition, query mix.

When Generative AI impressions appear, they will often be on **question-style pages** (clear “Quick answer”, FAQs) — e.g. generative AI guide, cost guides, API guide.
