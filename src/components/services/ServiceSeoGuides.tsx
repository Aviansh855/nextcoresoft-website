import { Link } from "react-router-dom"
import type { ServiceSeoGuide } from "../../data/service-seo-guides"

export function ServiceSeoGuides({ guides }: { guides: readonly ServiceSeoGuide[] }) {
  if (!guides.length) return null
  return (
    <aside className="mt-8 rounded-2xl border border-cyan-200/60 bg-cyan-50/40 p-6" aria-labelledby="service-guides-heading">
      <h2 id="service-guides-heading" className="font-display text-lg font-semibold text-slate-900">
        Guides for common searches
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Answer-first articles on cost, integrations, and platform choice — written for business owners, not developers
        only.
      </p>
      <ul className="mt-4 space-y-3">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link to={guide.href} className="font-medium text-cyan-800 hover:underline">
              {guide.label}
            </Link>
            <p className="mt-0.5 text-sm text-slate-600">{guide.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  )
}
