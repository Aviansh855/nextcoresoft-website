import posts from "../../shared/blog-posts.json"

export type BlogPost = (typeof posts)[number]
export type BlogSection = BlogPost["sections"][number]
export type BlogFaq = BlogPost["faqs"][number]

export const BLOG_INDEX_PATH = "/blog"
export const BLOG_POSTS: readonly BlogPost[] = posts

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
