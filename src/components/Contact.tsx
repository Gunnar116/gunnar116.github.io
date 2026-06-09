import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <Section id="contact" tone="cream" spacing="default">
      <Container size="narrow">
        <Reveal>
          <span className="eyebrow">Get in touch</span>

          <h2 className="mt-4 text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold tracking-[-0.02em] leading-[1.1] text-ink">
            Let&apos;s make complex products easier to use.
          </h2>

          <p className="mt-5 text-[17px] sm:text-[18px] leading-[1.55] text-muted">
            Open to senior product design conversations, contract work, and teams building
            products that need more clarity.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4">
            <a
              href="mailto:hello@grmconcepts.com"
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-cream transition-[transform,background-color] duration-200 hover:bg-charcoal motion-safe:hover:-translate-y-[1px]"
            >
              hello@grmconcepts.com
              <svg
                className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/gunnarmorgan"
              target="_blank"
              rel="noreferrer"
              className="hover-pill focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              LinkedIn
              <span
                className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
                aria-hidden
              >
                ↗
              </span>
            </a>

            <a
              href="/resume/Gunnar-Morgan-Resume-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-pill focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              Resume
              <span
                className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
                aria-hidden
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
