import type { ServiceSlug } from "./service-details"

export type ServiceSeoGuide = { href: string; label: string; description: string }

/** Internal guides aligned to Search Console / AEO query clusters. */
export const SERVICE_SEO_GUIDES: Partial<Record<ServiceSlug, ServiceSeoGuide[]>> = {
  "mobile-apps": [
    {
      href: "/blog/mobile-app-development-cost-india/",
      label: "Mobile app development cost in India",
      description: "Planning bands for Android, iOS, and cross-platform apps — not fixed market rates.",
    },
    {
      href: "/blog/flutter-vs-react-native-india-2026/",
      label: "Flutter vs React Native in India",
      description: "How stack choice affects timeline and both app stores.",
    },
    {
      href: "/blog/web-app-vs-mobile-app-for-business/",
      label: "Web app vs mobile app for business",
      description: "When a browser app is enough before investing in the stores.",
    },
  ],
  "ai-automation": [
    {
      href: "/pricing/ai-automation/",
      label: "AI automation pricing (India)",
      description: "Starter, Growth, and Enterprise setup + monthly plans for workflows and chatbots.",
    },
    {
      href: "/blog/ai-automation-small-business-india/",
      label: "AI automation for small business",
      description: "Practical workflows before you choose a plan.",
    },
    {
      href: "/blog/generative-ai-business-software-india/",
      label: "Generative AI in business software",
      description: "Where LLMs help operations — and where human review is required.",
    },
  ],
  "cloud-api": [
    {
      href: "/blog/api-integration-business-systems-guide/",
      label: "How to connect business software systems",
      description: "API patterns, webhooks, security, and scoping integrations.",
    },
    {
      href: "/blog/custom-software-development-cost-india/",
      label: "Custom software & integration cost in India",
      description: "How CRM, API, and backend work affects total project cost.",
    },
  ],
  "seo-geo": [
    {
      href: "/blog/generative-ai-business-software-india/",
      label: "Generative AI in business software",
      description: "Practical GEO-related content patterns for Indian SMBs.",
    },
    {
      href: "/blog/software-company-near-me/",
      label: "Software company near me",
      description: "How search and local results work — honest expectations.",
    },
    {
      href: "/blog/mobile-app-development-cost-india/",
      label: "Mobile app cost guide (SEO example)",
      description: "Long-form guide structure we use for answer-style queries.",
    },
  ],
  "custom-software": [
    {
      href: "/pricing/",
      label: "Dealership Service Management pricing",
      description: "Published INR plans for dealership and service-center operations software.",
    },
    {
      href: "/solutions/dealership-service-management/",
      label: "Dealership solution overview",
      description: "Product overview before you choose a plan.",
    },
    {
      href: "/blog/custom-software-development-cost-india/",
      label: "Custom software development cost in India",
      description: "Planning bands for internal tools, portals, and CRM-style systems.",
    },
    {
      href: "/blog/custom-crm-software-development-india/",
      label: "CRM software development cost in India",
      description: "When custom CRM beats SaaS and what MVP scope looks like.",
    },
    {
      href: "/blog/software-company-near-me/",
      label: "Software company near me — what it means",
      description: "Map results, remote partners, and how to evaluate fit.",
    },
    {
      href: "/blog/api-integration-business-systems-guide/",
      label: "Connect business software with APIs",
      description: "Link accounting, CRM, payments, and your custom admin.",
    },
  ],
}
