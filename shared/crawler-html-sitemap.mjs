/**
 * HTML site map block for prerendered pages (Bing/Google crawlers that skip heavy JS).
 * Lists every indexable URL — supports discovery per Bing Webmaster sitemap guidance.
 */
import { INDEXABLE_PATHS } from "./indexable-paths.mjs"
import { ROUTE_META, canonicalUrl } from "./route-meta.mjs"

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
}

function labelForPath(path) {
  if (path === "/") return "Home"
  const meta = ROUTE_META[path]
  if (!meta) return path
  const short = meta.title.split("|")[0]?.trim()
  return short || meta.h1 || path
}

export function htmlSitemapBlock() {
  const items = INDEXABLE_PATHS.map(
    (path) => `<li><a href="${canonicalUrl(path)}">${escapeHtml(labelForPath(path))}</a></li>`,
  ).join("")
  return `<nav aria-label="Complete site map"><h2>All pages on this site</h2><ul>${items}</ul><p>XML sitemap: <a href="https://nextcoresoft.com/sitemap.xml">sitemap.xml</a> · RSS: <a href="https://nextcoresoft.com/feed.xml">feed.xml</a></p></nav>`
}
