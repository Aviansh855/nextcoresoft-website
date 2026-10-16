import { readFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { INDEXABLE_PATHS } from "../shared/indexable-paths.mjs"
import { ROUTE_META, canonicalUrl } from "../shared/route-meta.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")

let failed = false
for (const path of INDEXABLE_PATHS) {
  const file =
    path === "/"
      ? join(dist, "index.html")
      : join(dist, path.slice(1), "index.html")
  if (!existsSync(file)) {
    console.error(`Missing prerender file: ${file}`)
    failed = true
    continue
  }
  const html = readFileSync(file, "utf8")
  const meta = ROUTE_META[path]
  const canonical = canonicalUrl(path)
  const titleEsc = meta.title.replace(/&/g, "&amp;")
  if (!html.includes(`<title>${titleEsc}</title>`)) {
    console.error(`${path}: title mismatch in ${file}`)
    failed = true
  }
  if (!html.includes(`href="${canonical}"`)) {
    console.error(`${path}: canonical ${canonical} not found in ${file}`)
    failed = true
  }
  if (!html.includes(meta.description.slice(0, 40))) {
    console.error(`${path}: description snippet missing in ${file}`)
    failed = true
  }
}

if (failed) process.exit(1)
console.log(`SEO route HTML verified for ${INDEXABLE_PATHS.length} paths.`)
