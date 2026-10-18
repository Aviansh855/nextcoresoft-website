import { ArrowRight, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import type { BlogPost } from "../../data/blog"
import { blogPrimaryServicePath, blogReadingMinutes } from "../../lib/blog-utils"

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

type BlogPostCardProps = {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured }: BlogPostCardProps) {
  const minutes = blogReadingMinutes(post)
  const servicePath = blogPrimaryServicePath(post)

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-slate-50/80 p-6 transition-shadow hover:shadow-md sm:p-8 ${
        featured ? "border-cyan-200/80 ring-1 ring-cyan-100" : "border-slate-200"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500">
        <time dateTime={post.published}>{formatDate(post.published)}</time>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden="true" />
          {minutes} min read
        </span>
        {featured ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-cyan-800 uppercase">
              Latest
            </span>
          </>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {post.categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
          >
            {cat}
          </span>
        ))}
      </div>

      <h2 className="mt-4 font-display text-xl font-semibold text-slate-900 text-balance sm:text-2xl">
        <Link to={`/blog/${post.slug}/`} className="hover:text-cyan-800">
          {post.title}
        </Link>
      </h2>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          to={`/blog/${post.slug}/`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-slate-900"
        >
          Read article
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
        {servicePath ? (
          <Link to={servicePath} className="text-sm font-medium text-slate-500 hover:text-cyan-700">
            Related service →
          </Link>
        ) : null}
      </div>
    </article>
  )
}
