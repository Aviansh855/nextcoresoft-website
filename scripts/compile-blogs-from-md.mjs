/**
 * Builds shared/blog-posts.json from content/nextcoresoft_3_seo_blog_posts.md
 * Run: node scripts/compile-blogs-from-md.mjs
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { SITE_ORIGIN } from "../shared/indexable-paths.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/** Internal markdown targets → https://nextcoresoft.com/... (never localhost). */
function normalizeMarkdownLinks(text) {
  if (!text || typeof text !== "string") return text
  let out = text.replace(
    /\]\(https?:\/\/localhost(?::\d+)?([^)]*)\)/gi,
    `](${SITE_ORIGIN}$1)`,
  )
  out = out.replace(/\]\((\/[^)]+)\)/g, `](${SITE_ORIGIN}$1)`)
  return out
}

function normalizeSiteHref(href) {
  if (!href) return href
  if (/^https?:\/\/localhost(?::\d+)?/i.test(href)) {
    try {
      const u = new URL(href)
      return `${SITE_ORIGIN}${u.pathname}${u.search}${u.hash}`
    } catch {
      return SITE_ORIGIN
    }
  }
  if (href.startsWith("/")) return `${SITE_ORIGIN}${href}`
  if (/^https?:\/\/(www\.)?nextcoresoft\.com/i.test(href)) {
    try {
      const u = new URL(href)
      return `${SITE_ORIGIN}${u.pathname}${u.search}${u.hash}`
    } catch {
      return href
    }
  }
  return href
}

function normalizeSection(section) {
  const s = { ...section }
  if (s.text) s.text = normalizeMarkdownLinks(s.text)
  if (s.items) s.items = s.items.map((item) => normalizeMarkdownLinks(item))
  if (s.rows) {
    s.rows = s.rows.map((row) => row.map((cell) => normalizeMarkdownLinks(cell)))
  }
  if (s.href) s.href = normalizeSiteHref(s.href)
  return s
}
const outPath = join(root, "shared", "blog-posts.json")

/** Each file lists its blog markers in order (must match `# Blog N —` headings in that file). */
const BLOG_SOURCES = [
  {
    mdPath: join(root, "content", "nextcoresoft_3_seo_blog_posts.md"),
    endMarker: "\n# Implementation notes",
    metas: [
      {
        marker: "# Blog 1 —",
        primaryService: "custom-software",
        categories: ["Custom software", "Pricing", "India"],
        published: "2026-10-17",
      },
      {
        marker: "# Blog 2 —",
        primaryService: "mobile-apps",
        categories: ["Mobile apps", "Pricing", "India"],
        published: "2026-10-17",
      },
      {
        marker: "# Blog 3 —",
        primaryService: "custom-software",
        categories: ["Product strategy", "MVP"],
        published: "2026-10-17",
      },
    ],
  },
  {
    mdPath: join(root, "content", "nextcoresoft_seo_blog_posts_batch2.md"),
    endMarker: null,
    metas: [
      {
        marker: "# Blog 4 —",
        primaryService: "ai-automation",
        categories: ["AI automation", "India", "Operations"],
        published: "2026-10-18",
      },
      {
        marker: "# Blog 5 —",
        primaryService: "custom-software",
        categories: ["Hiring", "India", "Custom software"],
        published: "2026-10-18",
      },
      {
        marker: "# Blog 6 —",
        primaryService: "mobile-apps",
        categories: ["Web apps", "Mobile apps", "Strategy"],
        published: "2026-10-18",
      },
      {
        marker: "# Blog 7 —",
        primaryService: "cloud-api",
        categories: ["APIs", "Integrations", "Cloud"],
        published: "2026-10-18",
      },
      {
        marker: "# Blog 8 —",
        primaryService: "custom-software",
        categories: ["Jaipur", "Custom software", "India"],
        published: "2026-10-21",
      },
      {
        marker: "# Blog 9 —",
        primaryService: "custom-software",
        categories: ["Local SEO", "Custom software", "India"],
        published: "2026-10-21",
      },
      {
        marker: "# Blog 10 —",
        primaryService: "ai-automation",
        categories: ["Generative AI", "India", "Custom software"],
        published: "2026-10-21",
      },
      {
        marker: "# Blog 11 —",
        primaryService: "mobile-apps",
        categories: ["Flutter", "React Native", "India"],
        published: "2026-10-21",
      },
      {
        marker: "# Blog 12 —",
        primaryService: "custom-software",
        categories: ["CRM", "Custom software", "India"],
        published: "2026-10-21",
      },
      {
        marker: "# Blog 13 —",
        primaryService: "custom-software",
        categories: ["Low-code", "Strategy", "India"],
        published: "2026-10-21",
      },
    ],
  },
]

