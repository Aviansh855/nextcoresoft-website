/**
 * Pull Search Console Performance (clicks, impressions, CTR, position) when OAuth env is set.
 * Without credentials, writes a public-signals baseline only.
 *
 * Setup: docs/GSC-PERFORMANCE.md
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const SITE_URL = process.env.GSC_SITE_URL ?? "https://nextcoresoft.com/"
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT_DIR = join(ROOT, "reports", "performance")

function isoDate(d) {
  return d.toISOString().slice(0, 10)
}

function daysAgo(n) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - n)
  return isoDate(d)
}

async function getAccessToken() {
  const clientId = process.env.GSC_OAUTH_CLIENT_ID?.trim()
  const clientSecret = process.env.GSC_OAUTH_CLIENT_SECRET?.trim()
  const refreshToken = process.env.GSC_REFRESH_TOKEN?.trim()
  if (!clientId || !clientSecret || !refreshToken) return null

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OAuth token refresh failed (${res.status}): ${text}`)
  }
  const json = await res.json()
  return json.access_token
}

async function searchAnalyticsQuery(accessToken, startDate, endDate) {
  const siteEnc = encodeURIComponent(SITE_URL)
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 50,
      }),
    },
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`searchAnalytics.query failed (${res.status}): ${text}`)
  }
  return res.json()
}

async function searchAnalyticsByPage(accessToken, startDate, endDate) {
  const siteEnc = encodeURIComponent(SITE_URL)
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 25,
      }),
    },
  )
  if (!res.ok) return { rows: [] }
  return res.json()
}

async function publicSignals() {
  const checks = []
  for (const path of ["/", "/sitemap.xml", "/robots.txt"]) {
    try {
      const res = await fetch(`https://nextcoresoft.com${path}`, { method: "HEAD" })
      checks.push({ path, status: res.status, ok: res.ok })
    } catch (e) {
      checks.push({ path, status: "error", ok: false, error: String(e) })
    }
  }
  return checks
}

function formatRows(rows) {
  if (!rows?.length) return "_No rows (property new, no impressions yet, or date range empty)._"
  return [
    "| Query | Clicks | Impressions | CTR | Avg. position |",
    "|-------|--------|-------------|-----|---------------|",
    ...rows.map((r) => {
      const q = r.keys?.[0] ?? "—"
      const ctr = r.ctr != null ? `${(r.ctr * 100).toFixed(1)}%` : "—"
      const pos = r.position != null ? r.position.toFixed(1) : "—"
      return `| ${q.replace(/\|/g, "\\|")} | ${r.clicks ?? 0} | ${r.impressions ?? 0} | ${ctr} | ${pos} |`
    }),
  ].join("\n")
}

function formatPages(rows) {
  if (!rows?.length) return "_No page data in range._"
  return [
    "| Page | Clicks | Impressions | Avg. position |",
    "|------|--------|-------------|---------------|",
    ...rows.map((r) => {
      const page = r.keys?.[0] ?? "—"
      const pos = r.position != null ? r.position.toFixed(1) : "—"
      return `| ${page.replace(/\|/g, "\\|")} | ${r.clicks ?? 0} | ${r.impressions ?? 0} | ${pos} |`
    }),
  ].join("\n")
}

async function main() {
  const endDate = daysAgo(2)
  const startDate28 = daysAgo(30)
  const startDate7 = daysAgo(9)
  const today = isoDate(new Date())
  const token = await getAccessToken()
  const signals = await publicSignals()

  let totals28 = null
  let queries28 = { rows: [] }
  let pages28 = { rows: [] }
  let totals7 = null
  let gscError = null

  if (token) {
    try {
      const siteEnc = encodeURIComponent(SITE_URL)
      const sumRes = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startDate: startDate28, endDate, rowLimit: 1 }),
        },
      )
      if (sumRes.ok) {
        const sumJson = await sumRes.json()
        totals28 = sumJson.rows?.[0] ?? null
      }
      queries28 = await searchAnalyticsQuery(token, startDate28, endDate)
      pages28 = await searchAnalyticsByPage(token, startDate28, endDate)

      const sum7Res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startDate: startDate7, endDate, rowLimit: 1 }),
        },
      )
      if (sum7Res.ok) {
        const sum7Json = await sum7Res.json()
        totals7 = sum7Json.rows?.[0] ?? null
      }
    } catch (e) {
      gscError = String(e)
    }
  }

  const md = `# Search performance snapshot — ${today}

Property: \`${SITE_URL}\`  
Generated by \`npm run gsc:report\` (repo script, not Google).

## How to read this (Google’s guidance)

Performance data in Search Console **lags by 2–3 days** and meaningful trends usually need **several weeks** after indexing — not one night. Compare **28-day** vs **7-day** totals when OAuth is configured.

## GSC API status

${
  token
    ? gscError
      ? `**Connected but query failed:** ${gscError}`
      : "**Connected** — totals and tables below are from Search Console API."
    : "**Not connected** — add OAuth env vars (see `docs/GSC-PERFORMANCE.md`) and re-run. Manual check: GSC → Performance → last 28 days."
}

## Summary (last 28 days)

${
  totals28
    ? `- **Clicks:** ${totals28.clicks ?? 0}
- **Impressions:** ${totals28.impressions ?? 0}
- **CTR:** ${totals28.ctr != null ? `${(totals28.ctr * 100).toFixed(2)}%` : "—"}
- **Average position:** ${totals28.position != null ? totals28.position.toFixed(1) : "—"}`
    : "_No aggregate row — often zero impressions on new properties._"
}

## Summary (last 7 days)

${
  totals7
    ? `- **Clicks:** ${totals7.clicks ?? 0} · **Impressions:** ${totals7.impressions ?? 0} · **Avg. position:** ${totals7.position != null ? totals7.position.toFixed(1) : "—"}`
    : "_N/A_"
}

## Top queries (28 days)

${formatRows(queries28.rows)}

## Top pages (28 days)

${formatPages(pages28.rows)}

## Public crawl checks (live)

| URL | HTTP |
|-----|------|
${signals.map((s) => `| \`${s.path}\` | ${s.status} |`).join("\n")}

## Manual checks (you or agent re-run weekly)

1. GSC → **Performance** → compare 28 vs 7 days (clicks, impressions, queries, position).
2. Google search: \`site:nextcoresoft.com\` — indexed URL count should grow after indexing requests.
3. GSC → **Page indexing** / **Sitemaps** — no new **Website** errors.

## Assessment template

| Signal | Healthy direction |
|--------|-------------------|
| Impressions | Up over weeks as pages get indexed |
| Clicks | Follow impressions; low CTR → improve titles/descriptions |
| Average position | Down (closer to 1) for target queries |
| Queries | Branded + service keywords appear |

---

_Next run: \`npm run gsc:report\` (weekly). Commit this file to track history in git if desired._
`

  mkdirSync(OUT_DIR, { recursive: true })
  const outFile = join(OUT_DIR, `${today}-performance.md`)
  writeFileSync(outFile, md, "utf8")
  writeFileSync(join(OUT_DIR, "LATEST.md"), md, "utf8")
  console.log(`Wrote ${outFile}`)
  if (!token) {
    console.log("Tip: set GSC_OAUTH_* + GSC_REFRESH_TOKEN to pull real Performance data (see docs/GSC-PERFORMANCE.md).")
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
