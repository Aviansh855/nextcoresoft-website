import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import { ORGANIZATION_SCHEMA } from "./lib/seo"
import "./index.css"

const schema = document.createElement("script")
schema.type = "application/ld+json"
schema.text = JSON.stringify(ORGANIZATION_SCHEMA)
document.head.appendChild(schema)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
