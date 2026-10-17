/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** HTTPS endpoint that receives inquiry form JSON, e.g. a Formspree form URL. */
  readonly VITE_FORM_ENDPOINT?: string
  /** Domain registered with Plausible analytics. Omit to disable analytics entirely. */
  readonly VITE_PLAUSIBLE_DOMAIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

