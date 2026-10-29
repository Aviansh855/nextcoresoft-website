import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { applyMeta } from "../lib/seo"
import { supabase } from "../lib/supabase"

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  useEffect(() => {
    applyMeta({ title: "Signing you in… | NextCoreSoft", description: "Completing secure login.", path: "/auth/callback", robots: "noindex, nofollow" })
    if (!supabase) { setError("Supabase is not configured yet."); return }

    let active = true
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return
      if (sessionError) setError(sessionError.message)
      else if (data.session) navigate("/dashboard/", { replace: true })
      else {
        // OAuth sometimes needs a moment for the URL session to be exchanged.
        setTimeout(() => {
          if (active) navigate("/login/", { replace: true })
        }, 1200)
      }
    })
    return () => { active = false }
  }, [navigate])

  return (
    <section className="px-5 pt-36 pb-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-slate-900">Signing you in…</h1>
      {error ? <p className="mx-auto mt-4 max-w-md text-sm text-red-700">{error} <Link to="/login/" className="font-semibold underline">Back to login</Link></p> : <p className="mt-3 text-sm text-slate-600">Please wait, we are completing your secure login.</p>}
    </section>
  )
}
