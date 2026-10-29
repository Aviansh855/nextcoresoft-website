import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { ButtonLink } from "../components/ui/Button"
import { applyMeta } from "../lib/seo"

export function DashboardPage() {
  const { configured, loading, user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { applyMeta({ title: "My Dashboard | NextCoreSoft", description: "Your NextCoreSoft account dashboard.", path: "/dashboard", robots: "noindex, follow" }) }, [])
  useEffect(() => { if (configured && !loading && !user) navigate("/login/?next=/dashboard/", { replace: true }) }, [configured, loading, navigate, user])

  if (!configured) return <section className="mx-auto max-w-2xl px-5 pt-36 pb-24 text-center"><h1 className="font-display text-3xl font-semibold">Supabase setup pending</h1><p className="mt-3 text-slate-600">Add your Supabase URL and publishable key, restart the site, then login again.</p><Link to="/login/" className="mt-5 inline-block font-semibold text-cyan-700 hover:underline">Back to login</Link></section>
  if (loading || !user) return <section className="px-5 pt-36 pb-24 text-center text-slate-600">Loading your account…</section>

  const rawProvider = typeof user.app_metadata?.provider === "string" ? user.app_metadata.provider : "email"
  const providerLabels: Record<string, string> = { azure: "Microsoft", x: "X", twitter: "X", phone: "Mobile", email: "Email" }
  const provider = providerLabels[rawProvider] ?? rawProvider

  return (
    <section className="mx-auto w-full max-w-4xl px-5 pt-32 pb-24 sm:px-8">
      <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">My account</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900">Welcome{user.user_metadata?.full_name ? `, ${String(user.user_metadata.full_name)}` : ""}</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-semibold text-slate-900">Account</h2><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-slate-400">Email</dt><dd className="font-medium text-slate-800">{user.email || "—"}</dd></div>{user.phone ? <div><dt className="text-slate-400">Mobile</dt><dd className="font-medium text-slate-800">{user.phone}</dd></div> : null}<div><dt className="text-slate-400">Login method</dt><dd className="font-medium capitalize text-slate-800">{provider}</dd></div><div><dt className="text-slate-400">User ID</dt><dd className="break-all font-mono text-xs text-slate-600">{user.id}</dd></div></dl></article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><h2 className="font-semibold text-slate-900">Next steps</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Your login is working. Project updates, invoices and support features can be connected here next using Supabase tables with Row Level Security.</p><div className="mt-5 flex flex-wrap gap-3"><ButtonLink to="/contact/">Discuss a project</ButtonLink><ButtonLink to="/services/" variant="secondary">Explore services</ButtonLink></div></article>
      </div>
      <button type="button" onClick={async () => { await signOut(); navigate("/login/", { replace: true }) }} className="mt-8 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Logout</button>
    </section>
  )
}
