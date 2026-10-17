import type { BlogPost } from "../data/blog"

const WORDS_PER_MINUTE = 220

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function blogPostWordCount(post: BlogPost) {
  let total = wordCount(post.excerpt)
  for (const block of post.sections) {
    if ((block.type === "p" || block.type === "h2") && block.text) total += wordCount(block.text)
    if ((block.type === "ul" || block.type === "ol") && block.items) {
      for (const item of block.items) total += wordCount(item)
    }
    if (block.type === "table" && block.headers && block.rows) {
      for (const h of block.headers) total += wordCount(h)
      for (const row of block.rows) for (const cell of row) total += wordCount(cell)
    }
  }
  for (const faq of post.faqs) {
    total += wordCount(faq.question) + wordCount(faq.answer)
  }
  return total
}

export function blogReadingMinutes(post: BlogPost) {
  return Math.max(1, Math.round(blogPostWordCount(post) / WORDS_PER_MINUTE))
}

export function sortBlogPostsNewestFirst(posts: readonly BlogPost[]) {
  return [...posts].sort((a, b) => {
    const dateCompare = b.published.localeCompare(a.published)
    if (dateCompare !== 0) return dateCompare
    return b.updated.localeCompare(a.updated)
  })
}

export function blogCategories(posts: readonly BlogPost[]) {
  const set = new Set<string>()
  for (const post of posts) {
    for (const cat of post.categories) set.add(cat)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

const SERVICE_BY_SLUG = {
  "custom-software": "/services/custom-software",
  "mobile-apps": "/services/mobile-apps",
  "ai-automation": "/services/ai-automation",
  "cloud-api": "/services/cloud-api",
} as const

export type BlogPrimaryService = keyof typeof SERVICE_BY_SLUG

export function blogPrimaryServicePath(post: BlogPost): string | null {
  if (!("primaryService" in post) || !post.primaryService) return null
  const slug = post.primaryService
  if (!(slug in SERVICE_BY_SLUG)) return null
  return SERVICE_BY_SLUG[slug as BlogPrimaryService]
}
