import { motion, useReducedMotion } from "framer-motion"
import { PROCESS_STEPS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

export function Process() {
  const reduced = useReducedMotion()

  return (
    <Section id="process">
      <Reveal>
        <SectionHeading
          eyebrow="Our process"
          title="Five steps, from first conversation to a system in production."
          description="You always know what stage the work is in, what happens next, and what it costs."
        />
      </Reveal>

      <ol className="relative mt-16 space-y-0">
        {/* Connecting line drawn in as the section enters view */}
        <motion.span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-cyan-300/70 via-blue-400/40 to-transparent sm:left-[23px]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
          transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
        />

        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.06}>
            <li className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-ink font-display text-xs font-semibold text-cyan-200 sm:h-12 sm:w-12 sm:text-sm">
                {step.number}
              </span>
              <div className="pt-1.5 sm:pt-2.5">
                <h3 className="font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                  {step.description}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
