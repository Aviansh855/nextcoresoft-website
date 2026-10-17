import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { PortfolioMockup } from "../components/portfolio/PortfolioMockup"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ServicePageLinks } from "../components/seo/ServicePageLinks"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { PORTFOLIO_ITEMS, SERVICES, SITE } from "../data/content"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function PortfolioPage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.portfolio)
  }, [])

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 pt-32 pb-24 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Portfolio" }]} />

        <Reveal>
          <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Project portfolio</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            Software and apps we can show you today
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            These entries describe real builds and product-style projects from {SITE.name}. They are{" "}
            <strong className="font-medium text-slate-800">project showcases</strong>, not verified client success
            stories — we do not publish client logos, revenue figures, or measured outcomes here unless you supply
            them and approve the wording. Ask us for a walkthrough of any item during a consultation.
          </p>
          <div className="mt-8">
            <ButtonLink to="/contact?intent=quote">
              Request a Quote
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <Reveal key={item.id} delay={(index % 2) * 0.06}>
              <article id={item.id} className="flex h-full flex-col scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
                <PortfolioMockup variant={item.mockupVariant} title={item.name} />
                <span className="mt-5 self-start rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-amber-900 uppercase">
                  {item.label}
                </span>
                <p className="mt-2 text-xs font-medium text-slate-500">{item.category}</p>
                <h2 className="mt-2 font-display text-xl font-semibold text-slate-900">{item.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  <span className="font-medium text-slate-800">Use case. </span>
                  {item.problem}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  <span className="font-medium text-slate-800">What we built. </span>
                  {item.solutionOverview}
                </p>
                {item.features.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Features shown</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                      {item.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-cyan-600" aria-hidden="true">
                            ·
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.stack.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {item.stack.map((tech) => (
                      <li key={tech} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
                {item.features.length === 0 && item.stack.length === 0 && (
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">{item.disclaimer}</p>
                )}
                <p className="mt-4 text-xs text-slate-500">
                  Related services:{" "}
                  {item.relatedServices.map((slug, i) => {
                    const svc = SERVICES.find((s) => s.slug === slug)
                    if (!svc) return null
                    return (
                      <span key={slug}>
                        {i > 0 ? ", " : ""}
                        <Link to={`/services/${slug}`} className="text-cyan-700 hover:underline">
                          {svc.title}
                        </Link>
                      </span>
                    )
                  })}
                </p>
                <ButtonLink to={`/contact?service=${item.relatedServices[0] ?? "custom-software"}&project=${item.id}`} className="mt-6 self-start">
                  Discuss this project
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="font-display text-xl font-semibold text-slate-900">Explore services</h2>
            <ServicePageLinks className="mt-4" />
            <p className="mt-6 text-sm text-slate-600">
              <Link to="/about" className="text-cyan-700 hover:underline">
                About {SITE.name}
              </Link>
              {" · "}
              <Link to="/#faq" className="text-cyan-700 hover:underline">
                General FAQ
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </>
  )
}
