import routeMeta from "../../shared/route-meta-snapshot.json"
import seoFaqs from "../../shared/seo-faqs.json"
import { BLOG_POSTS } from "../data/blog"

// Shared ESM graph builder (also used by prerender).
// @ts-expect-error — .mjs module has no TS types
import { buildRouteJsonLdGraph } from "../../shared/jsonld-graph.mjs"

export function getRouteJsonLdGraph(path: string) {
  return buildRouteJsonLdGraph(path, { blogPosts: BLOG_POSTS, seoFaqs, routeMeta })
}
