/** Client-side mirror of shared/indexable-paths.mjs (keep in sync). */
const INDEXABLE = new Set([
  "/",
  "/about",
  "/contact",
  "/portfolio",
  "/blog",
  "/blog/custom-software-development-cost-india",
  "/blog/mobile-app-development-cost-india",
  "/blog/mvp-vs-full-product",
  "/blog/ai-automation-small-business-india",
  "/blog/hire-custom-software-development-company-india",
  "/blog/web-app-vs-mobile-app-for-business",
  "/blog/api-integration-business-systems-guide",
  "/blog/software-development-company-jaipur",
  "/blog/software-company-near-me",
  "/blog/generative-ai-business-software-india",
  "/blog/flutter-vs-react-native-india-2026",
  "/blog/custom-crm-software-development-india",
  "/blog/low-code-vs-custom-software-india",
  "/services",
  "/services/custom-software",
  "/services/mobile-apps",
  "/services/ai-automation",
  "/services/cloud-api",
  "/pricing",
  "/pricing/ai-automation",
  "/solutions/dealership-service-management",
  "/privacy",
  "/terms",
])

function normalizePathname(pathname: string): string {
  let path = pathname.split("?")[0].split("#")[0]
  if (!path.startsWith("/")) path = `/${path}`
  path = path.replace(/\/+/g, "/")
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path || "/"
}

export function preferredTrailingSlashPath(pathname: string): string | null {
  const norm = normalizePathname(pathname)
  if (!INDEXABLE.has(norm) || norm === "/") return null
  if (pathname.endsWith("/")) return null
  return `${norm}/`
}
