import { SiteCTA } from './SiteCTA'

/**
 * Homepage closing CTA. Uses the sitewide SiteCTA card so the homepage shares
 * the same recognizable contact pattern as the Contact page, About page, and
 * case studies. Keeps the #contact id for hash-scroll arrivals.
 */
export function Contact() {
  return (
    <SiteCTA
      id="contact"
      eyebrow="Get in touch"
      title="Let’s make complex products easier to use."
      description="Open to senior product design conversations, contract work, and teams building products that need more clarity."
      primaryLabel="Get in touch"
      primaryHref="/contact"
      secondaryLabel="Resume"
      secondaryHref="/resume/Gunnar-Morgan-Resume-2026.pdf"
      variant="compact"
      containerSize="default"
    />
  )
}
