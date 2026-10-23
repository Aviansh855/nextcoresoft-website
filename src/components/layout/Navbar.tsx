import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useLocation } from "react-router-dom"
import { NAV_LINKS } from "../../data/content"
import { ButtonLink } from "../ui/Button"
import { NavLinkAnimated } from "../ui/NavLinkAnimated"
import { Logo } from "./Logo"

function isCurrent(href: string, pathname: string, hash: string) {
  const hashIndex = href.indexOf("#")
  if (hashIndex >= 0) {
    const path = href.slice(0, hashIndex) || "/"
    return pathname === path && hash === `#${href.slice(hashIndex + 1)}`
  }
  return pathname === href
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 12)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false))
    return () => cancelAnimationFrame(id)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const headerSurface =
    scrolled || open
      ? open
        ? "border-b border-slate-200 bg-white"
        : "border-b border-slate-200 bg-white/95 backdrop-blur-lg"
      : "border-b border-transparent bg-transparent"

  const mobileMenu =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <>
        <button
          type="button"
          className="fixed inset-0 z-[90] bg-slate-900/20 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 z-[100] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-5 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:hidden"
          style={{ top: "calc(4rem + env(safe-area-inset-top, 0px))" }}
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const current = isCurrent(link.href, location.pathname, location.hash)
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`block rounded-lg px-2 py-3 text-base hover:bg-slate-50 hover:text-slate-900 ${
                      current ? "text-slate-900" : "text-slate-700"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ButtonLink to="/contact/" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Let&apos;s Talk
          </ButtonLink>
        </div>
      </>,
      document.body,
    )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${headerSurface}`}
    >
      <nav className="shell flex h-16 items-center justify-between" aria-label="Primary">
        <Logo onClick={() => setOpen(false)} />

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const current = isCurrent(link.href, location.pathname, location.hash)
            return (
              <li key={link.href}>
                <NavLinkAnimated to={link.href} current={current}>
                  {link.label}
                </NavLinkAnimated>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:block">
          <ButtonLink to="/contact/" className="px-5 py-2.5">
            Let&apos;s Talk
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileMenu}
    </header>
  )
}
