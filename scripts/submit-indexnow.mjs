/**
 * Notify IndexNow (Bing, Yandex, etc.) after deploy.
 * Usage: npm run indexnow:submit
 * Requires network; skips if INDEXNOW_SKIP=1.
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { preferredPath, SITE_ORIGIN, SITEMAP_ENTRIES } from "../shared/indexable-paths.mjs"

if (process.env.INDEXNOW_SKIP === "1") {
  console.log("INDEXNOW_SKIP=1 — skipping IndexNow submit.")
  process.exit(0)
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const key = readFileSync(join(root, "shared", "indexnow-key.txt"), "utf8").trim()
const host = new URL(SITE_ORIGIN).host

const urlList = SITEMAP_ENTRIES.map((e) => `${SITE_ORIGIN}${preferredPath(e.loc)}`)

const body = {
  host,
  key,
  keyLocation: `${SITE_ORIGIN}/${key}.txt`,
  urlList,
}

const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
]

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    })
    const text = await res.text()
    console.log(`${endpoint} → HTTP ${res.status}${text ? ` ${text.slice(0, 120)}` : ""}`)
    if (!res.ok) {
      console.warn(`IndexNow warning: ${endpoint} returned ${res.status}`)
    }
  } catch (err) {
    console.warn(`${endpoint} failed:`, err instanceof Error ? err.message : err)
  }
}
