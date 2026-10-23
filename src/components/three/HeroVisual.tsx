import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { HeroFallback } from "./HeroFallback"
import type { PointerTarget } from "./HeroScene"

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
 * Phones, reduced motion, data-saver, and browsers without WebGL get the CSS fallback.
 * A coarse pointer alone does not disable the scene: many laptops report touch as the
 * primary pointer, and that was hiding the 3D hero for those visitors.
 */
function shouldMount3D(): boolean {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const narrow = window.matchMedia("(max-width: 767px)").matches
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  return !reduced && !narrow && !saveData && canUseWebGL()
}

export function HeroVisual() {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 })

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const narrowQuery = window.matchMedia("(max-width: 767px)")
    const update = () => {
      setEnabled(shouldMount3D())
      setReducedMotion(reducedQuery.matches)
    }
    const frame = requestAnimationFrame(update)
    reducedQuery.addEventListener("change", update)
    narrowQuery.addEventListener("change", update)
    return () => {
      cancelAnimationFrame(frame)
      reducedQuery.removeEventListener("change", update)
      narrowQuery.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [enabled])

  return (
    <div className="relative h-[min(52vh,320px)] w-full sm:h-[520px] lg:h-[640px]" aria-hidden="true">
      {enabled === true ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroSceneCanvas pointer={pointer} reducedMotion={reducedMotion} />
        </Suspense>
      ) : (
        <HeroFallback />
      )}
      <div className="pointer-events-none absolute inset-x-[12%] bottom-4 h-24 rounded-full bg-cyan-400/15 blur-3xl" />
    </div>
  )
}
