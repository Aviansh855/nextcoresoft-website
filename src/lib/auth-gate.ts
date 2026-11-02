const POST_LOGIN_KEY = "ncs_post_login_path"

export function normalizeAuthPathname(pathname: string) {
  if (!pathname || pathname === "/") return "/"
  const trimmed = pathname.replace(/\/+$/, "")
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`
}

/** Routes reachable without a Supabase session. */
export function isPublicWithoutLogin(pathname: string) {
  const p = normalizeAuthPathname(pathname)
  return p === "/login" || p === "/auth/callback"
}

/** Same-origin relative path only (blocks open redirects). */
export function safeNextPath(next: string | null | undefined, fallback = "/") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback
  return next
}

export function rememberPostLoginPath(path: string) {
  try {
    sessionStorage.setItem(POST_LOGIN_KEY, safeNextPath(path, "/"))
  } catch {
    /* private mode */
  }
}

export function consumePostLoginPath(fallback = "/") {
  try {
    const stored = sessionStorage.getItem(POST_LOGIN_KEY)
    sessionStorage.removeItem(POST_LOGIN_KEY)
    return safeNextPath(stored, fallback)
  } catch {
    return fallback
  }
}
