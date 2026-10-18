import { SITE } from "../data/content"

/** Canonical absolute URL for on-site paths (always apex HTTPS). */
export function siteAbsoluteUrl(href: string): string {
  const origin = SITE.url.replace(/\/$/, "")

  if (/^https?:\/\/localhost(?::\d+)?/i.test(href)) {
    try {
      const u = new URL(href)
      return `${origin}${preferredPathname(u.pathname)}${u.search}${u.hash}`
    } catch {
      return origin
    }
  }

  if (/^https?:\/\/(www\.)?nextcoresoft\.com/i.test(href)) {
    try {
      const u = new URL(href)
      return `${origin}${preferredPathname(u.pathname)}${u.search}${u.hash}`
    } catch {
      return href
    }
  }

  if (href.startsWith("/")) {
    try {
      const u = new URL(href, `${origin}/`)
      return `${origin}${preferredPathname(u.pathname)}${u.search}${u.hash}`
    } catch {
      return `${origin}${href}`
    }
  }

  return href
}

/** Page routes (no file extension) use the preferred trailing-slash form. */
function preferredPathname(pathname: string): string {
  if (pathname === "/" || /\.[a-z0-9]+$/i.test(pathname)) return pathname
  return pathname.endsWith("/") ? pathname : `${pathname}/`
}

export function isOnSiteHref(href: string): boolean {
  if (href.startsWith("/")) return true
  if (/^https?:\/\/(www\.)?nextcoresoft\.com/i.test(href)) return true
  if (/^https?:\/\/localhost(?::\d+)?/i.test(href)) return true
  return false
}
