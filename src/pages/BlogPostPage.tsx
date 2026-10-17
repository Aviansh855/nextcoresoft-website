import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { BlogArticleBody } from "../components/blog/BlogArticleBody"
import { BlogRelatedPosts } from "../components/blog/BlogRelatedPosts"
import { ServiceFaq } from "../components/services/ServiceFaq"
import { Breadcrumbs } from "../components/seo/Breadcrumbs"
import { JsonLd } from "../components/seo/JsonLd"
import { ButtonLink } from "../components/ui/Button"
import { Reveal } from "../components/ui/Reveal"
import { BLOG_INDEX_PATH, getBlogPost } from "../data/blog"
import { blogPrimaryServicePath, blogReadingMinutes } from "../lib/blog-utils"
import {
  applyMeta,
  articleSchema,
  blogPostMeta,
  breadcrumbSchema,
  faqPageSchemaFromItems,
  webPageSchema,
} from "../lib/seo"
import { NotFoundPage } from "./NotFoundPage"

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined

  useEffect(() => {
    if (!post) return
    const meta = blogPostMeta(post.slug)
    if (meta) applyMeta(meta)
  }, [post])

  if (!post) return <NotFoundPage />

  const meta = blogPostMeta(post.slug)!
  const faqSchema = faqPageSchemaFromItems(post.faqs)
  const readMinutes = blogReadingMinutes(post)
  const servicePath = blogPrimaryServicePath(post)

  return (
    <>
      <JsonLd id="jsonld-article-webpage" data={webPageSchema(meta)} />
      <JsonLd id="jsonld-article" data={articleSchema(post.slug)} />
      {faqSchema ? <JsonLd id="jsonld-article-faq" data={faqSchema} /> : null}
      <JsonLd
        id="jsonld-article-breadcrumbs"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: BLOG_INDEX_PATH },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Blog", to: BLOG_INDEX_PATH },
            { label: post.title },
          ]}
        />

        <Reveal>
          <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-cyan-600 uppercase">NextCoreSoft blog</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance sm:text-5xl">
            {post.h1}
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Published{" "}
            <time dateTime={post.published}>{formatDate(post.published)}</time>
            {post.updated !== post.published && (
              <>
                {" "}
                · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            )}
            {" · "}
            {post.categories.join(", ")}
            {" · ~"}
            {readMinutes} min read
          </p>
          {"author" in post && post.author ? (
            <p className="mt-2 text-sm text-slate-500">By {post.author}</p>
          ) : null}
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
          {"editorialDisclaimer" in post && post.editorialDisclaimer ? (
            <p className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-xs leading-relaxed text-amber-950">
              {post.editorialDisclaimer}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.04}>
          <BlogArticleBody sections={post.sections} />
        </Reveal>

        <Reveal delay={0.06}>
          <BlogRelatedPosts current={post} />
        </Reveal>

        <Reveal delay={0.07}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Next steps on this site</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {servicePath ? (
                <li>
                  <Link to={servicePath} className="text-cyan-700 hover:underline">
                    Related service page
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to="/services" className="text-cyan-700 hover:underline">
                  All software development services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-cyan-700 hover:underline">
                  Project portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cyan-700 hover:underline">
                  Contact / free consultation
                </Link>
              </li>
            </ul>
            <ButtonLink to="/contact?intent=quote" className="mt-6">
              Discuss Your Project
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ServiceFaq faqs={post.faqs} serviceTitle={post.categories[0] ?? "Article"} />
        </Reveal>

        <p className="mt-10 text-sm">
          <Link to={BLOG_INDEX_PATH} className="font-semibold text-cyan-700 hover:underline">
            ← All blog posts
          </Link>
        </p>
      </article>
    </>
  )
}
