import type { ReactNode } from "react"
import { Route } from "react-router-dom"
import { BlogIndexPage } from "../pages/BlogIndexPage"
import { BlogPostPage } from "../pages/BlogPostPage"
import { AboutPage } from "../pages/AboutPage"
import { ContactPage } from "../pages/ContactPage"
import { HomePage } from "../pages/HomePage"
import { LegalPage } from "../pages/LegalPage"
import { NotFoundPage } from "../pages/NotFoundPage"
import { PortfolioPage } from "../pages/PortfolioPage"
import { ServicePage } from "../pages/ServicePage"
import { ServicesIndexPage } from "../pages/ServicesIndexPage"
import { AiAutomationPricingPage } from "../pages/AiAutomationPricingPage"
import { DealershipPricingPage } from "../pages/DealershipPricingPage"
import { DealershipSolutionPage } from "../pages/DealershipSolutionPage"
import { HowWeWorkPage } from "../pages/HowWeWorkPage"
import { EngagementModelsPage } from "../pages/EngagementModelsPage"

/** Each indexable path and its trailing-slash alias — must stay direct `<Route>` children of `<Routes>`. */
function pathWithTrailingSlash(path: string, element: ReactNode) {
  if (path === "/") {
    return [<Route key="/" path="/" element={element} />]
  }
  return [
    <Route key={path} path={path} element={element} />,
    <Route key={`${path}/`} path={`${path}/`} element={element} />,
  ]
}

/**
 * Flat list of Route elements for App.tsx.
 * Do not wrap in a custom component and render inside `<Routes>` — React Router requires
 * Route (or Fragment of Routes) as direct children only.
 */
export function createAppRouteElements() {
  return [
    ...pathWithTrailingSlash("/", <HomePage />),
    ...pathWithTrailingSlash("/about", <AboutPage />),
    ...pathWithTrailingSlash("/contact", <ContactPage />),
    ...pathWithTrailingSlash("/portfolio", <PortfolioPage />),
    <Route key="/blog/:slug" path="/blog/:slug" element={<BlogPostPage />} />,
    <Route key="/blog/:slug/" path="/blog/:slug/" element={<BlogPostPage />} />,
    ...pathWithTrailingSlash("/blog", <BlogIndexPage />),
    <Route key="/services/:slug" path="/services/:slug" element={<ServicePage />} />,
    <Route key="/services/:slug/" path="/services/:slug/" element={<ServicePage />} />,
    ...pathWithTrailingSlash("/services", <ServicesIndexPage />),
    ...pathWithTrailingSlash("/how-we-work", <HowWeWorkPage />),
    ...pathWithTrailingSlash("/engagement-models", <EngagementModelsPage />),
    ...pathWithTrailingSlash("/pricing", <DealershipPricingPage />),
    ...pathWithTrailingSlash("/pricing/ai-automation", <AiAutomationPricingPage />),
    ...pathWithTrailingSlash("/solutions/dealership-service-management", <DealershipSolutionPage />),
    ...pathWithTrailingSlash("/privacy", <LegalPage kind="privacy" />),
    ...pathWithTrailingSlash("/terms", <LegalPage kind="terms" />),
    <Route key="*" path="*" element={<NotFoundPage />} />,
  ]
}
