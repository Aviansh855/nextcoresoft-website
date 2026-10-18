/**
 * Server-side forward to Formspree — Form URL must never ship in client JS or git.
 */

/** Form IDs are alphanumeric; allow optional trailing slash in env by normalizing first. */
const FORMSPREE_URL_PATTERN = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i

export function normalizeFormspreeUrl(raw) {
  const trimmed = String(raw ?? "").trim().replace(/\/+$/, "")
  return FORMSPREE_URL_PATTERN.test(trimmed) ? trimmed : ""
}

/**
 * @param {Record<string, string>} fields — normalized inquiry fields
 * @returns {Promise<{ ok: boolean, status: number, payload: object }>}
 */
export async function proxyInquiryToFormspree(formspreeUrl, fields) {
  const endpoint = normalizeFormspreeUrl(formspreeUrl)
  if (!endpoint) {
    return {
      ok: false,
      status: 503,
      payload: { ok: false, error: "Contact form is not configured on the server." },
    }
  }

  const gotcha = String(fields._gotcha ?? "").trim()
  if (gotcha) {
    return {
      ok: false,
      status: 400,
      payload: { ok: false, error: "Submission blocked." },
    }
  }

  const body = new FormData()
  body.append("_gotcha", "")
  for (const [key, value] of Object.entries(fields)) {
    if (key === "_gotcha") continue
    if (value != null && String(value).length > 0) {
      body.append(key, String(value))
    }
  }

  let response
  try {
    response = await fetch(endpoint, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
    })
  } catch {
    return {
      ok: false,
      status: 502,
      payload: { ok: false, error: "Could not reach the form delivery service." },
    }
  }

  let payload = {}
  try {
    payload = await response.json()
  } catch {
    /* empty */
  }

  const accepted = response.ok && payload.ok === true
  const outPayload =
    accepted || payload.ok === false || payload.error || payload.errors
      ? payload
      : {
          ok: false,
          error:
            "The form service returned an unexpected response. Check Formspree dashboard → Submissions.",
        }
  return {
    ok: accepted,
    status: accepted ? 200 : response.status >= 400 ? response.status : 502,
    payload: outPayload,
  }
}
