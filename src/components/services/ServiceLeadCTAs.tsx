import { ArrowRight } from "lucide-react"
import type { Service } from "../../data/content"
import { ButtonLink } from "../ui/Button"

export function ServiceLeadCTAs({ service, className = "" }: { service: Service; className?: string }) {
  const quote = `/contact/?intent=quote&service=${service.slug}`
  const discuss = `/contact/?service=${service.slug}`
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}
      role="group"
      aria-label="Contact options"
    >
      <ButtonLink to={quote}>
        Request a Quote
        <ArrowRight size={16} aria-hidden="true" />
      </ButtonLink>
      <ButtonLink to={discuss} variant="secondary">
        Discuss Your Project
      </ButtonLink>
    </div>
  )
}
