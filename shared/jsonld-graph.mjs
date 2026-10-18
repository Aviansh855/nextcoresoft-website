/**
 * Route-specific Schema.org @graph (Organization/WebSite live in index.html static blocks).
 * Used by prerender + React RouteJsonLd — pass blogPosts from JSON source.
 */
import { SERVICES_CATALOG, SERVICE_SLUGS } from "./services-catalog.mjs"
import { SITE } from "./site.mjs"

export const ORG_ID = `${SITE.url}/#organization`
export const WEBSITE_ID = `${SITE.url}/#website`
export const LOGO_ID = `${SITE.url}/#logo`

export function logoImageObject() {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: SITE.logoUrl,
    contentUrl: SITE.logoUrl,
  }
}

function pageUrl(path) {
  // Preferred public URL = final URL after Cloudflare's 308 (trailing slash).
  const clean = path.replace(/\/+$/, "")
  return clean === "" ? `${SITE.url}/` : `${SITE.url}${clean}/`
}

function entityBase(path) {
  return pageUrl(path)
}

function wrapGraph(graph) {
  const nodes = graph.filter(Boolean)
  if (nodes.length === 0) return null
  return { "@context": "https://schema.org", "@graph": nodes }
}

function faqNode(faqs, id) {
  if (!faqs?.length) return null
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

function breadcrumbNode(items, id) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  }
}

function webPageNode(path, meta, webPageType = "WebPage", extra = {}) {
  const url = pageUrl(path)
  return {
    "@type": webPageType,
    "@id": `${url}#webpage`,
    url,
    name: meta.h1,
    description: meta.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": LOGO_ID },
    inLanguage: "en-US",
    ...extra,
  }
}

function professionalServiceNode() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#professional-service`,
    name: SITE.name,
    url: `${SITE.url}/`,
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
      itemListElement: SERVICES_CATALOG.map((s, i) => ({
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

function serviceNode(path, meta, slug) {
  const catalog = SERVICES_CATALOG.find((s) => s.slug === slug)
  return {
    "@type": "Service",
    "@id": `${entityBase(path)}#service`,
    name: meta.h1,
    description: meta.description,
    url: pageUrl(path),
    provider: { "@id": ORG_ID },
    serviceType: catalog?.title ?? meta.h1,
    areaServed: { "@type": "Place", name: "Worldwide" },
  }
}

function blogPostingNode(post, path) {
  const url = pageUrl(path)
  const webpageId = `${url}#webpage`
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@id": webpageId },
    headline: post.h1,
    description: post.metaDescription,
    url,
    datePublished: post.published,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: post.author ?? `${SITE.name} Editorial Team`,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      logo: logoImageObject(),
    },
    image: logoImageObject(),
    inLanguage: "en-US",
  }
}

/**
 * @param {string} path — indexable path, no trailing slash (except `/`)
 * @param {{ blogPosts?: object[], seoFaqs?: typeof import("./seo-faqs.json"), routeMeta?: Record<string, { h1: string, description: string, title?: string }> }} [ctx]
 */
export function buildRouteJsonLdGraph(path, ctx = {}) {
  const routeMeta = ctx.routeMeta
  if (!routeMeta) return null
  const meta = routeMeta[path]
  if (!meta) return null

  const blogPosts = ctx.blogPosts ?? []
  const SEO_FAQS = ctx.seoFaqs ?? { home: [], servicesHub: [], blogHub: [], services: {} }

  const graph = []
  const base = entityBase(path)

  const addPageWithBreadcrumb = (webPageType, crumbs, extraWebPage = {}) => {
    const bcId = `${base}#breadcrumb`
    graph.push(breadcrumbNode(crumbs, bcId))
    graph.push(
      webPageNode(path, meta, webPageType, {
        breadcrumb: { "@id": bcId },
        ...extraWebPage,
      }),
    )
  }

  if (path === "/") {
    addPageWithBreadcrumb("WebPage", [{ name: "Home", path: "/" }])
    const faq = faqNode(SEO_FAQS.home, `${SITE.url}/#faq`)
    if (faq) graph.push(faq)
    graph.push(professionalServiceNode())
    return wrapGraph(graph)
  }

  if (path === "/about") {
    addPageWithBreadcrumb("AboutPage", [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ])
    return wrapGraph(graph)
  }

  if (path === "/contact") {
    addPageWithBreadcrumb("ContactPage", [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ])
    return wrapGraph(graph)
  }

  if (path === "/portfolio") {
    addPageWithBreadcrumb("WebPage", [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
    ])
    return wrapGraph(graph)
  }

  if (path === "/services") {
    addPageWithBreadcrumb("WebPage", [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ])
    const faq = faqNode(SEO_FAQS.servicesHub, `${base}#faq`)
    if (faq) graph.push(faq)
    return wrapGraph(graph)
  }

  if (path === "/blog") {
    const bcId = `${base}#breadcrumb`
    graph.push(
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ],
        bcId,
      ),
    )
    graph.push(
      webPageNode(path, meta, "CollectionPage", {
        breadcrumb: { "@id": bcId },
        hasPart: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          url: `${SITE.url}/blog/${p.slug}/`,
          headline: p.h1,
        })),
      }),
    )
    const faq = faqNode(SEO_FAQS.blogHub, `${base}#faq`)
    if (faq) graph.push(faq)
    return wrapGraph(graph)
  }

  if (path.startsWith("/blog/") && path !== "/blog") {
    const slug = path.slice("/blog/".length)
    const post = blogPosts.find((p) => p.slug === slug)
    if (!post) return null

    const bcId = `${base}#breadcrumb`
    graph.push(
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ],
        bcId,
      ),
    )
    const url = pageUrl(path)
    graph.push(
      webPageNode(path, meta, "WebPage", {
        breadcrumb: { "@id": bcId },
      }),
    )
    graph.push(blogPostingNode(post, path))
    const faq = faqNode(post.faqs, `${url}#faq`)
    if (faq) graph.push(faq)
    return wrapGraph(graph)
  }

  if (path.startsWith("/services/")) {
    const slug = path.slice("/services/".length)
    if (!SERVICE_SLUGS.includes(slug)) return null

    const catalog = SERVICES_CATALOG.find((s) => s.slug === slug)
    const bcId = `${base}#breadcrumb`
    graph.push(
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: catalog?.title ?? meta.h1, path },
        ],
        bcId,
      ),
    )
    graph.push(
      webPageNode(path, meta, "WebPage", {
        breadcrumb: { "@id": bcId },
        about: { "@id": `${base}#service` },
      }),
    )
    graph.push(serviceNode(path, meta, slug))
    const serviceFaqs = SEO_FAQS.services[slug]
    const faq = faqNode(serviceFaqs, `${base}#faq`)
    if (faq) graph.push(faq)
    return wrapGraph(graph)
  }

  if (path === "/privacy" || path === "/terms") {
    const label = path === "/privacy" ? "Privacy Policy" : "Terms of Service"
    addPageWithBreadcrumb("WebPage", [
      { name: "Home", path: "/" },
      { name: label, path },
    ])
    return wrapGraph(graph)
  }

  return null
}
