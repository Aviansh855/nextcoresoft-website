/**
 * Bing Webmaster expects meta descriptions between 25 and 160 characters.
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { ROUTE_META } from "../shared/route-meta.mjs"

const MIN = 25
const MAX = 160
const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const blog = JSON.parse(readFileSync(join(root, "shared", "blog-posts.json"), "utf8"))

const failures = []

for (const [path, meta] of Object.entries(ROUTE_META)) {
  const len = meta.description.length
  if (len < MIN || len > MAX) {
    failures.push({ path, len, description: meta.description })
  }
}

for (const post of blog) {
  const path = `/blog/${post.slug}`
  const desc = post.metaDescription ?? ""
  const len = desc.length
  if (len < MIN || len > MAX) {
    failures.push({ path, len, description: desc })
  }
}

if (failures.length) {
  console.error(`Meta description length must be ${MIN}–${MAX} characters (Bing SEO):\n`)
  for (const f of failures) {
    console.error(`  ${f.path} (${f.len}): ${f.description.slice(0, 80)}…`)
  }
  process.exit(1)
}

console.log(`Meta description lengths OK (${Object.keys(ROUTE_META).length} routes + ${blog.length} blog posts).`)
