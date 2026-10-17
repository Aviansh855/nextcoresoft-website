import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { JsonLd } from "../components/seo/JsonLd"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { SERVICES, SERVICES_HUB_FAQS, SERVICES_HUB_H1, SITE } from "../data/content"
import { applyMeta, breadcrumbSchema, faqPageSchemaFromItems, ROUTE_SEO, webPageSchema } from "../lib/seo"

export function ServicesIndexPage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.services)
  }, [])

  return (
    <>
      <JsonLd id="jsonld-services-webpage" data={webPageSchema(ROUTE_SEO.services)} />
      <JsonLd
        id="jsonld-services-breadcrumbs"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd id="jsonld-services-faq" data={faqPageSchemaFromItems(SERVICES_HUB_FAQS)} />

      <div className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services" }]} />

        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Services</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            {SERVICES_HUB_H1}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {SITE.name} helps businesses that search for a software development partner — custom web applications,
            Android and iOS apps, AI workflow automation, and cloud integrations. Choose a service below or{" "}
            <Link to="/contact" className="font-medium text-cyan-700 hover:underline">
              describe your project
            </Link>{" "}
            if you are not sure where to start.
          </p>
        </Reveal>

        <ul className="mt-12 space-y-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <li className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-colors hover:border-cyan-300/40">
                <h2 className="font-display text-xl font-semibold text-slate-900">
                  <Link to={`/services/${service.slug}`} className="hover:text-cyan-800">
                    {service.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.summary}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-slate-900"
                >
                  View service details
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink to="/contact?intent=quote">Request a Quote</ButtonLink>
            <ButtonLink to="/portfolio" variant="secondary">
              See portfolio
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal>
          <section className="mt-16 border-t border-slate-200 pt-12" aria-labelledby="services-hub-faq-heading">
            <h2 id="services-hub-faq-heading" className="font-display text-2xl font-semibold text-slate-900">
              Common questions
            </h2>
            <ul className="mt-8 space-y-8">
              {SERVICES_HUB_FAQS.map((faq) => (
                <li key={faq.question}>
                  <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>
    </>
  )
}
