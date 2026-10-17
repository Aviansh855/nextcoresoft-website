/**
 * Central content for the NextCoreSoft website.
 *
 * Everything a visitor reads comes from here so copy stays consistent and
 * easy to update. Nothing in this file claims a result, a client, or a
 * statistic that has not been verified.
 */

import { PORTFOLIO_ITEMS as _PORTFOLIO_ITEMS } from "./portfolio"
import site from "../../shared/site.json"
import headings from "../../shared/page-headings.json"

export const SITE = site
export const HOME_H1 = headings.HOME_H1
export const HOME_TAGLINE = headings.HOME_TAGLINE
export const SERVICES_HUB_H1 = headings.SERVICES_HUB_H1

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Our Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

export const BENEFITS = [
  {
    title: "Less repetitive manual work",
    description:
      "We identify the tasks your team repeats every day and replace them with software that handles the routine, so people can focus on work that needs judgment.",
  },
  {
    title: "More productive teams",
    description:
      "Clear tools, fewer handoffs, and information that is available when it is needed — so your team spends less time chasing updates and more time doing the work.",
  },
  {
    title: "Systems that talk to each other",
    description:
      "We connect the tools you already use — spreadsheets, CRMs, accounting, messaging — so data moves between them instead of being retyped.",
  },
  {
    title: "Operations you can measure",
    description:
      "Dashboards and reports built around the numbers that matter to your business, so decisions are based on what is actually happening.",
  },
] as const

export const SERVICES = [
  {
    slug: "custom-software",
    title: "Custom Software Development",
    summary:
      "Web applications, internal tools, and business systems designed around how your company actually works.",
    outcomes: [
      "Custom software and web applications",
      "Admin panels, dashboards, and management systems",
      "Workflows shaped to your team, not a template",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    cta: "Discuss a custom build",
  },
  {
    slug: "mobile-apps",
    title: "Android & iOS App Development",
    summary:
      "Mobile applications for customers, field teams, and internal staff — built for both major platforms.",
    outcomes: [
      "Customer-facing apps for both stores",
      "Field and operations apps for staff",
      "Offline-tolerant workflows where needed",
    ],
    technologies: ["React Native", "Android", "iOS", "REST & GraphQL"],
    cta: "Plan a mobile app",
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Intelligent Workflows",
    summary:
      "AI integrations and business-process automation that read, route, and draft routine work — only where that genuinely saves time.",
    outcomes: [
      "Inquiry and document processing",
      "Automated follow-ups and handoffs",
      "Assistants grounded in your own data",
    ],
    technologies: ["LLM APIs", "Workflow engines", "Webhooks", "Vector search"],
    cta: "Explore automation",
  },
  {
    slug: "cloud-api",
    title: "Cloud, APIs & Maintenance",
    summary:
      "The connective layer: third-party integrations, cloud deployment, and the maintenance that keeps software reliable after launch.",
    outcomes: [
      "API and third-party integrations",
      "Cloud deployment, monitoring, and backups",
      "Ongoing maintenance and technical support",
    ],
    technologies: ["REST", "Cloud hosting", "CI/CD", "Monitoring"],
    cta: "Connect your systems",
  },
] as const

export type Service = (typeof SERVICES)[number]

export { SERVICE_DETAILS } from "./service-details"
export { PORTFOLIO_ITEMS } from "./portfolio"
export type { PortfolioItem } from "./portfolio"

export const WORKFLOW_STEPS = [
  {
    id: "input",
    label: "Manual Input",
    detail:
      "A customer submits an inquiry through a form, an email, or a messaging app. Today, someone on your team reads it by hand.",
  },
  {
    id: "processing",
    label: "AI Processing",
    detail:
      "The automation reads the message, extracts the relevant details — who is asking, what they need, how urgent it is — and checks them for completeness.",
  },
  {
    id: "action",
    label: "Automated Action",
    detail:
      "The lead is recorded in your CRM, a follow-up message is drafted for review, and the responsible employee is notified.",
  },
  {
    id: "dashboard",
    label: "Business Dashboard",
    detail:
      "The inquiry, its status, and the response time appear on a dashboard, so the pipeline is visible instead of buried in an inbox.",
  },
] as const

export const SOLUTIONS = [
  {
    title: "CRM & Lead Management",
    description:
      "Capture inquiries, track follow-ups, and see your pipeline in one place instead of across inboxes and spreadsheets.",
    kind: "Custom-built",
  },
  {
    title: "Inventory & Operations",
    description:
      "Track stock, orders, and day-to-day operations with a system shaped to how your business actually moves goods.",
    kind: "Custom-built",
  },
  {
    title: "Finance & Reporting",
    description:
      "Consolidate figures from the tools you already use into reports and dashboards your leadership can read.",
    kind: "Custom-built",
  },
  {
    title: "Booking & Service Management",
    description:
      "Let customers book, and give your team a clear schedule, assignments, and service history.",
    kind: "Custom-built",
  },
  {
    title: "Employee & Field-Force Apps",
    description:
      "Mobile tools for teams on the move: assignments, check-ins, photo capture, and status reporting.",
    kind: "Custom-built",
  },
  {
    title: "AI Business Assistants",
    description:
      "Internal assistants that answer questions from your own documents and draft routine responses for review.",
    kind: "Custom-built",
  },
] as const

export const INDUSTRIES = [
  {
    title: "Automotive & Service Businesses",
    description:
      "Workshops, dealerships, and service centers managing bookings, job cards, and customer follow-ups.",
  },
  {
    title: "Retail & E-commerce",
    description:
      "Stores coordinating inventory, orders, and customer communication across channels.",
  },
  {
    title: "Finance & Professional Services",
    description:
      "Firms handling client intake, document collection, reporting, and compliance workflows.",
  },
  {
    title: "Healthcare Administration",
    description:
      "Clinics and practices organizing appointments, patient intake, and administrative records. We do not build regulated clinical devices.",
  },
  {
    title: "Logistics & Field Operations",
    description:
      "Operators coordinating deliveries, field staff, and status updates that currently live in chat groups.",
  },
  {
    title: "Startups & Growing Businesses",
    description:
      "Teams that have outgrown spreadsheets and need software that can grow with them.",
  },
] as const

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn the business problem, the people involved, and the tools already in place before proposing anything.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the scope, the architecture, and the milestones, with a written quotation before work begins.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We shape the screens and the flow with you, so the software matches how the work actually happens.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "We develop in visible increments, integrating with your existing systems and sharing progress at each milestone.",
  },
  {
    number: "05",
    title: "Validate",
    description:
      "We test functionality, usability, and security together, and fix what the testing finds before anything goes live.",
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "We deploy, monitor, and stay available — maintaining, fixing, and improving the software as your business changes.",
  },
] as const

