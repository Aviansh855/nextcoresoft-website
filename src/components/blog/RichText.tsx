import { isOnSiteHref, siteAbsoluteUrl } from "../../lib/site-url"

/** http(s) absolute URLs only; site-relative paths use isOnSiteHref separately. */
function safeExternalHref(href: string): string | null {
  const trimmed = href.trim()
  if (!trimmed || isOnSiteHref(trimmed)) return null
  try {
    const u = new URL(trimmed)
    if (u.protocol === "https:" || u.protocol === "http:") return u.href
  } catch {
    /* not an absolute URL */
  }
  return null
}

type Segment =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "link"; label: string; href: string }

/** Safe inline **bold** and [label](https://...) or site-relative /paths. */
export function parseRichText(input: string): Segment[] {
  const segments: Segment[] = []
  let i = 0
  while (i < input.length) {
    if (input.startsWith("**", i)) {
      const end = input.indexOf("**", i + 2)
      if (end !== -1) {
        segments.push({ kind: "bold", value: input.slice(i + 2, end) })
        i = end + 2
        continue
      }
    }
    const linkMatch = input.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      segments.push({ kind: "link", label: linkMatch[1], href: linkMatch[2] })
      i += linkMatch[0].length
      continue
    }
    const nextSpecial = (() => {
      const a = input.indexOf("**", i)
      const b = input.indexOf("[", i)
      if (a === -1) return b
      if (b === -1) return a
      return Math.min(a, b)
    })()
    const end = nextSpecial === -1 ? input.length : nextSpecial
    if (end > i) segments.push({ kind: "text", value: input.slice(i, end) })
    i = end === i ? i + 1 : end
  }
  return segments.filter((s) => s.kind !== "text" || s.value.length > 0)
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const segments = parseRichText(text)
  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.kind === "text") return <span key={idx}>{seg.value}</span>
        if (seg.kind === "bold") return <strong key={idx}>{seg.value}</strong>
        if (isOnSiteHref(seg.href)) {
          return (
            <a
              key={idx}
              href={siteAbsoluteUrl(seg.href)}
              className="font-medium text-cyan-700 hover:underline"
            >
              {seg.label}
            </a>
          )
        }
        const externalHref = safeExternalHref(seg.href)
        if (!externalHref) {
          return (
            <span key={idx} className="font-medium text-slate-800">
              {seg.label}
            </span>
          )
        }
        return (
          <a
            key={idx}
            href={externalHref}
            className="font-medium text-cyan-700 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {seg.label}
          </a>
        )
      })}
    </span>
  )
}
