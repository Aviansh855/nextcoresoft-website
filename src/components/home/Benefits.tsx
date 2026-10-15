import { Gauge, Link2, ListChecks, Users } from "lucide-react"
import { BENEFITS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

const ICONS = [ListChecks, Users, Link2, Gauge]

export function Benefits() {
  return (
    <Section id="value">
      <Reveal>
        <SectionHeading
          eyebrow="Why it matters"
          title="Software should give time back to the business."
          description="We focus on four outcomes. None of them depend on a promised percentage — they depend on removing the work that slows your team down."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit, i) => {
          const Icon = ICONS[i]
          return (
            <Reveal key={benefit.title} delay={i * 0.08}>
              <article className="group card-lift h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-3" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{benefit.description}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
