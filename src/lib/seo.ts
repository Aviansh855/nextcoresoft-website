import { getBlogPost } from "../data/blog"
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

/** Preferred public URL: apex HTTPS + trailing slash (final URL after Cloudflare 308). */
export function preferredUrl(path: string): string {
  const clean = path.replace(/\/+$/, "")
  return clean === "" ? `${SITE.url}/` : `${SITE.url}${clean}/`
}

/** Keyword-aware defaults per route (≤60 char titles, ~150–160 char descriptions where possible). */
export const ROUTE_SEO = {
  home: {
    title: "NextCoreSoft | Custom Software Company — Jaipur, India & Remote",
    description:
      "Custom software development company for web apps, mobile apps, and AI automation — Jaipur, Rajasthan, India, and remote clients. Guides for “software company near me” on our blog. Free consultation.",
    path: "/",
  },
  services: {
    title: "Software Development Services | Web, Mobile & AI | NextCoreSoft",
    description:
      "Explore custom software development, web development, Android and iOS app development, AI automation, and API integrations — one studio, milestone-based delivery.",
    path: "/services",
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
  blog: {
    title: "Blog | NextCoreSoft — Custom Software & Automation",
    description:
      "Guides on custom software and mobile app development costs in India, MVP planning, and software project scoping for Indian SMBs and founders.",
    path: "/blog",
  },
  pricing: {
    title: "Dealership Service Management Pricing | NextCoreSoft",
    description:
      "Pricing for the Dealership Service Management Solution — Basic, Medium, and Premium plans with setup fee, monthly license, and first-year totals for Indian dealerships and service centers.",
    path: "/pricing",
  },
  dealershipSolution: {
    title: "Dealership Service Management System | NextCoreSoft",
    description:
      "Overview of NextCoreSoft Dealership Service Management software — job tracking, vehicle records, staff workflows, and optional customer mobile apps. See pricing for plans.",
    path: "/solutions/dealership-service-management",
  },
  aiAutomationPricing: {
    title: "AI Automation Pricing Plans India | NextCoreSoft",
    description:
      "AI automation pricing for Indian businesses — Starter, Growth, and Enterprise plans with setup fee and monthly license for WhatsApp, chatbots, and workflow automation.",
    path: "/pricing/ai-automation",
  },
  notFound: {
    title: "Page Not Found | NextCoreSoft",
    description: "This page does not exist. Visit the NextCoreSoft homepage or contact us about your project.",
    path: "/404",
    robots: "noindex, follow",
  },
} as const

export function blogPostMeta(slug: string) {
  const post = getBlogPost(slug)
  if (!post) return null
  return {
    title: `${post.seoTitle} | ${SITE.name}`,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  }
}

export function articleSchema(slug: string) {
  const post = getBlogPost(slug)
  if (!post) return null
  const url = `${SITE.url}/blog/${post.slug}/`
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    datePublished: post.published,
    dateModified: post.updated,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: { "@id": `${SITE.url}/#logo` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    url,
    inLanguage: "en-US",
  }
}

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
  setMeta("bingbot", robots.includes("noindex") ? robots : "index, follow")
  setMeta("og:title", title, "property")
  setMeta("og:description", description, "property")
  setMeta("og:url", preferredUrl(path), "property")
  setMeta("og:type", path.startsWith("/blog/") ? "article" : "website", "property")
  setMeta("og:site_name", SITE.name, "property")
  setMeta("og:locale", "en_US", "property")
  setMeta("og:image", image ?? DEFAULT_OG_IMAGE, "property")
  setMeta("twitter:card", "summary_large_image")
  setMeta("twitter:image", image ?? DEFAULT_OG_IMAGE)
  setMeta("twitter:title", title)
  setMeta("twitter:description", description)

  const canonicalHref = preferredUrl(path)

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
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      url: SITE.logoUrl,
      contentUrl: SITE.logoUrl,
    },
    description: SITE.description,
    email: SITE.contactEmail,
    knowsAbout: [
      "Custom software development",
      "Web application development",
      "Business website development",
      "Android app development",
      "iOS app development",
      "AI workflow automation",
      "API integration",
      "Cloud software deployment",
    ],
    areaServed: [
      {
        "@type": "Place",
        name: "Jaipur, Rajasthan, India",
        description: "Remote software delivery for Jaipur-based businesses; no public storefront address on this site.",
      },
      {
        "@type": "Place",
        name: "Worldwide",
        description: "Remote delivery; consult via video and email.",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.contactEmail,
        url: `${SITE.url}/contact/`,
        availableLanguage: ["English"],
      },
    ],
  }
}

/** Visible on homepage — describes what the business offers (not a guarantee of local map rankings). */
const OFFER_CATALOG_ID = `${SITE.url}/#offer-catalog`
const LOGO_ID = `${SITE.url}/#logo`

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#professional-service`,
    name: SITE.name,
    url: `${SITE.url}/`,
    image: { "@id": LOGO_ID },
    description: SITE.description,
    areaServed: { "@type": "Place", name: "Worldwide" },
    hasOfferCatalog: { "@id": OFFER_CATALOG_ID },
  }
}

/** Matches homepage @graph OfferCatalog — keep aligned with shared/jsonld-graph.mjs */
export function offerCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": OFFER_CATALOG_ID,
    name: "Software development services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": `${SITE.url}/services/${s.slug}/#service` },
    })),
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  }
}

export function webPageSchema(meta: { title: string; description: string; path: string }) {
  const url = preferredUrl(meta.path)
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
      item: preferredUrl(item.path),
    })),
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
  const url = `${SITE.url}/services/${service.slug}/`
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: details.h1,
    description: details.metaDescription,
    url,
    provider: { "@id": ORG_ID },
    serviceType: service.title,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  }
}

/** @deprecated use organizationSchema() — kept for any legacy imports */
export const ORGANIZATION_SCHEMA = organizationSchema()
