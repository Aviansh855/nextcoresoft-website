import { Route, Routes } from "react-router-dom"
import { TrailingSlashRedirectRoutes } from "./components/routing/TrailingSlashRedirects"
import { Analytics } from "./components/seo/Analytics"
import { BackToTop } from "./components/layout/BackToTop"
import { Footer } from "./components/layout/Footer"
import { Navbar } from "./components/layout/Navbar"
import { ScrollToTop } from "./components/layout/ScrollToTop"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { HomePage } from "./pages/HomePage"
import { LegalPage } from "./pages/LegalPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { PortfolioPage } from "./pages/PortfolioPage"
import { ServicePage } from "./pages/ServicePage"

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <TrailingSlashRedirectRoutes />
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </>
  )
}
