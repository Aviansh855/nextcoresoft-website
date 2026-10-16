import { ArrowRight } from "lucide-react"
import { useEffect, useMemo } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { JsonLd } from "../components/seo/JsonLd"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { SERVICE_DETAILS, SERVICES, SITE, type Service } from "../data/content"
import { applyMeta, breadcrumbSchema, servicePageMeta, serviceSchema } from "../lib/seo"

export function ServicePage() {
  const { slug } = useParams()
  const service = SERVICES.find((item) => item.slug === slug)

  const crumbs = useMemo(
    () =>
      service
        ? [
            { label: "Home", to: "/" },
            { label: "Services", to: "/#services" },
            { label: service.title },
          ]
        : [],
    [service],
  )

  const schemaItems = useMemo(
    () =>
      service
        ? [
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]
        : [],
    [service],
  )

  useEffect(() => {
    if (!service || !slug) return
    const meta = servicePageMeta(slug)
    if (meta) applyMeta(meta)
  }, [service, slug])

  if (!service) return <Navigate to="/404" replace />

  const details = SERVICE_DETAILS[service.slug]
  const others = SERVICES.filter((item) => item.slug !== service.slug)

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <JsonLd id="jsonld-service" data={serviceSchema(service.slug)} />
      <JsonLd id="jsonld-breadcrumbs" data={breadcrumbSchema(schemaItems)} />

      <Breadcrumbs items={crumbs} />

      <Reveal>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
          {service.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">{details.intro}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">What&apos;s included</h2>
        <ul className="mt-5 space-y-3">
          {details.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-slate-900">Technologies we use</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700">
              {tech}
            </li>
          ))}
        </ul>
        <h2 className="mt-10 font-display text-xl font-semibold text-slate-900">Who this is for</h2>
        <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
          {details.fit}
        </p>
      </Reveal>

      <div className="mt-12">
        <ButtonLink to="/contact">
          {service.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
      </div>

      <aside className="mt-16 border-t border-slate-200 pt-10">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">Related services</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((item: Service) => (
            <li key={item.slug}>
              <Link
                to={`/services/${item.slug}`}
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
            FAQ
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-cyan-700 hover:underline">
            contact {SITE.name}
          </Link>
          .
        </p>
      </aside>
    </article>
  )
}
