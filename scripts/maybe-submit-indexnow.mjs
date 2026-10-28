/**
 * Ping IndexNow after production builds (Bing, Yandex, etc.).
 * Runs on Cloudflare Pages (CF_PAGES=1) or when FORCE_INDEXNOW=1.
 */
import { spawnSync } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const onPages = process.env.CF_PAGES === "1"
const forced = process.env.FORCE_INDEXNOW === "1"

if (!onPages && !forced) {
  console.log(
    "IndexNow: skipped (not Cloudflare Pages). After deploy run: npm run indexnow:submit",
  )
  process.exit(0)
}

const result = spawnSync(process.execPath, [join(root, "scripts", "submit-indexnow.mjs")], {
  stdio: "inherit",
  env: process.env,
})

process.exit(result.status ?? 1)
