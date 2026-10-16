/** Decorative UI preview — not a screenshot of production software. */
export function PortfolioMockup({ variant, title }: { variant: number; title: string }) {
  return (
    <div
      className="relative h-44 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-4"
      role="img"
      aria-label={`Concept preview for ${title}`}
    >
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-200" />
      </div>
      {variant % 3 === 0 && (
        <div className="mt-4 space-y-2" aria-hidden="true">
          {[72, 56, 64].map((w) => (
            <div key={w} className="h-2 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}
      {variant % 3 === 1 && (
        <div className="mt-4 flex justify-center" aria-hidden="true">
          <div className="w-20 rounded-lg border border-slate-200 bg-white p-2">
            <div className="h-10 rounded bg-cyan-100/80" />
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200" />
          </div>
        </div>
      )}
      {variant % 3 === 2 && (
        <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-12 rounded-lg border border-slate-200 bg-white" />
          ))}
        </div>
      )}
      <span className="absolute right-3 bottom-3 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] tracking-wide text-slate-600 uppercase">
        Concept preview
      </span>
    </div>
  )
}
