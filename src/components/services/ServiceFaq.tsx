type FaqItem = { question: string; answer: string }

export function ServiceFaq({ faqs, serviceTitle }: { faqs: readonly FaqItem[]; serviceTitle: string }) {
  if (!faqs.length) return null
  return (
    <section className="mt-12" aria-labelledby="service-faq-heading">
      <h2 id="service-faq-heading" className="font-display text-2xl font-semibold text-slate-900">
        {serviceTitle} — common questions
      </h2>
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((faq, i) => (
          <details key={faq.question} className="group py-1" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-semibold text-slate-900">{faq.question}</h3>
              <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true">
                ▾
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
