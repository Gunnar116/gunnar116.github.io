import { SiteCTA } from '../SiteCTA'

/**
 * Consistent closing CTA shown on every case study, just above the
 * next-project navigation. Uses the sitewide SiteCTA card pattern, read at a
 * narrower container width so it sits comfortably within the case-study column
 * and doesn't crowd the next-project links that follow.
 */
export function CaseStudyCTA() {
  return (
    <SiteCTA
      eyebrow="Work together"
      title="Interested in building something clearer?"
      description="If you’re building a complex product and need more clarity, structure, or momentum, I’d be happy to connect."
      primaryLabel="Get in touch"
      primaryHref="/contact"
      secondaryLabel="View more work"
      secondaryHref="/"
      variant="compact"
      containerSize="default"
    />
  )
}
