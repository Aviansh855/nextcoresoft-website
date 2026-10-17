import { Link } from "react-router-dom"
import type { BlogSection } from "../../data/blog"
import { RichText } from "./RichText"

export function BlogArticleBody({ sections }: { sections: readonly BlogSection[] }) {
  return (
    <div className="prose prose-slate mt-8 max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
      {sections.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={block.id}
              className="mt-10 scroll-mt-28 font-display text-2xl font-semibold text-slate-900"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="mt-8 font-display text-lg font-semibold text-slate-900">
              {block.text}
            </h3>
          )
        }
        if (block.type === "ul" && block.items) {
          return (
            <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-600">
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          )
        }
        if (block.type === "ol" && block.items) {
          return (
            <ol key={index} className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-600">
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ol>
          )
        }
        if (block.type === "table" && block.headers && block.rows) {
          return (
            <div key={index} className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-800 uppercase">
                  <tr>
                    {block.headers.map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 align-top whitespace-normal">
                          <RichText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        if (block.type === "cta" && block.href && block.buttonLabel) {
          const href = block.href.startsWith("http")
            ? block.href.replace(/^https:\/\/nextcoresoft\.com/, "")
            : block.href
          return (
            <div
              key={index}
              className="mt-8 rounded-2xl border border-cyan-200/80 bg-cyan-50/40 p-6 sm:p-8"
            >
              {block.text ? (
                <p className="text-base leading-relaxed text-slate-700">
                  <RichText text={block.text} />
                </p>
              ) : null}
              <Link
                to={href}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {block.buttonLabel}
              </Link>
            </div>
          )
        }
        const lead = block.lead === true
        return (
          <p
            key={index}
            className={`mt-4 text-base leading-relaxed text-slate-600 sm:text-lg ${lead ? "rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-slate-700" : ""}`}
          >
            <RichText text={block.text ?? ""} />
          </p>
        )
      })}
    </div>
  )
}
