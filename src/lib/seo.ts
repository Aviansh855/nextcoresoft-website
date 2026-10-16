import { FAQS, SERVICES, SITE } from "../data/content"

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
  notFound: {
    title: "Page Not Found | NextCoreSoft",
    description: "This page does not exist. Visit the NextCoreSoft homepage or contact us about your project.",
    path: "/404",
    robots: "noindex, follow",
  },
} as const

export function servicePageMeta(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return null
  const descriptions: Record<string, string> = {
    "custom-software":
      "Custom web apps, admin panels, and internal tools built around your workflow. Discovery, milestone delivery, and integrations. Talk to NextCoreSoft.",
    "mobile-apps":
      "Android and iOS business apps for customers and field teams. Cross-platform development, APIs, and launch support from NextCoreSoft.",
    "ai-automation":
      "AI automation and intelligent workflows: inquiry routing, document processing, and assistants grounded in your data — when it genuinely saves time.",
    "cloud-api":
      "Cloud deployment, REST and third-party API integrations, monitoring, and ongoing maintenance for software NextCoreSoft builds or inherits.",
  }
  return {
    title: `${service.title} | NextCoreSoft`,
    description: descriptions[service.slug] ?? service.summary,
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

  const canonicalPath = path === "/404" ? "/404" : path
  const canonicalHref =
    canonicalPath === "/" ? `${SITE.url}/` : `${SITE.url}${canonicalPath.replace(/\/$/, "")}`

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
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
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
  if (!service) return null
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    serviceType: service.title,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
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

export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/contact",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  "/privacy",
  "/terms",
] as const
