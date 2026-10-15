/**
 * Central content for the NextCoreSoft website.
 *
 * Everything a visitor reads comes from here so copy stays consistent and
 * easy to update. Nothing in this file claims a result, a client, or a
 * statistic that has not been verified.
 */

export const SITE = {
  name: "NextCoreSoft",
  domain: "nextcoresoft.com",
  url: "https://nextcoresoft.com",
  tagline: "Custom software, mobile apps, and AI automation for growing businesses.",
  description:
    "NextCoreSoft builds custom software, Android and iOS applications, and AI automations that help businesses streamline operations, reduce repetitive work, and scale efficiently.",
} as const

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
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

export const SERVICE_DETAILS: Record<
  Service["slug"],
  { intro: string; includes: string[]; fit: string }
> = {
  "custom-software": {
    intro:
      "When off-the-shelf software forces your business to work around it, a purpose-built application is often the more economical choice. We design and build web applications, internal tools, admin panels, and management systems around your actual process.",
    includes: [
      "Discovery of the workflow before any code is written",
      "Web applications, admin panels, and role-based dashboards",
      "Data models designed for reporting, not just data entry",
      "Documentation and handover your team can maintain",
    ],
    fit: "A good fit when a spreadsheet, a shared inbox, or a generic tool has become the bottleneck.",
  },
  "mobile-apps": {
    intro:
      "We build applications for Android and iOS — for your customers, or for the people doing the work in the field. Where it makes sense we share one codebase across both platforms, and we say so when a native approach is the better investment.",
    includes: [
      "Customer apps published to both app stores",
      "Staff and field-force apps with reliable offline behavior",
      "Push notifications, authentication, and secure APIs",
      "Store submission support and release management",
    ],
    fit: "A good fit when the work happens away from a desk, or when customers expect to reach you from their phone.",
  },
  "ai-automation": {
    intro:
      "We apply AI where it removes real work: reading incoming inquiries, extracting details from documents, drafting routine replies, and routing tasks to the right person. We are direct about what current models do well and where a person should stay in the loop.",
    includes: [
      "Workflow mapping before any model is chosen",
      "Document and inquiry extraction with human review where it matters",
      "Connections into your CRM, inbox, and messaging tools",
      "Evaluation of accuracy on your own examples before launch",
    ],
    fit: "A good fit when a person currently reads, copies, and retypes the same kinds of information every day.",
  },
  "cloud-api": {
    intro:
      "Software only helps if the pieces connect. We design and build the APIs and integrations that move data between your systems, and we host, monitor, and maintain what we deploy.",
    includes: [
      "Integrations with CRMs, accounting tools, payment providers, and messaging platforms",
      "Secure REST APIs with authentication and documentation",
      "Cloud deployment with backups and uptime monitoring",
      "Ongoing maintenance so integrations keep working as vendors change",
    ],
    fit: "A good fit when information is being exported, emailed, and re-imported between tools by hand.",
  },
}

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

export const PROJECTS = [
  {
    name: "Service Desk",
    label: "Demonstration project",
    problem:
      "A service business tracking job requests through a shared inbox and a spreadsheet, with no reliable view of what was pending.",
    solution:
      "A job management application: incoming requests become tracked jobs, assigned to technicians, with status visible to the whole team.",
    stack: ["React", "TypeScript", "PostgreSQL"],
  },
  {
    name: "Field Reporter",
    label: "Demonstration project",
    problem:
      "Field staff reporting completed work through chat messages and photos, which were hard to find again later.",
    solution:
      "A mobile reporting app where each visit is logged with notes, photos, and a timestamp against the assigned job.",
    stack: ["React Native", "Cloud storage", "REST API"],
  },
  {
    name: "Inquiry Desk",
    label: "Demonstration project",
    problem:
      "Customer inquiries arriving by email and web form, read and retyped into a CRM by hand each morning.",
    solution:
      "An automation that reads each inquiry, records the lead, drafts a follow-up for review, and notifies the owner.",
    stack: ["LLM API", "Webhooks", "CRM integration"],
  },
] as const

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
] as const
