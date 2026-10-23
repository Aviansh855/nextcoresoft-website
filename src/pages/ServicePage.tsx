import { useEffect, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { NotFoundPage } from "./NotFoundPage"
import { AiAutomationServiceContent } from "../components/services/ai-automation/AiAutomationServiceContent"
import { AUTOMATION_EXTRA_FAQS } from "../data/ai-automation-offerings"
import { ServiceAnswerBlock } from "../components/services/ServiceAnswerBlock"
import { ServiceFaq } from "../components/services/ServiceFaq"
import { ServiceLeadCTAs } from "../components/services/ServiceLeadCTAs"
import { ServiceSeoGuides } from "../components/services/ServiceSeoGuides"
import { SERVICE_SEO_GUIDES } from "../data/service-seo-guides"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { Reveal } from "../components/ui/Reveal"
import { PORTFOLIO_ITEMS, SERVICE_DETAILS, SERVICES, SITE, type Service } from "../data/content"
import { applyMeta, servicePageMeta } from "../lib/seo"

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-slate-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ServicePage() {
  const { slug } = useParams()
  const service = SERVICES.find((item) => item.slug === slug)

  const crumbs = useMemo(
    () =>
      service
        ? [
            { label: "Home", to: "/" },
            { label: "Services", to: "/services/" },
            { label: service.title },
          ]
        : [],
    [service],
  )

  useEffect(() => {
    if (!service || !slug) return
    const meta = servicePageMeta(slug)
    if (meta) applyMeta(meta)
  }, [service, slug])

  if (!service) return <NotFoundPage />

  const isAiAutomation = service.slug === "ai-automation"
  const details = SERVICE_DETAILS[service.slug]
  const faqs = isAiAutomation ? [...details.faqs, ...AUTOMATION_EXTRA_FAQS] : details.faqs
  const others = SERVICES.filter((item) => item.slug !== service.slug)
  const seoGuides = SERVICE_SEO_GUIDES[service.slug] ?? []
  const relatedPortfolio = details.portfolioIds
    .map((id) => PORTFOLIO_ITEMS.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <article
      className={
        isAiAutomation ? "shell w-full pt-32 pb-24 max-w-6xl" : "mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8"
      }
    >
      <Breadcrumbs items={crumbs} />

      <Reveal>
        <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">NextCoreSoft service</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
          {details.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">{details.intro}</p>
        <ServiceAnswerBlock
          quickAnswer={details.aeo.quickAnswer}
          suitableFor={details.aeo.suitableFor}
          quoteNeeds={details.aeo.quoteNeeds}
          decisionChecklist={details.aeo.decisionChecklist}
        />
        <ServiceLeadCTAs service={service} className="mt-8" />
        {seoGuides.length > 0 ? <ServiceSeoGuides guides={seoGuides} /> : null}
      </Reveal>

      {isAiAutomation ? <AiAutomationServiceContent /> : null}

      <Reveal delay={0.03}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Business problems we address</h2>
        <BulletList items={details.problems} />
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Who this is for</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{details.audience}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Benefits for your business</h2>
        <BulletList items={details.benefits} />
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Typical deliverables</h2>
        <BulletList items={details.deliverables} />
      </Reveal>

      <Reveal delay={0.07}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">How we work on this service</h2>
        <ol className="mt-5 space-y-5">
          {details.process.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-xs font-semibold tracking-wide text-cyan-700 uppercase">
                Step {index + 1} — {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">What&apos;s included</h2>
        <BulletList items={details.includes} />
      </Reveal>

      <Reveal delay={0.09}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Technologies we use</h2>
        <p className="mt-3 text-sm text-slate-600">
          Typical stack for {service.title.toLowerCase()} engagements — chosen per project, not forced on every client.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700">
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>

      {relatedPortfolio.length > 0 && (
        <Reveal delay={0.1}>
          <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Related project showcases</h2>
          <p className="mt-3 text-sm text-slate-600">
            These are demos and builds we can walk you through — not verified client case studies unless we agree otherwise
            in writing.
          </p>
          <ul className="mt-5 space-y-3">
            {relatedPortfolio.map((item) =>
              item ? (
                <li key={item.id}>
                  <Link
                    to={`/portfolio/#${item.id}`}
                    className="block rounded-xl border border-slate-200 p-4 transition-colors hover:border-cyan-300/40"
                  >
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <span className="mt-1 block text-sm text-slate-600">{item.summary}</span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
          <p className="mt-4 text-sm">
            <Link to="/portfolio/" className="text-cyan-700 hover:underline">
              View full portfolio
            </Link>
          </p>
        </Reveal>
      )}

      <Reveal delay={0.11}>
        <ServiceFaq faqs={faqs} serviceTitle={service.title} />
      </Reveal>

      <Reveal delay={0.12}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Next step</h2>
        <p className="mt-3 text-slate-600">
          Share your timeline and constraints — we will reply with an honest view of fit, scope, and quotation approach.
        </p>
        <ServiceLeadCTAs service={service} className="mt-6" />
      </Reveal>

      <aside className="mt-16 border-t border-slate-200 pt-10">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">Related services</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((item: Service) => (
            <li key={item.slug}>
              <Link
                to={`/services/${item.slug}/`}
                className="block rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-700 transition-colors hover:border-cyan-300/40 hover:text-slate-900"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500">
          Questions about {service.title.toLowerCase()}? See our{" "}
          <Link to="/#faq" className="text-cyan-700 hover:underline">
            general FAQ
          </Link>
          ,{" "}
          <Link to="/about/" className="text-cyan-700 hover:underline">
            about {SITE.name}
          </Link>
          ,{" "}
          <Link to="/portfolio/" className="text-cyan-700 hover:underline">
            portfolio
          </Link>
          , or{" "}
          <Link to="/contact/" className="text-cyan-700 hover:underline">
            contact us
          </Link>
          .
        </p>
      </aside>
    </article>
  )
}
