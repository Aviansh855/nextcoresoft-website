import { useEffect } from "react"

interface JsonLdProps {
  /** Stable id for this script tag (replaced on route change). */
  id: string
  data: Record<string, unknown> | Record<string, unknown>[] | null
}

/** Injects JSON-LD into document.head; removed on unmount or when data changes. */
export function JsonLd({ id, data }: JsonLdProps) {
  const payload = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (!payload) return

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = id
    script.text = payload
    document.head.appendChild(script)

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [id, payload])

  return null
}
