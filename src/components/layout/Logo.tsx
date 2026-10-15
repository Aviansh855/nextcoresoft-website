import { Link } from "react-router-dom"

/** Wordmark: a small geometric core mark plus the company name. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="NextCoreSoft home"
      className="flex items-center gap-2.5 rounded-md"
    >
      <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border border-cyan-300/50" />
        <span className="absolute inset-[5px] rounded-full border border-blue-400/60" />
        <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_10px_2px] shadow-cyan-300/70" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight text-white">
        NextCore<span className="text-cyan-300">Soft</span>
      </span>
    </Link>
  )
}
