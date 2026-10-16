import { type ReactNode } from "react"
import { Link } from "react-router-dom"

type Variant = "primary" | "secondary" | "ghost"

const STYLES: Record<Variant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.35)]",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:border-cyan-500/60 hover:bg-slate-50",
  ghost: "text-cyan-600 hover:text-slate-900",
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${STYLES[variant]} ${className}`

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
