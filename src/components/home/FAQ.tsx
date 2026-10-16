import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { FAQS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq">
      <Reveal>
        <SectionHeading
          eyebrow="Questions"
          title="Straight answers before you get in touch."
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-slate-900 sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </h3>
              {isOpen && <p className="pb-5 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</p>}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
