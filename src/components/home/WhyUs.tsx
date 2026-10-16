import { REASONS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

export function WhyUs() {
  return (
    <Section id="why">
      <Reveal>
        <SectionHeading
          eyebrow="Why NextCoreSoft"
          title="A technical partner that stays understandable."
        />
      </Reveal>

      <div className="mt-14 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => (
          <Reveal key={reason.title} delay={(i % 3) * 0.06}>
            <article>
              <span className="font-display text-sm font-semibold text-cyan-600/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{reason.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
