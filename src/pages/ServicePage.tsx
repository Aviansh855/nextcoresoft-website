import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { SERVICE_DETAILS, SERVICES, SITE, type Service } from "../data/content"
import { applyMeta } from "../lib/seo"

export function ServicePage() {
  const { slug } = useParams()
  const service = SERVICES.find((item) => item.slug === slug)

  useEffect(() => {
    if (!service) return
    applyMeta({
      title: `${service.title} — ${SITE.name}`,
      description: service.summary,
      path: `/services/${service.slug}`,
    })
  }, [service])

  if (!service) return <Navigate to="/404" replace />

  const details = SERVICE_DETAILS[service.slug]
  const others = SERVICES.filter((item) => item.slug !== service.slug)

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <Link to="/#services" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={15} aria-hidden="true" /> All services
      </Link>

      <Reveal>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
          {service.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">{details.intro}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-white">What&apos;s included</h2>
        <ul className="mt-5 space-y-3">
          {details.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-12 font-display text-2xl font-semibold text-white">Technologies</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200">
              {tech}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-300">
          {details.fit}
        </p>
      </Reveal>

      <div className="mt-12">
        <ButtonLink to="/contact">
          {service.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
      </div>

      <aside className="mt-16 border-t border-white/10 pt-10">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">Other services</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((item: Service) => (
            <li key={item.slug}>
              <Link
                to={`/services/${item.slug}`}
                className="block rounded-xl border border-white/10 p-4 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-white"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  )
}
