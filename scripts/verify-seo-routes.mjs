import { readFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { INDEXABLE_PATHS, SITEMAP_ENTRIES } from "../shared/indexable-paths.mjs"
import { ROUTE_META, canonicalUrl } from "../shared/route-meta.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")

let failed = false

function fail(msg) {
  console.error(msg)
  failed = true
}

for (const path of INDEXABLE_PATHS) {
  if (path !== "/" && path.endsWith("/")) {
    fail(`INDEXABLE_PATHS entry must not use trailing slash: ${path}`)
  }
}

for (const entry of SITEMAP_ENTRIES) {
  if (entry.loc !== "/" && entry.loc.endsWith("/")) {
    fail(`SITEMAP_ENTRIES loc must not use trailing slash: ${entry.loc}`)
  }
  if (!INDEXABLE_PATHS.includes(entry.loc)) {
    fail(`SITEMAP loc ${entry.loc} is not in INDEXABLE_PATHS`)
  }
}

if (SITEMAP_ENTRIES.length !== INDEXABLE_PATHS.length) {
  fail(`SITEMAP_ENTRIES (${SITEMAP_ENTRIES.length}) must match INDEXABLE_PATHS (${INDEXABLE_PATHS.length})`)
}

const redirectsPath = join(dist, "_redirects")
if (!existsSync(redirectsPath)) {
  fail("Missing dist/_redirects — run vite build")
} else {
  const redirects = readFileSync(redirectsPath, "utf8")
  for (const path of INDEXABLE_PATHS) {
    if (path === "/") continue
    const asset = `/${path.slice(1)}/index.html`
    if (!redirects.includes(`${path} `) && !redirects.includes(`${path}\t`)) {
      fail(`dist/_redirects missing rewrite for ${path}`)
    }
    if (!redirects.includes(`${path}/`)) {
      fail(`dist/_redirects missing trailing-slash rewrite for ${path}/`)
    }
    if (!redirects.includes(asset)) {
      fail(`dist/_redirects must rewrite ${path} to ${asset}`)
    }
  }
}

const sitemapPath = join(root, "public", "sitemap.xml")
if (!existsSync(sitemapPath)) {
  fail("Missing public/sitemap.xml — run generate-sitemap.mjs")
} else {
  const sitemap = readFileSync(sitemapPath, "utf8")
  for (const path of INDEXABLE_PATHS) {
    const loc = canonicalUrl(path)
    if (!sitemap.includes(`<loc>${loc}</loc>`)) {
      fail(`sitemap.xml missing <loc>${loc}</loc>`)
    }
  }
  if (sitemap.includes("/portfolio/</loc>") || sitemap.match(/<loc>https:\/\/nextcoresoft\.com\/[^<]+\/<\/loc>/)) {
    fail("sitemap.xml must not list trailing-slash URLs")
  }
}

for (const path of INDEXABLE_PATHS) {
  const file =
    path === "/"
      ? join(dist, "index.html")
      : join(dist, path.slice(1), "index.html")
  if (!existsSync(file)) {
    fail(`Missing prerender file: ${file}`)
    continue
  }
  const html = readFileSync(file, "utf8")
  const meta = ROUTE_META[path]
  if (!meta) {
    fail(`Missing ROUTE_META for ${path}`)
    continue
  }
  const canonical = canonicalUrl(path)
  if (canonical.endsWith("/") && path !== "/") {
    fail(`canonicalUrl must not end with / for ${path}`)
  }
  const titleEsc = meta.title.replace(/&/g, "&amp;")
  if (!html.includes(`<title>${titleEsc}</title>`)) {
    fail(`${path}: title mismatch in ${file}`)
  }
  if (!html.includes(`href="${canonical}"`)) {
    fail(`${path}: canonical ${canonical} not found in ${file}`)
  }
  if (!html.includes(`property="og:url" content="${canonical}"`)) {
    fail(`${path}: og:url must match canonical ${canonical}`)
  }
  if (!html.includes(meta.description.slice(0, 40))) {
    fail(`${path}: description snippet missing in ${file}`)
  }
}

if (failed) process.exit(1)
console.log(`SEO route HTML verified for ${INDEXABLE_PATHS.length} paths (sitemap + canonical policy OK).`)
