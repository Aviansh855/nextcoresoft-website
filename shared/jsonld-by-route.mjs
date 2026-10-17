import { createRequire } from "node:module"
import { buildRouteJsonLdGraph } from "./jsonld-graph.mjs"

const require = createRequire(import.meta.url)

/** Build route JSON-LD for prerender (Node). */
export function routeJsonLdGraph(path) {
  return buildRouteJsonLdGraph(path, {
    blogPosts: require("./blog-posts.json"),
    seoFaqs: require("./seo-faqs.json"),
    routeMeta: require("./route-meta-snapshot.json"),
  })
}
