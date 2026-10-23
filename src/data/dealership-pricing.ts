export type DealershipPlanId = "basic" | "medium" | "premium"

export type DealershipPlan = {
  id: DealershipPlanId
  name: string
  setupInr: number
  monthlyInr: number
  firstYearTotalInr: number
  description: string
  features: string[]
  ctaLabel: string
  recommended?: boolean
}

/** First-year total = setup + 12 × monthly (verified against published figures). */
export function firstYearTotal(setupInr: number, monthlyInr: number): number {
  return setupInr + monthlyInr * 12
}

export const DEALERSHIP_PRODUCT = {
  slug: "dealership-service-management",
  portfolioId: "techwheels-service-management",
  name: "Dealership Service Management Solution",
  shortName: "Dealership Service Management",
} as const

export const DEALERSHIP_PLANS: DealershipPlan[] = [
  {
    id: "basic",
    name: "Basic",
    setupInr: 60_000,
    monthlyInr: 9_999,
    firstYearTotalInr: firstYearTotal(60_000, 9_999),
    description: "For dealerships that need to digitize their daily service operations.",
    features: [
      "Dealership service management system",
      "Customer and vehicle records",
      "Service booking and job tracking",
      "Service workflow management",
      "Admin and employee access",
      "Standard reporting and operational tracking",
      "Customer mobile app: Not included",
    ],
    ctaLabel: "Get Basic Plan",
  },
  {
    id: "medium",
    name: "Medium",
    setupInr: 75_000,
    monthlyInr: 11_999,
    firstYearTotalInr: firstYearTotal(75_000, 11_999),
    description: "Recommended for dealerships seeking a more complete digital service experience.",
    recommended: true,
    features: [
      "Everything included in Basic, subject to the agreed scope",
      "Customer mobile app included",
      "Customer service booking and status tracking",
      "Service workflow and staff coordination",
      "Customer communication and operational visibility",
      "Standard reporting",
      "Admin, employee, and customer-facing functionality as agreed",
    ],
    ctaLabel: "Book a Demo",
  },
  {
    id: "premium",
    name: "Premium",
    setupInr: 125_000,
    monthlyInr: 19_999,
    firstYearTotalInr: firstYearTotal(125_000, 19_999),
    description: "For dealerships that require advanced workflows and expanded operational capabilities.",
    features: [
      "Everything included in Medium, subject to the agreed scope",
      "Advanced reports and workflows",
      "Priority support",
      "Multi-branch capabilities where agreed",
      "Integrations where agreed",
      "Additional customization based on the signed project scope",
    ],
    ctaLabel: "Contact Sales",
  },
]

export type ComparisonCell = boolean | "agreed" | "not-included"

export type ComparisonRow = {
  label: string
  basic: ComparisonCell
  medium: ComparisonCell
  premium: ComparisonCell
}

export const DEALERSHIP_COMPARISON: ComparisonRow[] = [
  { label: "Dealership service management system", basic: true, medium: true, premium: true },
  { label: "Customer and vehicle records", basic: true, medium: true, premium: true },
  { label: "Service booking and job tracking", basic: true, medium: true, premium: true },
  { label: "Service workflow management", basic: true, medium: true, premium: true },
  { label: "Admin and employee access", basic: true, medium: true, premium: true },
  { label: "Standard reporting and operational tracking", basic: true, medium: true, premium: true },
  { label: "Customer mobile app", basic: "not-included", medium: true, premium: true },
  { label: "Customer service booking and status tracking", basic: false, medium: true, premium: true },
  { label: "Customer communication and operational visibility", basic: false, medium: true, premium: true },
  { label: "Advanced reports and workflows", basic: false, medium: false, premium: true },
  { label: "Priority support", basic: false, medium: false, premium: true },
  { label: "Multi-branch capabilities", basic: false, medium: false, premium: "agreed" },
  { label: "Third-party integrations", basic: false, medium: false, premium: "agreed" },
  { label: "Additional customization", basic: false, medium: false, premium: "agreed" },
]

export const DEALERSHIP_PRICING_FAQS = [
  {
    question: "What is the setup fee?",
    answer:
      "The setup fee is a one-time implementation charge for configuring the Dealership Service Management Solution for your dealership — workflows, access roles, and agreed modules. It is separate from the monthly license and is due according to your signed agreement.",
  },
  {
    question: "Is the monthly license charged separately?",
    answer:
      "Yes. The monthly license is a recurring charge for continued use of the software. Setup is one-time; the license renews each month unless your contract specifies otherwise.",
  },
  {
    question: "Is the customer mobile app included in every plan?",
    answer:
      "No. The customer mobile app is included in Medium and Premium plans as described on this page. Basic includes admin and employee access on the management system but does not include the customer mobile app.",
  },
  {
    question: "Can the solution be customized for our dealership?",
    answer:
      "Yes, within the plan and signed scope. Premium explicitly includes additional customization where agreed. Basic and Medium cover the features listed for each tier; extra modules, integrations, or branches require scope confirmation and may affect setup and license fees.",
  },
  {
    question: "Are taxes included in the displayed prices?",
    answer:
      "No. Displayed setup and monthly amounts are before applicable taxes (such as GST). Taxes are calculated and shown on your invoice per Indian regulations.",
  },
  {
    question: "Can we request a product demonstration?",
    answer:
      "Yes. Use Book a Demo on the Medium plan or the contact form with your preferred plan. We walk through the management system and, where applicable, the customer app — as a product showcase, not a guarantee of identical configuration for every dealership.",
  },
  {
    question: "What features and integrations are included in the signed scope?",
    answer:
      "Each plan lists standard inclusions on this page. Multi-branch features, third-party integrations, and advanced customization are included in Premium only where explicitly agreed in writing. Anything outside the signed scope is quoted separately before work starts.",
  },
] as const

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function planContactPath(planId: DealershipPlanId): string {
  const params = new URLSearchParams({
    service: "custom-software",
    project: DEALERSHIP_PRODUCT.portfolioId,
    plan: planId,
    product: DEALERSHIP_PRODUCT.slug,
  })
  if (planId === "medium") {
    params.set("intent", "demo")
  } else {
    params.set("intent", "quote")
  }
  return `/contact/?${params.toString()}`
}
