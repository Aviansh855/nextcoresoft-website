/**
 * After Vite build: copy index.html per indexable route with correct static
 * title, description, and canonical — helps crawlers and URL Inspection before JS runs.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { INDEXABLE_PATHS } from "../shared/indexable-paths.mjs"
import { routeJsonLdGraph } from "../shared/jsonld-by-route.mjs"
import { canonicalUrl, googlebotContent, noscriptBlock, ROUTE_META } from "../shared/route-meta.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const distIndex = join(root, "dist", "index.html")
let html = readFileSync(distIndex, "utf8")

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
}

function jsonLdScript(data) {
  return `<script type="application/ld+json" id="jsonld-route-graph">\n${JSON.stringify(data, null, 2)}\n    </script>`
}

function blogPostDates(path) {
  if (!path.startsWith("/blog/") || path === "/blog") return null
  const graph = routeJsonLdGraph(path)
  if (!graph?.["@graph"]) return null
  const posting = graph["@graph"].find((n) => n["@type"] === "BlogPosting")
  if (!posting) return null
  return { published: posting.datePublished, modified: posting.dateModified }
}

function applyRouteMeta(template, path) {
  const meta = ROUTE_META[path]
  if (!meta) throw new Error(`Missing ROUTE_META for ${path}`)
  const canonical = canonicalUrl(path)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const robots = meta.robots
  const googlebot = googlebotContent(robots)
  const isBlogPost = path.startsWith("/blog/") && path !== "/blog"
  const ogType = isBlogPost ? "article" : "website"

  let out = template
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  out = out.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`,
  )
  out = out.replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`)
  out = out.replace(
    /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/>/,
    `<meta name="googlebot" content="${googlebot}" />`,
  )
  out = out.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
  out = out.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${ogType}" />`)
  out = out.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
  out = out.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
  out = out.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${description}" />`,
  )
  out = out.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`)
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${description}" />`,
  )
  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptBlock(path))

  const dates = isBlogPost ? blogPostDates(path) : null
  out = out.replace(/\s*<meta property="article:published_time" content="[^"]*" \/>/g, "")
  out = out.replace(/\s*<meta property="article:modified_time" content="[^"]*" \/>/g, "")
  if (dates) {
    const articleMeta = `\n    <meta property="article:published_time" content="${dates.published}" />\n    <meta property="article:modified_time" content="${dates.modified}" />`
    out = out.replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="https://nextcoresoft.com/nextcoresoft-logo.jpg" />${articleMeta}`,
    )
  }

  const routeLd = routeJsonLdGraph(path)
  const routeScript = routeLd ? `\n    ${jsonLdScript(routeLd)}` : ""
  if (out.includes("<!-- END:WEBSITE_JSONLD -->")) {
    out = out.replace(
      "<!-- END:WEBSITE_JSONLD -->",
      `<!-- END:WEBSITE_JSONLD -->${routeScript}`,
    )
  } else {
    out = out.replace("</head>", `${routeScript}\n  </head>`)
  }

  return out
}

let written = 0
for (const path of INDEXABLE_PATHS) {
  if (path === "/") {
    writeFileSync(distIndex, applyRouteMeta(html, "/"), "utf8")
    continue
  }
  const pageHtml = applyRouteMeta(html, path)
  const outFile = join(root, "dist", path.slice(1), "index.html")
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, pageHtml, "utf8")
  written += 1
}

console.log(`Prerendered static HTML for ${written} routes (plus / index.html)`)
