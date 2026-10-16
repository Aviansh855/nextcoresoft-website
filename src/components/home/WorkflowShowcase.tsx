import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, Pause, Play, RotateCcw } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import { WORKFLOW_STEPS } from "../../data/content"
import { Reveal } from "../ui/Reveal"
import { Section, SectionHeading } from "../ui/Section"

const SAMPLE = {
  from: "A. Mehta, Northwind Logistics",
  message:
    "We need a system to track driver deliveries and send customers an update when a shipment is out for delivery. Can we talk this week?",
  extracted: [
    ["Contact", "A. Mehta"],
    ["Company", "Northwind Logistics"],
    ["Need", "Delivery tracking & customer updates"],
    ["Intent", "Wants a call this week"],
  ],
  actions: [
    "Lead created in CRM",
    "Follow-up draft prepared for review",
    "Account owner notified",
  ],
} as const

const STEP_MS = 2600

export function WorkflowShowcase() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % WORKFLOW_STEPS.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [playing, reduced])

  return (
    <Section id="automation" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          eyebrow="AI automation, explained"
          title="From an inquiry in an inbox to a lead on a dashboard."
          description="A walkthrough of the kind of workflow we build. This is an interactive demonstration with sample data — nothing here is connected to a live system."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 lg:p-8">
          {/* Step controls */}
          <div className="flex items-center justify-between gap-4">
            <ol className="grid flex-1 grid-cols-4 gap-2" aria-label="Workflow stages">
              {WORKFLOW_STEPS.map((step, i) => {
                const reached = i <= active
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(i)
                        setPlaying(false)
                      }}
                      aria-current={i === active}
                      className={`w-full rounded-xl border px-2 py-2.5 text-left transition-colors sm:px-3 ${
                        i === active
                          ? "border-cyan-300/50 bg-cyan-300/10"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                            reached ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="hidden text-xs font-medium text-slate-700 sm:inline">{step.label}</span>
                      </span>
                      <span className="mt-1.5 block h-0.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                        <span
                          className={`block h-full bg-cyan-300 ${i === active && playing && !reduced ? "origin-left animate-[grow_2.6s_linear]" : ""}`}
                          style={{ width: reached ? "100%" : "0%" }}
                        />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-slate-400"
              >
                {playing && !reduced ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActive(0)
                  setPlaying(false)
                }}
                aria-label="Restart walkthrough"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-slate-400"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={WORKFLOW_STEPS[active].id}
              className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {WORKFLOW_STEPS[active].detail}
            </motion.p>
          </AnimatePresence>

          {/* Stage visualization */}
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <StagePanel title="Incoming inquiry" dimmed={active > 1}>
              <p className="text-xs text-slate-400">{SAMPLE.from}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">&ldquo;{SAMPLE.message}&rdquo;</p>
            </StagePanel>

            <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            </div>

            <StagePanel title={active < 2 ? "Waiting for processing" : "What the automation does"}>
              {active >= 1 && (
                <dl className="space-y-1.5">
                  {SAMPLE.extracted.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-sm">
                      <dt className="text-slate-400">{k}</dt>
                      <dd className="text-right text-slate-800">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {active >= 2 && (
                <ul className="mt-4 space-y-1.5 border-t border-slate-200 pt-3">
                  {SAMPLE.actions.map((action) => (
                    <li key={action} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check size={14} className="text-cyan-600" aria-hidden="true" />
                      {action}
                    </li>
                  ))}
                </ul>
              )}
              {active < 1 && (
                <p className="text-sm text-slate-500">Select a stage, or press play, to see each step.</p>
              )}
            </StagePanel>
          </div>

          <AnimatePresence>
            {active >= 3 && (
              <motion.div
                key="dashboard"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
              >
                <DashboardPreview />
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-5 text-xs text-slate-500">
            Demonstration only — sample data, no live automation. Names and companies shown here are fictional
            examples.
          </p>
        </div>
      </Reveal>

      <style>{`@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </Section>
  )
}

function StagePanel({
  title,
  children,
  dimmed = false,
}: {
  title: string
  children: ReactNode
  dimmed?: boolean
}) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-opacity ${dimmed ? "opacity-60" : ""}`}>
      <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan-600/90 uppercase">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function DashboardPreview() {
  const rows = [
    ["Northwind Logistics", "New", "2 min"],
    ["Harbor & Co.", "Follow-up sent", "1 day"],
    ["Lumen Clinic", "Call booked", "3 days"],
  ]
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between bg-slate-100 px-5 py-3">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-600 uppercase">Pipeline · this week</p>
        <span className="text-xs text-slate-500">Sample view</span>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs text-slate-500">
            {["Lead", "Status", "Response"].map((h) => (
              <th key={h} className="px-5 py-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([lead, status, time], i) => (
            <tr key={lead} className={i === 0 ? "bg-cyan-300/[0.06]" : ""}>
              <td className="px-5 py-2.5 text-slate-700">{lead}</td>
              <td className="px-5 py-2.5 text-slate-600">{status}</td>
              <td className="px-5 py-2.5 text-slate-400">{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
