/** Deep catalog for the AI automation service page (offerings, industries, stack, concept projects). */

export type AutomationOffering = {
  id: string
  title: string
  description: string
  benefits: string[]
  includes: string[]
  note?: string
}

export const AUTOMATION_OFFERINGS: AutomationOffering[] = [
  {
    id: "dashboards",
    title: "Business dashboard development",
    description:
      "One live view of sales, leads, and operations, built from the tools you already use.",
    benefits: [
      "See performance without chasing spreadsheets",
      "Reports that send themselves",
      "Lead and revenue analytics in one place",
    ],
    includes: [
      "Real-time business performance dashboards",
      "Sales and revenue tracking",
      "Lead and customer analytics",
      "KPI monitoring and reporting",
      "Automated reports and data visualization",
      "Integration with relevant business tools",
    ],
  },
  {
    id: "workflow",
    title: "AI workflow automation",
    description: "Connect your apps and let multi-step workflows handle the repetitive work.",
    benefits: [
      "Fewer manual handoffs and re-typing",
      "Apps connected through APIs and webhooks",
      "Built with workflow engines and custom code",
    ],
    includes: [
      "Automate repetitive business processes",
      "Connect different apps and platforms",
      "Automate data entry, notifications, and task assignments",
      "Multi-step workflows using tools such as n8n, APIs, and webhooks",
      "Reduce manual work and operational bottlenecks",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Business automation",
    description:
      "Reply, qualify, book, and follow up on WhatsApp — the channel many customers already use.",
    benefits: [
      "Instant replies, day and night",
      "Lead qualification and follow-ups",
      "Booking and reminders handled for you",
    ],
    includes: [
      "Automated customer replies",
      "Lead qualification and follow-ups",
      "Appointment booking and reminders",
      "Order and customer support notifications",
      "CRM integration",
      "AI-powered conversational assistants",
    ],
    note: "We build on the official WhatsApp Business Platform/API where appropriate, including approved message templates and customer opt-in. If a project involves a third-party provider, we explain the differences and policy risks up front.",
  },
  {
    id: "voice",
    title: "AI voice calling agents",
    description: "Agents that answer and make calls, qualify callers, and book appointments.",
    benefits: [
      "Calls answered without a long queue",
      "Callers qualified and routed to the right team",
      "Follow-ups made on schedule",
    ],
    includes: [
      "AI-powered inbound and outbound calling",
      "Answer frequently asked questions",
      "Qualify incoming leads",
      "Schedule appointments",
      "Route calls to the appropriate team",
      "Follow up with leads and customers",
      "Integrate with CRM and business workflows",
    ],
    note: "Voice agents are configurable technology. We design for human handoff, caller consent, and the calling regulations that apply to you.",
  },
  {
    id: "chatbots",
    title: "AI chatbots and virtual assistants",
    description: "Assistants for your website and support channels that answer from your own knowledge.",
    benefits: [
      "Common questions answered instantly",
      "Leads captured while you are offline",
      "Hand-off to a person when needed",
    ],
    includes: [
      "Website chatbots",
      "Customer support assistants",
      "Lead generation bots",
      "FAQ automation",
      "Product and service recommendations",
      "Knowledge-base-powered assistants",
      "Human escalation when necessary",
    ],
  },
  {
    id: "leads",
    title: "Lead generation and lead management",
    description: "Capture every enquiry, organise it in your CRM, and follow up before it goes cold.",
    benefits: [
      "No lead lost between channels",
      "Clear criteria for who is a priority",
      "Sales team alerted to hot leads",
    ],
    includes: [
      "Capture leads from websites and forms",
      "Automatically organize leads in a CRM",
      "Qualify prospects using defined criteria",
      "Send personalized follow-ups",
      "Notify sales teams about high-priority leads",
      "Track the lead journey",
    ],
  },
  {
    id: "crm",
    title: "CRM and sales automation",
    description: "A sales pipeline that moves on its own, with the right reminders at the right time.",
    benefits: [
      "Leads assigned automatically",
      "Follow-up reminders that do not slip",
      "Sales activity reported without effort",
    ],
    includes: [
      "Automated sales pipelines",
      "Lead assignment",
      "Follow-up reminders",
      "Customer lifecycle workflows",
      "Sales activity reporting",
      "CRM integrations",
    ],
  },
  {
    id: "agents",
    title: "AI agents and intelligent business systems",
    description: "Agents that carry out defined business tasks across your approved systems.",
    benefits: [
      "Research and document work done faster",
      "Internal assistants for your staff",
      "Multi-step tasks coordinated end to end",
    ],
    includes: [
      "AI agents that perform defined business tasks",
      "Research and information processing",
      "Document processing and data extraction",
      "Internal business assistants",
      "Multi-step task orchestration",
      "Integrations with approved business systems",
    ],
    note: "Actions with financial, legal, or other significant consequences can require human approval before they run.",
  },
  {
    id: "ecommerce",
    title: "E-commerce automation",
    description: "Keep customers informed and supported from first question to delivery.",
    benefits: [
      "Order updates sent automatically",
      "Product questions answered instantly",
      "Feedback collected after purchase",
    ],
    includes: [
      "Order status notifications",
      "Customer support automation",
      "Product inquiry assistants",
      "Inventory and order workflow integrations",
      "Abandoned-cart follow-ups where consent and platform rules permit",
      "Customer feedback collection",
    ],
  },
  {
    id: "custom",
    title: "Custom AI solutions",
    description: "If it is repetitive and rules-based, we can usually design a system for it.",
    benefits: [
      "Designed around your requirements",
      "Connects to your existing systems",
      "Industry-specific automation",
    ],
    includes: [
      "Custom AI tools",
      "API integrations",
      "Automated reporting",
      "Document and data processing",
      "Industry-specific automation",
      "Bespoke workflows designed around client requirements",
    ],
  },
]

export const AUTOMATION_INDUSTRIES = [
  {
    name: "Real estate",
    problem: "Property enquiries arrive at all hours and many wait too long for a reply.",
    solution: "Lead qualification, property inquiry bots, and appointment scheduling for site visits.",
    benefit: "Faster first response, and agents spend their time on serious buyers.",
  },
  {
    name: "E-commerce",
    problem: "Customers keep asking where their order is, and support queues grow.",
    solution: "Order support, customer messaging, and sales workflows connected to your store.",
    benefit: "Fewer repetitive tickets and customers who stay informed.",
  },
  {
    name: "Healthcare and clinics",
    problem: "Front desks spend hours on bookings, reminders, and repeated questions.",
    solution:
      "Appointment administration, reminders, and FAQ assistants — designed with privacy safeguards. They share information, not medical advice.",
    benefit: "A lighter front-desk workload and fewer missed appointments.",
  },
  {
    name: "Education",
    problem: "Prospective students send the same questions during busy admission periods.",
    solution: "Inquiry handling, enrollment support, and student FAQ assistants.",
    benefit: "Quicker answers for applicants and less pressure on admissions staff.",
  },
  {
    name: "Professional services",
    problem: "Onboarding clients and chasing documents takes time away from billable work.",
    solution: "Client onboarding, scheduling, and document workflows.",
    benefit: "Smoother onboarding and more time for client work.",
  },
  {
    name: "Marketing agencies",
    problem: "Leads, reports, and campaign tasks live in too many separate tools.",
    solution: "Lead routing, automated reporting, and campaign workflow automation.",
    benefit: "Less manual reporting and faster handling of new leads.",
  },
  {
    name: "Local businesses",
    problem: "Calls and messages go unanswered while the team is busy serving customers.",
    solution:
      "Customer support, booking, and follow-up automation across WhatsApp, calls, and your website.",
    benefit: "Fewer missed bookings and consistent follow-up.",
  },
] as const

export const AUTOMATION_TECH_GROUPS = [
  { group: "Automation", items: ["n8n", "REST APIs", "Webhooks"] },
  { group: "AI models", items: ["OpenAI API", "Claude API"] },
  { group: "Messaging", items: ["WhatsApp Business Platform"] },
  { group: "Voice", items: ["Voice AI platforms"] },
  {
    group: "Business systems and data",
    items: ["CRM platforms", "Databases", "Dashboard and analytics tools"],
  },
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript"] },
] as const

export type ConceptProject = {
  name: string
  tag: string
  problem: string
  solution: string
  flow: string[]
  tools: string[]
  outcome: string
}

export const AUTOMATION_CONCEPT_PROJECTS: ConceptProject[] = [
  {
    name: "AI WhatsApp customer support assistant",
    tag: "WhatsApp",
    problem: "Customers message at all hours with the same questions, and replies are slow.",
    solution:
      "An assistant on the WhatsApp Business Platform that answers from your knowledge base, collects details, and passes complex cases to a person with conversation history.",
    flow: ["Customer message", "Intent check", "Knowledge-base answer", "Human handoff if needed", "Logged in CRM"],
    tools: ["WhatsApp Business Platform", "AI model API", "n8n", "CRM"],
    outcome:
      "Shorter waits for common questions, and a support team free to handle cases that need judgment.",
  },
  {
    name: "Automated lead qualification and follow-up system",
    tag: "Lead generation",
    problem: "New leads arrive from several places, and follow-up depends on who has time.",
    solution:
      "A workflow that captures every lead, scores it against your criteria, assigns an owner, sends a personalised first follow-up, and alerts sales to high-priority leads.",
    flow: ["Form or ad lead", "Score and enrich", "Assign owner", "Personalised follow-up", "Alert for hot leads"],
    tools: ["n8n", "CRM", "AI model API", "Email or WhatsApp"],
    outcome: "Every lead gets a timely response, and the sales team sees who to call first.",
  },
  {
    name: "AI voice calling and appointment booking agent",
    tag: "Voice",
    problem: "Calls go unanswered when the team is busy, and bookings are lost.",
    solution:
      "A voice agent that answers common questions, qualifies the caller, checks the calendar, books a slot, and transfers to a person whenever the caller asks.",
    flow: ["Inbound call", "Answer FAQs", "Check calendar", "Book slot", "Confirm or transfer"],
    tools: ["Voice AI platform", "Calendar", "CRM", "Webhooks"],
    outcome: "More calls handled and fewer missed bookings, with a person always one step away.",
  },
  {
    name: "Real-time sales and business dashboard",
    tag: "Dashboards",
    problem: "Numbers sit in different tools, and reports are assembled by hand.",
    solution:
      "A dashboard that pulls from your CRM, store, and spreadsheets, tracks agreed KPIs, and sends a scheduled summary to the team.",
    flow: ["Connect sources", "Sync data", "Calculate KPIs", "Live dashboard", "Scheduled report"],
    tools: ["APIs", "Database", "Analytics tools", "n8n"],
    outcome: "One trusted view of performance, without weekly manual reporting.",
  },
  {
    name: "E-commerce order notification workflow",
    tag: "E-commerce",
    problem: "Customers ask for order updates because nobody tells them proactively.",
    solution:
      "A workflow that listens to order events, sends status updates on the customer's preferred channel where consent allows, flags exceptions to your team, and asks for feedback after delivery.",
    flow: ["Order event", "Map status", "Notify customer", "Flag exceptions", "Request feedback"],
    tools: ["Store platform", "WhatsApp Business Platform", "Webhooks", "n8n"],
    outcome: "Fewer where-is-my-order messages and a clearer view of delivery problems.",
  },
  {
    name: "AI-powered internal business assistant",
    tag: "AI agents",
    problem: "Staff lose time searching for policies, documents, and answers.",
    solution:
      "An internal assistant that searches your approved documents, answers with its source, and asks for human approval before taking any significant action.",
    flow: ["Staff question", "Search approved documents", "Answer with source", "Approval for actions"],
    tools: ["AI model API", "Document store", "Databases", "Python"],
    outcome: "Faster answers for your team, with control over what the assistant can see and do.",
  },
]

export const AUTOMATION_PRINCIPLES = [
  {
    title: "Official channels first",
    description:
      "We build on official platforms such as the WhatsApp Business Platform where possible, and tell you clearly when a third-party option is involved.",
  },
  {
    title: "Consent and compliance",
    description:
      "Messaging and calling flows are designed with opt-in, opt-out, and the regulations that apply to your business in mind.",
  },
  {
    title: "People stay in control",
    description:
      "Customers can reach a human, and actions with financial, legal, or other significant consequences can require approval.",
  },
  {
    title: "Minimal data access",
    description:
      "We connect only to the systems a project needs, and agree how customer data is handled before we build.",
  },
] as const

export const AUTOMATION_EXTRA_FAQS = [
  {
    question: "Do I need a technical team to use this?",
    answer:
      "No. We handle the design, build, and setup, and we explain how everything works in plain language. Your team only needs to use the results.",
  },
  {
    question: "How long does an automation project take?",
    answer:
      "It depends on scope. A single focused workflow is quicker than a build that connects several systems. We give you a timeline after discovery, before you commit to building.",
  },
  {
    question: "Is WhatsApp and voice automation allowed?",
    answer:
      "Yes, when set up correctly. WhatsApp automation should use the official WhatsApp Business Platform with proper opt-in. Calling is subject to consent and regulations that vary by country — we design around them and recommend you confirm requirements for your case.",
  },
  {
    question: "Which tools can you connect to?",
    answer:
      "We work with common CRMs, databases, spreadsheets, messaging platforms, and APIs. Whether a specific tool can be connected depends on the access it offers, which we check during discovery.",
  },
] as const
