import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SERVICES, SITE } from "../../data/content"
import { ConnectWithFounder } from "./ConnectWithFounder"
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

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white">
      <div className="shell flex flex-col items-center border-b border-slate-100 px-2 py-14 text-center sm:py-16">
        <Logo size="footer" layout="stacked" />
        <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
          {SITE.tagline}
        </p>
      </div>

      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-800 uppercase">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}/`}
                  className="rounded text-sm text-slate-600 transition-colors hover:text-cyan-700"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-800 uppercase">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: "Portfolio", to: "/portfolio/" },
              { label: "Dealership pricing", to: "/pricing/" },
              { label: "AI automation pricing", to: "/pricing/ai-automation/" },
              { label: "Blog", to: "/blog/" },
              { label: "About", to: "/about/" },
              { label: "Contact", to: "/contact/" },
              { label: "Privacy Policy", to: "/privacy/" },
              { label: "Terms of Service", to: "/terms/" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="rounded text-sm text-slate-600 transition-colors hover:text-cyan-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-800 uppercase">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="rounded font-medium text-slate-800 transition-colors hover:text-cyan-700"
              >
                {SITE.contactEmail}
              </a>
            </li>
            <li>
              <ConnectWithFounder variant="compact" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/80">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <Copyright />
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Custom software, mobile apps, and AI automation.</span>
            <a href="/sitemap.xml" className="text-slate-500 underline-offset-2 hover:text-cyan-700 hover:underline">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
