/** Visible answer-first block for service pages (AEO — matches expanded sections below). */
export function ServiceAnswerBlock({
  quickAnswer,
  suitableFor,
  quoteNeeds,
  decisionChecklist,
}: {
  quickAnswer: string
  suitableFor: string
  quoteNeeds: readonly string[]
  decisionChecklist?: readonly string[]
}) {
  return (
    <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h2 className="font-display text-lg font-semibold text-slate-900">Quick answer</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{quickAnswer}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Who it suits</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{suitableFor}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">What we need for a quote</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
          {quoteNeeds.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      {decisionChecklist && decisionChecklist.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Decision checklist</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {decisionChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
