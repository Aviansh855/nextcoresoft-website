import { Navigate, Route, useParams } from "react-router-dom"
import { INDEXABLE_PATHS } from "../../lib/seo"

/** Client-side only: send humans to the canonical non-trailing URL (matches sitemap & link rel=canonical). */
function RedirectTo({ to }: { to: string }) {
  return <Navigate to={to} replace />
}

function ServiceSlashRedirect() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/" replace />
  return <Navigate to={`/services/${slug}`} replace />
}

/**
 * Cloudflare Pages may leave the address bar on /path/ while prerender HTML already declares
 * canonical /path. These routes avoid a NotFound flash and align the visible URL with SEO URLs.
 * Crawlers that do not run JS still see correct canonical tags in static HTML.
 */
export function TrailingSlashRedirectRoutes() {
  const staticPaths = INDEXABLE_PATHS.filter((p) => p !== "/")
  return (
    <>
      {staticPaths.map((p) => (
        <Route key={`slash-${p}`} path={`${p}/`} element={<RedirectTo to={p} />} />
      ))}
      <Route path="/services/:slug/" element={<ServiceSlashRedirect />} />
    </>
  )
}
