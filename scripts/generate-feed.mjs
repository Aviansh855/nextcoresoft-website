/**
 * RSS 2.0 feed for blog posts (discoverability / syndication).
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { preferredPath, SITE_ORIGIN } from "../shared/indexable-paths.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const posts = JSON.parse(readFileSync(join(root, "shared", "blog-posts.json"), "utf8"))

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

const items = [...posts]
  .sort((a, b) => String(b.published).localeCompare(String(a.published)))
  .map((post) => {
    const link = `${SITE_ORIGIN}${preferredPath(`/blog/${post.slug}`)}`
    return `    <item>
      <title>${escapeXml(post.seoTitle ?? post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${post.published}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.metaDescription ?? post.excerpt ?? "")}</description>
    </item>`
  })
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NextCoreSoft Blog</title>
    <link>${SITE_ORIGIN}${preferredPath("/blog")}</link>
    <description>Guides on custom software, mobile apps, AI automation, and integrations for growing businesses.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

writeFileSync(join(root, "public", "feed.xml"), xml, "utf8")
console.log(`Wrote public/feed.xml (${posts.length} items).`)
