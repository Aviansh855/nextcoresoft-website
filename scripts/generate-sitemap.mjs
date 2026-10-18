import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { SITE_ORIGIN, SITEMAP_ENTRIES, preferredPath } from "../shared/indexable-paths.mjs"

const lastmod = new Date().toISOString().slice(0, 10)

const urls = SITEMAP_ENTRIES.map(
  (p) =>
    `  <url><loc>${SITE_ORIGIN}${preferredPath(p.loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
).join("\n")

// Standard page sitemap only — no video/news/image extensions (no videos on site).
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml")
writeFileSync(out, xml, "utf8")
console.log(`Wrote ${out} (${SITEMAP_ENTRIES.length} URLs, lastmod ${lastmod})`)
