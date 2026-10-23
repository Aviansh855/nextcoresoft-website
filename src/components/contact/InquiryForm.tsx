import { CheckCircle2, Loader2, Send } from "lucide-react"
import {
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { Link, useSearchParams } from "react-router-dom"
import {
  BUDGET_OPTIONS,
  PORTFOLIO_ITEMS,
  SERVICE_OPTIONS,
  SERVICE_SLUG_TO_FORM,
  SITE,
  type Service,
} from "../../data/content"
import { AI_AUTOMATION_PLANS, AI_AUTOMATION_PRODUCT } from "../../data/ai-automation-pricing"
import { DEALERSHIP_PLANS, DEALERSHIP_PRODUCT } from "../../data/dealership-pricing"

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

const CONTACT_API = "/api/contact"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ApiResult = { ok?: boolean; error?: string; errors?: { message: string; code?: string }[] }

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

/** Posts to same-origin API; Formspree URL lives only in server env (Cloudflare). */
async function sendInquiry(fields: Fields, gotcha = ""): Promise<void> {
  if (gotcha.trim()) {
    throw new Error(
      "Your browser may have auto-filled a hidden field. Clear the form, type your details manually, and try again.",
    )
  }

  let response: Response
  try {
    response = await fetch(CONTACT_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fields.name.trim(),
        email: fields.email.trim(),
        company: fields.company.trim(),
        phone: fields.phone.trim(),
        service: fields.service,
        budget: fields.budget,
        description: fields.description.trim(),
        consent: fields.consent,
        _gotcha: gotcha,
      }),
    })
  } catch {
    throw new Error(
      `Could not reach the server. Check your connection or email ${SITE.contactEmail} directly.`,
    )
  }

  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    throw new Error(
      "The contact API did not respond correctly. Use npm run dev with FORMSPREE_FORM_URL in .env.local, or test on the deployed site.",
    )
  }

  let payload: ApiResult = {}
  try {
    payload = (await response.json()) as ApiResult
  } catch {
    throw new Error(
      `The server returned an invalid response. Please try again or email ${SITE.contactEmail} directly.`,
    )
  }

  if (!response.ok || payload.ok !== true) {
    const detail =
      payload.error ||
      payload.errors?.map((e) => e.message).join(" ") ||
      `The server returned ${response.status}.`
    throw new Error(detail)
  }
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-cyan-300/60 focus:outline-none"

function initialFieldsFromSearch(params: URLSearchParams): Fields {
  const next = { ...EMPTY }
  const serviceSlug = params.get("service")?.trim()
  if (serviceSlug && serviceSlug in SERVICE_SLUG_TO_FORM) {
    next.service = SERVICE_SLUG_TO_FORM[serviceSlug as Service["slug"]]
  }
  const projectId = params.get("project")?.trim()
  const project = projectId ? PORTFOLIO_ITEMS.find((p) => p.id === projectId) : undefined
  const intent = params.get("intent")?.trim()
  const parts: string[] = []
  if (intent === "quote") {
    parts.push("I would like a written quotation for this project.")
  }
  if (intent === "demo") {
    parts.push("I would like a product demonstration.")
  }
  if (project) {
    parts.push(`Portfolio item: ${project.name}.`)
  }
  const product = params.get("product")?.trim()
  if (product === DEALERSHIP_PRODUCT.slug) {
    parts.push(`Product: ${DEALERSHIP_PRODUCT.name}.`)
  }
  if (product === AI_AUTOMATION_PRODUCT.slug) {
    parts.push(`Product: ${AI_AUTOMATION_PRODUCT.name}.`)
  }
  const planId = params.get("plan")?.trim()
  const dealershipPlan = DEALERSHIP_PLANS.find((p) => p.id === planId)
  const aiPlan = AI_AUTOMATION_PLANS.find((p) => p.id === planId)
  if (dealershipPlan && (product === DEALERSHIP_PRODUCT.slug || !product)) {
    parts.push(`Selected plan: ${dealershipPlan.name} (${DEALERSHIP_PRODUCT.shortName}).`)
  } else if (aiPlan) {
    parts.push(`Selected plan: ${aiPlan.name} (${AI_AUTOMATION_PRODUCT.shortName}).`)
  }
  const topic = params.get("topic")?.trim()
  if (topic) {
    parts.push(`Interested in: ${topic}.`)
  }
  if (parts.length) next.description = parts.join(" ")
  return next
}

export function InquiryForm() {
  const [searchParams] = useSearchParams()
  const [fields, setFields] = useState<Fields>(() => initialFieldsFromSearch(searchParams))
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [submitError, setSubmitError] = useState<string | null>(null)
  const sending = useRef(false)
  const intentQuote = searchParams.get("intent") === "quote"

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
    setSubmitError(null)
    setStatus("submitting")
    const gotcha = String(new FormData(e.currentTarget).get("_gotcha") ?? "")
    try {
      await sendInquiry(fields, gotcha)
      setStatus("success")
      setFields(EMPTY)
      sending.current = false
    } catch (err) {
      sending.current = false
      setStatus("error")
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-8 text-center" role="status">
        <CheckCircle2 size={32} className="mx-auto text-cyan-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">Inquiry received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Thank you. We&apos;ll reply to the email you provided; we aim for within one business day when volume allows.
        </p>
        <button
          type="button"
          onClick={() => {
          setStatus("idle")
          setSubmitError(null)
        }}
          className="mt-6 text-sm font-semibold text-cyan-600 hover:text-slate-900"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-labelledby="inquiry-form-heading">
      <h2 id="inquiry-form-heading" className="font-display text-lg font-semibold text-slate-900">
        {intentQuote ? "Request a quote" : "Discuss your project"}
      </h2>
      <p className="text-sm text-slate-600">
        Required fields are marked. We use your business email to reply — we aim to respond within one business day when volume allows.
      </p>
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

      {/* Honeypot: must not look like "website" or autofill will fill it and block real users. */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="inquiry-hp">Leave this empty</label>
        <input
          id="inquiry-hp"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
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
            as described in the <Link to="/privacy/" className="text-cyan-600 underline-offset-2 hover:underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          <p className="font-medium">We couldn&apos;t send your inquiry.</p>
          <p className="mt-1 leading-relaxed">
            {submitError ??
              `Please try again in a moment, or email us directly at ${SITE.contactEmail}.`}
          </p>
        </div>
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
            <Send size={15} aria-hidden="true" /> {intentQuote ? "Request quote" : "Send inquiry"}
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
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-600">
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
