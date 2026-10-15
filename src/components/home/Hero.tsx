import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ButtonLink } from "../ui/Button"
import { HeroEntrance, HeroEntranceItem } from "../ui/HeroEntrance"
import { HeroVisual } from "../three/HeroVisual"

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-orb absolute top-[-10%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="hero-orb-alt absolute top-[20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-violet-600/10 blur-[110px]" />
      </div>

      <div className="shell grid items-center gap-10 pt-14 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:pt-24 lg:pb-20">
        <HeroEntrance>
          <HeroEntranceItem>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-200 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-cyan-300" aria-hidden="true" />
              Software · Mobile · AI Automation
            </p>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <h1 className="mt-6 max-w-[14ch] font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
              Build Smarter. Automate More. Grow Faster.
            </h1>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 text-pretty sm:text-lg">
              We build custom software, mobile applications, and intelligent AI automations that help
              businesses streamline operations, reduce repetitive work, and scale efficiently.
            </p>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/contact">
                Book a Free Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/#services" variant="secondary">
                Explore Our Solutions
              </ButtonLink>
            </div>
          </HeroEntranceItem>

          <HeroEntranceItem>
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
          </HeroEntranceItem>
        </HeroEntrance>

        {reduced ? (
          <HeroVisual />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual />
          </motion.div>
        )}
      </div>
    </section>
  )
}
