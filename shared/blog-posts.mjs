/**
 * Full blog post data for prerender + route meta (Node build only — not imported by Pages Functions).
 * Edit `shared/blog-posts.json`, then run `npm run build`.
 * URL lists for middleware/sitemap live in `shared/blog-index.mjs`.
 */
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const posts = require("./blog-posts.json")

export const BLOG_INDEX_PATH = "/blog"
export const BLOG_POSTS = posts

export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null
}

export function blogPostIndexablePaths() {
  return BLOG_POSTS.map((p) => `/blog/${p.slug}`)
}

export function blogRouteMetaByPath() {
  const map = {
    [BLOG_INDEX_PATH]: {
      title: "Blog | NextCoreSoft — Custom Software & Automation",
      description:
        "Guides on custom software and mobile apps in India, AI workflow automation, API integrations, hiring a dev partner, MVP planning, and project scoping for SMBs and founders.",
      h1: "Insights on software, automation, and growing operations",
      staticLead:
        "Long-form guides for Indian SMBs and founders — software and app costs, AI automation, integrations, hiring a partner, MVP vs full product, and honest scoping advice.",
      robots: "index, follow",
    },
  }
  for (const post of BLOG_POSTS) {
    const path = `/blog/${post.slug}`
    map[path] = {
      title: `${post.seoTitle} | NextCoreSoft`,
      description: post.metaDescription,
      h1: post.h1,
      staticLead: post.excerpt,
      robots: "index, follow",
    }
  }
  return map
}

export function blogSitemapEntries() {
  return [
    { loc: BLOG_INDEX_PATH, changefreq: "weekly", priority: "0.75" },
    ...BLOG_POSTS.map((p) => ({
      loc: `/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ]
}
