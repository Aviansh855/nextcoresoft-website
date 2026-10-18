import { CONTACT_NOTIFY_EMAIL } from "./contact-notify.mjs"

/** Build Formspree field map from validated inquiry (browser or API). */

export function inquiryFieldsFromClientPayload(raw) {
  if (!raw || typeof raw !== "object") return null

  const name = String(raw.name ?? "").trim()
  const company = String(raw.company ?? "").trim()
  const email = String(raw.email ?? "").trim()
  const phone = String(raw.phone ?? "").trim()
  const service = String(raw.service ?? "").trim()
  const budget = String(raw.budget ?? "").trim()
  const description = String(raw.description ?? "").trim()
  const consent = Boolean(raw.consent)
  const _gotcha = String(raw._gotcha ?? "")

  if (!name || !company || !email || !service || description.length < 20 || !consent) {
    return null
  }

  const notifyEmail = String(CONTACT_NOTIFY_EMAIL ?? "").trim()

  return {
    _gotcha,
    name,
    email,
    _replyto: email,
    ...(notifyEmail.includes("@") ? { _cc: notifyEmail } : {}),
    company,
    phone: phone || "Not provided",
    service,
    budget: budget || "Not specified",
    message: description,
    description,
    consent: consent ? "Yes" : "No",
    _subject: `New inquiry from ${company} — NextCoreSoft website`,
  }
}
