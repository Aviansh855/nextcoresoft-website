/**
 * Single source of truth for URLs that should return HTTP 200 (indexable app routes).
 * Used by sitemap generation, Cloudflare Pages middleware, and Vercel edge middleware.
 */

export const SITE_ORIGIN = "https://nextcoresoft.com"

export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/contact",
  "/portfolio",
  "/services/custom-software",
  "/services/mobile-apps",
  "/services/ai-automation",
  "/services/cloud-api",
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
  { loc: "/services/custom-software", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/mobile-apps", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/ai-automation", changefreq: "monthly", priority: "0.85" },
  { loc: "/services/cloud-api", changefreq: "monthly", priority: "0.85" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
]
