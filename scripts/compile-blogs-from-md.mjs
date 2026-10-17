/**
 * Builds shared/blog-posts.json from content/nextcoresoft_3_seo_blog_posts.md
 * Run: node scripts/compile-blogs-from-md.mjs
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const mdPath = join(root, "content", "nextcoresoft_3_seo_blog_posts.md")
const outPath = join(root, "shared", "blog-posts.json")

const md = readFileSync(mdPath, "utf8")

const EDITORIAL_DISCLAIMER =
  "Indicative planning ranges for India in 2026 — not binding quotations or NextCoreSoft's official price list. Final estimates require a scoped brief."

const BLOG_META = [
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
]

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
          href: m[2].replace("https://nextcoresoft.com", ""),
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
      const s = { ...rest }
      if (lead) s.lead = true
      if (id) s.id = id
      return s
    }),
    faqs,
  }
}

const posts = []
for (const meta of BLOG_META) {
  const start = md.indexOf(meta.marker)
  if (start === -1) throw new Error(`Missing ${meta.marker}`)
  const nextBlog = md.indexOf("\n# Blog ", start + meta.marker.length)
  const end = nextBlog === -1 ? md.indexOf("\n# Implementation notes") : nextBlog
  const chunk = md.slice(start, end)
  posts.push(extractArticle(chunk, meta))
}

writeFileSync(outPath, `${JSON.stringify(posts, null, 2)}\n`, "utf8")
console.log(`Wrote ${outPath} (${posts.length} posts from MD source).`)
