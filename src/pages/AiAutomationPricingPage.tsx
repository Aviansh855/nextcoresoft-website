import { Check, Minus } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import {
  AI_AUTOMATION_COMPARISON,
  AI_AUTOMATION_PLANS,
  AI_AUTOMATION_PRICING_FAQS,
  AI_AUTOMATION_PRODUCT,
  aiPlanContactPath,
  formatInr,
  type AiComparisonCell,
} from "../data/ai-automation-pricing"
import { SITE } from "../data/content"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

function ComparisonIcon({ value }: { value: AiComparisonCell }) {
  if (value === true) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-cyan-700" aria-hidden="true">
        <Check size={18} strokeWidth={2.5} />
      </span>
    )
  }
  if (value === "agreed") {
    return <span className="text-sm font-medium text-slate-700">As agreed</span>
  }
  if (value === "limited") {
    return <span className="text-sm text-slate-600">Limited</span>
  }
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center text-slate-300" aria-hidden="true">
      <Minus size={18} />
    </span>
  )
}

export function AiAutomationPricingPage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.aiAutomationPricing)
  }, [])

  return (
    <div className="pb-24">
      <div className="shell pt-32">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Pricing", to: "/pricing/" }, { label: "AI automation" }]} />

        <Reveal>
          <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Product pricing</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            {AI_AUTOMATION_PRODUCT.name} — plans & pricing
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Setup plus monthly license for practical AI workflows — WhatsApp, chatbots, document and inbox automation,
            and CRM handoffs. Published rates are aligned with India market retainers but set competitively for typical
            SMB scope. See also{" "}
            <Link to="/services/ai-automation/" className="font-medium text-cyan-700 hover:underline">
              AI automation services
            </Link>{" "}
            and{" "}
            <Link to="/pricing/" className="font-medium text-cyan-700 hover:underline">
              dealership pricing
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-slate-900">How billing works</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              <li>
                <strong className="font-medium text-slate-800">Setup fee:</strong> one-time implementation.
              </li>
              <li>
                <strong className="font-medium text-slate-800">Monthly license:</strong> recurring automation hosting
                and plan support.
              </li>
              <li>
                <strong className="font-medium text-slate-800">First-year total</strong> = setup + 12 × monthly (on
                each card).
              </li>
              <li>LLM, WhatsApp, SMS, and voice usage billed by providers where applicable. Taxes extra.</li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {AI_AUTOMATION_PLANS.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.05}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 ${
                  plan.recommended
                    ? "border-cyan-400/70 bg-white shadow-[0_20px_50px_-24px_rgba(37,99,235,0.35)] ring-1 ring-cyan-200/80"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.recommended ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                    Recommended
                  </span>
                ) : null}
                <h2 className="font-display text-2xl font-semibold text-slate-900">{plan.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{plan.description}</p>
                <div className="mt-6 space-y-1">
                  <p className="text-sm text-slate-500">Setup fee (one-time)</p>
                  <p className="font-display text-3xl font-semibold tracking-tight text-slate-900">{formatInr(plan.setupInr)}</p>
                  <p className="mt-4 text-sm text-slate-500">Monthly license</p>
                  <p className="font-display text-2xl font-semibold text-slate-900">{formatInr(plan.monthlyInr)}</p>
                  <p className="text-sm text-slate-500">/ month</p>
                </div>
                <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="block font-medium text-slate-900">First-year total</span>
                  {formatInr(plan.firstYearTotalInr)} + applicable taxes
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink to={aiPlanContactPath(plan.id)} className="mt-8 w-full">
                  {plan.ctaLabel}
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <section className="mt-20" aria-labelledby="ai-comparison-heading">
            <h2 id="ai-comparison-heading" className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
              Plan comparison
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                      Capability
                    </th>
                    {AI_AUTOMATION_PLANS.map((p) => (
                      <th key={p.id} scope="col" className="px-4 py-3 font-semibold text-slate-900">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AI_AUTOMATION_COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 last:border-0">
                      <th scope="row" className="px-4 py-3 font-normal text-slate-700">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-center">
                        <ComparisonIcon value={row.starter} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ComparisonIcon value={row.growth} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ComparisonIcon value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mt-20 border-t border-slate-200 pt-16" aria-labelledby="ai-pricing-faq-heading">
            <h2 id="ai-pricing-faq-heading" className="font-display text-2xl font-semibold text-slate-900">
              Pricing questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {AI_AUTOMATION_PRICING_FAQS.map((faq, i) => (
                <details key={faq.question} className="group py-1" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base font-semibold text-slate-900">{faq.question}</h3>
                    <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true">
                      ▾
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/80 p-8 text-center">
            <p className="text-sm text-slate-600">
              Questions? Email{" "}
              <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-cyan-700 hover:underline">
                {SITE.contactEmail}
              </a>{" "}
              or use the contact form with your plan selected.
            </p>
            <ButtonLink to="/contact/?service=ai-automation" className="mt-6">
              Contact {SITE.name}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
