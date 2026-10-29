import { Link } from "react-router-dom"
import { SERVICES } from "../../data/content"

type ServicePageLinksProps = {
  /** Short list of crawlable `/services/*` links for internal linking. */
  variant?: "list" | "inline" | "compact"
  className?: string
  heading?: string
}

const linkClass =
  "font-medium text-cyan-700 underline-offset-2 transition-colors hover:text-cyan-900 hover:underline"

/** All service detail URLs — use on homepage, about, contact, and legal pages. */
export function ServicePageLinks({ variant = "list", className = "", heading }: ServicePageLinksProps) {
  if (variant === "inline") {
    return (
      <span className={className}>
        {SERVICES.map((service, index) => (
          <span key={service.slug}>
            {index > 0 && (index === SERVICES.length - 1 ? ", and " : ", ")}
            <Link to={`/services/${service.slug}/`} className={linkClass}>
              {service.title}
            </Link>
          </span>
        ))}
      </span>
    )
  }

  if (variant === "compact") {
    return (
      <ul className={`flex flex-wrap gap-x-3 gap-y-2 text-sm ${className}`}>
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link to={`/services/${service.slug}/`} className={linkClass}>
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <nav aria-label={heading ?? "Services"} className={className}>
      {heading ? (
        <h2 className="font-display text-lg font-semibold text-slate-900 sm:text-xl">{heading}</h2>
      ) : null}
      <ul className={`space-y-2.5 ${heading ? "mt-4" : ""}`}>
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link
              to={`/services/${service.slug}/`}
              className="block rounded-lg text-sm text-slate-600 transition-colors hover:text-cyan-800 sm:text-base"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
