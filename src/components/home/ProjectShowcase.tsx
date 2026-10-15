import { PROJECTS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

/** Stylized product mockups drawn in code — no stock imagery, no invented screenshots. */
function Mockup({ index }: { index: number }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-soft to-ink p-4">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>
      {index === 0 && (
        <div className="mt-4 space-y-2" aria-hidden="true">
          {[80, 64, 72].map((w, i) => (
            <div key={w} className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-cyan-300" : "bg-white/30"}`} />
              <span className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
              <span className="ml-auto h-4 w-12 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      )}
      {index === 1 && (
        <div className="mt-4 flex justify-center" aria-hidden="true">
          <div className="w-24 rounded-xl border border-white/15 bg-white/5 p-2.5">
            <div className="h-12 rounded-lg bg-cyan-300/15" />
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/15" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/10" />
            <div className="mt-2.5 h-4 rounded-md bg-cyan-300/30" />
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
          {["12", "4", "98%"].map((n) => (
            <div key={n} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <div className="font-display text-sm font-semibold text-cyan-200">{n}</div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      )}
      <span className="absolute right-3 bottom-3 rounded-full bg-white/10 px-2 py-0.5 text-[10px] tracking-wide text-slate-300 uppercase">
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
            <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Mockup index={i} />
              <span className="mt-5 self-start rounded-full border border-amber-200/30 bg-amber-200/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-amber-100 uppercase">
                {project.label}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                <span className="font-medium text-slate-300">Problem. </span>
                {project.problem}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                <span className="font-medium text-slate-300">Solution. </span>
                {project.solution}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
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
