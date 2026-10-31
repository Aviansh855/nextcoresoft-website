import { inquiryFieldsFromClientPayload } from "../../shared/inquiry-payload.mjs"
import { isContactOriginAllowed } from "../../shared/contact-origin.mjs"
import { normalizeFormspreeUrl, proxyInquiryToFormspree } from "../../shared/formspree-proxy.mjs"

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

function originAllowed(request) {
  return isContactOriginAllowed((name) => request.headers.get(name))
}

/** POST /api/contact — forwards to Formspree using FORMSPREE_FORM_URL (Cloudflare env only). */
export async function onRequestPost(context) {
  if (!originAllowed(context.request)) {
    return jsonResponse({ ok: false, error: "Forbidden" }, 403)
  }

  const contentType = context.request.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return jsonResponse({ ok: false, error: "Invalid content type." }, 415)
  }

  let raw
  try {
    raw = await context.request.json()
  } catch {
    return jsonResponse({ ok: false, error: "Could not read form data." }, 400)
  }

  const fields = inquiryFieldsFromClientPayload(raw)
  if (!fields) {
    return jsonResponse({ ok: false, error: "Please check required fields and try again." }, 400)
  }

  const formspreeUrl = normalizeFormspreeUrl(context.env?.FORMSPREE_FORM_URL)
  if (!formspreeUrl) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Contact form is not configured on the server. Set FORMSPREE_FORM_URL in Cloudflare Pages environment variables and redeploy.",
      },
      503,
    )
  }
  const result = await proxyInquiryToFormspree(formspreeUrl, fields)

  if (result.ok) {
    return jsonResponse({ ok: true })
  }

  const message =
    result.payload?.error ||
    (Array.isArray(result.payload?.errors)
      ? result.payload.errors.map((e) => e.message).join(" ")
      : null) ||
    "Submission failed."

  return jsonResponse({ ok: false, error: message }, result.status >= 400 ? result.status : 502)
}

export async function onRequest(context) {
  return jsonResponse({ ok: false, error: "Method not allowed" }, 405)
}
