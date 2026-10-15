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
      className={`nav-link rounded-md text-sm transition-colors hover:text-white ${
        current ? "text-white" : "text-slate-300"
      } ${className}`}
    >
      {children}
    </Link>
  )
}
