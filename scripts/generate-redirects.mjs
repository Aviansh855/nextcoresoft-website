/**
 * Writes public/_redirects from INDEXABLE_PATHS so every indexable URL works with
 * and without a trailing slash on Cloudflare Pages (no redirect loops with middleware).
 */
import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { INDEXABLE_PATHS } from "../shared/indexable-paths.mjs"

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "_redirects")

const lines = [
  "# Cloudflare Pages _redirects: PATH-based rewrites only (see Cloudflare docs).",
  "# Host-based www/http→apex rules are NOT supported here and do NOT run in Pages Functions.",
  "# Configure www → https://nextcoresoft.com manually: docs/CLOUDFLARE-WWW-REDIRECT-RULE.md",
  "",
  "# Per-route prerender HTML — both /path and /path/ (Cloudflare 308-safe). Generated from INDEXABLE_PATHS.",
]

for (const path of INDEXABLE_PATHS) {
  if (path === "/") continue
  const asset = `${path.slice(1)}/index.html`
  const pad = path.length < 28 ? " ".repeat(28 - path.length) : " "
  lines.push(`${path}/${pad} /${asset}  200`)
  lines.push(`${path}${pad} /${asset}  200`)
}

lines.push("", "# SPA fallback for unknown client routes.", "/*    /index.html   200", "")

writeFileSync(out, lines.join("\n"), "utf8")
console.log(`Wrote ${out} (${INDEXABLE_PATHS.length - 1} app routes × 2 slash variants)`)
