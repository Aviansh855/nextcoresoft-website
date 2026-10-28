# GSC Performance queries — Oct 2026 action map

Data source: Search Console **Performance → Queries** (impressions with low/zero clicks).

## Query → URL → on-site changes

| Query (impressions) | Primary URL | Support URLs |
|---------------------|-------------|--------------|
| cloud api integration (16) | `/services/cloud-api/` | `/blog/api-integration-business-systems-guide/` |
| mobile app development cost in india (8+) | `/blog/mobile-app-development-cost-india/` | `/services/mobile-apps/` |
| app development cost india / in india / mobile app making cost | same blog + mobile service | Home + blog FAQ |
| crm software development cost in india (3) | `/blog/custom-crm-software-development-india/` | `/services/custom-software/` |
| cloud communication api (3) | `/services/cloud-api/` | API integration blog |
| how to connect business software systems (2) | `/blog/api-integration-business-systems-guide/` | `/services/cloud-api/` |
| web & mobile apps (1) | `/services/` | `/services/mobile-apps/`, `/services/custom-software/` |
| app development in sikar (1) | `/blog/software-development-company-jaipur/` | Home FAQ (Sikar) |

Meta descriptions stay **25–160 characters** (Bing + build gate).

## After deploy (you)

1. **Cloudflare Pages** — confirm latest commit deployed successfully.
2. **Google Search Console** — Performance → note 28-day trend weekly (`npm run gsc:report` if API configured).
3. **URL Inspection** (apex `https://nextcoresoft.com/`) — Test live URL → Request indexing for:
   - `/`
   - `/services/cloud-api/`
   - `/services/mobile-apps/`
   - `/blog/mobile-app-development-cost-india/`
   - `/blog/api-integration-business-systems-guide/`
   - `/blog/custom-crm-software-development-india/`
   - `/blog/software-development-company-jaipur/`
4. **Sitemap** — resubmit `https://nextcoresoft.com/sitemap.xml` on the apex property.
5. **Bing Webmaster** — same URLs → Submit / IndexNow (also runs on CF Pages build when `CF_PAGES=1`).

## Expectations

- Impressions without clicks often mean **position is low** or **snippet does not match intent** — titles/descriptions and internal links help CTR over weeks, not overnight.
- Zero clicks with rising impressions is normal early-stage; track **CTR and average position** per query after 2–3 weeks.
