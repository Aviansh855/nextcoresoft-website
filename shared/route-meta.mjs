import { blogRouteMetaByPath } from "./blog-posts.mjs"
import { SITE_ORIGIN, preferredPath } from "./indexable-paths.mjs"
import { HOME_H1, SERVICES_HUB_H1 } from "./page-headings.mjs"

/** Static HTML meta per indexable route. Service h1/lead must match `SERVICE_DETAILS` in `src/data/content.ts`. */
export const ROUTE_META = {
  "/": {
    title: "NextCoreSoft | Custom Software Company — Jaipur, India",
    description:
      "NextCoreSoft at nextcoresoft.com — official custom software, mobile apps, AI automation & SEO in Jaipur, India. Free consultation.",
    h1: HOME_H1,
    staticLead:
      "NextCoreSoft is the custom software studio at nextcoresoft.com — web applications, mobile app development, AI automation, and SEO / GEO services for growing businesses in Jaipur, India, and worldwide.",
    robots: "index, follow",
  },
  "/services": {
    title: "Web, Mobile, SEO & GEO Services | NextCoreSoft",
    description:
      "Custom software, mobile apps, cloud API, AI automation, and SEO / AEO / GEO services — search and AI discovery setup with honest scope.",
    h1: SERVICES_HUB_H1,
    staticLead:
      "Service overview for businesses looking for a software, web, mobile, or AI automation development partner.",
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
      "Book a free consultation with NextCoreSoft — custom software, mobile apps, AI automation, and integrations for growing businesses.",
    h1: "Discuss your project or request a quote",
    staticLead:
      "Tell us what you need built or automated. We aim to reply within one business day with scope guidance and how we would quote the work when volume allows.",
    robots: "index, follow",
  },
  "/portfolio": {
    title: "Project Portfolio | NextCoreSoft",
    description:
      "Project showcases from NextCoreSoft — mobile apps, service software, booking, and automation. Demos on request; not client case studies unless agreed.",
    h1: "Software and apps we can show you today",
    staticLead:
      "Real builds and product-style projects from NextCoreSoft, presented as project showcases — ask us for a walkthrough during a consultation.",
    robots: "index, follow",
  },
  "/services/custom-software": {
    title: "Custom Software & Web Development Company | NextCoreSoft",
    description:
      "Custom software and web apps — admin panels and internal tools that replace spreadsheets. Built for your workflow. Free consultation with NextCoreSoft.",
    h1: "Custom Software and Web Development for Growing Businesses",
    staticLead:
      "Purpose-built web apps, admin panels, and internal tools for teams that have outgrown spreadsheets and generic SaaS.",
    robots: "index, follow",
  },
  "/services/mobile-apps": {
    title: "Mobile App Development Cost India — Android & iOS | NextCoreSoft",
    description:
      "Mobile app development cost in India — Android, iOS, app making cost bands, APIs, and store launch. Written quotes after discovery.",
    h1: "Mobile App Development for Android and iOS (India)",
    staticLead:
      "Android and iOS apps for customers and field teams — with honest cost planning guides and written quotes after scope is defined.",
    robots: "index, follow",
  },
  "/services/ai-automation": {
    title: "AI Automation Company — WhatsApp, Voice, Chatbots & Workflows | NextCoreSoft",
    description:
      "WhatsApp, chatbot, and workflow automation with CRM integration and human review where it matters. Practical AI systems for growing businesses.",
    h1: "AI Automation — WhatsApp, Voice, Chatbots and Intelligent Workflows",
    staticLead:
      "WhatsApp automation, voice agents, chatbots, lead workflows, and dashboards — integrated with your CRM and tools, with human review where accuracy matters.",
    robots: "index, follow",
  },
  "/services/cloud-api": {
    title: "Cloud API Integration | Connect Business Software | NextCoreSoft",
    description:
      "Cloud API integration and cloud communication APIs — connect CRM, accounting, payments, and custom software with REST, webhooks, and maintenance.",
    h1: "Cloud API Integration and Business Software Connections",
    staticLead:
      "Cloud API integration and webhooks so CRM, accounting, apps, and messaging share data — with maintenance when vendors change APIs.",
    robots: "index, follow",
  },
  "/services/seo-geo": {
    title: "SEO, AEO & GEO Services | NextCoreSoft",
    description:
      "SEO, AEO, and GEO services — technical SEO, structured data, sitemaps, and AI-discovery content. No guaranteed rankings; honest scope from NextCoreSoft.",
    h1: "SEO, AEO & GEO Services for Search and AI Discovery",
    staticLead:
      "NextCoreSoft provides SEO, AEO, and GEO services for business sites — metadata, structured data, sitemaps, and crawl-ready content, not empty ranking promises.",
    robots: "index, follow",
  },
  "/pricing": {
    title: "Dealership Service Management Pricing | NextCoreSoft",
    description:
      "Dealership Service Management pricing — Basic, Medium, and Premium plans with setup fee, monthly license, and first-year totals for Indian service centers.",
    h1: "Dealership Service Management Solution pricing",
    staticLead:
      "Setup plus monthly license plans for dealership service operations — customer app on Medium and Premium; taxes extra.",
    robots: "index, follow",
  },
  "/pricing/ai-automation": {
    title: "AI Automation Pricing Plans India | NextCoreSoft",
    description:
      "AI automation pricing in India — Starter, Growth, and Enterprise plans with setup fee and monthly license for WhatsApp, chatbots, and workflows.",
    h1: "AI Automation & Intelligent Workflows — plans & pricing",
    staticLead:
      "Competitive setup and monthly plans for AI workflows, chatbots, and integrations — third-party API usage and taxes extra.",
    robots: "index, follow",
  },
  "/solutions/dealership-service-management": {
    title: "Dealership Service Management System | NextCoreSoft",
    description:
      "Dealership service software — job tracking, vehicle records, staff workflows, and optional customer mobile apps. See published pricing plans.",
    h1: "Dealership Service Management Solution",
    staticLead:
      "Service-center and dealership operations software with optional customer mobile apps — pricing published separately.",
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
  ...blogRouteMetaByPath(),
}

export function canonicalUrl(path) {
  // Preferred public URL = final URL after Cloudflare's 308 (trailing slash).
  return `${SITE_ORIGIN}${preferredPath(path)}`
}

export function googlebotContent(robots) {
  return robots.includes("noindex")
    ? robots
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
}

/** Bing Webmaster / Bingbot — mirror index policy (no special ranking promise). */
export function bingbotContent(robots) {
  return robots.includes("noindex") ? robots : "index, follow"
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
    ["/services", "Services"],
    ["/services/ai-automation", "AI automation"],
    ["/services/cloud-api", "Cloud & API"],
    ["/services/seo-geo", "SEO & GEO"],
    ["/pricing", "Dealership pricing"],
    ["/pricing/ai-automation", "AI automation pricing"],
    ["/solutions/dealership-service-management", "Dealership solution"],
    ["/blog", "Blog"],
  ]
    .map(
      ([href, label]) => `<a href="${canonicalUrl(href)}">${escapeHtml(label)}</a>`,
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
