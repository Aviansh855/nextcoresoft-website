import { getCanonicalRedirectUrl } from "./shared/canonical-request.mjs"
import { isIndexablePath, isStaticAsset, normalizePathname } from "./shared/indexable-paths.mjs"

/** Vercel Edge Middleware — real HTTP 404 for unknown routes (GSC soft 404). */
export const config = {
  matcher: ["/((?!assets/).*)"],
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const rawPath = url.pathname

  if (isStaticAsset(rawPath)) {
    return
  }

  const canonicalRedirect = getCanonicalRedirectUrl(url)
  if (canonicalRedirect) {
    return Response.redirect(canonicalRedirect, 301)
  }

  const path = normalizePathname(rawPath)

  if (isIndexablePath(path)) {
    if (path === "/contact" && url.search) {
      const indexUrl = new URL("/index.html", request.url)
      const page = await fetch(indexUrl)
      const headers = new Headers(page.headers)
      headers.set("X-Robots-Tag", "noindex, follow")
      headers.set("Content-Type", "text/html; charset=utf-8")
      return new Response(await page.text(), {
        status: 200,
        headers,
      })
    }
    return
  }

  const indexUrl = new URL("/index.html", request.url)
  const page = await fetch(indexUrl)
  const headers = new Headers(page.headers)
  headers.set("X-Robots-Tag", "noindex, follow")
  headers.set("Content-Type", "text/html; charset=utf-8")

  return new Response(await page.text(), {
    status: 404,
    statusText: "Not Found",
    headers,
  })
}
