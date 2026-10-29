import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { SupportPlansSection, TechStackSection } from "../components/provider/ProviderSections"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { ENGAGEMENT_MODELS } from "../data/service-provider"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function EngagementModelsPage() {
  useEffect(() => { applyMeta(ROUTE_SEO.engagementModels) }, [])
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-5 pt-32 pb-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Engagement Models" }]} />
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Pricing & engagement</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Engagement models, support plans & cost guidance</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Choose how you want to buy software services — fixed project, flexible time & materials, a monthly team, or ongoing care. Product pricing for dealership software and AI automation is published separately.</p>
          <div className="mt-6 flex flex-wrap gap-3"><ButtonLink to="/contact/?intent=quote">Request a Quote</ButtonLink><ButtonLink to="/pricing/ai-automation/" variant="secondary">AI Automation Pricing</ButtonLink><ButtonLink to="/pricing/" variant="secondary">Dealership Pricing</ButtonLink></div>
        </Reveal>
        <div className="mt-12 grid gap-5">
          {ENGAGEMENT_MODELS.map((m) => (
            <article key={m.name} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h2 className="font-display text-xl font-semibold text-slate-900">{m.name}</h2>
              <p className="mt-2 text-sm text-slate-600"><strong className="text-slate-800">Best for:</strong> {m.bestFor}</p>
              <p className="mt-2 text-sm text-slate-600">{m.billing}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">{m.includes.map((x) => <li key={x}>• {x}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-600">Not sure? <Link to="/how-we-work/" className="font-medium text-cyan-700 hover:underline">See how we work</Link> or <Link to="/contact/" className="font-medium text-cyan-700 hover:underline">describe your project</Link> — we recommend the simplest model that fits.</p>
      </div>
      <SupportPlansSection />
      <TechStackSection />
    </>
  )
}
