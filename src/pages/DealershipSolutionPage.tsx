import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { ServiceFaq } from "../components/services/ServiceFaq"
import { DEALERSHIP_PRODUCT } from "../data/dealership-pricing"
import { SITE } from "../data/content"
import { applyMeta, ROUTE_SEO, faqPageSchemaFromItems } from "../lib/seo"
import dealershipFaqs from "../../shared/seo-faqs.json"

/** Product overview (brochure-style) — full pricing lives on /pricing/. */
export function DealershipSolutionPage() {
  const faqs = dealershipFaqs.dealershipSolution

  useEffect(() => {
    applyMeta(ROUTE_SEO.dealershipSolution)
    const schema = faqPageSchemaFromItems(faqs)
    if (!schema) return
    const id = "jsonld-dealership-solution-faq"
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement("script")
      el.id = id
      el.type = "application/ld+json"
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
    return () => {
      el?.remove()
    }
  }, [faqs])

  return (
    <div className="shell pb-24 pt-32">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/solutions/dealership-service-management/" },
        ]}
      />

      <Reveal>
        <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Solution overview</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
          {DEALERSHIP_PRODUCT.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Web-based service operations software for dealerships and service centers — job tracking, customer and vehicle
          records, staff workflows, and optional customer mobile apps on higher tiers.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/pricing/">
            View pricing plans
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to={`/contact/?project=${DEALERSHIP_PRODUCT.portfolioId}&intent=demo`} variant="secondary">
            Request a demo
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <h2 className="font-display text-xl font-semibold text-slate-900">Who it is for</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Workshops, dealerships, and service centers that outgrow paper job cards, spreadsheets, and chat-based
              coordination — and need one place to see open work, assignments, and service history.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <h2 className="font-display text-xl font-semibold text-slate-900">What you get</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Service booking and job tracking</li>
              <li>Customer and vehicle records</li>
              <li>Admin and employee roles</li>
              <li>Standard operational reporting</li>
              <li>Customer mobile app on Medium and Premium plans</li>
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-16 border-t border-slate-200 pt-12">
          <ServiceFaq faqs={faqs} serviceTitle="Dealership solution" />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-12 text-sm text-slate-600">
          This page is a product overview. Published plans and INR pricing are on{" "}
          <Link to="/pricing/" className="font-medium text-cyan-700 hover:underline">
            {SITE.name} pricing
          </Link>
          . Portfolio entry:{" "}
          <Link to={`/portfolio/#${DEALERSHIP_PRODUCT.portfolioId}`} className="font-medium text-cyan-700 hover:underline">
            Dealership Service Management System
          </Link>
          .
        </p>
      </Reveal>
    </div>
  )
}
