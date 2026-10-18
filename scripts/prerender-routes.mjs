/**
 * After Vite build: copy index.html per indexable route with correct static
 * title, description, and canonical — helps crawlers and URL Inspection before JS runs.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { INDEXABLE_PATHS, SITE_ORIGIN } from "../shared/indexable-paths.mjs"
import { routeJsonLdGraph } from "../shared/jsonld-by-route.mjs"
import { bingbotContent, canonicalUrl, googlebotContent, ROUTE_META } from "../shared/route-meta.mjs"
import { BLOG_POSTS, getBlogPost } from "../shared/blog-posts.mjs"
import { SERVICES_CATALOG } from "../shared/services-catalog.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const distIndex = join(root, "dist", "index.html")
let html = readFileSync(distIndex, "utf8")

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
}

/** Plain-text cleanup for Markdown-ish blog copy already stored in blog-posts.json. */
function stripMd(raw) {
  return String(raw ?? "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim()
}
function txt(raw) {
  return escapeHtml(stripMd(raw))
}
function renderBlogSection(s) {
  switch (s.type) {
    case "h2":
      return `<h2>${txt(s.text)}</h2>`
    case "h3":
      return `<h3>${txt(s.text)}</h3>`
    case "p":
      return `<p>${txt(s.text)}</p>`
    case "ul":
    case "ol":
      return `<${s.type}>${(s.items ?? []).map((i) => `<li>${txt(i)}</li>`).join("")}</${s.type}>`
    case "table": {
      const head = (s.headers ?? []).map((h) => `<th>${txt(h)}</th>`).join("")
      const rows = (s.rows ?? [])
        .map((r) => `<tr>${r.map((c) => `<td>${txt(c)}</td>`).join("")}</tr>`)
        .join("")
      return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`
    }
    case "cta":
      return `<p>${txt(s.text)}</p>${s.href ? `<p><a href="${escapeHtml(s.href)}">${txt(s.buttonLabel ?? "Contact NextCoreSoft")}</a></p>` : ""}`
    default:
      return s.text ? `<p>${txt(s.text)}</p>` : ""
  }
}

/**
 * Static fallback inside #root: real H1/lead (and full blog text) for no-JS
 * visitors and crawlers that do not execute JavaScript. React's createRoot
 * replaces this content on load, so JS users see the full app unchanged.
 * Keep this faithful to visible page data — no hidden or extra claims.
 */
function staticRootBlock(path) {
  const meta = ROUTE_META[path]
  const nav = [
    ["/", "Home"],
    ["/about", "About"],
    ["/contact", "Contact"],
    ["/portfolio", "Portfolio"],
    ["/blog", "Blog"],
    ["/services", "Services"],
  ]
    .map(([href, label]) => `<a href="${canonicalUrl(href)}">${label}</a>`)
    .join(" · ")
  let extra = ""
  if (path === "/blog") {
    extra = `<ul>${BLOG_POSTS.map((p) => `<li><a href="${SITE_ORIGIN}/blog/${p.slug}/">${txt(p.h1)}</a> — ${txt(p.excerpt)}</li>`).join("")}</ul>`
  } else if (path.startsWith("/blog/")) {
    const post = getBlogPost(path.slice("/blog/".length))
    if (post) {
      const metaLine = [post.author, post.published ? `Published ${post.published}` : "", post.updated ? `Updated ${post.updated}` : ""]
        .filter(Boolean)
        .map((x) => txt(x))
        .join(" · ")
      const faqs = (post.faqs ?? []).length
        ? `<h2>Frequently asked questions</h2>${post.faqs.map((f) => `<h3>${txt(f.question)}</h3><p>${txt(f.answer)}</p>`).join("")}`
        : ""
      extra = `${metaLine ? `<p>${metaLine}</p>` : ""}${(post.sections ?? []).map(renderBlogSection).join("\n")}${faqs}`
    }
  } else if (path === "/services" || path.startsWith("/services/")) {
    extra = `<ul>${SERVICES_CATALOG.map((s) => `<li><a href="${SITE_ORIGIN}/services/${s.slug}/">${txt(s.title)}</a> — ${txt(s.summary)}</li>`).join("")}</ul>`
  }
  return `<main id="static-prerender"><h1>${escapeHtml(meta.h1)}</h1><p>${escapeHtml(meta.staticLead)}</p>${extra}<nav aria-label="Site">${nav}</nav></main>`
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
  const bingbot = bingbotContent(robots)
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
  if (out.includes('name="bingbot"')) {
    out = out.replace(
      /<meta\s+name="bingbot"\s+content="[^"]*"\s*\/>/,
      `<meta name="bingbot" content="${bingbot}" />`,
    )
  } else {
    out = out.replace(
      /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/>/,
      `<meta name="googlebot" content="${googlebot}" />\n    <meta name="bingbot" content="${bingbot}" />`,
    )
  }
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
  // Static fallback now lives inside #root (serves no-JS users too); remove
  // the old <noscript>-only block so no-JS visitors don't see duplicated H1s.
  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, "")
  out = out.replace('<div id="root"></div>', `<div id="root">${staticRootBlock(path)}</div>`)

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
