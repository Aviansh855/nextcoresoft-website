/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Domain registered with Plausible analytics. Omit to disable analytics entirely. */
  readonly VITE_PLAUSIBLE_DOMAIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

