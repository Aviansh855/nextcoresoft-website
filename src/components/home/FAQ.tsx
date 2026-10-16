import { FAQS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

/** Native details/summary keeps every Q&A in the HTML for crawlers and FAQ schema alignment. */
export function FAQ() {
  return (
    <Section id="faq">
      <Reveal>
        <SectionHeading
          eyebrow="Questions"
          title="Straight answers before you get in touch."
          description="Common questions about custom software development, mobile apps, AI automation, pricing, and support from NextCoreSoft."
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
        {FAQS.map((faq, i) => (
          <details key={faq.question} className="group py-1" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 pr-1 text-left marker:content-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-semibold text-slate-900 sm:text-lg">{faq.question}</h3>
              <span
                className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              >
                ▾
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
