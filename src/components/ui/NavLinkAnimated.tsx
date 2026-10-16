import { Link } from "react-router-dom"

interface NavLinkAnimatedProps {
  to: string
  children: React.ReactNode
  current?: boolean
  className?: string
  onClick?: () => void
}

export function NavLinkAnimated({ to, children, current, className = "", onClick }: NavLinkAnimatedProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`nav-link rounded-md text-sm transition-colors hover:text-slate-900 ${
        current ? "text-slate-900" : "text-slate-600"
      } ${className}`}
    >
      {children}
    </Link>
  )
}
