import { SITE } from "../data/content"

/** Canonical absolute URL for on-site paths (always apex HTTPS). */
export function siteAbsoluteUrl(href: string): string {
  const origin = SITE.url.replace(/\/$/, "")

  if (/^https?:\/\/localhost(?::\d+)?/i.test(href)) {
    try {
      const u = new URL(href)
      return `${origin}${u.pathname}${u.search}${u.hash}`
    } catch {
      return origin
    }
  }

  if (/^https?:\/\/(www\.)?nextcoresoft\.com/i.test(href)) {
    try {
      const u = new URL(href)
      return `${origin}${u.pathname}${u.search}${u.hash}`
    } catch {
      return href
    }
  }

  if (href.startsWith("/")) {
    return `${origin}${href}`
  }

  return href
}

export function isOnSiteHref(href: string): boolean {
  if (href.startsWith("/")) return true
  if (/^https?:\/\/(www\.)?nextcoresoft\.com/i.test(href)) return true
  if (/^https?:\/\/localhost(?::\d+)?/i.test(href)) return true
  return false
}
