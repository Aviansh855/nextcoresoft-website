import { getCanonicalRedirectUrl } from "../shared/canonical-request.mjs"
import { isAppPath, isIndexablePath, isStaticAsset, normalizePathname } from "../shared/indexable-paths.mjs"

/**
 * Return real HTTP 404 for unknown SPA routes (fixes GSC "Soft 404").
 * Known indexable paths still get 200 + index.html from path rules in public/_redirects.
 *
 * www→apex and non-slash→slash 301s run here (single hop). Also configure Cloudflare
 * Redirect Rules if needed — see docs/CLOUDFLARE-WWW-REDIRECT-RULE.md.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const rawPath = url.pathname

  if (isStaticAsset(rawPath)) {
    return context.next()
  }

  const canonicalRedirect = getCanonicalRedirectUrl(url)
  if (canonicalRedirect) {
    return Response.redirect(canonicalRedirect, 301)
  }

  const path = normalizePathname(rawPath)

  if (path.startsWith("/api/")) {
    return context.next()
  }

  // Do not 301 strip trailing slashes here — Cloudflare Pages may 308-add them for
  // directory index.html routes, which caused /portfolio ↔ /portfolio/ redirect loops.

  if (isAppPath(path)) {
    // /index.html 308s to /. Fetch the site shell directly so /login/ is the SPA,
    // not the static 404 page. The browser URL stays /login/ for the client router.
    const shellUrl = new URL("/", url)
    const page = await context.env.ASSETS.fetch(new Request(shellUrl, { method: "GET" }))
    const headers = new Headers(page.headers)
    headers.delete("location")
    headers.set("X-Robots-Tag", "noindex, follow")
    headers.set("Cache-Control", "no-store")
    headers.set("Content-Type", "text/html; charset=utf-8")
    return new Response(page.body, { status: 200, statusText: "OK", headers })
  }

  const response = await context.next()

  // Contact form prefill URLs (?service=, ?project=, etc.) must not compete with /contact/ in Search.
  if (path === "/contact" && url.search) {
    const headers = new Headers(response.headers)
    headers.set("X-Robots-Tag", "noindex, follow")
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }

  if (isIndexablePath(path)) {
    return response
  }

  const contentType = response.headers.get("content-type") ?? ""
  if (response.status === 200 && contentType.includes("text/html")) {
    const headers = new Headers(response.headers)
    headers.set("X-Robots-Tag", "noindex, follow")
    return new Response(response.body, {
      status: 404,
      statusText: "Not Found",
      headers,
    })
  }

  return response
}
