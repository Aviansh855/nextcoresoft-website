import { CheckCircle2, Loader2, Send } from "lucide-react"
import { cloneElement, isValidElement, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "../../data/content"

interface Fields {
  name: string
  company: string
  email: string
  phone: string
  service: string
  budget: string
  description: string
  consent: boolean
}

const EMPTY: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  description: "",
  consent: false,
}

type Errors = Partial<Record<keyof Fields, string>>
type Status = "idle" | "submitting" | "success" | "error"

/** Public Formspree form URL. Override with VITE_FORM_ENDPOINT if the form changes. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzedydog"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (fields.name.trim().length < 2) errors.name = "Please enter your name."
  if (fields.company.trim().length < 2) errors.company = "Please enter your company name."
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Please enter a valid business email."
  if (fields.phone.trim() && !/^[0-9+\-().\s]{7,20}$/.test(fields.phone.trim()))
    errors.phone = "That phone number looks incomplete."
  if (!fields.service) errors.service = "Please choose a service."
  if (fields.description.trim().length < 20)
    errors.description = "Please describe the project in at least a sentence or two."
  if (!fields.consent) errors.consent = "Please confirm we may contact you about this inquiry."
  return errors
}

/**
 * Posts the inquiry to Formspree as multipart form data.
 * The endpoint URL is public by design; no API key is sent from the browser.
 */
async function sendInquiry(fields: Fields, gotcha = ""): Promise<void> {
  const endpoint = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || FORMSPREE_ENDPOINT
  const body = new FormData()
  body.append("_gotcha", gotcha)
  body.append("name", fields.name.trim())
  body.append("email", fields.email.trim())
  body.append("company", fields.company.trim())
  body.append("phone", fields.phone.trim() || "Not provided")
  body.append("service", fields.service)
  body.append("budget", fields.budget || "Not specified")
  body.append("message", fields.description.trim())
  body.append("_subject", `New inquiry from ${fields.company.trim()} — NextCoreSoft website`)

  const response = await fetch(endpoint, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
  })

  if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`)
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-cyan-300/60 focus:outline-none"

export function InquiryForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const sending = useRef(false)

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value
      setFields((prev) => ({ ...prev, [key]: value }))
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']")
      firstInvalid?.focus()
      return
    }

    if (sending.current) return
    sending.current = true
    setStatus("submitting")
    const gotcha = String(new FormData(e.currentTarget).get("_gotcha") ?? "")
    try {
      await sendInquiry(fields, gotcha)
      setStatus("success")
      setFields(EMPTY)
    } catch {
      sending.current = false
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-8 text-center" role="status">
        <CheckCircle2 size={32} className="mx-auto text-cyan-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">Inquiry received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Thank you. We&apos;ll reply to the email you provided, usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-cyan-600 hover:text-slate-900"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} required>
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Company name" error={errors.company} required>
          <input
            className={inputClass}
            name="company"
            autoComplete="organization"
            value={fields.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            placeholder="Your company"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business email" error={errors.email} required>
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Phone number" error={errors.phone} optional>
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={fields.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+1 555 0100"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service required" error={errors.service} required>
          <select
            className={inputClass}
            name="service"
            value={fields.service}
            onChange={update("service")}
            aria-invalid={Boolean(errors.service)}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated project budget" error={errors.budget} optional>
          <select className={inputClass} name="budget" value={fields.budget} onChange={update("budget")}>
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project description" error={errors.description} required>
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="description"
          value={fields.description}
          onChange={update("description")}
          aria-invalid={Boolean(errors.description)}
          placeholder="What does the business do today, and what should the software change?"
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. Submissions filling it are dropped server-side by Formspree. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            name="consent"
            checked={fields.consent}
            onChange={update("consent")}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-300"
          />
          <span>
            I agree that NextCoreSoft may contact me about this inquiry and store these details for that purpose,
            as described in the <Link to="/privacy" className="text-cyan-600 underline-offset-2 hover:underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs text-rose-300">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          Something went wrong sending your inquiry. Please try again in a moment, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-progress disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" /> Send inquiry
          </>
        )}
      </button>
    </form>
  )
}

function Field({
  label,
  error,
  required,
  optional,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  optional?: boolean
  children: ReactElement<{ id?: string; "aria-describedby"?: string }>
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-")
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-xs font-normal text-slate-500">Required</span>}
        {optional && <span className="text-xs font-normal text-slate-500">Optional</span>}
      </label>
      <div className="[&>*]:w-full">{withId(children, id, error ? `${id}-error` : undefined)}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}

function withId(children: ReactNode, id: string, describedBy?: string) {
  if (!isValidElement<{ id?: string; "aria-describedby"?: string }>(children)) return children
  return cloneElement(children, { id, "aria-describedby": describedBy })
}
