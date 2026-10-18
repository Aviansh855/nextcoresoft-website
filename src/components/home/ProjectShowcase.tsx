import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { PROJECTS } from "../../data/content"
import { PortfolioMockup } from "../portfolio/PortfolioMockup"
import { ButtonLink } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

export function ProjectShowcase() {
  return (
    <Section id="work">
      <Reveal>
        <SectionHeading
          eyebrow="Project showcase"
          title="Real builds you can ask us to walk through."
          description="These entries come from our portfolio of software and app projects. They are showcases — not verified client case studies — and we do not claim measured business outcomes for them here."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <PortfolioMockup variant={project.mockupVariant} title={project.name} />
              <span className="mt-5 self-start rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-amber-900 uppercase">
                {project.label}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">
                <Link to={`/portfolio/#${project.id}`} className="hover:text-cyan-800">
                  {project.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-800">Use case. </span>
                {project.problem}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-800">Overview. </span>
                {project.solution}
              </p>
              {project.stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                to={`/contact/?project=${project.id}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 hover:text-slate-900"
              >
                Discuss this project
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink to="/portfolio/" variant="secondary">
            View full portfolio
          </ButtonLink>
          <ButtonLink to="/contact/?intent=quote">
            Request a Quote
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  )
}
