import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import type { Provider } from "@supabase/supabase-js"
import { Reveal } from "../components/ui/Reveal"
import { useAuth } from "../auth/AuthProvider"
import { applyMeta } from "../lib/seo"
import { authRedirectUrl, supabase } from "../lib/supabase"

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-9.8z"/>
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.2C3.3 21.2 7.3 24 12 24z"/>
      <path fill="#FBBC05" d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.3 6.8C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.2l3.9-2.9z"/>
      <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.8 1.3 6.8l3.9 2.9c.9-2.9 3.6-5 6.8-5z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8s-1.7-.8-2.9-.8c-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.9.7 1.9-1.1 2.6-2.2c.8-1.2 1.1-2.3 1.2-2.4-.1 0-2.2-.8-2.2-3.5zM14.7 6.4c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.2z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#1877F2" d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-1.9.9-1.9 1.8v2.2h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z"/>
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10.5v10.5H1z"/>
      <path fill="#7FBA00" d="M12.5 1H23v10.5H12.5z"/>
      <path fill="#00A4EF" d="M1 12.5h10.5V23H1z"/>
      <path fill="#FFB900" d="M12.5 12.5H23V23H12.5z"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.3.8 1 .8 2.1v3.1c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/></svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.8-6.3L6 22H3.1l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.2a12 12 0 0 0 5.3 5.3l1.2-2 4 1.5v3A2 2 0 0 1 17.5 18 14.5 14.5 0 0 1 6 6.5a2 2 0 0 1 .5-3z"/>
    </svg>
  )
}

type SocialProvider = Extract<Provider, "google" | "apple" | "facebook" | "azure" | "github" | "x">

const SOCIAL: { id: SocialProvider; label: string; icon: ReactNode }[] = [
  { id: "google", label: "Continue with Google", icon: <GoogleIcon /> },
  { id: "apple", label: "Continue with Apple", icon: <AppleIcon /> },
  { id: "facebook", label: "Continue with Facebook", icon: <FacebookIcon /> },
  { id: "azure", label: "Continue with Microsoft", icon: <MicrosoftIcon /> },
  { id: "github", label: "Continue with GitHub", icon: <GithubIcon /> },
  { id: "x", label: "Continue with X", icon: <XIcon /> },
]

const fieldClass = "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
const inputClass = `w-full ${fieldClass}`
const socialButtonClass = "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"

function toE164(dialCode: string, national: string) {
  const codeDigits = dialCode.replace(/\D/g, "")
  const numberDigits = national.replace(/\D/g, "")
  if (!codeDigits || !numberDigits) return ""
  return `+${codeDigits}${numberDigits}`
}

