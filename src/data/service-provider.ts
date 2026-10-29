/** Full-service-provider offering: engagement, onboarding, support, stack. No invented clients/stats. */

export const ENGAGEMENT_MODELS = [
  {
    name: "Fixed-Price Project",
    bestFor: "Clearly defined MVP, website, app or internal tool with agreed scope.",
    billing: "Milestone-based fixed quote after discovery — scope, timeline and cost in writing before build.",
    includes: ["Written scope & milestones", "Demo at each milestone", "QA & launch support", "Handover documentation"],
  },
  {
    name: "Time & Materials",
    bestFor: "Evolving requirements, integrations or product discovery where scope will change.",
    billing: "You pay for actual time spent, with caps and weekly reporting agreed in advance.",
    includes: ["Flexible backlog", "Weekly progress report", "Pause/scale anytime by agreement", "Transparent task tracking"],
  },
  {
    name: "Dedicated Monthly Retainer",
    bestFor: "Ongoing product development without hiring a full in-house team.",
    billing: "Monthly retainer for a reserved development capacity — ideal for continuous features and improvements.",
    includes: ["Reserved monthly hours", "Priority scheduling", "Roadmap planning", "One point of contact"],
  },
  {
    name: "Maintenance & Support",
    bestFor: "Live software, apps, APIs, SEO/GEO updates and small enhancements after launch.",
    billing: "Monthly support plan quoted after a short audit of your current system.",
    includes: ["Bug fixes & monitoring", "Security/dependency updates", "Small improvements", "Monthly health report"],
  },
] as const

export const ONBOARDING_STEPS = [
  { title: "Free consultation", text: "30–45 minute call to understand your business problem, users and deadline. No obligation." },
  { title: "NDA & discovery", text: "If needed, we sign an NDA, study your current tools/data and document requirements." },
  { title: "Written proposal", text: "You receive scope, milestones, timeline and cost in writing — no hidden extras." },
  { title: "Kickoff", text: "Confirm team, communication channel, demo schedule and success criteria." },
  { title: "Build in milestones", text: "Design, development and QA in visible sprints/demos — you approve each stage." },
  { title: "Launch & handover", text: "Deployment, training, credentials and documentation handed over to you." },
  { title: "Support & growth", text: "Optional maintenance, SEO/GEO, new features and monitoring after go-live." },
] as const

export const SUPPORT_PLANS = [
  {
    name: "Essential Care",
    audience: "Small live website / internal tool",
    features: ["Bug-fix support (business hours)", "Monthly backup & update check", "Uptime / error review", "Email support"],
  },
  {
    name: "Growth Care",
    audience: "Growing app or business platform",
    features: ["Everything in Essential", "Small features every month", "Performance & SEO health check", "Priority response target"],
  },
  {
    name: "Priority Care",
    audience: "Revenue-critical system",
    features: ["Everything in Growth", "Priority queue for incidents", "Release management", "Monthly roadmap & report call"],
  },
] as const

export const TECH_STACK = [
  { group: "Web & Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "Mobile", items: ["React Native", "Android (Play Store)", "iOS (App Store)", "REST APIs"] },
  { group: "Backend & APIs", items: ["Node.js", "PostgreSQL", "REST / Webhooks", "Third-party integrations"] },
  { group: "Cloud & DevOps", items: ["Cloudflare", "Managed cloud hosting", "CI/CD", "Monitoring & backups"] },
  { group: "AI & Automation", items: ["LLM APIs", "WhatsApp Business Platform", "n8n & webhooks", "Voice / chatbot workflows"] },
  { group: "SEO, GEO & Analytics", items: ["Google Search Console", "Bing Webmaster", "Structured data (JSON-LD)", "Sitemap, RSS & IndexNow"] },
] as const

export const COST_GUIDANCE = [
  { label: "Simple business app / internal tool", range: "Planning band — quoted after scope", note: "Narrow users, few screens, standard integrations." },
  { label: "Mobile app (Android + iOS)", range: "₹1.5L–₹5L simple · ₹4L–₹12L MVP · ₹8L–₹25L+ multi-role*", note: "Indicative India planning bands from our cost guide — not a fixed price list." },
  { label: "Custom software / CRM platform", range: "Quoted after discovery", note: "Depends on roles, workflows, data migration and integrations." },
  { label: "AI automation workflow", range: "See AI automation pricing plans", note: "Published Starter / Growth / Enterprise plans available on /pricing/ai-automation/." },
] as const
