import { Link } from 'react-router-dom'
import { Section } from './layout/Section'
import { Container } from './layout/Container'

export function AboutPreview() {
  return (
    <Section id="about" tone="cream" spacing="snug">
      <Container size="narrow">
        <span className="eyebrow">About</span>

        <p className="mt-5 text-[1.375rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-[1.4] tracking-[-0.015em] text-ink font-medium">
          My work usually sits where complex workflows, product systems, and visual clarity
          meet — helping teams turn dense product experiences into something easier to
          understand, use, and ship.
        </p>

        <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-body">
          I partner closely with engineering and product on the details that make complex
          software feel usable, and on the systems that let products scale beyond a single
          screen. Focus areas include design systems, AI-assisted workflows, accessibility,
          enterprise SaaS, and complex product experiences across regulated, operational, and
          high-growth product environments.
        </p>

        <Link
          to="/about"
          className="hover-pill focus-ring group mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink"
        >
          More about me
          <span
            className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
        </Link>
      </Container>
    </Section>
  )
}
