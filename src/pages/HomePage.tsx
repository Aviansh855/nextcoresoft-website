import { useEffect } from "react"
import { Benefits } from "../components/home/Benefits"
import { CTABand } from "../components/home/CTABand"
import { FAQ } from "../components/home/FAQ"
import { Hero } from "../components/home/Hero"
import { Industries } from "../components/home/Industries"
import { Process } from "../components/home/Process"
import { ProjectShowcase } from "../components/home/ProjectShowcase"
import { Services } from "../components/home/Services"
import { Solutions } from "../components/home/Solutions"
import { WhyUs } from "../components/home/WhyUs"
import { WorkflowShowcase } from "../components/home/WorkflowShowcase"
import { CompanySummary } from "../components/home/CompanySummary"
import { JsonLd } from "../components/seo/JsonLd"
import { applyMeta, faqPageSchema, professionalServiceSchema, ROUTE_SEO, webPageSchema } from "../lib/seo"

export function HomePage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.home)
  }, [])

  return (
    <>
      <JsonLd id="jsonld-webpage" data={webPageSchema(ROUTE_SEO.home)} />
      <JsonLd id="jsonld-faq" data={faqPageSchema()} />
      <JsonLd id="jsonld-professional-service" data={professionalServiceSchema()} />
      <Hero />
      <CompanySummary />
      <Benefits />
      <Services />
      <WorkflowShowcase />
      <Solutions />
      <Industries />
      <Process />
      <ProjectShowcase />
      <WhyUs />
      <FAQ />
      <CTABand />
    </>
  )
}
