import { useEffect } from "react"
import { CTABand } from "../components/home/CTABand"
import { Reveal } from "../components/ui/Reveal"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ServicePageLinks } from "../components/seo/ServicePageLinks"
import { SITE } from "../data/content"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

const PRINCIPLES = [
  {
    title: "Understand the business first",
    text: "We spend the start of every engagement learning how the work actually happens — who does it, where it stalls, and what a good outcome looks like — before discussing technology.",
  },
  {
    title: "Recommend the simplest effective thing",
    text: "If a small automation solves the problem, we will not propose a platform. Complexity has to earn its cost in maintenance.",
  },
  {
    title: "Make progress visible",
    text: "Work is delivered in milestones you can see and respond to, with scope and cost agreed in writing before each stage begins.",
  },
  {
    title: "Leave you in control",
    text: "You receive documentation, credentials, and a system your team understands. We stay on to maintain it because you want us to, not because you have to.",
  },
]

export function AboutPage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.about)
  }, [])

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-5 pt-32 pb-8 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">About</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            A software studio focused on how businesses actually operate
          </h1>
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/90 p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Quick answer</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              {SITE.name} is a remote software studio: we discover how your work actually runs, recommend the simplest
              effective build (custom web apps, mobile, AI automation, integrations), agree scope and cost in writing,
              and deliver in visible milestones with handover documentation — without inventing credentials or
              client logos we cannot show.
            </p>
          </div>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              {SITE.name} designs and builds custom software, Android and iOS applications, and AI-powered automations
              for small and medium-sized businesses, startups, and established companies modernizing their operations.
            </p>
            <p>
              Most of the work we take on replaces something manual: a spreadsheet that became a system, an inbox that
              became a workflow, or a set of tools that don&apos;t talk to each other. The goal is software your team
              uses because it makes the day shorter — not software that needs a manual of its own.
            </p>
            <p>
              We work with a small number of clients at a time, communicate in plain language, and put scope, timeline,
              and cost in writing.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
          <ServicePageLinks heading="What we build" />
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Each link goes to a dedicated page with scope, who it&apos;s for, and typical deliverables.
          </p>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold text-slate-900">How we work</h2>
        <div className="mt-8 space-y-8">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.05}>
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-display text-lg font-semibold text-slate-900">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{principle.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </article>
      <div className="pt-16">
        <CTABand />
      </div>
    </>
  )
}
