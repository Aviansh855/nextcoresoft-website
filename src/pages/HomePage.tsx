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
import { HomeEngagementOverview } from "../components/home/HomeEngagementOverview"
import { EngagementModelsSection, SupportPlansSection, TechStackSection } from "../components/provider/ProviderSections"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function HomePage() {
  useEffect(() => {
    applyMeta(ROUTE_SEO.home)
  }, [])

  return (
    <>
      <Hero />
      <CompanySummary />
      <HomeEngagementOverview />
      <Benefits />
      <Services />
      <WorkflowShowcase />
      <Solutions />
      <Industries />
      <Process />
      <EngagementModelsSection compact />
      <TechStackSection />
      <SupportPlansSection />
      <ProjectShowcase />
      <WhyUs />
      <FAQ />
      <CTABand />
    </>
  )
}
