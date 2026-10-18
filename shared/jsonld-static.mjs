import { SITE } from "./site.mjs"
import { logoImageObject } from "./jsonld-graph.mjs"

const ORG_ID = `${SITE.url}/#organization`

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: logoImageObject(),
    description: SITE.description,
    email: "hello@nextcoresoft.com",
    knowsAbout: [
      "Custom software development",
      "Web application development",
      "Business website development",
      "Android app development",
      "iOS app development",
      "AI workflow automation",
      "API integration",
      "Cloud software deployment",
    ],
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
      description:
        "Remote delivery; consult via video and email. No public storefront address listed on this site.",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@nextcoresoft.com",
        url: `${SITE.url}/contact/`,
        availableLanguage: ["English"],
      },
    ],
    ...(Array.isArray(SITE.sameAs) && SITE.sameAs.length
      ? { sameAs: SITE.sameAs.filter((u) => typeof u === "string" && u.startsWith("https://")) }
      : {}),
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  }
}
