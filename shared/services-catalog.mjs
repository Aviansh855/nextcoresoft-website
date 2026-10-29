/** Service list for JSON-LD OfferCatalog — keep in sync with `src/data/content.ts` SERVICES. */
export const SERVICES_CATALOG = [
  {
    slug: "custom-software",
    title: "Custom Software Development",
    summary:
      "Web applications, internal tools, and business systems designed around how your company actually works.",
  },
  {
    slug: "mobile-apps",
    title: "Android & iOS App Development",
    summary:
      "Mobile applications for customers, field teams, and internal staff — built for both major platforms.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Intelligent Workflows",
    summary:
      "AI integrations and business-process automation that read, route, and draft routine work — only where that genuinely saves time.",
  },
  {
    slug: "cloud-api",
    title: "Cloud, APIs & Maintenance",
    summary:
      "The connective layer: third-party integrations, cloud deployment, and the maintenance that keeps software reliable after launch.",
  },
  {
    slug: "seo-geo",
    title: "SEO, AEO & GEO Services",
    summary:
      "Technical SEO, structured data, sitemaps, and AI-discovery content for business websites — without guaranteed rankings.",
  },
]

export const SERVICE_SLUGS = SERVICES_CATALOG.map((s) => s.slug)
