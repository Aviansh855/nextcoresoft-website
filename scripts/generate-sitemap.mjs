import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const SITE = "https://nextcoresoft.com"
const lastmod = new Date().toISOString().slice(0, 10)

const paths = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/contact", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/custom-software", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/mobile-apps", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/ai-automation", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/cloud-api", changefreq: "monthly", priority: "0.85" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
]

const urls = paths
  .map(
    (p) =>
      `  <url><loc>${SITE}${p.loc === "/" ? "/" : p.loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
  )
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml")
writeFileSync(out, xml, "utf8")
console.log(`Wrote ${out} (${paths.length} URLs, lastmod ${lastmod})`)
