import { SITE_ORIGIN, isIndexablePath, normalizePathname, preferredPath } from "./indexable-paths.mjs"

/**
 * One-hop 301 target for non-canonical request URLs (GSC "Page with redirect").
 * - www → apex HTTPS
 * - indexable paths without trailing slash → slash form (final canonical URL)
 */
export function getCanonicalRedirectUrl(requestUrl) {
  const url = new URL(requestUrl)
  const host = url.hostname.toLowerCase()
  const pathNorm = normalizePathname(url.pathname)
  const onWww = host === "www.nextcoresoft.com"
  const needsTrailingSlash =
    isIndexablePath(pathNorm) && pathNorm !== "/" && !url.pathname.endsWith("/")

  if (!onWww && !needsTrailingSlash) return null

  const pathname = isIndexablePath(pathNorm) ? preferredPath(pathNorm) : url.pathname
  const dest = new URL(pathname, SITE_ORIGIN)
  dest.search = url.search
  dest.hash = url.hash
  return dest.toString()
}

/** Normalize outbound links in content (apex + trailing slash on indexable routes). */
export function canonicalPublicHref(href) {
  if (!href) return href
  try {
    const absolute =
      href.startsWith("/") ? new URL(href, SITE_ORIGIN) : new URL(href)
    if (absolute.origin !== SITE_ORIGIN && absolute.hostname.toLowerCase() !== "www.nextcoresoft.com") {
      return href
    }
    const pathNorm = normalizePathname(absolute.pathname)
    if (isIndexablePath(pathNorm)) {
      absolute.hostname = new URL(SITE_ORIGIN).hostname
      absolute.protocol = "https:"
      absolute.pathname = preferredPath(pathNorm)
    }
    return absolute.toString()
  } catch {
    return href
  }
}
