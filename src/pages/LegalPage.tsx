import { useEffect, type ReactNode } from "react"
import { SITE } from "../data/content"
import { applyMeta } from "../lib/seo"

interface LegalSection {
  heading: string
  body: ReactNode
}

const PRIVACY: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        This website is operated by {SITE.name} (&ldquo;we&rdquo;). You can reach us about privacy matters at the
        contact email published on this site.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>When you submit the inquiry form, we collect the details you provide:</p>
        <ul>
          <li>Your name, company name, and business email address.</li>
          <li>Your phone number, project budget, and service selection, if you choose to provide them.</li>
          <li>The project description you write.</li>
        </ul>
        <p>
          Like most websites, our hosting provider may automatically record technical data such as your IP address,
          browser type, and pages visited, in server logs used for security and diagnostics.
        </p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <p>
        We use your inquiry details solely to respond to you and to evaluate whether we can help with your project. We
        do not sell personal information, and we do not use it for unrelated marketing. If analytics is enabled on this
        site, it runs only after you consent, and is described in the consent prompt.
      </p>
    ),
  },
  {
    heading: "Who processes it",
    body: (
      <p>
        Form submissions are delivered through our form provider (currently Formspree, unless configured otherwise) and
        stored in our email. These providers process data on our behalf to deliver the message to us. The site is
        hosted on Vercel, which processes server logs.
      </p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        Inquiry records are kept for as long as they are relevant to an active or prospective engagement, and deleted
        when they are no longer needed. You can ask us to delete your details at any time.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        Depending on where you live, you may have the right to access, correct, or delete the personal information we
        hold about you, or to object to how it is used. Email us and we will respond within a reasonable time.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Privacy questions go to the email address listed in the footer of this website. This policy was last updated
        in October 2026.
      </p>
    ),
  },
]

const TERMS: LegalSection[] = [
  {
    heading: "Using this website",
    body: (
      <p>
        This website presents the services of {SITE.name}. It is provided for general information. Nothing on it is a
        binding offer; all engagements begin with a written proposal and agreement.
      </p>
    ),
  },
  {
    heading: "No guarantees of outcomes",
    body: (
      <p>
        Descriptions of services explain what we build and the problems it addresses. They are not promises of
        specific business results, savings, or performance figures. Any outcome discussed for a project is agreed in
        that project&apos;s own contract.
      </p>
    ),
  },
  {
    heading: "Inquiries",
    body: (
      <p>
        Submitting the inquiry form or emailing us does not create a client relationship. We will reply to genuine
        business inquiries; we may decline work that falls outside what we do.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The design, text, and code of this website belong to {SITE.name}. You may not copy or reuse them without
        permission. Ownership of software we build for clients is defined in each project agreement — typically, you
        own the deliverables once payment is complete.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        This website is provided as-is. To the extent permitted by law, we are not liable for losses arising from your
        use of the site or reliance on its content. Liability for paid project work is governed by the relevant
        project agreement.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        We may update these terms as the site evolves. The current version is always the one published here. These
        terms were last updated in October 2026.
      </p>
    ),
  },
]

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy"
  const sections = isPrivacy ? PRIVACY : TERMS

  useEffect(() => {
    applyMeta({
      title: `${isPrivacy ? "Privacy Policy" : "Terms of Service"} — ${SITE.name}`,
      description: isPrivacy
        ? `How ${SITE.name} collects, uses, and protects information submitted through this website.`
        : `The terms governing use of the ${SITE.name} website.`,
      path: isPrivacy ? "/privacy" : "/terms",
    })
  }, [isPrivacy])

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pt-32 pb-24 sm:px-8">
      <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300 uppercase">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {isPrivacy ? "Privacy Policy" : "Terms of Service"}
      </h1>
      <div className="mt-10 space-y-9">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-semibold text-white">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
