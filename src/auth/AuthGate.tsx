import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import { isPublicWithoutLogin, safeNextPath } from "../lib/auth-gate"

function GateLoading() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-5 pt-32 pb-24 text-center text-slate-600">
      Checking your session…
    </section>
  )
}

export function AuthGate({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { configured, loading, user } = useAuth()

  if (isPublicWithoutLogin(location.pathname)) {
    return children
  }

  if (!configured) {
    const next = safeNextPath(`${location.pathname}${location.search}${location.hash}`, "/")
    return <Navigate to={`/login/?next=${encodeURIComponent(next)}`} replace />
  }

  if (loading) {
    return <GateLoading />
  }

  if (!user) {
    const next = safeNextPath(`${location.pathname}${location.search}${location.hash}`, "/")
    return <Navigate to={`/login/?next=${encodeURIComponent(next)}`} replace />
  }

  return children
}
