import { Routes } from "react-router-dom"
import { Analytics } from "./components/seo/Analytics"
import { BackToTop } from "./components/layout/BackToTop"
import { Footer } from "./components/layout/Footer"
import { Navbar } from "./components/layout/Navbar"
import { ScrollToTop } from "./components/layout/ScrollToTop"
import { createAppRouteElements } from "./routes/appRoutes"

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
        <Routes>{createAppRouteElements()}</Routes>
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </>
  )
}
