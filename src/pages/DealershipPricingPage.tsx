import { Check, Minus } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import {
  DEALERSHIP_COMPARISON,
  DEALERSHIP_PLANS,
  DEALERSHIP_PRICING_FAQS,
  DEALERSHIP_PRODUCT,
  formatInr,
  planContactPath,
  type ComparisonCell,
} from "../data/dealership-pricing"
import { SITE } from "../data/content"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

function ComparisonIcon({ value }: { value: ComparisonCell }) {
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
  if (value === "not-included") {
    return <span className="text-sm text-slate-500">Not included</span>
  }
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center text-slate-300" aria-hidden="true">
      <Minus size={18} />
    </span>
  )
}

export function DealershipPricingPage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.pricing)
  }, [])

  return (
    <div className="pb-24">
      <div className="shell pt-32">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Pricing" }]} />

        <Reveal>
          <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Product pricing</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            {DEALERSHIP_PRODUCT.name} pricing
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Transparent plans for automobile dealerships and service centers — setup plus monthly license. Prices below
            are positioned for growing dealerships in India; custom software and integration work outside this product
            is quoted separately on our{" "}
            <Link to="/services/custom-software/" className="font-medium text-cyan-700 hover:underline">
              custom software
            </Link>{" "}
            and{" "}
            <Link to="/contact/" className="font-medium text-cyan-700 hover:underline">
              contact
            </Link>{" "}
            pages.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Also see{" "}
            <Link to="/pricing/ai-automation/" className="font-medium text-cyan-700 hover:underline">
              AI automation pricing plans
            </Link>
            .{" "}
            See the{" "}
            <Link to={`/portfolio/#${DEALERSHIP_PRODUCT.portfolioId}`} className="font-medium text-cyan-700 hover:underline">
              portfolio showcase
            </Link>{" "}
            for a product walkthrough request. {SITE.name} does not publish client logos or performance statistics on this
            page.
          </p>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-slate-900">How billing works</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              <li>
                <strong className="font-medium text-slate-800">Setup fee:</strong> one-time implementation charge.
              </li>
              <li>
                <strong className="font-medium text-slate-800">Monthly license:</strong> recurring monthly software
                license.
              </li>
              <li>
                <strong className="font-medium text-slate-800">First-year total</strong> = setup fee + 12 monthly
                license payments (shown on each plan card).
              </li>
              <li>Applicable taxes are extra. We do not advertise discounts or free services unless agreed in writing.</li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {DEALERSHIP_PLANS.map((plan, index) => (
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
                <ButtonLink to={planContactPath(plan.id)} className="mt-8 w-full">
                  {plan.ctaLabel}
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <section className="mt-20" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
              Feature comparison
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Premium multi-branch, integration, and customization rows apply only where included in your signed scope.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                      Feature
                    </th>
                    {DEALERSHIP_PLANS.map((p) => (
                      <th key={p.id} scope="col" className="px-4 py-3 font-semibold text-slate-900">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEALERSHIP_COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 last:border-0">
                      <th scope="row" className="px-4 py-3 font-normal text-slate-700">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-center">
                        <ComparisonIcon value={row.basic} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ComparisonIcon value={row.medium} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ComparisonIcon value={row.premium} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mt-20 border-t border-slate-200 pt-16" aria-labelledby="pricing-faq-heading">
            <h2 id="pricing-faq-heading" className="font-display text-2xl font-semibold text-slate-900">
              Pricing questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {DEALERSHIP_PRICING_FAQS.map((faq, i) => (
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
            <h2 className="font-display text-xl font-semibold text-slate-900">Need a different scope?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Other custom software, mobile apps, and integrations are priced from discovery — typically aligned below
              typical market quotes for comparable scope when we can standardize delivery. Start with a free consultation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/contact/">Contact {SITE.name}</ButtonLink>
              <ButtonLink to="/services/custom-software/" variant="secondary">
                Custom software services
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
