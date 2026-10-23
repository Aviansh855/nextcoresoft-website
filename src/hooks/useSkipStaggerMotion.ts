import { useReducedMotion } from "framer-motion"
import { useState } from "react"
import { isInAppBrowser } from "../lib/in-app-browser"

function skipStaggerMotionSync(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  if (window.matchMedia("(max-width: 767px)").matches) return true
  if (isInAppBrowser()) return true
  return false
}

/** Avoid opacity-0 hero copy when WebViews skip Framer Motion runs. */
export function useSkipStaggerMotion(): boolean {
  const reduced = useReducedMotion()
  const [skip] = useState(skipStaggerMotionSync)
  return Boolean(reduced) || skip
}
