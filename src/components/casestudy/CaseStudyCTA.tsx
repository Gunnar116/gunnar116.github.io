import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'
import { Reveal } from '../Reveal'

/**
 * Consistent closing contact CTA shown on every case study, just above the
 * next-project navigation. Editorial and light — a single primary action so
 * it doesn't crowd the "All work" / next-case-study links that follow.
 */
export function CaseStudyCTA() {
  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <Container size="narrow">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="mt-3 text-[1.5rem] sm:text-[1.875rem] lg:text-[2.125rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
            Interested in working together?
          </h2>
          <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-[1.6] text-muted">
            If you’re building a complex product and need more clarity, structure, or momentum,
            I’d be happy to connect.
          </p>
          <div className="mt-7">
            <Link
              to="/contact"
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium motion-safe:hover:-translate-y-[1px]"
            >
              Get in touch
              <span
                aria-hidden
                className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