const EDITORIAL_DISCLAIMER =
  "Indicative planning ranges for India in 2026 — not binding quotations or NextCoreSoft's official price list. Final estimates require a scoped brief."

function slugFromUrl(urlLine) {
  const m = urlLine.match(/\/blog\/([^/`]+)/)
  if (!m) throw new Error(`Could not parse slug from: ${urlLine}`)
  return m[1]
}

function parseSeoBlock(block) {
  const get = (key) => {
    const backtick = new RegExp(`\\*\\*${key}:\\*\\*\\s*\`([^\`]+)\``, "i")
    const plain = new RegExp(`\\*\\*${key}:\\*\\*\\s*(.+)$`, "im")
    return block.match(backtick)?.[1]?.trim() ?? block.match(plain)?.[1]?.trim() ?? null
  }
  const url = get("Suggested URL")
  if (!url) throw new Error("Missing Suggested URL in SEO block")
  return {
    slug: slugFromUrl(url),
    seoTitle: get("SEO title"),
    metaDescription: get("Meta description"),
    primaryKeyword: get("Primary keyword"),
    author: get("Suggested author label") ?? "NextCoreSoft Editorial Team",
  }
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

function parseTableLines(lines) {
  if (lines.length < 2) return null
  const splitRow = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())
  const headers = splitRow(lines[0])
  const sep = lines[1]
  if (!/^\|[\s\-:|]+\|$/.test(sep.trim())) return null
  const rows = lines.slice(2).map(splitRow).filter((r) => r.some(Boolean))
  return { type: "table", headers, rows }
}

function parseBodyToSections(body, faqs) {
  const sections = []
  const lines = body.split("\n")
  let i = 0
  let ulBuffer = []
  let olBuffer = []
  let inFaq = false

  const flushUl = () => {
    if (ulBuffer.length) {
      sections.push({ type: "ul", items: [...ulBuffer] })
      ulBuffer = []
    }
  }
  const flushOl = () => {
    if (olBuffer.length) {
      sections.push({ type: "ol", items: [...olBuffer] })
      olBuffer = []
    }
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith("## Frequently asked questions")) {
      flushUl()
      flushOl()
      inFaq = true
      i++
      continue
    }

    if (inFaq) {
      if (trimmed.startsWith("## ") && !trimmed.startsWith("###")) {
        inFaq = false
        /* fall through to process as h2 */
      } else if (trimmed.startsWith("### ")) {
        const q = trimmed.replace(/^###\s+\d+\.\s*/, "").trim()
        i++
        const answerLines = []
        while (i < lines.length) {
          const t = lines[i].trim()
          if (t.startsWith("### ") || (t.startsWith("## ") && !t.startsWith("###"))) break
          if (t) answerLines.push(t)
          i++
        }
        faqs.push({ question: q, answer: answerLines.join(" ") })
        continue
      } else {
        i++
        continue
      }
    }

    if (trimmed.startsWith("|")) {
      flushUl()
      flushOl()
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      const table = parseTableLines(tableLines)
      if (table) sections.push(table)
      continue
    }

    if (trimmed.startsWith("## ")) {
      flushUl()
      flushOl()
      const text = trimmed.slice(3).trim()
      sections.push({ type: "h2", text, id: slugifyHeading(text) })
      i++
      continue
    }

    if (trimmed.startsWith("### ")) {
      flushUl()
      flushOl()
      sections.push({ type: "h3", text: trimmed.slice(4).trim() })
      i++
      continue
    }

    if (/^-\s+/.test(trimmed)) {
      flushOl()
      ulBuffer.push(trimmed.replace(/^-\s+/, ""))
      i++
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushUl()
      olBuffer.push(trimmed.replace(/^\d+\.\s+/, ""))
      i++
      continue
    }

    if (!trimmed || trimmed === "---") {
      flushUl()
      flushOl()
      i++
      continue
    }

    if (trimmed.startsWith("**[") && trimmed.includes("](http")) {
      flushUl()
      flushOl()
      const m = trimmed.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/)
      if (m) {
        sections.push({
          type: "cta",
          text: "",
          buttonLabel: m[1],
          href: normalizeSiteHref(m[2]),
        })
      }
      i++
      continue
    }

    if (trimmed.startsWith("**Quick answer:**")) {
      flushUl()
      flushOl()
      sections.push({
        type: "p",
        text: trimmed,
        lead: true,
      })
      i++
      continue
    }

    flushUl()
    flushOl()
    const paraLines = [trimmed]
    i++
    while (i < lines.length) {
      const t = lines[i].trim()
      if (
        !t ||
        t.startsWith("#") ||
        t.startsWith("|") ||
        t.startsWith("- ") ||
        /^\d+\.\s+/.test(t) ||
        (t.startsWith("**[") && t.includes("]("))
      ) {
        break
      }
      paraLines.push(t)
      i++
    }
    sections.push({ type: "p", text: paraLines.join(" ") })
  }

  flushUl()
  flushOl()
  return sections
}

