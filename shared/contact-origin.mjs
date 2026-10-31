/** Origins allowed to POST /api/contact (production Cloudflare + local dev/preview). */
export const CONTACT_ALLOWED_ORIGINS = new Set([
  "https://nextcoresoft.com",
  "https://www.nextcoresoft.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
])

/** @param {(name: string) => string | undefined | null} getHeader */
export function isContactOriginAllowed(getHeader) {
  const origin = getHeader("Origin")
  if (origin && CONTACT_ALLOWED_ORIGINS.has(origin)) return true
  const referer = getHeader("Referer")
  if (!referer) return false
  try {
    return CONTACT_ALLOWED_ORIGINS.has(new URL(referer).origin)
  } catch {
    return false
  }
}
