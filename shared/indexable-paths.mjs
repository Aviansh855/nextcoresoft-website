/**
 * Single source of truth for URLs that should return HTTP 200 (indexable app routes).
 * Used by sitemap generation, Cloudflare Pages middleware, and Vercel edge middleware.
 *
 * SEO canonical policy (2026-10-18): internal route keys below stay WITHOUT a
 * trailing slash, but the preferred public URL is the FINAL URL after
 * Cloudflare Pages' 308 — i.e. WITH a trailing slash (`/portfolio/`), apex
 * HTTPS host only. `preferredPath()` converts a route key to that public
 * form; sitemap.xml, canonical, og:url and JSON-LD must all use it so the
 * declared canonical matches the URL that actually serves 200.
 */

import { BLOG_INDEX_PATH, blogPostIndexablePaths, blogSitemapEntries } from "./blog-index.mjs"

export const SITE_ORIGIN = "https://nextcoresoft.com"

export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/contact",
  "/portfolio",
  BLOG_INDEX_PATH,
  ...blogPostIndexablePaths(),
  "/services",
  "/services/custom-software",
  "/services/mobile-apps",
  "/services/ai-automation",
  "/services/cloud-api",
  "/services/seo-geo",
  "/pricing",
  "/pricing/ai-automation",
  "/solutions/dealership-service-management",
  "/privacy",
  "/terms",
]

const INDEXABLE = new Set(INDEXABLE_PATHS)

/** Normalize pathname: decode, collapse slashes, strip trailing slash (except root). */
export function normalizePathname(pathname) {
  let path = pathname.split("?")[0].split("#")[0]
  try {
    path = decodeURIComponent(path)
  } catch {
    /* keep encoded */
  }
  if (!path.startsWith("/")) path = `/${path}`
  path = path.replace(/\/+/g, "/")
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path || "/"
}

/** Public preferred form of a route key: "/" stays "/", others get a trailing slash. */
export function preferredPath(pathname) {
  const path = normalizePathname(pathname)
  return path === "/" ? "/" : `${path}/`
}

export function isStaticAsset(pathname) {
  return /\.(avif|css|gif|ico|jpeg|jpg|js|json|map|mjs|pdf|png|svg|txt|webp|woff2?|xml)$/i.test(pathname)
}

export function isIndexablePath(pathname) {
  return INDEXABLE.has(normalizePathname(pathname))
}

/** Sitemap entries (loc without origin). */
export const SITEMAP_ENTRIES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/contact", changefreq: "monthly", priority: "0.9" },
  { loc: "/portfolio", changefreq: "monthly", priority: "0.85" },
  ...blogSitemapEntries(),
  { loc: "/services", changefreq: "monthly", priority: "0.88" },
  { loc: "/services/custom-software", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/mobile-apps", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/ai-automation", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/cloud-api", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/seo-geo", changefreq: "monthly", priority: "0.84" },
  { loc: "/pricing", changefreq: "monthly", priority: "0.82" },
  { loc: "/pricing/ai-automation", changefreq: "monthly", priority: "0.82" },
  { loc: "/solutions/dealership-service-management", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
]
