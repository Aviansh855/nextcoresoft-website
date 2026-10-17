import { Link } from "react-router-dom"
import { SITE } from "../../data/content"

type LogoProps = {
  onClick?: () => void
  /** Nav: icon + name in one row. Footer: stacked, centered mark + name. */
  layout?: "inline" | "stacked"
  size?: "nav" | "footer"
}

function LogoMark({ large }: { large?: boolean }) {
  const box = large
    ? "h-14 w-14 rounded-xl shadow-sm ring-1 ring-slate-200/90 sm:h-16 sm:w-16"
    : "h-9 w-9 rounded-lg ring-1 ring-slate-200/80 sm:h-10 sm:w-10"

  return (
    <span
      className={`logo-mark shrink-0 bg-white bg-no-repeat ${box}`}
      role="img"
      aria-label={`${SITE.name} logo`}
    />
  )
}

function Wordmark({ large }: { large?: boolean }) {
  const textClass = large
    ? "font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.65rem]"
    : "font-display text-[17px] font-semibold tracking-tight text-slate-900 sm:text-lg"

  return (
    <span className={textClass}>
      NextCore<span className="text-cyan-600">Soft</span>
    </span>
  )
}

export function Logo({ onClick, layout = "inline", size = "nav" }: LogoProps) {
  const isStacked = layout === "stacked" || size === "footer"
  const isFooter = size === "footer"

  if (isStacked) {
    return (
      <Link
        to="/"
        onClick={onClick}
        aria-label={`${SITE.name} home`}
        className="group inline-flex flex-col items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
      >
        <LogoMark large={isFooter} />
        <Wordmark large={isFooter} />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${SITE.name} home`}
      className="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
    >
      <LogoMark />
      <Wordmark />
    </Link>
  )
}
