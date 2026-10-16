import { isIndexablePath, isStaticAsset, normalizePathname } from "../shared/indexable-paths.mjs"

/**
 * Return real HTTP 404 for unknown SPA routes (fixes GSC "Soft 404").
 * Known indexable paths still get 200 + index.html from _redirects.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const rawPath = url.pathname

  if (isStaticAsset(rawPath)) {
    return context.next()
  }

  const path = normalizePathname(rawPath)

  // Do not 301 strip trailing slashes here — Cloudflare Pages may 308-add them for
  // directory index.html routes, which caused /portfolio ↔ /portfolio/ redirect loops.

  const response = await context.next()
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
