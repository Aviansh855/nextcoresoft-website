/**
 * Server-side forward to Formspree — Form URL must never ship in client JS or git.
 */

const FORMSPREE_URL_PATTERN = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i

/**
 * @param {Record<string, string>} fields — normalized inquiry fields
 * @returns {Promise<{ ok: boolean, status: number, payload: object }>}
 */
export async function proxyInquiryToFormspree(formspreeUrl, fields) {
  if (!formspreeUrl || !FORMSPREE_URL_PATTERN.test(formspreeUrl)) {
    return {
      ok: false,
      status: 503,
      payload: { ok: false, error: "Contact form is not configured on the server." },
    }
  }

  const gotcha = String(fields._gotcha ?? "").trim()
  if (gotcha) {
    return { ok: true, status: 200, payload: { ok: true } }
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
    response = await fetch(formspreeUrl, {
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

  const accepted = response.ok && payload.ok !== false
  return { ok: accepted, status: accepted ? 200 : response.status, payload }
}
