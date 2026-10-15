import { ArrowRight } from "lucide-react"
import { ButtonLink } from "../ui/Button"
import { HeroVisual } from "../three/HeroVisual"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* Ambient lighting behind the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-[-10%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[110px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-24 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
            Software · Mobile · AI Automation
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.08] font-semibold tracking-tight text-white text-balance sm:text-6xl lg:text-[4.25rem]">
            Build Smarter. Automate More. Grow Faster.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 text-pretty sm:text-lg">
            We build custom software, mobile applications, and intelligent AI automations that help
            businesses streamline operations, reduce repetitive work, and scale efficiently.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/contact">
              Book a Free Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/#services" variant="secondary">
              Explore Our Solutions
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ["Custom", "Software built around your workflow"],
              ["Mobile", "Android and iOS applications"],
              ["AI", "Automation that removes routine work"],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="font-display text-sm font-semibold text-white">{term}</dt>
                <dd className="mt-1 text-xs leading-snug text-slate-400">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
