import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      className="fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-900 shadow-lg backdrop-blur-md transition-colors hover:border-cyan-300/50 hover:text-cyan-600 sm:right-6 sm:bottom-6"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}
