import { Link } from "react-router-dom"
import { SITE } from "../../data/content"
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
            <strong className="font-medium text-slate-800">custom business software</strong>,{" "}
            <strong className="font-medium text-slate-800">Android and iOS applications</strong>, and{" "}
            <strong className="font-medium text-slate-800">AI-powered workflow automation</strong> for small and
            medium-sized businesses and startups. We focus on replacing manual, repetitive work with systems your team
            actually uses — with scope, timeline, and cost agreed before build begins.
          </p>
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