function extractArticle(chunk, metaDefaults) {
  const seoStart = chunk.indexOf("## SEO publishing details")
  if (seoStart === -1) throw new Error("Missing SEO block")
  const afterSeo = chunk.indexOf("\n---\n", seoStart)
  const seoBlock = chunk.slice(seoStart, afterSeo)
  const seo = parseSeoBlock(seoBlock)

  const bodyStart = chunk.indexOf("\n## ", afterSeo + 1)
  let body = chunk.slice(bodyStart + 1).trim()

  const implIdx = body.indexOf("\n# Implementation notes")
  if (implIdx !== -1) body = body.slice(0, implIdx).trim()

  const titleMatch = body.match(/^## (.+)\n/m)
  if (!titleMatch) throw new Error(`Missing article H2 title for ${seo.slug}`)
  const h1 = titleMatch[1].trim()
  const title = h1
  body = body.slice(titleMatch.index + titleMatch[0].length).trim()

  const faqs = []
  const sections = parseBodyToSections(body, faqs)

  const excerpt =
    sections.find((s) => s.type === "p" && s.lead)?.text?.replace(/^\*\*Quick answer:\*\*\s*/, "").slice(0, 220) ??
    seo.metaDescription

  const ctaSection = sections.find((s) => s.type === "cta")
  const sectionsNoCta = sections.filter((s) => s.type !== "cta")
  if (ctaSection) {
    const preCta = sectionsNoCta.filter((s, idx, arr) => {
      const ctaIdx = sections.indexOf(ctaSection)
      return sections.indexOf(s) < ctaIdx
    })
    const lastP = [...preCta].reverse().find((s) => s.type === "p")
    if (lastP && !ctaSection.text) {
      ctaSection.text = lastP.text
      const removeIdx = sectionsNoCta.lastIndexOf(lastP)
      if (removeIdx !== -1) sectionsNoCta.splice(removeIdx, 1)
    }
    sectionsNoCta.push(ctaSection)
  }

  return {
    slug: seo.slug,
    title,
    h1,
    seoTitle: seo.seoTitle ?? title,
    metaDescription: seo.metaDescription ?? excerpt,
    excerpt: `${excerpt}${excerpt.length >= 220 ? "…" : ""}`,
    published: metaDefaults.published,
    updated: metaDefaults.published,
    author: seo.author,
    editorialDisclaimer: EDITORIAL_DISCLAIMER,
    primaryService: metaDefaults.primaryService,
    categories: metaDefaults.categories,
    primaryKeyword: seo.primaryKeyword,
    sections: sectionsNoCta.map(({ id, lead, ...rest }) => {
      const s = normalizeSection({ ...rest })
      if (lead) s.lead = true
      if (id) s.id = id
      return s
    }),
    faqs,
  }
}

const posts = []
for (const source of BLOG_SOURCES) {
  const md = readFileSync(source.mdPath, "utf8")
  for (const meta of source.metas) {
    const start = md.indexOf(meta.marker)
    if (start === -1) throw new Error(`Missing ${meta.marker} in ${source.mdPath}`)
    const nextBlog = md.indexOf("\n# Blog ", start + meta.marker.length)
    let end = nextBlog === -1 ? md.length : nextBlog
    if (nextBlog === -1 && source.endMarker) {
      const impl = md.indexOf(source.endMarker)
      if (impl !== -1) end = impl
    }
    const chunk = md.slice(start, end)
    posts.push(extractArticle(chunk, meta))
  }
}

writeFileSync(outPath, `${JSON.stringify(posts, null, 2)}\n`, "utf8")

const indexMjsPath = join(root, "shared", "blog-index.mjs")
const slugs = posts.map((p) => p.slug)
const indexMjs = `/**
 * Blog URL helpers for sitemap + Cloudflare Pages middleware (no JSON import).
 * Generated by scripts/compile-blogs-from-md.mjs — do not edit by hand.
 */
export const BLOG_INDEX_PATH = "/blog"

export const BLOG_POST_SLUGS = ${JSON.stringify(slugs, null, 2)}

export function blogPostIndexablePaths() {
  return BLOG_POST_SLUGS.map((slug) => \`/blog/\${slug}\`)
}

export function blogSitemapEntries() {
  return [
    { loc: BLOG_INDEX_PATH, changefreq: "weekly", priority: "0.75" },
    ...BLOG_POST_SLUGS.map((slug) => ({
      loc: \`/blog/\${slug}\`,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ]
}
`
writeFileSync(indexMjsPath, indexMjs, "utf8")

console.log(`Wrote ${outPath} (${posts.length} posts from MD source).`)
console.log(`Wrote ${indexMjsPath}.`)
