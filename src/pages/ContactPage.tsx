import { useEffect } from "react"
import { InquiryForm } from "../components/contact/InquiryForm"
import { Reveal } from "../components/ui/Reveal"
import { JsonLd } from "../components/seo/JsonLd"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { applyMeta, breadcrumbSchema, ROUTE_SEO } from "../lib/seo"

export function ContactPage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.contact)
  }, [])

  return (
    <section className="relative pt-32 pb-24">
      <JsonLd
        id="jsonld-contact-breadcrumbs"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <div>
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
            <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Contact</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
              Let&apos;s Build Something That Moves Your Business Forward.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Describe the problem and we&apos;ll come back with a clear view of the approach, the likely scope, and
              whether we&apos;re the right team. The consultation is free.
            </p>

            <dl className="mt-10 space-y-6 border-t border-slate-200 pt-8">
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">What happens next</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  We reply within one business day to arrange a short call. If we&apos;re not the right fit, we&apos;ll
                  say so.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">Prefer email?</dt>
                <dd className="mt-1.5 text-sm text-slate-600">
                  <a href="mailto:hello@nextcoresoft.com" className="text-cyan-600 hover:text-slate-900">
                    hello@nextcoresoft.com
                  </a>
                  <span className="mt-0.5 block text-xs text-slate-500">Placeholder address — confirm before launch.</span>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-9">
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
