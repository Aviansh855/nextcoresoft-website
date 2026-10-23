export type AiAutomationPlanId = "starter" | "growth" | "enterprise"

export type AiAutomationPlan = {
  id: AiAutomationPlanId
  name: string
  setupInr: number
  monthlyInr: number
  firstYearTotalInr: number
  description: string
  features: string[]
  ctaLabel: string
  recommended?: boolean
}

export function aiFirstYearTotal(setupInr: number, monthlyInr: number): number {
  return setupInr + monthlyInr * 12
}

/** Published list pricing — typically positioned below common India agency retainers for comparable scope. */
export const AI_AUTOMATION_PRODUCT = {
  slug: "ai-automation-packages",
  name: "AI Automation & Intelligent Workflows",
  shortName: "AI automation",
} as const

export const AI_AUTOMATION_PLANS: AiAutomationPlan[] = [
  {
    id: "starter",
    name: "Starter",
    setupInr: 48_000,
    monthlyInr: 7_999,
    firstYearTotalInr: aiFirstYearTotal(48_000, 7_999),
    description: "For teams automating one high-volume workflow with human review built in.",
    features: [
      "Workflow discovery and mapping",
      "One production automation (email, form, or inbox routing)",
      "AI-assisted classification or extraction on your samples",
      "One integration (CRM, spreadsheet, or webhook target)",
      "Human review step before critical actions",
      "30 days post-launch tuning included in setup scope",
    ],
    ctaLabel: "Get Starter Plan",
  },
  {
    id: "growth",
    name: "Growth",
    setupInr: 72_000,
    monthlyInr: 12_499,
    firstYearTotalInr: aiFirstYearTotal(72_000, 12_499),
    description: "Recommended for businesses adding WhatsApp or web chat plus lead workflows.",
    recommended: true,
    features: [
      "Everything in Starter, subject to agreed scope",
      "WhatsApp Business Platform or website chatbot (one primary channel)",
      "Two to three connected workflows",
      "Lead capture, qualification, and routing",
      "CRM or operational dashboard updates",
      "Monthly workflow health review",
    ],
    ctaLabel: "Book a Demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    setupInr: 1_15_000,
    monthlyInr: 19_499,
    firstYearTotalInr: aiFirstYearTotal(1_15_000, 19_499),
    description: "For multi-step AI agents, extra channels, and integrations defined in contract.",
    features: [
      "Everything in Growth, subject to agreed scope",
      "Additional channel or voice workflow where agreed",
      "Multi-step AI agents with approval gates",
      "Priority support",
      "Custom integrations per signed scope",
      "Advanced reporting and runbooks for your team",
    ],
    ctaLabel: "Contact Sales",
  },
]

export type AiComparisonCell = boolean | "agreed" | "limited"

export const AI_AUTOMATION_COMPARISON: {
  label: string
  starter: AiComparisonCell
  growth: AiComparisonCell
  enterprise: AiComparisonCell
}[] = [
  { label: "Workflow discovery", starter: true, growth: true, enterprise: true },
  { label: "Production automations", starter: "limited", growth: true, enterprise: true },
  { label: "AI on your sample data (pilot-first)", starter: true, growth: true, enterprise: true },
  { label: "Human review on risky outputs", starter: true, growth: true, enterprise: true },
  { label: "CRM / spreadsheet / webhook integration", starter: true, growth: true, enterprise: true },
  { label: "WhatsApp or website chatbot", starter: false, growth: true, enterprise: true },
  { label: "Lead routing and follow-up workflows", starter: false, growth: true, enterprise: true },
  { label: "Voice or second messaging channel", starter: false, growth: false, enterprise: "agreed" },
  { label: "Multi-step AI agents", starter: false, growth: "limited", enterprise: true },
  { label: "Priority support", starter: false, growth: false, enterprise: true },
  { label: "Custom integrations", starter: false, growth: false, enterprise: "agreed" },
]

export const AI_AUTOMATION_PRICING_FAQS = [
  {
    question: "What is included in the setup fee?",
    answer:
      "Discovery, workflow design, build on agreed tools, testing on your samples, deployment, handover, and the post-launch tuning window listed for Starter. Third-party API usage (LLM, WhatsApp, voice) is billed separately by those providers where applicable.",
  },
  {
    question: "Is the monthly fee separate from setup?",
    answer:
      "Yes. The monthly license covers hosted automation runtime, monitoring, and the support tier described for each plan. Setup is a one-time implementation charge unless you expand scope later.",
  },
  {
    question: "Are these prices lower than typical market rates?",
    answer:
      "These published bands are set competitively for Indian SMB scope — often below many agency quotes for similar workflow counts — but your final quote depends on integrations, data sensitivity, and channels. We confirm in writing before build.",
  },
  {
    question: "Do plans include unlimited AI usage?",
    answer:
      "No. LLM and messaging providers charge by usage. We size automations to your volume and disclose expected third-party costs during discovery.",
  },
  {
    question: "Are taxes included?",
    answer:
      "No. Amounts shown are before applicable taxes (such as GST).",
  },
  {
    question: "Can we start with Starter and upgrade?",
    answer:
      "Yes. Additional workflows, channels, or integrations are scoped and quoted as add-ons or a plan change.",
  },
  {
    question: "How do I book a demonstration?",
    answer:
      "Use Book a Demo on the Growth plan or the contact form with your chosen plan. Demos use representative workflows — not a guarantee every feature applies without signed scope.",
  },
] as const

export { formatInr } from "./dealership-pricing"

export function aiPlanContactPath(planId: AiAutomationPlanId): string {
  const params = new URLSearchParams({
    service: "ai-automation",
    product: AI_AUTOMATION_PRODUCT.slug,
    plan: planId,
  })
  if (planId === "growth") {
    params.set("intent", "demo")
  } else {
    params.set("intent", "quote")
  }
  return `/contact/?${params.toString()}`
}
