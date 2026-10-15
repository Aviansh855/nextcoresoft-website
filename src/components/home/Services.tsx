import { ArrowUpRight, Cloud, Cpu, Smartphone, Workflow } from "lucide-react"
import { Link } from "react-router-dom"
import { SERVICES } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"
import { TiltCard } from "../ui/TiltCard"

const ICONS = [Cpu, Smartphone, Workflow, Cloud]

/** A distinct accent per card so the four services read as a set, not clones. */
const ACCENTS = [
  { chip: "text-cyan-300 bg-cyan-300/10 border-cyan-300/20", glow: "bg-cyan-400/10" },
  { chip: "text-blue-300 bg-blue-400/10 border-blue-300/20", glow: "bg-blue-500/10" },
  { chip: "text-violet-300 bg-violet-400/10 border-violet-300/20", glow: "bg-violet-500/10" },
  { chip: "text-sky-200 bg-sky-300/10 border-sky-200/20", glow: "bg-sky-400/10" },
]

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="Four ways we build for your business."
          description="Each engagement starts from the problem, not the technology. Here is where we work."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i]
          const accent = ACCENTS[i]
          return (
            <Reveal key={service.slug} delay={(i % 2) * 0.1}>
              <TiltCard className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7">
                  <div
                    className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl ${accent.glow}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accent.chip}`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.summary}</p>

                  <ul className="mt-5 space-y-2">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-sm text-slate-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {service.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-cyan-300 transition-colors group-hover:text-white"
                  >
                    {service.cta}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
