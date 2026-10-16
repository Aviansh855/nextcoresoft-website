import { ArrowRight } from "lucide-react"
import { ButtonLink } from "../ui/Button"
import { Reveal } from "../ui/Reveal"

/** Closing conversion band for pages that don't contain the full inquiry form. */
export function CTABand() {
  return (
    <section className="pb-24">
      <Reveal>
        <div className="cta-shimmer shell relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50/90 via-white to-slate-50 px-8 py-14 text-center sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute top-[-40%] left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[100px]"
            aria-hidden="true"
          />
          <h2 className="relative font-display text-3xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            Let&apos;s Build Something That Moves Your Business Forward.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Tell us what slows your business down. The first conversation is free, and you&apos;ll leave it with an
            honest view of what&apos;s worth building.
          </p>
          <div className="relative mt-9">
            <ButtonLink to="/contact">
              Book a Free Consultation
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
