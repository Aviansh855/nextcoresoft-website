/**
 * Ensures static JSON-LD (shared/jsonld-static.mjs) matches site.json fields used in React seo.ts.
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { organizationJsonLd, websiteJsonLd } from "../shared/jsonld-static.mjs"
import site from "../shared/site.json" with { type: "json" }

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const seoTs = readFileSync(join(root, "src", "lib", "seo.ts"), "utf8")

const org = organizationJsonLd()
const web = websiteJsonLd()

if (org.name !== site.name || org.description !== site.description) {
  console.error("organizationJsonLd() drifts from shared/site.json — sync jsonld-static.mjs and seo.ts organizationSchema().")
  process.exit(1)
}

if (web.description !== site.description || web.name !== site.name) {
  console.error("websiteJsonLd() drifts from shared/site.json.")
  process.exit(1)
}

if (!seoTs.includes("knowsAbout") || !seoTs.includes("AI workflow automation")) {
  console.error("src/lib/seo.ts organizationSchema must include knowsAbout — keep in sync with jsonld-static.mjs")
  process.exit(1)
}

console.log("JSON-LD / site.json sync OK.")
