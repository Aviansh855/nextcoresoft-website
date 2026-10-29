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
    // _redirects is not applied inside context.next(), so /login/ would otherwise
    // be the static 404 page. Serve the SPA shell and keep it out of search.
    const indexUrl = new URL("/index.html", url)
    const page = await context.env.ASSETS.fetch(new Request(indexUrl, context.request))
    const headers = new Headers(page.headers)
    headers.set("X-Robots-Tag", "noindex, follow")
    headers.set("Cache-Control", "no-store")
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
