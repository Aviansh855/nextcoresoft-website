/**
 * Keeps index.html static JSON-LD and root noscript aligned with shared SEO sources
 * before Vite build + prerender.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { organizationJsonLd, websiteJsonLd } from "../shared/jsonld-static.mjs"
import { canonicalUrl, noscriptBlock, ROUTE_META } from "../shared/route-meta.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const indexPath = join(root, "index.html")

function jsonLdScript(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 6)}\n    </script>`
}

function replaceBetween(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker)
  const end = html.indexOf(endMarker)
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Missing markers ${startMarker} … ${endMarker} in index.html`)
  }
  return html.slice(0, start + startMarker.length) + "\n" + replacement + "\n    " + html.slice(end)
}

let html = readFileSync(indexPath, "utf8")

html = replaceBetween(
  html,
  "<!-- BEGIN:ORG_JSONLD -->",
  "<!-- END:ORG_JSONLD -->",
  jsonLdScript(organizationJsonLd()),
)

html = replaceBetween(
  html,
  "<!-- BEGIN:WEBSITE_JSONLD -->",
  "<!-- END:WEBSITE_JSONLD -->",
  jsonLdScript(websiteJsonLd()),
)

const noscript = noscriptBlock("/")
const noscriptStart = html.indexOf("<!-- BEGIN:ROOT_NOSCRIPT -->")
const noscriptEnd = html.indexOf("<!-- END:ROOT_NOSCRIPT -->")
if (noscriptStart === -1 || noscriptEnd === -1) {
  throw new Error("Missing ROOT_NOSCRIPT markers in index.html")
}
html =
  html.slice(0, noscriptStart) +
  `<!-- BEGIN:ROOT_NOSCRIPT -->\n    ${noscript}\n    <!-- END:ROOT_NOSCRIPT -->` +
  html.slice(noscriptEnd + "<!-- END:ROOT_NOSCRIPT -->".length)

const home = ROUTE_META["/"]
const homeCanonical = canonicalUrl("/")
const homeTitle = home.title.replace(/&/g, "&amp;")
const homeDescription = home.description.replace(/&/g, "&amp;")

if (!html.includes('name="application-name"')) {
  html = html.replace(
    /<meta name="viewport"[^/]*\/>/,
    (m) => `${m}\n    <meta name="application-name" content="NextCoreSoft" />`,
  )
}

html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${homeTitle}</title>`)
html = html.replace(
  /<meta name="description" content="[^"]*" \/>/,
  `<meta name="description" content="${homeDescription}" />`,
)
html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${homeTitle}" />`)
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="${homeDescription}" />`,
)
html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${homeCanonical}" />`)
html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${homeTitle}" />`)
html = html.replace(
  /<meta name="twitter:description" content="[^"]*" \/>/,
  `<meta name="twitter:description" content="${homeDescription}" />`,
)

writeFileSync(indexPath, html, "utf8")
console.log("Synced index.html JSON-LD, OG tags, and root noscript from shared SEO sources.")
