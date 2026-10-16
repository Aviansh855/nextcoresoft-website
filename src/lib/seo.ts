import { SITE } from "../data/content"

export interface PageMeta {
  title: string
  description: string
  path: string
}

/**
 * Sets document metadata for the current route.
 * Kept dependency-free: one small function instead of a head-management library.
 */
export function applyMeta({ title, description, path }: PageMeta) {
  document.title = title

  setMeta("description", description)
  setMeta("og:title", title, "property")
  setMeta("og:description", description, "property")
  setMeta("og:url", `${SITE.url}${path}`, "property")
  setMeta("og:type", "website", "property")
  setMeta("og:site_name", SITE.name, "property")
  setMeta("og:image", SITE.logoUrl, "property")
  setMeta("twitter:card", "summary_large_image")
  setMeta("twitter:image", SITE.logoUrl)
  setMeta("twitter:title", title)
  setMeta("twitter:description", description)

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement("link")
    canonical.rel = "canonical"
    document.head.appendChild(canonical)
  }
  canonical.href = `${SITE.url}${path}`
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Verifiable organization data only — no reviews, ratings, or addresses. */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: SITE.logoUrl,
  description: SITE.description,
}
