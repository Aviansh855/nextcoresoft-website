import { Routes } from "react-router-dom"
import { Analytics } from "./components/seo/Analytics"
import { RouteJsonLd } from "./components/seo/RouteJsonLd"
import { BackToTop } from "./components/layout/BackToTop"
import { Footer } from "./components/layout/Footer"
import { Navbar } from "./components/layout/Navbar"
import { ScrollToTop } from "./components/layout/ScrollToTop"
import { createAppRouteElements } from "./routes/appRoutes"
import { AuthProvider } from "./auth/AuthProvider"

export default function App() {
  return (
    <AuthProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <RouteJsonLd />
      <Navbar />
      <main id="main">
        <Routes>{createAppRouteElements()}</Routes>
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </AuthProvider>
  )
}
