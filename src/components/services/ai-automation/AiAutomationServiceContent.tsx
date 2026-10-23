import {
  BarChart3,
  Bot,
  Cpu,
  LayoutDashboard,
  MessageCircle,
  Phone,
  ShoppingCart,
  SlidersHorizontal,
  Users,
  Workflow,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  AUTOMATION_CONCEPT_PROJECTS,
  AUTOMATION_INDUSTRIES,
  AUTOMATION_OFFERINGS,
  AUTOMATION_PRINCIPLES,
  AUTOMATION_TECH_GROUPS,
  type AutomationOffering,
} from "../../../data/ai-automation-offerings"
import { Reveal } from "../../ui/Reveal"

const OFFERING_ICONS: Record<string, typeof Bot> = {
  dashboards: LayoutDashboard,
  workflow: Workflow,
  whatsapp: MessageCircle,
  voice: Phone,
  chatbots: Bot,
  leads: BarChart3,
  crm: Users,
  agents: Cpu,
  ecommerce: ShoppingCart,
  custom: SlidersHorizontal,
}

function contactHref(offering: AutomationOffering) {
  const params = new URLSearchParams({ service: "ai-automation", topic: offering.title })
  return `/contact/?${params.toString()}`
}

function WorkflowConsole() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-[0_24px_60px_-28px_rgba(37,99,235,0.25)]"
      aria-label="Illustrative example of an automated lead workflow"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 font-mono text-xs text-slate-500">
        <span>workflow / lead-intake</span>
        <span className="inline-flex items-center gap-2 text-cyan-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" aria-hidden="true" />
          example run
        </span>
      </div>
      <svg
        className="block w-full px-2 pt-2"
        viewBox="0 0 600 330"
        role="img"
        aria-label="Messages, forms and calls flow into an AI agent, which updates CRM, dashboard and sales, with a human approval step."
      >
        <defs>
          <linearGradient id="ncsAgentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path className="stroke-slate-300" fill="none" strokeWidth="1.5" d="M150 52 C195 52 200 145 235 145" />
        <path className="stroke-slate-300" fill="none" strokeWidth="1.5" d="M150 165 L235 165" />
        <path className="stroke-slate-300" fill="none" strokeWidth="1.5" d="M150 278 C195 278 200 185 235 185" />
        <path className="stroke-slate-300" fill="none" strokeWidth="1.5" d="M365 145 C405 145 410 52 450 52" />
        <path className="stroke-slate-300" fill="none" strokeWidth="1.5" d="M365 165 L450 165" />
        <path className="stroke-slate-300" fill="none" strokeWidth="1.5" d="M365 185 C405 185 410 278 450 278" />
        <path
          className="stroke-cyan-600"
          fill="none"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.75"
          d="M300 212 L300 268"
        />
        {[
          { x: 20, y: 30, label: "WhatsApp" },
          { x: 20, y: 143, label: "Web form" },
          { x: 20, y: 256, label: "Inbound call" },
        ].map(({ x, y, label }) => (
          <g key={label}>
            <rect x={x} y={y} width={130} height={44} rx={10} className="fill-slate-100 stroke-slate-200" strokeWidth="1" />
            <text x={x + 65} y={y + 28} textAnchor="middle" className="fill-slate-800 text-[15px] font-semibold">
              {label}
            </text>
          </g>
        ))}
        <rect x={235} y={118} width={130} height={94} rx={16} fill="url(#ncsAgentGrad)" className="stroke-cyan-500" strokeWidth="1.2" />
        <text x={300} y={158} textAnchor="middle" className="fill-slate-900 text-[18px] font-bold">
          AI agent
        </text>
        <rect
          x={235}
          y={268}
          width={130}
          height={44}
          rx={10}
          fill="transparent"
          className="stroke-cyan-600"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text x={300} y={295} textAnchor="middle" className="fill-cyan-800 text-[14px] font-medium">
          Human approval
        </text>
        {[
          { x: 450, y: 30, label: "CRM" },
          { x: 450, y: 143, label: "Dashboard" },
          { x: 450, y: 256, label: "Sales team" },
        ].map(({ x, y, label }) => (
          <g key={label}>
            <rect x={x} y={y} width={130} height={44} rx={10} className="fill-slate-100 stroke-slate-200" strokeWidth="1" />
            <text x={x + 65} y={y + 28} textAnchor="middle" className="fill-slate-800 text-[15px] font-semibold">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 pb-3 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
        <span>Capture</span>
        <span>Understand</span>
        <span>Act</span>
        <span>Report</span>
      </div>
      <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2">
        <div className="bg-white p-4">
          <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Sample conversation</p>
          <div className="mt-3 space-y-2 text-sm leading-snug">
            <p className="max-w-[88%] rounded-xl rounded-bl-sm bg-slate-100 px-3 py-2 text-slate-700">
              Hi, is the 2BHK still available this weekend?
            </p>
            <p className="ml-auto max-w-[88%] rounded-xl rounded-br-sm border border-cyan-200/60 bg-cyan-50 px-3 py-2 text-slate-800">
              Yes, two options are open. Which area do you prefer, and what is your monthly budget?
            </p>
            <p className="font-mono text-xs text-cyan-700">
              Lead qualified. A person can take over at any time.
            </p>
          </div>
        </div>
        <div className="bg-white p-4">
          <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Dashboard sample</p>
          <div className="mt-3 space-y-3 text-sm text-slate-600">
            {[
              { label: "New leads", w: "100%" },
              { label: "Qualified", w: "64%" },
              { label: "Visit booked", w: "38%" },
            ].map((row) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: row.w }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-slate-400">Illustrative layout — not live data.</p>
        </div>
      </div>
    </div>
  )
}

function OfferingCard({ offering }: { offering: AutomationOffering }) {
  const Icon = OFFERING_ICONS[offering.id] ?? Bot
  return (
    <article className="grid grid-cols-[46px_minmax(0,1fr)] gap-x-5 gap-y-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-colors hover:border-cyan-300/50">
      <div className="row-span-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-cyan-700">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-semibold text-slate-900">{offering.title}</h3>
      <p className="col-start-2 text-slate-600">{offering.description}</p>
      <ul className="col-start-2 mt-3 space-y-2 text-sm text-slate-600">
        {offering.benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
      <details className="col-start-2 mt-4">
        <summary className="cursor-pointer font-mono text-xs tracking-wider text-cyan-700 uppercase">What is included</summary>
        <ul className="mt-3 space-y-2 border-l border-slate-200 pl-4 text-sm text-slate-600">
          {offering.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
      {offering.note ? (
        <div className="col-span-2 mt-3 rounded-xl border border-amber-200/80 bg-amber-50/80 p-3 text-sm text-slate-700">
          <p className="font-mono text-[11px] tracking-wider text-amber-800 uppercase">How we approach it</p>
          <p className="mt-2">{offering.note}</p>
        </div>
      ) : null}
      <Link
        to={contactHref(offering)}
        className="col-start-2 mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-slate-900"
      >
        Discuss this offering <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

function ConceptProjects() {
  const [index, setIndex] = useState(0)
  const project = AUTOMATION_CONCEPT_PROJECTS[index]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-8">
      <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Example automation projects">
        {AUTOMATION_CONCEPT_PROJECTS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`min-w-[220px] rounded-xl border px-4 py-3 text-left text-sm transition-colors lg:min-w-0 ${
              i === index
                ? "border-cyan-400/60 bg-cyan-50/80 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
            onClick={() => setIndex(i)}
          >
            <span className="block font-mono text-[10px] tracking-wider text-slate-500 uppercase">{p.tag}</span>
            <span className="mt-1 block font-medium leading-snug">{p.name}</span>
          </button>
        ))}
      </div>
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8" role="tabpanel">
        <span className="inline-block rounded-full border border-amber-200 px-3 py-1 font-mono text-[10px] tracking-wider text-amber-800 uppercase">
          Concept project
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900">{project.name}</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Business problem</p>
            <p className="mt-2 text-slate-600">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Proposed solution</p>
            <p className="mt-2 text-slate-600">{project.solution}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Workflow</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.flow.map((step, i) => (
              <li key={step} className="inline-flex items-center gap-2 text-sm">
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5">{step}</span>
                {i < project.flow.length - 1 ? <span className="text-cyan-600">→</span> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Typical tools</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <li key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-6">
          <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Intended outcome</p>
          <p className="mt-2 text-slate-800">{project.outcome}</p>
        </div>
      </div>
    </div>
  )
}

export function AiAutomationServiceContent() {
  return (
    <div className="mt-14 space-y-20">
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-700">
              Custom AI solutions built around your business — human handoff, consent-first messaging, and integrations
              with tools you already use.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                Human handoff designed in
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                Consent-first messaging and calling
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                Built around the tools you already use
              </li>
            </ul>
          </div>
          <WorkflowConsole />
        </div>
      </Reveal>

      <Reveal delay={0.03}>
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900 text-balance">
            Ten ways we take manual work off your team
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Each offering can stand alone or connect to the others. Open a card to see what is included.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {AUTOMATION_OFFERINGS.map((offering) => (
              <OfferingCard key={offering.id} offering={offering} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900">Solutions by industry</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            The same building blocks, shaped for the businesses we work with. Every implementation depends on your systems,
            data, and requirements.
          </p>
          <ul className="mt-8 space-y-3">
            {AUTOMATION_INDUSTRIES.map((ind) => (
              <li
                key={ind.name}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 lg:col-span-1">{ind.name}</h3>
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">The problem</p>
                  <p className="mt-2 text-sm text-slate-600">{ind.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">What we build</p>
                  <p className="mt-2 text-sm text-slate-600">{ind.solution}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">Expected benefit</p>
                  <p className="mt-2 text-sm text-slate-800">{ind.benefit}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900">Technology we choose from</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            We pick the stack that fits your systems and budget. Listing a tool here does not imply a partnership or
            certification.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUTOMATION_TECH_GROUPS.map((group) => (
              <div key={group.group} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <h3 className="font-mono text-xs tracking-wider text-slate-500 uppercase">{group.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900">Example projects we can build</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Concept projects that show our approach — not past client work and not guaranteed results. Real case studies
            replace these as projects are delivered and approved for publication.
          </p>
          <div className="mt-8">
            <ConceptProjects />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.07}>
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-900">How we build responsibly</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {AUTOMATION_PRINCIPLES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
