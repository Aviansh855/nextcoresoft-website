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
import { SITE } from "../data/content"
import { applyMeta } from "../lib/seo"

export function HomePage() {
  useEffect(() => {
    applyMeta({
      title: `${SITE.name} — Custom Software, Mobile Apps & AI Automation`,
      description: SITE.description,
      path: "/",
    })
  }, [])

  return (
    <>
      <Hero />
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
