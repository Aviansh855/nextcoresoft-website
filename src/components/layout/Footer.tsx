import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SERVICES, SITE } from "../../data/content"
import { Logo } from "./Logo"

/** Current year, computed after mount so server and client markup agree. */
function Copyright() {
  const [year, setYear] = useState<number | null>(null)
  useEffect(() => {
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()))
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <>
      © {year ?? ""} {SITE.name}. All rights reserved.
    </>
  )
}

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "X", href: "#" },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{SITE.tagline}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="rounded text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Privacy Policy", to: "/privacy" },
              { label: "Terms of Service", to: "/terms" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="rounded text-sm text-slate-400 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>
              <a href="mailto:hello@nextcoresoft.com" className="rounded transition-colors hover:text-white">
                hello@nextcoresoft.com
              </a>
              <span className="mt-0.5 block text-xs text-slate-500">Placeholder — update before launch</span>
            </li>
            <li className="pt-2">
              <p className="text-xs tracking-wide text-slate-500 uppercase">Social</p>
              <div className="mt-2 flex gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-disabled="true"
                    title={`${social.label} profile not yet published`}
                    className="cursor-not-allowed rounded text-slate-500"
                    onClick={(e) => e.preventDefault()}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            <Copyright />
          </p>
          <p>Custom software, mobile apps, and AI automation.</p>
        </div>
      </div>
    </footer>
  )
}
