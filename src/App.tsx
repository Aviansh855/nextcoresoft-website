import { Route, Routes } from "react-router-dom"
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
import { ServicePage } from "./pages/ServicePage"

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
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
