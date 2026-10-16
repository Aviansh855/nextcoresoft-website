import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

/**
 * Resets scroll on real navigations while letting in-page hash links work.
 * About is a page at /about. A leftover #about fragment is replaced so the
 * address bar does not stay on the homepage hash.
 */
export function ScrollToTop() {
  const { pathname, hash, search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname.length > 1 && pathname.endsWith("/")) {
      navigate(
        { pathname: pathname.replace(/\/+$/, ""), search, hash },
        { replace: true },
      )
      return
    }
    if (hash === "#about") {
      navigate("/about", { replace: true })
      return
    }
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, search, navigate])

  return null
}
