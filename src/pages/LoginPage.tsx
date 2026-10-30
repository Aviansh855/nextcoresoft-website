import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.2a12 12 0 0 0 5.3 5.3l1.2-2 4 1.5v3A2 2 0 0 1 17.5 18 14.5 14.5 0 0 1 6 6.5a2 2 0 0 1 .5-3z"/>
    </svg>
  )
}

const fieldClass = "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
const inputClass = `w-full ${fieldClass}`
const optionButtonClass = "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"

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
  const [dialCode, setDialCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    applyMeta({ title: "Login | NextCoreSoft", description: "Login to your NextCoreSoft account.", path: "/login", robots: "noindex, follow" })
  }, [])

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true })
  }, [loading, navigate, next, user])

  async function google() {
    if (!supabase) return
    setBusy("google"); setError(""); setMessage("")
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: authRedirectUrl(),
        queryParams: { prompt: "select_account" },
      },
    })
    if (oauthError) { setError(oauthError.message); setBusy(null) }
  }

  async function sendPhoneCode() {
    if (!supabase) return
    const fullPhone = toE164(dialCode, phone)
    if (!/^\+[1-9]\d{7,14}$/.test(fullPhone)) {
      setError("Enter a valid mobile number with country code.")
      setMessage("")
      return
    }
    setBusy("phone"); setError(""); setMessage("")
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
    if (token.length < 4) { setError("Enter the code from the SMS."); return }
    setBusy("phone-verify"); setError(""); setMessage("")
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
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
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
                  <button type="button" onClick={() => { setPhoneOpen(false); setError(""); setMessage("") }} className="text-sm font-semibold text-cyan-700 hover:underline">Back</button>
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
                {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
                {message && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">{message}</p>}
                {otpSent ? (
                  <button type="submit" disabled={!configured || busy !== null} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50">{busy === "phone-verify" ? "Please wait…" : "Verify and login"}</button>
                ) : (
                  <button type="button" onClick={sendPhoneCode} disabled={!configured || busy !== null} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50">{busy === "phone" ? "Please wait…" : "Send login code"}</button>
                )}
              </form>
            ) : (
              <>
                <button type="button" className={optionButtonClass} disabled={!configured || busy !== null} onClick={google}>
                  <GoogleIcon /> {busy === "google" ? "Please wait…" : "Continue with Google"}
                </button>
                <button type="button" className={optionButtonClass} disabled={!configured || busy !== null} onClick={() => { setPhoneOpen(true); setError(""); setMessage("") }}>
                  <PhoneIcon /> Continue with phone
                </button>
                {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
              </>
            )}
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">Phone login sends an SMS code. By continuing you agree to our <Link to="/terms/" className="underline">Terms</Link> and <Link to="/privacy/" className="underline">Privacy Policy</Link>.</p>
        </div>
      </Reveal>
    </section>
  )
}
