import { Link } from "react-router-dom"
import { SITE } from "../../data/content"
import { ServicePageLinks } from "../seo/ServicePageLinks"
import { Reveal } from "../ui/Reveal"
import { Section } from "../ui/Section"

/** Concise entity definition for visitors and answer engines (visible on page, not keyword stuffing). */
export function CompanySummary() {
  return (
    <Section className="py-12 sm:py-16">
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            What is {SITE.name}?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {SITE.name} is a software development studio that designs and builds{" "}
            <Link to="/services/custom-software" className="font-medium text-cyan-800 underline-offset-2 hover:underline">
              custom business software
            </Link>
            ,{" "}
            <Link to="/services/mobile-apps" className="font-medium text-cyan-800 underline-offset-2 hover:underline">
              Android and iOS applications
            </Link>
            ,{" "}
            <Link to="/services/ai-automation" className="font-medium text-cyan-800 underline-offset-2 hover:underline">
              AI-powered workflow automation
            </Link>
            , and{" "}
            <Link to="/services/cloud-api" className="font-medium text-cyan-800 underline-offset-2 hover:underline">
              cloud integrations and API work
            </Link>{" "}
            for small and medium-sized businesses and startups. We focus on replacing manual, repetitive work with
            systems your team actually uses — with scope, timeline, and cost agreed before build begins.
          </p>
          <ServicePageLinks variant="list" heading="Explore each service" className="mt-6 border-t border-slate-200 pt-6" />
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            We serve clients remotely and work in English. We do not sell pre-packaged SaaS; each engagement is scoped
            to the business in front of us.{" "}
            <Link to="/about" className="font-medium text-cyan-700 underline-offset-2 hover:underline">
              Learn about our approach
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="font-medium text-cyan-700 underline-offset-2 hover:underline">
              request a free consultation
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
