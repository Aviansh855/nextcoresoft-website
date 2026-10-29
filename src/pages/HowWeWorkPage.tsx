import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { EngagementModelsSection } from "../components/provider/ProviderSections"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { ONBOARDING_STEPS } from "../data/service-provider"
import { SITE } from "../data/content"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function HowWeWorkPage() {
  useEffect(() => { applyMeta(ROUTE_SEO.howWeWork) }, [])
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-5 pt-32 pb-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "How We Work" }]} />
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">How we work</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">How {SITE.name} onboards & delivers projects</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">From first call to launch and support — a clear, consulting-first process so you always know scope, cost and next step.</p>
        </Reveal>
        <ol className="mt-12 space-y-6">
          {ONBOARDING_STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 font-display text-sm font-bold text-white">{i + 1}</span>
              <div><h2 className="font-display text-lg font-semibold text-slate-900">{s.title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">{s.text}</p></div>
            </li>
          ))}
        </ol>
        <div className="mt-10 rounded-2xl border border-slate-200 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900">Your idea stays yours</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">We can sign an NDA before deep discovery. Source code, data and credentials are handed over as agreed in writing — you are not locked in. Communication is in English via video, email and shared docs, with demos at every milestone.</p>
          <div className="mt-5 flex flex-wrap gap-3"><ButtonLink to="/contact/">Book a Free Consultation</ButtonLink><ButtonLink to="/engagement-models/" variant="secondary">See Engagement Models</ButtonLink></div>
        </div>
        <p className="mt-6 text-sm text-slate-600">Explore <Link to="/services/" className="font-medium text-cyan-700 hover:underline">all services</Link> or <Link to="/portfolio/" className="font-medium text-cyan-700 hover:underline">project showcases</Link>.</p>
      </div>
      <EngagementModelsSection compact />
    </>
  )
}
