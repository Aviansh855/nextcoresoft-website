import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { HOME_H1, HOME_TAGLINE } from "../../data/content"
import { ServicePageLinks } from "../seo/ServicePageLinks"
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
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-600 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-cyan-300" aria-hidden="true" />
              Custom software · Web & app development · AI automation
            </p>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <h1 className="mt-6 max-w-[22ch] font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-[3.25rem]">
              {HOME_H1}
            </h1>
            <p className="mt-4 max-w-xl font-display text-lg font-medium tracking-tight text-slate-700 text-pretty sm:text-xl">
              {HOME_TAGLINE}
            </p>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">
              {`We are a software development partner for custom web applications, business websites, Android and iOS apps, and AI automation — helping teams replace manual work with systems that fit how you operate.`}
            </p>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/contact">
                Book a Free Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary">
                View all services
              </ButtonLink>
            </div>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Service pages</p>
            <ServicePageLinks variant="compact" className="mt-3 max-w-xl" />
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
