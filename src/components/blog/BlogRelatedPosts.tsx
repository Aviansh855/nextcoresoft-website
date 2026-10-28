import { Link } from "react-router-dom"
import { BLOG_POSTS, type BlogPost } from "../../data/blog"
import { sortBlogPostsNewestFirst } from "../../lib/blog-utils"

export function BlogRelatedPosts({ current, limit = 3 }: { current: BlogPost; limit?: number }) {
  const sorted = sortBlogPostsNewestFirst(BLOG_POSTS).filter((p) => p.slug !== current.slug)
  let picks = sorted.filter((p) => p.categories.some((c) => current.categories.includes(c))).slice(0, limit)
  if (picks.length < limit) {
    const seen = new Set([current.slug, ...picks.map((p) => p.slug)])
    for (const p of sorted) {
      if (picks.length >= limit) break
      if (seen.has(p.slug)) continue
      picks = [...picks, p]
      seen.add(p.slug)
    }
  }

  if (picks.length === 0) return null

  return (
    <section className="mt-12" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className="font-display text-lg font-semibold text-slate-900">
        Related articles
      </h2>
      <ul className="mt-4 space-y-3">
        {picks.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}/`} className="text-sm font-medium text-cyan-700 hover:underline sm:text-base">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
