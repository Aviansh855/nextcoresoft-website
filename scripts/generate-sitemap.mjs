import { statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { BLOG_INDEX_PATH, BLOG_POSTS } from "../shared/blog-posts.mjs"
import { SITE_ORIGIN, SITEMAP_ENTRIES, preferredPath } from "../shared/indexable-paths.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** GSC query targets — higher sitemap priority (still one URL per route; no query strings). */
const SITEMAP_PRIORITY_OVERRIDE = {
  "/services/cloud-api": "0.88",
  "/services/mobile-apps": "0.87",
  "/blog/mobile-app-development-cost-india": "0.82",
  "/blog/api-integration-business-systems-guide": "0.82",
  "/blog/custom-crm-software-development-india": "0.81",
  "/blog/custom-software-development-cost-india": "0.78",
  "/blog/generative-ai-business-software-india": "0.79",
  "/blog/flutter-vs-react-native-india-2026": "0.79",
  "/blog/software-company-near-me": "0.79",
  "/solutions/dealership-service-management": "0.84",
}

/** Primary content sources per route — lastmod = latest mtime among these (not “today” on every build). */
const ROUTE_CONTENT_SOURCES = {
  "/": [
    "src/pages/HomePage.tsx",
    "src/data/content.ts",
    "shared/route-meta.mjs",
    "shared/seo-faqs.json",
  ],
  "/about": ["src/pages/AboutPage.tsx", "src/data/content.ts", "shared/route-meta.mjs"],
  "/contact": [
    "src/pages/ContactPage.tsx",
    "src/components/contact/InquiryForm.tsx",
    "shared/route-meta.mjs",
  ],
  "/portfolio": ["src/pages/PortfolioPage.tsx", "src/data/portfolio.ts", "shared/route-meta.mjs"],
  "/pricing": ["src/pages/DealershipPricingPage.tsx", "src/data/dealership-pricing.ts", "shared/route-meta.mjs"],
  "/pricing/ai-automation": [
    "src/pages/AiAutomationPricingPage.tsx",
    "src/data/ai-automation-pricing.ts",
    "shared/route-meta.mjs",
  ],
  "/solutions/dealership-service-management": [
    "src/pages/DealershipSolutionPage.tsx",
    "src/data/dealership-pricing.ts",
    "shared/route-meta.mjs",
  ],
  "/services": [
    "src/pages/ServicesIndexPage.tsx",
    "src/data/content.ts",
    "src/data/service-details.ts",
    "shared/seo-faqs.json",
  ],
  "/services/custom-software": [
    "src/pages/ServicePage.tsx",
    "src/data/service-details.ts",
    "src/components/services/ServiceAnswerBlock.tsx",
  ],
  "/services/mobile-apps": [
    "src/pages/ServicePage.tsx",
    "src/data/service-details.ts",
    "src/components/services/ServiceAnswerBlock.tsx",
  ],
  "/services/ai-automation": [
    "src/pages/ServicePage.tsx",
    "src/data/service-details.ts",
    "src/components/services/ServiceAnswerBlock.tsx",
  ],
  "/services/cloud-api": [
    "src/pages/ServicePage.tsx",
    "src/data/service-details.ts",
    "src/components/services/ServiceAnswerBlock.tsx",
  ],
  "/privacy": ["src/pages/LegalPage.tsx", "shared/route-meta.mjs"],
  "/terms": ["src/pages/LegalPage.tsx", "shared/route-meta.mjs"],
}

function normalizeIsoDate(value) {
  const s = String(value ?? "").trim()
  return ISO_DATE.test(s) ? s : null
}

function maxIsoDate(dates) {
  const valid = dates.map(normalizeIsoDate).filter(Boolean)
  if (!valid.length) return null
  return valid.sort().at(-1)
}

function mtimeIsoDate(relativePath) {
  try {
    return statSync(join(root, relativePath)).mtime.toISOString().slice(0, 10)
  } catch {
    return null
  }
}

function lastmodFromSources(relativePaths) {
  return maxIsoDate(relativePaths.map((p) => mtimeIsoDate(p)))
}

function blogPostLastmod(post) {
  return normalizeIsoDate(post.updated) || normalizeIsoDate(post.published)
}

function lastmodForRoute(loc) {
  if (loc === BLOG_INDEX_PATH) {
    return maxIsoDate(BLOG_POSTS.map(blogPostLastmod))
  }
  if (loc.startsWith("/blog/")) {
    const slug = loc.slice("/blog/".length)
    const post = BLOG_POSTS.find((p) => p.slug === slug)
    return post ? blogPostLastmod(post) : null
  }
  const sources = ROUTE_CONTENT_SOURCES[loc]
  if (!sources?.length) return null
  return lastmodFromSources(sources)
}

function urlEntry(entry) {
  const loc = `${SITE_ORIGIN}${preferredPath(entry.loc)}`
  const lastmod = lastmodForRoute(entry.loc)
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
  const priority = SITEMAP_PRIORITY_OVERRIDE[entry.loc] ?? entry.priority
  return `  <url><loc>${loc}</loc>${lastmodTag}<changefreq>${entry.changefreq}</changefreq><priority>${priority}</priority></url>`
}

const urls = SITEMAP_ENTRIES.map(urlEntry).join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const out = join(root, "public", "sitemap.xml")
writeFileSync(out, xml, "utf8")

const withLastmod = SITEMAP_ENTRIES.filter((e) => lastmodForRoute(e.loc)).length
console.log(
  `Wrote ${out} (${SITEMAP_ENTRIES.length} URLs, ${withLastmod} with lastmod from content dates/mtimes)`,
)
