import { Link } from "react-router-dom"
import { GSC_TOPIC_GUIDES } from "../../data/gsc-topic-guides"
import { Reveal } from "../ui/Reveal"
import { Section } from "../ui/Section"

/** Crawlable hub for high-impression Search Console topics. */
export function SearchGuidesHub() {
  return (
    <Section id="guides" className="py-12 sm:py-16">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Guides</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Cloud API, app cost, CRM, and integration planning
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Popular searches we answer with service pages and long-form guides — no guaranteed rankings, honest scope
            and written quotes after discovery.
          </p>
          <ul className="mt-8 space-y-4">
            {GSC_TOPIC_GUIDES.map((item) => (
              <li
                key={item.href}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-cyan-200"
              >
                <Link to={item.href} className="group block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">People search for</span>
                  <p className="mt-1 font-display text-lg font-semibold text-slate-900 group-hover:text-cyan-800">
                    {item.query}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.blurb}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-cyan-700 group-hover:underline">
                    Read guide →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
