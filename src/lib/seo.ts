import { FAQS, SERVICE_DETAILS, SERVICES, SITE } from "../data/content"

export interface PageMeta {
  title: string
  description: string
  path: string
  /** Default: index, follow */
  robots?: string
  /** Override default OG image */
  image?: string
}

const DEFAULT_OG_IMAGE = SITE.logoUrl
const ORG_ID = `${SITE.url}/#organization`

/** Keyword-aware defaults per route (≤60 char titles, ~150–160 char descriptions where possible). */
export const ROUTE_SEO = {
  home: {
    title: "NextCoreSoft | Custom Software, Mobile Apps & AI Automation",
    description:
      "NextCoreSoft builds custom software, Android and iOS apps, and AI workflow automation for SMBs and startups. Free consultation. Milestone-based delivery.",
    path: "/",
  },
  about: {
    title: "About NextCoreSoft | Software & AI Automation Studio",
    description:
      "Learn how NextCoreSoft designs custom software, mobile apps, and practical AI automations around real business workflows — with clear scope, timeline, and cost.",
    path: "/about",
  },
  contact: {
    title: "Contact NextCoreSoft | Free Software Consultation",
    description:
      "Describe your project and book a free consultation with NextCoreSoft. Custom software, mobile development, AI automation, and integrations for growing businesses.",
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy | NextCoreSoft",
    description:
      "How NextCoreSoft collects, uses, and protects information submitted through the website contact form and optional analytics.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Service | NextCoreSoft",
    description: "Terms governing use of the NextCoreSoft website and related services.",
    path: "/terms",
  },
  portfolio: {
    title: "Project Portfolio | NextCoreSoft",
    description:
      "Explore software and app builds from NextCoreSoft — service management, mobile apps, booking systems, and automation. Project showcases, not verified client case studies unless stated.",
    path: "/portfolio",
  },
  notFound: {
    title: "Page Not Found | NextCoreSoft",
    description: "This page does not exist. Visit the NextCoreSoft homepage or contact us about your project.",
    path: "/404",
    robots: "noindex, follow",
  },
} as const

export function servicePageMeta(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug)
  const details = SERVICE_DETAILS[slug as keyof typeof SERVICE_DETAILS]
  if (!service || !details) return null
  return {
    title: `${details.seoTitle} | ${SITE.name}`,
    description: details.metaDescription,
    path: `/services/${service.slug}`,
  }
}

/**
 * Sets document metadata for the current route (client-side).
 * Google can render JS, but indexing may lag vs server-rendered tags — see README SEO notes.
 */
export function applyMeta({ title, description, path, robots = "index, follow", image }: PageMeta) {
  document.title = title

  setMeta("description", description)
  setMeta("robots", robots)
  setMeta(
    "googlebot",
    robots.includes("noindex")
      ? robots
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  )
  setMeta("og:title", title, "property")
  setMeta("og:description", description, "property")
  setMeta("og:url", path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`, "property")
  setMeta("og:type", "website", "property")
  setMeta("og:site_name", SITE.name, "property")
  setMeta("og:locale", "en_US", "property")
  setMeta("og:image", image ?? DEFAULT_OG_IMAGE, "property")
  setMeta("twitter:card", "summary_large_image")
  setMeta("twitter:image", image ?? DEFAULT_OG_IMAGE)
  setMeta("twitter:title", title)
  setMeta("twitter:description", description)

  const canonicalHref =
    path === "/" ? `${SITE.url}/` : `${SITE.url}${path.replace(/\/$/, "")}`

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement("link")
    canonical.rel = "canonical"
    document.head.appendChild(canonical)
  }
  canonical.href = canonicalHref
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

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logoUrl,
    description: SITE.description,
    email: "hello@nextcoresoft.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@nextcoresoft.com",
        url: `${SITE.url}/contact`,
        availableLanguage: ["English"],
      },
    ],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  }
}

export function faqPageSchema() {
  return faqPageSchemaFromItems(FAQS)
}

export function faqPageSchemaFromItems(faqs: readonly { question: string; answer: string }[]) {
  if (faqs.length === 0) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function serviceSchema(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug)
  const details = SERVICE_DETAILS[slug as keyof typeof SERVICE_DETAILS]
  if (!service || !details) return null
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: details.h1,
    description: details.metaDescription,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    serviceType: service.title,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  }
}

export function webPageSchema(meta: { title: string; description: string; path: string }) {
  const url = meta.path === "/" ? `${SITE.url}/` : `${SITE.url}${meta.path}`
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE.url}/` : `${SITE.url}${item.path}`,
    })),
  }
}

/** @deprecated use organizationSchema() — kept for any legacy imports */
export const ORGANIZATION_SCHEMA = organizationSchema()

/** Keep in sync with `shared/indexable-paths.mjs` (sitemap + edge 404 middleware). */
export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/contact",
  "/portfolio",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  "/privacy",
  "/terms",
] as const
