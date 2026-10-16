import { PROJECTS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

/** Stylized product mockups drawn in code — no stock imagery, no invented screenshots. */
function Mockup({ index }: { index: number }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-4">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-slate-200" />
        <span className="h-2 w-2 rounded-full bg-slate-200" />
        <span className="h-2 w-2 rounded-full bg-slate-100" />
      </div>
      {index === 0 && (
        <div className="mt-4 space-y-2" aria-hidden="true">
          {[80, 64, 72].map((w, i) => (
            <div key={w} className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-cyan-500" : "bg-slate-300"}`} />
              <span className="h-2 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
              <span className="ml-auto h-4 w-12 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )}
      {index === 1 && (
        <div className="mt-4 flex justify-center" aria-hidden="true">
          <div className="w-24 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
            <div className="h-12 rounded-lg bg-cyan-300/15" />
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-slate-100" />
            <div className="mt-2.5 h-4 rounded-md bg-cyan-300/30" />
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
          {["12", "4", "98%"].map((n) => (
            <div key={n} className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <div className="font-display text-sm font-semibold text-cyan-600">{n}</div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )}
      <span className="absolute right-3 bottom-3 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] tracking-wide text-slate-600 uppercase">
        Concept mockup
      </span>
    </div>
  )
}

export function ProjectShowcase() {
  return (
    <Section id="work">
      <Reveal>
        <SectionHeading
          eyebrow="Project showcase"
          title="The shape of the work, shown honestly."
          description="These are demonstration projects that illustrate the kind of software we deliver. They are not case studies of named clients, and no results are claimed for them. Verified client work replaces these cards as it becomes available."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Mockup index={i} />
              <span className="mt-5 self-start rounded-full border border-amber-200/30 bg-amber-200/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-amber-100 uppercase">
                {project.label}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                <span className="font-medium text-slate-600">Problem. </span>
                {project.problem}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                <span className="font-medium text-slate-600">Solution. </span>
                {project.solution}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Outcomes: none stated — this is a demonstration, not a measured engagement.
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
