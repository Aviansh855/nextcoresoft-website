import { Link } from "react-router-dom"
import { SITE } from "../../data/content"

type LogoProps = {
  onClick?: () => void
  /** Slightly larger mark in the footer. */
  size?: "nav" | "footer"
}

export function Logo({ onClick, size = "nav" }: LogoProps) {
  const isFooter = size === "footer"
  const markClass = isFooter ? "h-10 w-10 sm:h-11 sm:w-11" : "h-8 w-8 sm:h-9 sm:w-9"
  const textClass = isFooter
    ? "font-display text-lg font-semibold tracking-tight text-white sm:text-xl"
    : "font-display text-[17px] font-semibold tracking-tight text-white"

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${SITE.name} home`}
      className="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
    >
      <span
        className={`relative shrink-0 overflow-hidden rounded-md bg-white ${markClass}`}
        aria-hidden="true"
      >
        <img
          src={SITE.logo}
          alt=""
          className="h-[200%] w-full max-w-none object-cover object-top"
          decoding="async"
          fetchPriority={size === "nav" ? "high" : undefined}
        />
      </span>
      <span className={textClass}>
        NextCore<span className="text-cyan-300">Soft</span>
      </span>
    </Link>
  )
}
