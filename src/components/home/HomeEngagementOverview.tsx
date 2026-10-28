import { Link } from "react-router-dom"
import { Reveal } from "../ui/Reveal"
import { Section } from "../ui/Section"

/** Who we help, problems we solve, and how engagements run — homepage AEO block. */
export function HomeEngagementOverview() {
  return (
    <Section className="py-12 sm:py-16">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Who we help and how projects work
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              We work with small and medium-sized businesses, startups, and teams modernizing operations — especially
              when work still depends on spreadsheets, shared inboxes, or tools that do not share data. Typical goals
              include custom web apps, mobile clients for staff or customers, practical AI for repetitive reading and
              routing, and integrations between systems you already pay for.
            </p>
            <p>
              <strong className="font-semibold text-slate-800">Problems we often address:</strong> manual retyping
              between apps, no single view of jobs or customers, field teams reporting through chat, and “we need
              software” without a clear first milestone. We start with a free consultation, document scope, then quote
              in writing with milestones — you are not locked into building everything at once.
            </p>
            <p>
              <strong className="font-semibold text-slate-800">Typical path:</strong> discovery call → written scope
              and quote → design/build in demos → testing with your team → launch → optional maintenance. See{" "}
              <Link to="/portfolio/" className="font-medium text-cyan-700 underline-offset-2 hover:underline">
                project showcases
              </Link>{" "}
              for examples we can walk through (not client case studies unless agreed), or pick a service:{" "}
              <Link to="/services/custom-software/" className="text-cyan-700 hover:underline">
                custom software
              </Link>
              ,{" "}
              <Link to="/services/mobile-apps/" className="text-cyan-700 hover:underline">
                mobile apps
              </Link>
              ,{" "}
              <Link to="/services/ai-automation/" className="text-cyan-700 hover:underline">
                AI automation
              </Link>
              ,{" "}
              <Link to="/services/cloud-api/" className="text-cyan-700 hover:underline">
                cloud &amp; API
              </Link>
              . Published product pricing:{" "}
              <Link to="/pricing/" className="font-medium text-cyan-700 underline-offset-2 hover:underline">
                dealership service management
              </Link>
              ,{" "}
              <Link to="/pricing/ai-automation/" className="font-medium text-cyan-700 underline-offset-2 hover:underline">
                AI automation plans
              </Link>
              . Popular guides (cost, APIs, Rajasthan):{" "}
              <Link to="/services/cloud-api/" className="text-cyan-700 hover:underline">
                cloud API integration
              </Link>
              ,{" "}
              <Link to="/blog/mobile-app-development-cost-india/" className="text-cyan-700 hover:underline">
                mobile app development cost in India
              </Link>
              ,{" "}
              <Link to="/blog/api-integration-business-systems-guide/" className="text-cyan-700 hover:underline">
                connect business software systems
              </Link>
              ,{" "}
              <Link to="/blog/custom-crm-software-development-india/" className="text-cyan-700 hover:underline">
                CRM software development cost in India
              </Link>
              ,{" "}
              <Link to="/blog/software-development-company-jaipur/" className="text-cyan-700 hover:underline">
                software &amp; app development in Jaipur and Rajasthan
              </Link>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
