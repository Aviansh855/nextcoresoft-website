/**
 * Local checklist before expecting GSC "Generative AI" impressions.
 * Does not call Google; verifies live crawl basics + key URLs.
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ORIGIN = "https://nextcoresoft.com"
const KEY_URLS = [
  "/",
  "/services/ai-automation/",
  "/blog/generative-ai-business-software-india/",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
]

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

async function head(path) {
  const url = path.startsWith("http") ? path : `${ORIGIN}${path}`
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" })
    const html = res.headers.get("content-type")?.includes("html")
      ? await res.text()
      : ""
    return { url, status: res.status, ok: res.ok, html }
  } catch (e) {
    return { url, status: "error", ok: false, error: String(e), html: "" }
  }
}

function robotsAllowsGoogle(robotsTxt) {
  const block = /User-agent:\s*Googlebot[\s\S]*?(?=User-agent:|$)/i.exec(robotsTxt)
  if (!block) return robotsTxt.includes("Allow: /")
  return !/Disallow:\s*\/\s*$/m.test(block[0])
}

async function main() {
  console.log("Generative AI / GSC readiness (live checks)\n")

  let failed = false
  for (const path of KEY_URLS) {
    const r = await head(path)
    const mark = r.ok ? "OK" : "FAIL"
    if (!r.ok) failed = true
    console.log(`  [${mark}] ${r.status} ${r.url}`)
    if (path.includes("generative-ai") && r.html) {
      if (!r.html.includes("application/ld+json")) {
        console.log("       ⚠ No JSON-LD in HTML snapshot")
      }
      if (!/index,\s*follow/i.test(r.html)) {
        console.log("       ⚠ Check robots meta on page")
      }
    }
  }

  const robots = await head("/robots.txt")
  if (robots.ok && robots.html) {
    if (!robotsAllowsGoogle(robots.html)) {
      failed = true
      console.log("\n  [FAIL] robots.txt may block Googlebot")
    } else {
      console.log("\n  [OK] robots.txt allows Googlebot")
    }
  }

  try {
    const settingsHint = readFileSync(join(root, "docs", "GSC-GENERATIVE-AI-ZERO.md"), "utf8")
    if (settingsHint.includes("Search generative AI")) {
      console.log("\n--- Manual (required for non-zero AI report) ---")
      console.log("1. GSC → Settings → Search generative AI → Include (check domain + URL property)")
      console.log("2. Grow regular Performance impressions first (Generative AI tab lags behind)")
      console.log("3. Full doc: docs/GSC-GENERATIVE-AI-ZERO.md")
    }
  } catch {
    /* ignore */
  }

  if (failed) {
    console.log("\nFix failed HTTP checks before expecting GSC Generative AI data.")
    process.exit(1)
  }
  console.log("\nLive technical checks passed. Zero Generative AI impressions is still normal until Google cites you in AI Overviews.")
}

main()
