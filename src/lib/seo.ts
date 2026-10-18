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
    title: "NextCoreSoft | Custom Software, Web & App Development, AI Automation",
    description:
      "Custom software development company for web apps, business websites, Android & iOS apps, and AI automation. NextCoreSoft works with SMBs worldwide. Free consultation.",
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
  const logo = { "@type": "ImageObject" as const, url: SITE.logoUrl, contentUrl: SITE.logoUrl }
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    datePublished: post.published,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "author" in post && post.author ? post.author : `${SITE.name} Editorial Team`,
    },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: SITE.name, logo },
    image: logo,
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
    email: "hello@nextcoresoft.com",
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
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
      description:
        "Remote delivery; consult via video and email. No public storefront address listed on this site.",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@nextcoresoft.com",
        url: `${SITE.url}/contact/`,
        availableLanguage: ["English"],
      },
    ],
  }
}

/** Visible on homepage — describes what the business offers (not a guarantee of local map rankings). */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#professional-service`,
    name: SITE.name,
    url: SITE.url,
    image: SITE.logoUrl,
    description: SITE.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
    serviceType: [
      "Custom software development",
      "Web development",
      "Mobile application development",
      "AI automation consulting and implementation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software development services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: `${SITE.url}/services/${s.slug}/`,
          description: s.summary,
        },
      })),
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: details.h1,
    description: details.metaDescription,
    url: `${SITE.url}/services/${service.slug}/`,
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
