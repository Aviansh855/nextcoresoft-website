import { Link } from "react-router-dom"

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

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("https://nextcoresoft.com")
}

function toInternalPath(href: string) {
  if (href.startsWith("/")) return href
  try {
    const u = new URL(href)
    if (u.hostname === "nextcoresoft.com") return `${u.pathname}${u.search}`
  } catch {
    /* keep external */
  }
  return null
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const segments = parseRichText(text)
  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.kind === "text") return <span key={idx}>{seg.value}</span>
        if (seg.kind === "bold") return <strong key={idx}>{seg.value}</strong>
        const internal = isInternalHref(seg.href) ? toInternalPath(seg.href) : null
        if (internal) {
          return (
            <Link key={idx} to={internal} className="font-medium text-cyan-700 hover:underline">
              {seg.label}
            </Link>
          )
        }
        return (
          <a
            key={idx}
            href={seg.href}
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
