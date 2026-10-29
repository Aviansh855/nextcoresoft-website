import { ArrowUpRight, Cloud, Cpu, Search, Smartphone, Workflow } from "lucide-react"
import { Link } from "react-router-dom"
import { SERVICES } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"
import { TiltCard } from "../ui/TiltCard"

const ICONS = [Cpu, Smartphone, Workflow, Cloud, Search]

/** A distinct accent per card so services read as a set, not clones. */
const ACCENTS = [
  { chip: "text-cyan-600 bg-cyan-300/10 border-cyan-300/20", glow: "bg-cyan-400/10" },
  { chip: "text-blue-300 bg-blue-400/10 border-blue-300/20", glow: "bg-blue-500/10" },
  { chip: "text-violet-300 bg-violet-400/10 border-violet-300/20", glow: "bg-violet-500/10" },
  { chip: "text-sky-200 bg-sky-300/10 border-sky-200/20", glow: "bg-sky-400/10" },
  { chip: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20", glow: "bg-emerald-500/10" },
]

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="Five ways we help your business grow online."
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
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-7 transition-all duration-300 hover:border-cyan-300/25 hover:shadow-[0_24px_48px_-28px_rgba(34,211,238,0.45)]">
                  <div
                    className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl ${accent.glow}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${accent.chip}`}
                  >
                    <Icon size={22} aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-slate-900">
                    <Link
                      to={`/services/${service.slug}/`}
                      className="rounded transition-colors hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.summary}</p>

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
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/services/${service.slug}/`}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-cyan-600 transition-colors group-hover:text-slate-900"
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
