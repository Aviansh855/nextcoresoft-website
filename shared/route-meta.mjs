import { SITE_ORIGIN } from "./indexable-paths.mjs"

/** Static HTML meta per indexable route. Service h1/lead must match `SERVICE_DETAILS` in `src/data/content.ts`. */
export const ROUTE_META = {
  "/": {
    title: "NextCoreSoft | Custom Software, Mobile Apps & AI Automation",
    description:
      "NextCoreSoft builds custom software, Android and iOS apps, and AI workflow automation for SMBs and startups. Free consultation. Milestone-based delivery.",
    h1: "Custom Software, Mobile Apps & AI Automation",
    staticLead:
      "NextCoreSoft builds custom software, mobile applications, and AI workflow automation for small and medium-sized businesses and startups.",
    robots: "index, follow",
  },
  "/about": {
    title: "About NextCoreSoft | Software & AI Automation Studio",
    description:
      "Learn how NextCoreSoft designs custom software, mobile apps, and practical AI automations around real business workflows — with clear scope, timeline, and cost.",
    h1: "A software studio focused on how businesses actually operate",
    staticLead:
      "NextCoreSoft designs and builds custom software, mobile apps, and AI automations for SMBs, startups, and teams modernizing operations.",
    robots: "index, follow",
  },
  "/contact": {
    title: "Contact NextCoreSoft | Free Software Consultation",
    description:
      "Describe your project and book a free consultation with NextCoreSoft. Custom software, mobile development, AI automation, and integrations for growing businesses.",
    h1: "Discuss your project or request a quote",
    staticLead:
      "Tell us what you need built or automated. We reply within one business day with scope guidance and how we would quote the work.",
    robots: "index, follow",
  },
  "/portfolio": {
    title: "Project Portfolio | NextCoreSoft",
    description:
      "Explore software and app builds from NextCoreSoft — service management, mobile apps, booking systems, and automation. Project showcases, not verified client case studies unless stated.",
    h1: "Software and apps we can show you today",
    staticLead:
      "Real builds and product-style projects from NextCoreSoft, presented as project showcases — ask us for a walkthrough during a consultation.",
    robots: "index, follow",
  },
  "/services/custom-software": {
    title: "Custom Software Development for SMBs | NextCoreSoft",
    description:
      "NextCoreSoft builds custom web apps, admin panels, and internal tools for SMBs and startups stuck on spreadsheets. Fewer manual steps, clearer workflows. Free consultation.",
    h1: "Custom Software Development for Growing Businesses",
    staticLead:
      "Purpose-built web apps, admin panels, and internal tools for teams that have outgrown spreadsheets and generic SaaS.",
    robots: "index, follow",
  },
  "/services/mobile-apps": {
    title: "Android & iOS App Development | NextCoreSoft",
    description:
      "NextCoreSoft builds Android and iOS apps for customer self-service and field teams. Store launch, secure APIs, offline-ready workflows. For service, retail, and ops-heavy businesses.",
    h1: "Android & iOS App Development for Customers and Field Teams",
    staticLead:
      "Mobile apps for both major platforms — for customers in the app stores and for staff who work away from a desk.",
    robots: "index, follow",
  },
  "/services/ai-automation": {
    title: "AI Automation for Business Workflows | NextCoreSoft",
    description:
      "NextCoreSoft automates inquiries, documents, and routine handoffs with practical AI — for teams drowning in email and retyping. Human review where it matters. SMBs and growing companies.",
    h1: "AI Automation & Intelligent Workflows",
    staticLead:
      "Practical AI for inquiry routing, document extraction, and routine handoffs — with humans in the loop when accuracy matters.",
    robots: "index, follow",
  },
  "/services/cloud-api": {
    title: "Cloud Deployment, APIs & Integrations | NextCoreSoft",
    description:
      "NextCoreSoft connects CRMs, accounting, payments, and custom software with REST APIs, cloud hosting, and ongoing maintenance — for teams tired of manual exports and broken integrations.",
    h1: "Cloud, API Integrations & Software Maintenance",
    staticLead:
      "APIs and integrations that move data between your tools, plus cloud hosting and maintenance after launch.",
    robots: "index, follow",
  },
  "/privacy": {
    title: "Privacy Policy | NextCoreSoft",
    description:
      "How NextCoreSoft collects, uses, and protects information submitted through the website contact form and optional analytics.",
    h1: "Privacy Policy",
    staticLead: "How we handle information you submit through the NextCoreSoft website contact form and optional analytics.",
    robots: "index, follow",
  },
  "/terms": {
    title: "Terms of Service | NextCoreSoft",
    description: "Terms governing use of the NextCoreSoft website and related services.",
    h1: "Terms of Service",
    staticLead: "Terms for using the NextCoreSoft website and related services.",
    robots: "index, follow",
  },
}

export function canonicalUrl(path) {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

export function googlebotContent(robots) {
  return robots.includes("noindex")
    ? robots
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
}

export function noscriptBlock(path) {
  const meta = ROUTE_META[path]
  if (!meta) return ""
  const h1 = escapeHtml(meta.h1)
  const lead = escapeHtml(meta.staticLead)
  const links = [
    ["/", "Home"],
    ["/about", "About"],
    ["/contact", "Contact"],
    ["/portfolio", "Portfolio"],
    ["/services/custom-software", "Custom software"],
    ["/services/mobile-apps", "Mobile apps"],
    ["/services/ai-automation", "AI automation"],
    ["/services/cloud-api", "Cloud & API"],
  ]
    .map(
      ([href, label]) =>
        `<a href="${SITE_ORIGIN}${href === "/" ? "/" : href}">${escapeHtml(label)}</a>`,
    )
    .join(" · ")

  return `<noscript>
      <main>
        <h1>${h1}</h1>
        <p>${lead}</p>
        <nav aria-label="Site">${links}</nav>
      </main>
    </noscript>`
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
}
