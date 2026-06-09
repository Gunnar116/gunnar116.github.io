import { Container } from './layout/Container'
import { Reveal } from './Reveal'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="text-[16px] sm:text-[17px] font-medium text-accent-strong">
              Hi, I&apos;m Gunnar.
            </p>

            <h1 className="mt-5 text-[2.6rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
              Clear, scalable experiences for{' '}
              <span className="underline decoration-2 decoration-accent underline-offset-[8px]">
                complex products
              </span>
              .
            </h1>

            <p className="mt-7 max-w-2xl text-[18px] sm:text-[19px] leading-[1.55] text-body">
              Senior Product Designer creating clean interfaces, thoughtful systems, and product
              experiences that make complex workflows easier to understand, use, and scale.
            </p>

            <p className="mt-5 max-w-2xl text-[15px] sm:text-[16px] italic text-muted">
              Currently designing healthcare product experiences at Medefy.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#work"
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-cream transition-[transform,background-color] duration-200 hover:bg-charcoal motion-safe:hover:-translate-y-[1px]"
              >
                View selected work
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
                href="#contact"
                className="hover-pill focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                or get in touch
                <span
                  className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                >
                  ↗
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:justify-self-end">
            <Portrait
              eager
              className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
