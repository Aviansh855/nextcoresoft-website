import { Link } from "react-router-dom"
import { COST_GUIDANCE, ENGAGEMENT_MODELS, SUPPORT_PLANS, TECH_STACK } from "../../data/service-provider"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

export function EngagementModelsSection({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="engagement-models">
      <Reveal>
        <SectionHeading
          eyebrow="Engagement models"
          title="Work with us the way your project needs."
          description="Fixed-price, time & materials, monthly retainer or support — like a full service provider, not just a one-time vendor."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {ENGAGEMENT_MODELS.map((m, i) => (
          <Reveal key={m.name} delay={(i % 2) * 0.07}>
            <article className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">{m.name}</h3>
              <p className="mt-2 text-sm text-slate-600"><strong className="text-slate-800">Best for:</strong> {m.bestFor}</p>
              <p className="mt-2 text-sm text-slate-600">{m.billing}</p>
              {!compact && (
                <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                  {m.includes.map((x) => <li key={x}>• {x}</li>)}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm">
        <Link to="/engagement-models/" className="font-semibold text-cyan-700 hover:underline">See full engagement & support plans →</Link>
        {" · "}
        <Link to="/how-we-work/" className="font-semibold text-cyan-700 hover:underline">How we work →</Link>
      </p>
    </Section>
  )
}

export function TechStackSection() {
  return (
    <Section id="tech-stack">
      <Reveal>
        <SectionHeading eyebrow="Technology" title="Tech stack we deliver on." description="Modern, maintainable stack chosen for your project — not locked to one vendor." />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_STACK.map((g) => (
          <article key={g.group} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
            <h3 className="font-display text-base font-semibold text-slate-900">{g.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((it) => <li key={it} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600">{it}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function SupportPlansSection() {
  return (
    <Section id="support-plans">
      <Reveal>
        <SectionHeading eyebrow="After launch" title="Support & maintenance plans." description="Software needs care after go-live. Pick a care level — final monthly price is quoted after a short audit, taxes extra." />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {SUPPORT_PLANS.map((p) => (
          <article key={p.name} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">{p.name}</h3>
            <p className="mt-1 text-sm text-cyan-700">{p.audience}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">{p.features.map((f) => <li key={f}>• {f}</li>)}</ul>
            <Link to="/contact/?intent=quote" className="mt-5 inline-block text-sm font-semibold text-cyan-700 hover:underline">Get a support quote →</Link>
          </article>
        ))}
      </div>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="px-4 py-3 text-left font-semibold text-slate-900">Indicative cost guidance (India)</caption>
          <thead><tr className="border-t bg-slate-50 text-slate-700"><th className="px-4 py-2">Project</th><th className="px-4 py-2">Planning range</th><th className="px-4 py-2">Note</th></tr></thead>
          <tbody>{COST_GUIDANCE.map((c) => <tr key={c.label} className="border-t"><td className="px-4 py-2 font-medium text-slate-800">{c.label}</td><td className="px-4 py-2 text-slate-600">{c.range}</td><td className="px-4 py-2 text-slate-600">{c.note}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">* Mobile bands are indicative planning examples, not binding quotations. Final quote only after discovery.</p>
    </Section>
  )
}