/** Homepage teaser cards — first three portfolio showcases. */
export const PROJECTS = _PORTFOLIO_ITEMS.slice(0, 3).map((item) => ({
  id: item.id,
  name: item.name,
  label: item.label,
  problem: item.problem,
  solution: item.solutionOverview,
  stack: [...item.stack],
  mockupVariant: item.mockupVariant,
}))

/** Maps service page slugs to contact form service dropdown values. */
export const SERVICE_SLUG_TO_FORM: Record<Service["slug"], (typeof SERVICE_OPTIONS)[number]> = {
  "custom-software": "Custom software development",
  "mobile-apps": "Android & iOS app development",
  "ai-automation": "AI automation & workflows",
  "cloud-api": "Cloud solutions & API integration",
}

export const REASONS = [
  {
    title: "Tailored to your business",
    description:
      "We start from your workflow and build toward it, rather than bending your process to fit a product.",
  },
  {
    title: "Transparent milestones",
    description:
      "Scope, timeline, and cost are written down before we build, and you see progress at every milestone.",
  },
  {
    title: "Practical automation",
    description:
      "We recommend the simplest thing that solves the problem — AI included only where it earns its place.",
  },
  {
    title: "Architecture that scales",
    description:
      "Systems designed so adding users, features, and integrations later does not mean starting over.",
  },
  {
    title: "Security-conscious development",
    description:
      "Authentication, access control, encrypted transport, and dependency hygiene are part of the build, not an afterthought.",
  },
  {
    title: "Support after launch",
    description:
      "We maintain what we ship: monitoring, fixes, and improvements as your business and its tools evolve.",
  },
] as const

export const SERVICE_OPTIONS = [
  "Custom software development",
  "Android & iOS app development",
  "AI automation & workflows",
  "Cloud solutions & API integration",
  "Maintenance & consulting",
  "Not sure yet — advise me",
] as const

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $40,000",
  "$40,000 – $100,000",
  "Over $100,000",
  "I'd like guidance on budget",
] as const