export function LoginPage() {
  const { configured, user, loading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get("next")?.startsWith("/") ? params.get("next")! : "/dashboard/"
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dialCode, setDialCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [noticeScope, setNoticeScope] = useState<"account" | "phone">("account")

  useEffect(() => {
    applyMeta({ title: "Login | NextCoreSoft", description: "Login to your NextCoreSoft account.", path: "/login", robots: "noindex, follow" })
  }, [])

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true })
  }, [loading, navigate, next, user])

  async function oauth(provider: SocialProvider) {
    if (!supabase) return
    setBusy(provider); setError(""); setMessage(""); setNoticeScope("account")
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: authRedirectUrl(),
        queryParams: provider === "google" || provider === "azure" ? { prompt: "select_account" } : undefined,
      },
    })
    if (oauthError) { setError(oauthError.message); setBusy(null) }
  }

  async function emailAuth(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setBusy("email"); setError(""); setMessage(""); setNoticeScope("account")
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: authRedirectUrl() } })
    if (result.error) setError(result.error.message)
    else if (mode === "signup" && !result.data.session) setMessage("Account created. Please check your email and confirm your account, then login.")
    else navigate(next, { replace: true })
    setBusy(null)
  }

  async function magicLink() {
    if (!supabase || !email) { setNoticeScope("account"); setError("Enter your email first, then choose magic link."); return }
    setBusy("magic"); setError(""); setMessage(""); setNoticeScope("account")
    const { error: otpError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: authRedirectUrl() } })
    setError(otpError?.message ?? "")
    if (!otpError) setMessage("Magic login link sent. Please check your email inbox/spam folder.")
    setBusy(null)
  }

  async function sendPhoneCode() {
    if (!supabase) return
    const fullPhone = toE164(dialCode, phone)
    if (!/^\+[1-9]\d{7,14}$/.test(fullPhone)) {
      setNoticeScope("phone")
      setError("Enter a valid mobile number with country code.")
      setMessage("")
      return
    }
    setBusy("phone"); setError(""); setMessage(""); setNoticeScope("phone")
    const { error: phoneError } = await supabase.auth.signInWithOtp({ phone: fullPhone, options: { shouldCreateUser: true } })
    if (phoneError) setError(phoneError.message)
    else {
      setOtpSent(true)
      setMessage(`Login code sent to ${fullPhone}.`)
    }
    setBusy(null)
  }

  async function verifyPhone(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    const fullPhone = toE164(dialCode, phone)
    const token = otp.replace(/\D/g, "")
    if (token.length < 4) { setNoticeScope("phone"); setError("Enter the code from the SMS."); return }
    setBusy("phone-verify"); setError(""); setMessage(""); setNoticeScope("phone")
    const { error: verifyError } = await supabase.auth.verifyOtp({ phone: fullPhone, token, type: "sms" })
    if (verifyError) { setError(verifyError.message); setBusy(null); return }
    navigate(next, { replace: true })
    setBusy(null)
  }

  return (
    <section className="px-5 pt-32 pb-24 sm:px-8">
      <Reveal>
        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-9">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Account</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Login to access your NextCoreSoft dashboard, project updates and support.</p>

          {!configured && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900" role="status">
              <strong>Supabase setup pending:</strong> add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> in your local <code>.env.local</code> (and later in Cloudflare). Login buttons will start working after restart/redeploy. Do not use a service-role/secret key.
            </div>
          )}

          <div className="mt-7 space-y-3">
            {phoneOpen ? (
              <form onSubmit={verifyPhone} className="space-y-4 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800"><PhoneIcon /> Continue with phone</p>
                  <button type="button" onClick={() => { setPhoneOpen(false); setError(""); setMessage("") }} className="text-sm font-semibold text-cyan-700 hover:underline">Other options</button>
                </div>
                <div>
                  <label htmlFor="login-phone" className="mb-1.5 block text-sm font-medium text-slate-700">Mobile number</label>
                  <div className="flex gap-2">
                    <input id="login-dial" aria-label="Country code" inputMode="tel" autoComplete="tel-country-code" value={dialCode} onChange={(e) => { setDialCode(e.target.value); setOtpSent(false) }} className={`${fieldClass} w-24 shrink-0`} placeholder="+91" />
                    <input id="login-phone" type="tel" inputMode="tel" autoComplete="tel-national" value={phone} onChange={(e) => { setPhone(e.target.value); setOtpSent(false) }} className={`${fieldClass} min-w-0 flex-1`} placeholder="98765 43210" />
                  </div>
                </div>
                {otpSent && (
                  <div>
                    <label htmlFor="login-otp" className="mb-1.5 block text-sm font-medium text-slate-700">SMS code</label>
                    <input id="login-otp" inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(e) => setOtp(e.target.value)} className={inputClass} placeholder="123456" />
                  </div>
                )}
                {noticeScope === "phone" && error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
                {noticeScope === "phone" && message && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">{message}</p>}
                {otpSent ? (
                  <button type="submit" disabled={!configured || busy !== null} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50">{busy === "phone-verify" ? "Please wait…" : "Verify and login"}</button>
                ) : (
                  <button type="button" onClick={sendPhoneCode} disabled={!configured || busy !== null} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50">{busy === "phone" ? "Please wait…" : "Send login code"}</button>
                )}
              </form>
            ) : (
              <>
                {SOCIAL.map((item) => (
                  <button key={item.id} type="button" className={socialButtonClass} disabled={!configured || busy !== null} onClick={() => oauth(item.id)}>
                    {item.icon} {busy === item.id ? "Please wait…" : item.label}
                  </button>
                ))}
                <button type="button" className={socialButtonClass} disabled={!configured || busy !== null} onClick={() => { setPhoneOpen(true); setError(""); setMessage(""); setNoticeScope("phone") }}>
                  <PhoneIcon /> Continue with phone
                </button>
              </>
            )}
          </div>

          <div className="my-6 flex items-center gap-3 text-xs font-medium text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR WITH EMAIL<span className="h-px flex-1 bg-slate-200" /></div>

          <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold">
            <button type="button" onClick={() => setMode("signin")} className={`rounded-lg px-3 py-2 ${mode === "signin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Login</button>
            <button type="button" onClick={() => setMode("signup")} className={`rounded-lg px-3 py-2 ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Sign up</button>
          </div>

          <form onSubmit={emailAuth} className="space-y-4">
            <div><label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label><input id="login-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" /></div>
            <div><label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label><input id="login-password" type="password" required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" /></div>
            {noticeScope === "account" && error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
            {noticeScope === "account" && message && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">{message}</p>}
            <button type="submit" disabled={!configured || busy !== null} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50">{busy === "email" ? "Please wait…" : mode === "signin" ? "Login" : "Create account"}</button>
          </form>

          <button type="button" onClick={magicLink} disabled={!configured || busy !== null} className="mt-4 w-full text-sm font-semibold text-cyan-700 hover:underline disabled:opacity-50">Email me a magic login link</button>

          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">Apple can hide your email. Phone login sends an SMS code. By continuing you agree to our <Link to="/terms/" className="underline">Terms</Link> and <Link to="/privacy/" className="underline">Privacy Policy</Link>.</p>
        </div>
      </Reveal>
    </section>
  )
}
