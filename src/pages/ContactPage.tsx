import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { ConnectWithFounder } from "../components/layout/ConnectWithFounder"
import { InquiryForm } from "../components/contact/InquiryForm"
import { Reveal } from "../components/ui/Reveal"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ServicePageLinks } from "../components/seo/ServicePageLinks"
import { SITE } from "../data/content"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function ContactPage() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    applyMeta(ROUTE_SEO.contact)
  }, [])

  return (
    <section className="relative pt-32 pb-24">
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
              Discuss your project or request a quote
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Tell us what you need built or automated. We reply with an honest view of scope, timeline, and how we
              would quote the work. The initial consultation is free and there is no obligation.
            </p>

            <dl className="mt-10 space-y-6 border-t border-slate-200 pt-8">
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">What happens next</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  We aim to reply within one business day to arrange a short call when volume allows. If we&apos;re not
                  the right fit, we&apos;ll say so.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">Prefer email?</dt>
                <dd className="mt-1.5 text-sm text-slate-600">
                  <a href={`mailto:${SITE.contactEmail}`} className="text-cyan-600 hover:text-slate-900">
                    {SITE.contactEmail}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <ConnectWithFounder />
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <ServicePageLinks heading="Not sure which service fits?" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-9">
            <InquiryForm key={searchParams.toString()} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
