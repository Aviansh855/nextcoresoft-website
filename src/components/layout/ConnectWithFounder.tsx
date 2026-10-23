import founder from "../../../shared/founder.json"

const EXTERNAL_LINK = "noopener noreferrer"

function LinkedInIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

type Variant = "default" | "compact"

export function ConnectWithFounder({ variant = "default" }: { variant?: Variant }) {
  const { displayName, linkedIn, instagram } = founder

  const buttonClass =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"

  const links = (
    <div className={`flex flex-col gap-3 ${variant === "compact" ? "sm:flex-row sm:flex-wrap" : "sm:flex-row"}`}>
      <a
        href={linkedIn.url}
        target="_blank"
        rel={EXTERNAL_LINK}
        className={`${buttonClass} bg-slate-900 text-white hover:bg-slate-800`}
      >
        <LinkedInIcon />
        {linkedIn.buttonLabel}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        href={instagram.url}
        target="_blank"
        rel={EXTERNAL_LINK}
        className={`${buttonClass} border border-slate-300 bg-white text-slate-800 hover:border-cyan-500/60 hover:bg-slate-50`}
      >
        <InstagramIcon />
        {instagram.buttonLabel}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  )

  if (variant === "compact") {
    return (
      <div className="mt-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Connect with the founder</p>
        <p className="mt-1 text-sm font-medium text-slate-800">{displayName}</p>
        <div className="mt-3">{links}</div>
      </div>
    )
  }

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8"
      aria-labelledby="connect-founder-heading"
    >
      <h2 id="connect-founder-heading" className="font-display text-xl font-semibold text-slate-900">
        Connect with the Founder
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Questions about {displayName}&apos;s work at NextCoreSoft or following project updates — reach out on LinkedIn or
        Instagram.
      </p>
      <p className="mt-3 font-display text-lg font-semibold text-slate-900">{displayName}</p>
      <div className="mt-5">{links}</div>
    </section>
  )
}