/** Services hub — AEO / FAQ rich results (distinct from homepage FAQ). */
export const SERVICES_HUB_FAQS = [
  {
    question: "Which software development services does NextCoreSoft offer?",
    answer:
      "Custom software and web applications, Android and iOS mobile apps, AI workflow automation, and cloud hosting with API integrations. Each service has its own page with deliverables and FAQs; start at /services or contact us if you are unsure which fits.",
  },
  {
    question: "Do you quote web development and mobile apps separately?",
    answer:
      "Yes. Web apps, mobile clients, and automation are scoped independently with milestones and written cost. A discovery call clarifies whether you need one track or a combined roadmap.",
  },
  {
    question: "Can one vendor handle custom software, mobile, and AI automation?",
    answer:
      "We often deliver all three for one product — for example a web admin, mobile field app, and document automation — so integrations stay consistent. We will recommend a smaller first phase if that reduces risk.",
  },
  {
    question: "How do I request a quote for a specific service?",
    answer:
      "Use the contact form and mention the service (or open a service page and click Request a quote). We reply within one business day with scope questions and how we would structure the quotation.",
  },
] as const

/** Blog index — common questions for search and answer engines. */
export const BLOG_HUB_FAQS = [
  {
    question: "What topics does the NextCoreSoft blog cover?",
    answer:
      "Custom software versus spreadsheets, hiring a development company, mobile and web projects, and practical AI automation — written for business owners and operations teams, not developers only.",
  },
  {
    question: "Are blog posts a substitute for a consultation?",
    answer:
      "No. Articles explain patterns and questions to ask; your timeline, integrations, and budget need a discovery conversation. Contact us when you are ready to scope a real project.",
  },
  {
    question: "How often is new content published?",
    answer:
      "We add articles when we have something useful and verified to say. The blog index lists current guides — including custom software and mobile app costs in India and MVP vs full product planning.",
  },
] as const

export const FAQS = [
  {
    question: "What services does NextCoreSoft offer?",
    answer:
      "Custom business software, Android and iOS applications, AI automation and workflow integration, cloud hosting and API integrations, plus ongoing maintenance and technical consulting. If you are unsure which applies, describe the problem and we will tell you honestly whether we are the right fit.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused internal tool or automation commonly takes a few weeks; a full application with mobile clients takes longer. We give a milestone-based timeline in the written proposal, after we understand the scope — we don't quote durations before that conversation.",
  },
  {
    question: "How does pricing and quotation work?",
    answer:
      "After a discovery conversation we send a written quotation with scope, milestones, and cost. We work fixed-scope where requirements are clear and time-based where they are still evolving. The initial consultation is free and there is no obligation.",
  },
  {
    question: "Can you integrate with the systems we already use?",
    answer:
      "Usually, yes. We regularly connect CRMs, accounting tools, payment providers, email, and messaging platforms through their APIs. If a system has no usable API we will say so and propose a realistic alternative rather than forcing it.",
  },
  {
    question: "Do you build for both Android and iOS?",
    answer:
      "Yes. For most business apps we use a cross-platform approach so both stores are covered from one codebase. When a project genuinely needs native development for one platform, we recommend that and explain the trade-off in cost and timeline.",
  },
  {
    question: "How do we know whether AI automation is feasible for us?",
    answer:
      "We assess it against your real examples. AI works well for reading, sorting, extracting, and drafting; it is a poor fit where every output must be exact and unsupervised. We test accuracy on your own data before recommending a build, and we design a human review step wherever the cost of an error is high.",
  },
  {
    question: "How do you handle security and maintenance?",
    answer:
      "Access control, encrypted connections, secrets management, and regular dependency updates are part of every build. After launch we offer maintenance agreements covering monitoring, security updates, and bug fixes. We do not claim certifications we do not hold.",
  },
  {
    question: "What support do we get after launch?",
    answer:
      "Every project includes a handover and a stabilization period. Beyond that, ongoing support is available as a maintenance agreement: monitoring, fixes, small improvements, and a named point of contact. Terms are agreed in writing before launch.",
  },
  {
    question: "Can we see examples of your work before hiring you?",
    answer:
      "Yes. Our portfolio lists software and app projects we can demonstrate in a call. Items are labeled as project showcases unless you have approved a formal client case study. We do not publish client logos or revenue claims without your permission.",
  },
  {
    question: "Does NextCoreSoft build custom websites and web applications?",
    answer:
      "Yes. We build custom web applications and business-facing websites as part of software development engagements — not generic template installs. Marketing sites are in scope when they are tied to a product, portal, or admin system your team needs.",
  },
  {
    question: "Is NextCoreSoft an AI automation company?",
    answer:
      "We implement AI automation for real business steps — reading inquiries, extracting document fields, routing work, and drafting routine replies — with human review where errors are costly. We are not a consumer chatbot vendor; projects are scoped to your tools and data.",
  },
  {
    question: "Do you work with clients searching “near me” or only remotely?",
    answer:
      "We deliver remotely and work in English with clients in many countries. This website does not list a public office address. Google’s local “near me” map results usually require a verified Google Business Profile and address — we do not claim map-pack placement here. You can still contact us for a video consultation from anywhere.",
  },
] as const
