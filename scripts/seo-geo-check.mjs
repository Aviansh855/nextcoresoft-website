/**
 * Local SEO / GEO / AEO health check — run weekly or before deploy.
 * Does not call Google/Bing APIs unless gsc:report env is configured.
 */
import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

function run(label, script) {
  const r = spawnSync(process.execPath, [join(root, "scripts", script)], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe",
  })
  if (r.status !== 0) {
    console.error(`\n✗ ${label} failed:\n${r.stderr || r.stdout}`)
    return false
  }
  console.log(`✓ ${label}`)
  if (r.stdout?.trim()) console.log(r.stdout.trim())
  return true
}

console.log("NextCoreSoft SEO / GEO check\n")

let ok = true
ok &&= run("Meta descriptions (25–160)", "verify-meta-description-length.mjs")
ok &&= run("JSON-LD / site.json sync", "verify-jsonld-sync.mjs")
ok &&= run("Regenerate llms.txt", "sync-llms-txt.mjs")

const checklist = join(root, "docs", "SEO-GEO-REGULAR-UPDATES.md")
if (existsSync(checklist)) {
  console.log("\n--- Manual steps (see docs/SEO-GEO-REGULAR-UPDATES.md) ---")
  console.log("- After deploy: GSC + Bing URL Inspection → Request indexing for changed URLs")
  console.log("- Weekly: npm run gsc:report (optional API) or GSC Performance → Queries")
  console.log("- Monthly: update shared/seo-query-topics.mjs from top GSC queries")
}

const logPath = join(root, "docs", "marketing", "submissions-log.md")
if (existsSync(logPath)) {
  console.log("- Startup listings: update docs/marketing/submissions-log.md when you post")
}

if (!ok) process.exit(1)
console.log("\nAll automated SEO/GEO checks passed.")
