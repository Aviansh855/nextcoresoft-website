import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { getRouteJsonLdGraph } from "../../lib/route-jsonld"
import { JsonLd } from "./JsonLd"

function normalizePathname(pathname: string): string {
  let path = pathname.split("?")[0].split("#")[0]
  if (!path.startsWith("/")) path = `/${path}`
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path || "/"
}

/** One @graph per route — matches prerendered `jsonld-route-graph` in static HTML. */
export function RouteJsonLd() {
  const { pathname } = useLocation()
  const path = normalizePathname(pathname)

  const data = useMemo(() => getRouteJsonLdGraph(path), [path])

  return data ? <JsonLd id="jsonld-route-graph" data={data} /> : null
}
