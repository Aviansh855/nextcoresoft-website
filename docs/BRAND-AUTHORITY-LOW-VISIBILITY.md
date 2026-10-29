# Brand authority & low visibility (Hindi + English)

## Aapka observation sahi hai

### 1. Sirf homepage, andar ke links nahi (Sitelinks)

Google **sitelinks** (Pricing, Contact, Portfolio under brand search) **algorithm se** aate hain — code se “on” nahi hote.

**High authority sites** ko zyada sitelinks milte hain kyunki:

- Purani domain + consistent crawl history
- Strong branded search volume (`NextCoreSoft` direct search)
- Clear site structure + unique page titles
- Off-site corroboration (LinkedIn, GitHub, listings — same name + same URL)

**Nayi / local agency** par Google aksar **pehle sirf homepage** dikhata hai. Andar ke pages tab dikhte hain jab:

- Wo URLs **indexed** hon (GSC → Pages)
- Branded searches badhein
- Time (months, not days)

**Repo mein jo ho chuka hai:** har important URL prerendered, sitemap, footer links, unique titles with `| NextCoreSoft`.

**Aap kya karein:**

1. GSC → search **`site:nextcoresoft.com`** — kitne URLs indexed
2. Branded query **`NextCoreSoft`** → URL Inspection on `/portfolio/`, `/contact/`, `/pricing/` → Request indexing
3. **Google Business Profile** (agar local trust chahiye) — verified, same website URL
4. Founder **LinkedIn** + **GitHub** bio mein exact link: `https://nextcoresoft.com/`
5. Sitelinks ke liye **fake reviews / paid links mat karein** — policy risk

### 2. Similar names (Next Big Technology, CoreSoft, …)

Ye **entity collision** hai — Google user intent guess karta hai; similar names pehle rank kar sakte hain.

**Fix (honest):**

- Har jagah **full brand + domain**: “NextCoreSoft (nextcoresoft.com)”
- About page par **disambiguation** — hum kaun nahi hain
- `site.json` → `disambiguatingDescription` + Organization JSON-LD
- Search **`NextCoreSoft nextcoresoft.com`** ya **`NextCoreSoft Jaipur software`** — long-term branded pattern build karein
- Competitors ke naam **keyword spam** mat karo — sirf clear “not affiliated” statement

### 3. Domain authority (DA) — expectations

Third-party “DA” scores marketing tools hain; Google official metric nahi batata. **Real levers:**

| Lever | Control |
|-------|---------|
| Technical SEO, indexability | Site + Cloudflare |
| Useful content (blog, services) | Site |
| Branded search + direct visits | Time + marketing |
| Consistent NAP / sameAs profiles | Owner |
| Backlinks from real partners/clients | Owner (ethical only) |

**Generative AI / GEO tab 0** alag topic hai — `docs/GSC-GENERATIVE-AI-ZERO.md`.

### 4. Monthly check (5 min)

```bash
npm run seo:check
npm run gsc:gen-ai-check
```

GSC: Performance → Queries → branded vs non-branded; Pages → which URLs get impressions.

---

*Sitelinks aur brand dominance overnight nahi aate — indexing + entity clarity + time.*
