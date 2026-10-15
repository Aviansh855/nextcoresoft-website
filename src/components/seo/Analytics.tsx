import { useEffect, useState } from "react"

const CONSENT_KEY = "ncs-analytics-consent"
type Consent = "granted" | "denied" | null

function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored === "granted" || stored === "denied" ? stored : null
  } catch {
    return "denied"
  }
}

/**
 * Privacy-respecting analytics gate.
 * Nothing loads until the visitor opts in, and only if VITE_PLAUSIBLE_DOMAIN
 * is configured. The choice is remembered in localStorage.
 */
export function Analytics() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
  const [consent, setConsent] = useState<Consent>(readConsent)

  useEffect(() => {
    if (consent !== "granted" || !domain) return
    if (document.querySelector(`script[data-domain="${domain}"]`)) return
    const script = document.createElement("script")
    script.defer = true
    script.dataset.domain = domain
    script.src = "https://plausible.io/js/script.js"
    document.head.appendChild(script)
  }, [consent, domain])

  if (!domain || consent !== null) return null

  const choose = (value: Exclude<Consent, null>) => {
    localStorage.setItem(CONSENT_KEY, value)
    setConsent(value)
  }

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl flex-col gap-4 rounded-2xl border border-white/15 bg-ink-soft/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:right-5 sm:bottom-5 sm:flex-row sm:items-center"
    >
      <p className="text-sm leading-relaxed text-slate-300">
        We use privacy-friendly, cookie-less analytics to understand which pages are useful. It only runs if you allow
        it.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 hover:border-white/40"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-cyan-100"
        >
          Allow
        </button>
      </div>
    </div>
  )
}
