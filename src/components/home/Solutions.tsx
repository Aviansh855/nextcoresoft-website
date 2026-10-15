import { SOLUTIONS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

export function Solutions() {
  return (
    <Section id="solutions">
      <Reveal>
        <SectionHeading
          eyebrow="Solutions"
          title="What we build, built around your operation."
          description="These are solution categories we design and develop to order. NextCoreSoft does not sell off-the-shelf products — each of these is scoped, quoted, and built for the business in front of us."
        />
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((solution, i) => (
          <Reveal key={solution.title} delay={(i % 3) * 0.06} className="h-full">
            <article className="flex h-full flex-col bg-ink p-7">
              <span className="self-start rounded-full border border-cyan-300/30 px-2.5 py-1 text-[11px] font-medium tracking-wide text-cyan-200 uppercase">
                {solution.kind}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{solution.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{solution.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
