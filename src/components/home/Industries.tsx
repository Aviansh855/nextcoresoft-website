import { Briefcase, Car, HeartPulse, Store, Truck, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import { INDUSTRIES } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

const ICONS = [Car, Store, Wallet, HeartPulse, Truck, Briefcase]

export function Industries() {
  return (
    <Section id="industries">
      <Reveal>
        <SectionHeading
          eyebrow="Industries"
          title="Industries we are equipped to serve."
          description="Experience we can bring to your sector — not a list of clients. We have not published client names here, and we don't imply relationships we don't have."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((industry, i) => {
          const Icon = ICONS[i]
          return (
            <Reveal key={industry.title} delay={(i % 3) * 0.07}>
              <article className="card-lift h-full rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-transparent p-6">
                <Icon size={22} className="text-cyan-600" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{industry.description}</p>
                {i === 0 ? (
                  <Link to="/pricing/" className="mt-4 inline-block text-sm font-semibold text-cyan-700 hover:text-slate-900">
                    Dealership service management pricing →
                  </Link>
                ) : null}
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
