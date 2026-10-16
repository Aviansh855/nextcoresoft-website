import { Link } from "react-router-dom"
import { SITE } from "../../data/content"

type LogoProps = {
  onClick?: () => void
  /** Slightly larger mark in the footer. */
  size?: "nav" | "footer"
}

export function Logo({ onClick, size = "nav" }: LogoProps) {
  const heightClass = size === "footer" ? "h-12 sm:h-14" : "h-9 sm:h-10"

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${SITE.name} home`}
      className="inline-flex shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
    >
      <img
        src={SITE.logo}
        alt={SITE.name}
        className={`${heightClass} w-auto rounded-md`}
        width={160}
        height={48}
        decoding="async"
        fetchPriority={size === "nav" ? "high" : undefined}
      />
    </Link>
  )
}
