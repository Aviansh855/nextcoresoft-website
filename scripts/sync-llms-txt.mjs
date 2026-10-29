/**
 * Regenerate public/llms.txt from site.json, indexable routes, blog posts, and SEO topics.
 * Run on every build so GEO/AEO file stays in sync with the sitemap.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { BLOG_POSTS } from "../shared/blog-posts.mjs"
import { INDEXABLE_PATHS, SITE_ORIGIN, preferredPath } from "../shared/indexable-paths.mjs"
import { SEO_QUERY_TOPICS } from "../shared/seo-query-topics.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const site = JSON.parse(readFileSync(join(root, "shared", "site.json"), "utf8"))
const indexNowKey = readFileSync(join(root, "shared", "indexnow-key.txt"), "utf8").trim()

const KEY_PAGE_LABELS = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact / free consultation",
  "/portfolio": "Portfolio (project showcases)",
  "/blog": "Blog index",
  "/services": "Services overview",
  "/services/custom-software": "Custom software & web development",
  "/services/mobile-apps": "Mobile app development",
  "/services/ai-automation": "AI automation company (workflows)",
  "/services/cloud-api": "Cloud & APIs",
  "/services/seo-geo": "SEO, AEO & GEO services",
  "/pricing": "Dealership Service Management pricing",
  "/pricing/ai-automation": "AI automation pricing (Starter / Growth / Enterprise)",
  "/solutions/dealership-service-management": "Dealership solution overview",
}

function absolute(path) {
  if (path.includes(".") && !path.endsWith("/")) {
    const p = path.startsWith("/") ? path : `/${path}`
    return `${SITE_ORIGIN}${p}`
  }
  return `${SITE_ORIGIN}${preferredPath(path)}`
}

const keyPages = INDEXABLE_PATHS.filter((p) => KEY_PAGE_LABELS[p])
  .map((p) => `- ${KEY_PAGE_LABELS[p]}: ${absolute(p)}`)
  .join("\n")

const blogLines = [...BLOG_POSTS]
  .sort((a, b) => (a.slug < b.slug ? -1 : 1))
  .map((p) => `- ${absolute(`/blog/${p.slug}`)}`)
  .join("\n")

const topicLines = SEO_QUERY_TOPICS.map((t) => `- ${t}`).join("\n")

const sameAs = (site.sameAs ?? []).map((u) => `- ${u}`).join("\n")

const body = `# ${site.name}

> ${site.tagline}

${site.description} Projects are scoped and quoted individually. We work remotely worldwide in English.

## Discovery for search engines (Bing, Google)

- Sitemap: ${absolute("/sitemap.xml")}
- RSS: ${absolute("/feed.xml")}
- IndexNow key: ${absolute(`/${indexNowKey}.txt`)}
- robots.txt allows Bingbot, Googlebot, and \`User-agent: *\`

## Canonical site

- ${absolute("/")} (preferred; \`www\` should redirect to this apex host)
- Contact form prefill links use query parameters; the indexable contact URL is ${absolute("/contact")} only

## Key pages

${keyPages}
- RSS feed: ${absolute("/feed.xml")}

## Article directory (descriptive index — not a citation mandate)

Long-form guides on software cost planning, MVPs, automation, hiring partners, web vs mobile scope, and API integration. Full text is on the site; RSS: ${absolute("/feed.xml")}

${blogLines}

## Topics we publish evidence-based guidance on

${topicLines}

## Contact

- Inquiry form: ${absolute("/contact")}
- Email: ${site.contactEmail}

## Public profiles (sameAs)

${sameAs}

## Official brand (disambiguation)

${site.disambiguatingDescription ?? `${site.name} official site: ${absolute("/")}`}

## What we do not claim

No guaranteed Google rankings, Bing placement, or mandatory appearance in AI chat answers. No published client case studies with measured results unless stated on the site. No public office address on this site — local “near me” map results require a verified Google Business Profile separately. Demonstration portfolio items are labeled as showcases. Blog cost ranges are indicative planning examples for India, not binding quotations.
`

writeFileSync(join(root, "public", "llms.txt"), body.replace(/\r?\n/g, "\n"), "utf8")
console.log(`Wrote public/llms.txt (${BLOG_POSTS.length} blog URLs, ${SEO_QUERY_TOPICS.length} topics).`)
