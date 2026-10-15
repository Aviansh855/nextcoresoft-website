import { type ReactNode } from "react"
import { Link } from "react-router-dom"

type Variant = "primary" | "secondary" | "ghost"

const STYLES: Record<Variant, string> = {
  primary:
    "bg-white text-ink hover:bg-cyan-100 shadow-[0_8px_30px_-12px_rgba(125,211,252,0.7)]",
  secondary:
    "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-cyan-300/50 hover:bg-white/10",
  ghost: "text-cyan-200 hover:text-white",
}

interface ButtonLinkProps {
  children: ReactNode
  to: string
  variant?: Variant
  className?: string
  onClick?: () => void
}

/** A link styled as a button. Internal routes use the router; hashes and external URLs use an anchor. */
export function ButtonLink({ children, to, variant = "primary", className = "", onClick }: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 ${STYLES[variant]} ${className}`

  if (to.startsWith("/")) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={to} onClick={onClick} className={classes}>
      {children}
    </a>
  )
}
