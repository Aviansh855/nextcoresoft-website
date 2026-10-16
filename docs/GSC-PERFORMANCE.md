# Search Console Performance monitoring

Google’s [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) and Performance report docs: use **impressions, clicks, CTR, average position, and queries** over **weeks**, not hours. Data is delayed ~2–3 days.

## Automated report in this repo

```bash
npm run gsc:report
```

Writes:

- `reports/performance/YYYY-MM-DD-performance.md`
- `reports/performance/LATEST.md`

Without API credentials, the report still records **live HTTP checks** and reminds you what to read in GSC.

## One-time API setup (~10 minutes)

So the script can read the same data as **Performance** in Search Console:

1. [Google Cloud Console](https://console.cloud.google.com/) → create/select project → **APIs & Services** → enable **Google Search Console API**.
2. **Credentials** → **OAuth client ID** → Desktop app → copy **Client ID** and **Client secret**.
3. [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) → gear icon → use your OAuth credentials.
4. Authorize scope: `https://www.googleapis.com/auth/webmasters.readonly`
5. Exchange authorization code for tokens → copy **Refresh token**.
6. Create `.env.local` (gitignored) in project root:

```env
GSC_OAUTH_CLIENT_ID=your_client_id.apps.googleusercontent.com
GSC_OAUTH_CLIENT_SECRET=your_secret
GSC_REFRESH_TOKEN=your_refresh_token
GSC_SITE_URL=https://nextcoresoft.com/
```

Use the **exact** property URL as in GSC (URL prefix `https://nextcoresoft.com/` or `sc-domain:nextcoresoft.com` — set `GSC_SITE_URL` to match).

7. Run:

```powershell
cd c:\Users\gedar\OneDrive\Desktop\nextcoresoft
Get-Content .env.local | ForEach-Object { if ($_ -match '^([^#=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process') } }
npm run gsc:report
```

## Weekly routine (2 minutes)

| Step | Action |
|------|--------|
| 1 | `npm run gsc:report` or open GSC → Performance |
| 2 | Note 28-day clicks/impressions vs prior week |
| 3 | Open **Queries** — branded vs service terms |
| 4 | Open **Pages** — which URLs earn impressions |
| 5 | If flat zero for 3+ weeks after indexing: check Page indexing, sitemap, Cloudflare 403 |

## What “one night” cannot do

- Force Google to index or rank overnight.
- Show Performance data before Google crawls, indexes, and serves URLs in search.
- Replace GSC for manual actions, security, or quality review.

After deploy + indexing requests, expect **days to weeks** before impressions appear for a new domain.
