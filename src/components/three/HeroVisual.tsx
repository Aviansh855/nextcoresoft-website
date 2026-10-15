import { lazy, Suspense, useEffect, useState } from "react"
import { HeroFallback } from "./HeroFallback"

const HeroSceneCanvas = lazy(() =>
  import("./HeroScene").then((m) => ({ default: m.HeroSceneCanvas })),
)

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"))
  } catch {
    return false
  }
}

/**
 * Decides whether to mount the 3D scene at all.
 * Phones and tablets, users who prefer reduced motion, and browsers without
 * WebGL get the lightweight CSS fallback instead.
 */
function useShouldRender3D(): boolean | null {
  const [should, setShould] = useState<boolean | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const narrow = window.matchMedia("(max-width: 767px)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    const saveData =
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const id = requestAnimationFrame(() =>
      setShould(!reduced && !narrow && !coarse && !saveData && canUseWebGL()),
    )
    return () => cancelAnimationFrame(id)
  }, [])

  return should
}

export function HeroVisual() {
  const shouldRender3D = useShouldRender3D()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!shouldRender3D) return
    const onMove = (e: PointerEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [shouldRender3D])

  return (
    <div className="relative h-[460px] w-full sm:h-[560px] lg:h-[640px]" aria-hidden="true">
      {shouldRender3D === true ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroSceneCanvas pointer={pointer} reducedMotion={reducedMotion} />
        </Suspense>
      ) : (
        <HeroFallback />
      )}
      {/* Ground glow so the object sits in the page rather than floating on black */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-24 w-2/3 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  )
}
