/**
 * After Vite build: copy index.html per indexable route with correct static
 * title, description, and canonical — helps crawlers and URL Inspection before JS runs.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { INDEXABLE_PATHS } from "../shared/indexable-paths.mjs"
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

function applyRouteMeta(template, path) {
  const meta = ROUTE_META[path]
  if (!meta) throw new Error(`Missing ROUTE_META for ${path}`)
  const canonical = canonicalUrl(path)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const robots = meta.robots
  const googlebot = googlebotContent(robots)

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
