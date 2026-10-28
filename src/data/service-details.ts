export type ServiceSlug = "custom-software" | "mobile-apps" | "ai-automation" | "cloud-api"

export type ServiceDetail = {
  seoTitle: string
  metaDescription: string
  h1: string
  intro: string
  audience: string
  problems: string[]
  benefits: string[]
  deliverables: string[]
  process: { title: string; description: string }[]
  includes: string[]
  faqs: { question: string; answer: string }[]
  /** Portfolio item ids to highlight on this service page */
  portfolioIds: string[]
  /** Answer-first summary for visitors and answer engines (visible on page). */
  aeo: {
    quickAnswer: string
    suitableFor: string
    quoteNeeds: string[]
    decisionChecklist?: string[]
  }
}

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  "custom-software": {
    seoTitle: "Custom Software & Web Development Company",
    metaDescription:
      "Custom software and web apps — admin panels and internal tools that replace spreadsheets. Built for your workflow. Free consultation with NextCoreSoft.",
    h1: "Custom Software and Web Development for Growing Businesses",
    intro:
      "NextCoreSoft designs and builds web applications, admin panels, dashboards, and internal tools around how your team actually works — not how a generic product expects you to work.",
    audience:
      "Small and mid-sized businesses, operations teams, and founders who have outgrown spreadsheets, shared inboxes, or off-the-shelf software that does not match their process.",
    problems: [
      "Critical work lives in spreadsheets that only one person understands, so reporting and handoffs break when they are away.",
      "Staff retype the same customer or order data between email, chat, and separate tools because nothing is connected.",
      "Leadership cannot see pipeline, inventory, or job status without asking someone to export a file.",
      "You need a workflow that fits your business, but packaged software forces awkward workarounds.",
    ],
    benefits: [
      "Replace repetitive copy-paste between tools with one system your team uses daily",
      "Role-based dashboards and reports built around the numbers you already track",
      "Software you own: documentation, credentials, and handover your staff can maintain",
      "Discovery and milestones agreed in writing before development starts",
    ],
    deliverables: [
      "Written scope and quotation with milestones before build work starts",
      "Working web application deployed to your chosen hosting environment",
      "Admin or staff interfaces with role-based access where needed",
      "Data model and exports suitable for the reports you care about",
      "Handover notes, credentials, and a stabilization period after launch",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "We map the current workflow, the people involved, and the tools in use — and confirm whether custom software is the right investment.",
      },
      {
        title: "Scope & quote",
        description:
          "You receive a written proposal with features, milestones, timeline assumptions, and cost — no surprise scope later.",
      },
      {
        title: "Design & build",
        description:
          "Screens and flows are reviewed with you; development proceeds in increments with demos at each milestone.",
      },
      {
        title: "Test & launch",
        description:
          "We test with your team, fix issues found in real use, deploy, and stay available through the first weeks live.",
      },
    ],
    includes: [
      "Workflow discovery before any code is written",
      "Web applications, admin panels, and role-based dashboards",
      "Data models designed for reporting, not just data entry",
      "Integrations with the tools you already use where needed",
    ],
    faqs: [
      {
        question: "Do we need a full specification before contacting you?",
        answer:
          "No. A short description of the business problem and how work happens today is enough to start. We help shape requirements during discovery and document them before quoting.",
      },
      {
        question: "Can you replace our spreadsheets without disrupting daily work?",
        answer:
          "We usually migrate in phases: read-only reporting first, then data entry, then retiring the old sheet. Timing depends on how critical the spreadsheet is — we plan that with you.",
      },
      {
        question: "Who owns the code and data?",
        answer:
          "You do, under the terms in our agreement. We deliver source code, deployment access, and documentation so you are not locked in to a single vendor.",
      },
      {
        question: "How is project cost estimated?",
        answer:
          "After discovery we quote fixed milestones when requirements are clear, or time-and-materials with caps when they are still evolving. Budget ranges on the contact form help us suggest a realistic first phase.",
      },
      {
        question: "What is CRM software development cost in India?",
        answer:
          "Custom CRM cost overlaps with custom software: a focused CRM MVP might be planned in the mid single-digit to low double-digit lakhs depending on pipelines, roles, integrations, and mobile needs — not a fixed market rate. See our custom CRM software development in India guide and the custom software cost guide on the blog; we quote after discovery.",
      },
    ],
    portfolioIds: ["techwheels-service-management", "pbic-attendance", "milk-delivery-management"],
    aeo: {
      quickAnswer:
        "Custom software and web applications are built around your workflows — admin panels, internal tools, and customer-facing portals — instead of forcing your team into generic spreadsheets or off-the-shelf SaaS. Engagements usually include discovery, a written scope and quote, iterative build with demos, testing with your team, deployment, and optional maintenance.",
      suitableFor:
        "Teams that outgrow spreadsheets and shared inboxes, need role-based access and reporting, or must connect several steps (forms, approvals, notifications) in one place.",
      quoteNeeds: [
        "What work happens today, step by step, and who is involved",
        "Rough number of user roles and whether customers log in",
        "Systems you must integrate with (CRM, accounting, messaging, etc.)",
        "Must-have outcomes for the first release versus later phases",
      ],
      decisionChecklist: [
        "Is the pain from missing software, or from process that should be simplified first?",
        "Do you need a customer-facing portal, an internal tool, or both?",
        "Can a first phase replace one critical spreadsheet or inbox workflow?",
        "Who will own product decisions and accept milestones on your side?",
      ],
    },
  },
  "mobile-apps": {
    seoTitle: "Mobile App Development Cost India — Android & iOS",
    metaDescription:
      "Mobile app development cost in India — Android, iOS, app making cost bands, APIs, and store launch. Written quotes after discovery.",
    h1: "Mobile App Development for Android and iOS (India)",
    intro:
      "We build mobile applications for both major platforms — for your customers in the app stores, and for staff who need reliable tools away from a desk. If you are researching mobile app development cost in India or app development cost for iOS and Android in cities like Chennai, see our linked cost guide for planning bands; we quote only after scope is defined.",
    audience:
      "Service businesses, retailers, logistics and field operations, and product teams that need a branded mobile experience for customers or employees who work on the move.",
    problems: [
      "Customers expect to book, pay, or track service from their phone, but you only offer a website or phone calls.",
      "Field staff report status through chat threads and photos that are hard to search or audit later.",
      "You need offline access in areas with poor connectivity, but a mobile website is not enough.",
      "Store policies, push notifications, and secure login feel overwhelming without a team that has shipped apps before.",
    ],
    benefits: [
      "Reach customers on the devices they already use every day",
      "Give field and operations staff offline-tolerant apps instead of paper or chat threads",
      "Secure login, push notifications, and APIs connected to your backend",
      "Support through app store submission and release updates",
    ],
    deliverables: [
      "App design aligned with your brand and the tasks users perform most often",
      "Builds for Google Play and/or Apple App Store, or internal distribution when appropriate",
      "Backend or API integration with your existing systems",
      "Release notes, store listing copy guidance, and update process documentation",
    ],
    process: [
      {
        title: "Use-case review",
        description:
          "We clarify who uses the app (customers vs staff), which devices matter, and whether cross-platform or native is appropriate.",
      },
      {
        title: "Prototype & quote",
        description:
          "Key screens and flows are agreed, then quoted with store submission and backend work included explicitly.",
      },
      {
        title: "Build & device testing",
        description:
          "Development includes real-device testing for the platforms you target, including offline behavior where required.",
      },
      {
        title: "Store submission & updates",
        description:
          "We guide you through developer accounts, review feedback, and a plan for post-launch fixes and version updates.",
      },
    ],
    includes: [
      "Customer apps published to Google Play and the Apple App Store",
      "Staff and field-force apps with offline behavior where it matters",
      "Authentication, push notifications, and secure API integration",
      "Store submission guidance and release management",
    ],
    faqs: [
      {
        question: "How much does mobile app development cost in India?",
        answer:
          "Cost depends on screens, user roles, backend, integrations, and testing — not city alone. As a planning exercise, many teams model a simple app around ₹1.5 lakh–₹5 lakh, a focused MVP around ₹4 lakh–₹12 lakh, and a multi-role product at ₹8 lakh–₹25 lakh or more. These are indicative bands, not our quotation. See our mobile app development cost in India guide on the blog for detail, then contact us with your workflow for a written quote.",
      },
      {
        question: "What is mobile app making cost in India?",
        answer:
          "“App making cost” is the same planning question as mobile app development cost: scope, platforms, backend, and integrations set the range. Use our India cost guide on the blog for Android, iOS, and cross-platform bands, then share your user roles and must-have features for a written quote.",
      },
      {
        question: "What is the cost of iOS and Android app development in Chennai?",
        answer:
          "Chennai vendors and remote studios often price by scope, not geography. iOS and Android together usually cost less to build when one cross-platform codebase covers both stores, but Apple and Google fees, backend hosting, and maintenance still apply. Use the same India planning bands as other cities; we deliver remotely for Chennai teams and quote after discovery.",
      },
      {
        question: "Does NextCoreSoft offer mobile apps for iOS and Android?",
        answer:
          "Yes. NextCoreSoft builds customer and staff apps for Google Play and the Apple App Store, typically from one cross-platform codebase when that fits the features. We do not resell third-party “suite” products — we build custom apps for your workflow and can pair them with a web admin or APIs.",
      },
      {
        question: "One codebase for Android and iOS, or separate native apps?",
        answer:
          "For most business apps we use a cross-platform stack so both stores are covered efficiently. If you need deep platform-specific hardware features, we explain the native option and the cost difference before you commit.",
      },
      {
        question: "Do you handle Apple and Google developer accounts?",
        answer:
          "Accounts stay in your name for store ownership. We help you create them if needed and use your credentials to upload builds — we do not take ownership of your store listings.",
      },
      {
        question: "Can the app work with our existing web admin?",
        answer:
          "Yes, when your backend exposes secure APIs. Many projects pair a mobile client with a web admin built in the same engagement or an existing system you already run.",
      },
      {
        question: "What maintenance is needed after launch?",
        answer:
          "Mobile OS and store rules change regularly. We offer maintenance agreements for dependency updates, crash monitoring, and small fixes — optional but recommended for production apps.",
      },
    ],
    portfolioIds: ["food-explore", "pg-booking", "milk-delivery-management", "anonymous-chat"],
    aeo: {
      quickAnswer:
        "Mobile app development covers Android and iOS apps for customers, field staff, or internal teams — usually paired with a secure backend or your existing admin system. App development cost in India varies by scope: simple apps, MVPs, and multi-role products fall into different planning bands (see our blog guide). We recommend cross-platform or native based on features, timeline, and budget; store submission and maintenance can be included in scope.",
      suitableFor:
        "Businesses whose users need reliable mobile access — bookings, status updates, field data capture, or branded customer apps — not only a mobile website.",
      quoteNeeds: [
        "Who uses the app (customers, staff, both) and on which devices",
        "Offline or poor-connectivity requirements",
        "Login, payments, push notifications, or maps if needed",
        "Whether a web admin or API already exists",
      ],
      decisionChecklist: [
        "Is a responsive web app enough for the first release?",
        "Do you need both app stores, or one platform or internal distribution?",
        "Who owns Apple/Google developer accounts and store listings?",
        "What happens after launch (monitoring, OS updates, dependency updates)?",
      ],
    },
  },
  "ai-automation": {
    seoTitle: "AI Automation Company — WhatsApp, Voice, Chatbots & Workflows",
    metaDescription:
      "WhatsApp, chatbot, and workflow automation with CRM integration and human review where it matters. Practical AI systems for growing businesses.",
    h1: "AI Automation — WhatsApp, Voice, Chatbots and Intelligent Workflows",
    intro:
      "NextCoreSoft builds AI-powered systems that automate customer conversations, generate and manage leads, streamline operations, and connect to the tools you already use — with humans kept in the loop when accuracy matters.",
    audience:
      "Operations, sales, and admin teams at SMBs and growing companies where people still read, classify, and retype the same kinds of messages, forms, or documents every day.",
    problems: [
      "Inquiries sit in a shared inbox because sorting and CRM entry take longer than replying.",
      "Staff copy fields from PDFs, scans, or emails into spreadsheets or CRM records every day.",
      "Follow-ups depend on someone remembering to nudge — not on a reliable workflow.",
      "Leadership wants “AI” but past experiments produced generic chatbots that did not connect to real work.",
    ],
    benefits: [
      "Faster response to leads and customer messages without hiring only for inbox work",
      "Less manual data entry from PDFs, emails, and forms into your CRM or sheets",
      "Automations wired into tools you already use (inbox, CRM, messaging, webhooks)",
      "Pilot tested on your own examples before anything goes live",
    ],
    deliverables: [
      "Workflow diagram showing triggers, AI steps, human review points, and outputs",
      "Working automation integrated with agreed tools (email, CRM, webhooks, etc.)",
      "Runbook for your team: what to check, how to override, and how to report issues",
      "Accuracy notes from testing on your sample data — honest limits included",
    ],
    process: [
      {
        title: "Workflow mapping",
        description:
          "We document the steps people take today and identify where automation saves time without unacceptable error risk.",
      },
      {
        title: "Pilot on your samples",
        description:
          "We test extraction, classification, or drafting on real examples you provide before building production integrations.",
      },
      {
        title: "Integrate & review gates",
        description:
          "Automations write to your systems with human approval where mistakes would be costly.",
      },
      {
        title: "Monitor & tune",
        description:
          "After launch we watch failure modes and adjust prompts, rules, or review steps — not set-and-forget.",
      },
    ],
    includes: [
      "Workflow mapping before any model or vendor is chosen",
      "Document and inquiry extraction with review steps where needed",
      "Integrations into CRM, email, and messaging platforms",
      "Accuracy checks on your sample data before launch",
    ],
    faqs: [
      {
        question: "Will AI replace our staff?",
        answer:
          "Our goal is to remove repetitive reading and retyping, not judgment calls. We design review steps wherever errors would hurt customers, compliance, or revenue.",
      },
      {
        question: "Is our data sent to third-party AI providers?",
        answer:
          "Often yes, when using hosted model APIs — under their terms and your agreement with us. We discuss data sensitivity upfront and can limit what is sent, use regional options where available, and avoid sending secrets or unnecessary personal data.",
      },
      {
        question: "How do you measure if automation is working?",
        answer:
          "We agree on operational metrics you can observe: time to first response, items processed per day, or reduction in manual steps — not vanity “AI scores.” We do not invent percentage improvements for marketing.",
      },
      {
        question: "Can you automate our industry-specific documents?",
        answer:
          "Usually, after we see samples. Layout, handwriting, and edge cases affect accuracy. We quote only after a pilot on representative documents.",
      },
    ],
    portfolioIds: ["leaf-disease-detection", "house-price-prediction"],
    aeo: {
      quickAnswer:
        "AI automation connects practical steps in your business — reading inquiries, extracting fields from documents, routing work, drafting routine replies — to the tools you already use. We map the workflow first, test on your samples, add human review where mistakes are costly, and integrate with email, CRM, or webhooks rather than deploying a generic chatbot.",
      suitableFor:
        "Operations and admin teams that still read, classify, and retype the same kinds of messages, forms, or documents every day.",
      quoteNeeds: [
        "Examples of real inputs (emails, PDFs, forms) you want automated",
        "Where results must land (CRM, spreadsheet, ticket system)",
        "Tolerance for errors and who reviews exceptions",
        "Data sensitivity and any restrictions on third-party AI APIs",
      ],
      decisionChecklist: [
        "Is the task repetitive reading/typing, or does it need human judgment every time?",
        "What is the cost of a wrong automated output?",
        "Do you have labelled examples to test accuracy before build?",
        "Should automation stop at a draft for human approval?",
      ],
    },
  },
  "cloud-api": {
    seoTitle: "Cloud API Integration | Connect Business Software",
    metaDescription:
      "Cloud API integration and cloud communication APIs — connect CRM, accounting, payments, and custom software with REST, webhooks, and maintenance.",
    h1: "Cloud API Integration and Business Software Connections",
    intro:
      "We build the connective layer between your systems: cloud API integration, REST and webhook endpoints, third-party connectors, deployment, monitoring, and maintenance — so CRM, accounting, apps, and messaging share data without manual exports.",
    audience:
      "Businesses running on several SaaS tools or a mix of custom and off-the-shelf software, where staff export CSVs, email files, or re-enter data because systems do not talk to each other.",
    problems: [
      "Two systems both hold customer data, but sync happens manually once a week.",
      "A vendor API changed and an integration silently stopped working.",
      "Software runs on a single machine or ad-hoc hosting with no backups or monitoring.",
      "You need a partner API for clients or suppliers, but only have undocumented internal scripts.",
    ],
    benefits: [
      "Data flows between tools automatically instead of through someone's inbox",
      "Documented APIs your future developers or partners can use safely",
      "Hosted deployments with backups and monitoring, not “it runs on one laptop”",
      "Ongoing fixes when vendors change APIs or your process evolves",
    ],
    deliverables: [
      "Integration design with error handling, logging, and retry behavior documented",
      "REST or webhook endpoints with authentication appropriate to exposure (internal vs public)",
      "Deployment configuration, environment separation, and backup approach",
      "Maintenance plan options for vendor API changes and security updates",
    ],
    process: [
      {
        title: "Systems audit",
        description:
          "We list systems, data owners, API availability, and failure impact before proposing connections.",
      },
      {
        title: "Integration build",
        description:
          "We implement and test sync or event flows in a staging environment when possible.",
      },
      {
        title: "Deploy & observe",
        description:
          "Production deployment includes monitoring hooks and alert paths you can act on.",
      },
      {
        title: "Maintain",
        description:
          "Retainer or ticket-based support for break-fix and planned updates — terms agreed in writing.",
      },
    ],
    includes: [
      "Integrations with CRMs, accounting, payments, and messaging platforms",
      "Secure REST APIs with authentication and developer documentation",
      "Cloud deployment with backups and uptime monitoring",
      "Maintenance retainers so integrations survive vendor updates",
    ],
    faqs: [
      {
        question: "What is cloud API integration?",
        answer:
          "Cloud API integration connects your business software — CRM, ecommerce, accounting, mobile apps, or custom admin — through documented APIs hosted in the cloud or reachable over HTTPS. Data moves on schedules or events (webhooks) instead of CSV exports. We design auth, error handling, and monitoring for each connection.",
      },
      {
        question: "How do you connect business software systems?",
        answer:
          "We map systems and data flows, prefer official APIs, then implement one-way sync, two-way sync, or webhook-driven updates with conflict rules and alerts. See our blog guide on how to connect business software systems for patterns and scoping questions, or contact us with your stack for a integration plan.",
      },
      {
        question: "What is a cloud communication API in business software?",
        answer:
          "In practice this usually means programmatic messaging or voice — SMS, WhatsApp Business Platform, email APIs, or voice platforms — wired into your CRM or workflows so customers get updates and staff see conversations in one place. We integrate only with providers and consent flows appropriate to your region and use case.",
      },
      {
        question: "Can you integrate with our legacy on-premise software?",
        answer:
          "Sometimes, via exports, database read replicas, or middleware — only after we understand licensing and security constraints. We will say no if the risk or access is unrealistic.",
      },
      {
        question: "Which cloud platforms do you use?",
        answer:
          "We deploy to common managed hosts and the major clouds depending on your preference, compliance needs, and existing accounts. We do not mandate a single vendor.",
      },
      {
        question: "What happens when a third-party API changes?",
        answer:
          "Without maintenance, integrations can break. Maintenance agreements include monitoring and scheduled updates; one-off fixes can be quoted separately if you prefer.",
      },
      {
        question: "How do you handle credentials and secrets?",
        answer:
          "Secrets live in environment configuration or your secret manager — not in source code. Access is limited to people who need it for the engagement, and rotated when staff change roles.",
      },
    ],
    portfolioIds: ["anonymous-chat", "pbic-attendance"],
    aeo: {
      quickAnswer:
        "Cloud API integration connects CRMs, accounting, payments, mobile apps, and custom software so data syncs automatically. We document how to connect each business system, implement REST/webhook flows with auth and retries, and maintain integrations when vendors change APIs. Hosting and third-party usage fees depend on providers you choose.",
      suitableFor:
        "Businesses running several tools where staff still export CSVs, email files, or re-enter data because systems do not sync reliably.",
      quoteNeeds: [
        "Systems involved and direction of data flow",
        "Whether APIs exist or exports/manual steps are used today",
        "Security and compliance constraints",
        "Who will operate production after go-live",
      ],
      decisionChecklist: [
        "Is the breakage from missing integration or from unclear process ownership?",
        "Do you need event-driven sync, scheduled jobs, or on-demand APIs?",
        "What monitoring and alerting do you expect when a sync fails?",
        "Is ongoing maintenance budgeted when vendors change APIs?",
      ],
    },
  },
}
