import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ButtonLink } from "../components/ui/Button"
import { applyMeta, ROUTE_SEO } from "../lib/seo"

export function NotFoundPage() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyMeta({
      ...ROUTE_SEO.notFound,
      path: pathname,
    })
  }, [pathname])

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center px-5 pt-24 sm:px-8">
      <p className="font-display text-sm font-semibold tracking-[0.22em] text-cyan-600 uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
        This page isn&apos;t here.
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600">
        The link may be outdated, or the page may have moved. The work, however, is all on the homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </section>
  )
}
