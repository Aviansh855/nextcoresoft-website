import { ArrowRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { BlogPostCard } from "../components/blog/BlogPostCard"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { BLOG_POSTS } from "../data/blog"
import { BLOG_HUB_FAQS } from "../data/content"
import { blogCategories, sortBlogPostsNewestFirst } from "../lib/blog-utils"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const sorted = useMemo(() => sortBlogPostsNewestFirst(BLOG_POSTS), [])
  const categories = useMemo(() => blogCategories(BLOG_POSTS), [])

  const filtered = useMemo(() => {
    if (activeCategory === "All") return sorted
    return sorted.filter((post) => post.categories.includes(activeCategory))
  }, [sorted, activeCategory])

  const latestSlug = sorted[0]?.slug

  useEffect(() => {
    applyMeta(ROUTE_SEO.blog)
  }, [])

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-5 pt-32 pb-24 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />

        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">Blog</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            Insights on software, automation, and growing operations
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Practical articles for business owners and operations teams — custom software, mobile apps, pricing, AI
            workflow automation, and hiring a development partner. Written for search and answer engines; we do not
            guarantee rankings.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            {BLOG_POSTS.length} articles · Updated regularly ·{" "}
            <Link to="/services/" className="font-medium text-cyan-700 hover:underline">
              Service overview
            </Link>
          </p>
        </Reveal>

        <Reveal delay={0.03}>
          <nav className="mt-10 flex flex-wrap gap-2" aria-label="Filter posts by topic">
            {["All", ...categories].map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              )
            })}
          </nav>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-12 text-slate-600">No posts in this topic yet.</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {filtered.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.04} className="h-full">
                <li className="h-full list-none">
                  <BlogPostCard post={post} featured={post.slug === latestSlug && activeCategory === "All"} />
                </li>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal>
          <section className="mt-16 border-t border-slate-200 pt-12" aria-labelledby="blog-hub-faq-heading">
            <h2 id="blog-hub-faq-heading" className="font-display text-2xl font-semibold text-slate-900">
              About this blog
            </h2>
            <ul className="mt-8 space-y-8">
              {BLOG_HUB_FAQS.map((faq) => (
                <li key={faq.question}>
                  <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="featured-guides-heading">
            <h2 id="featured-guides-heading" className="font-display text-lg font-semibold text-slate-900">
              Featured guides
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 sm:text-base">
              <li>
                <Link to="/blog/software-company-near-me/" className="font-medium text-cyan-700 hover:underline">
                  What “software company near me” really means
                </Link>
              </li>
              <li>
                <Link to="/blog/generative-ai-business-software-india/" className="font-medium text-cyan-700 hover:underline">
                  Generative AI in business software (India)
                </Link>
              </li>
              <li>
                <Link to="/blog/flutter-vs-react-native-india-2026/" className="font-medium text-cyan-700 hover:underline">
                  Flutter vs React Native for India app projects
                </Link>
              </li>
              <li>
                <Link to="/pricing/" className="font-medium text-cyan-700 hover:underline">
                  Dealership service management pricing
                </Link>
                {" · "}
                <Link to="/solutions/dealership-service-management/" className="font-medium text-cyan-700 hover:underline">
                  Product overview
                </Link>
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-slate-900">Ready to scope a project?</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Mention an article or service on the{" "}
              <Link to="/contact/" className="font-medium text-cyan-700 hover:underline">
                contact form
              </Link>{" "}
              — custom software,{" "}
              <Link to="/services/mobile-apps/" className="font-medium text-cyan-700 hover:underline">
                mobile apps
              </Link>
              , or{" "}
              <Link to="/services/ai-automation/" className="font-medium text-cyan-700 hover:underline">
                AI automation
              </Link>
              .
            </p>
            <ButtonLink to="/contact/?intent=quote" className="mt-6">
              Request a Quote
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  )
}
