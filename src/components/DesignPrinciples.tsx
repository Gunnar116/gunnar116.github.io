import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { Reveal } from './Reveal'
import { principles, type Principle } from '../data/principles'

export function DesignPrinciples() {
  return (
    <Section id="principles" tone="cream" spacing="snug">
      <Container>
        <Reveal>
          <header className="mb-14 sm:mb-20 max-w-2xl">
            <span className="eyebrow">How I work</span>
            <h2 className="mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
              A few design principles I keep coming back to.
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-16">
          {principles.map((p, i) => (
            <Reveal key={p.index} delay={(i % 4) * 70}>
              <PrincipleCard principle={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <div className="group flex h-full flex-col border-t border-border-strong pt-5 transition-[transform,border-color] duration-300 ease-out hover:border-ink motion-safe:hover:-translate-y-1">
      <div className="flex items-center gap-2 text-[12px] font-semibold tabular-nums tracking-[0.14em] text-muted-soft transition-colors duration-300 group-hover:text-ink">
        {principle.index}
        <span aria-hidden className="h-px w-0 bg-ink/40 transition-all duration-300 ease-out group-hover:w-6" />
      </div>
      <h3 className="mt-5 text-[1.125rem] sm:text-[1.1875rem] font-semibold tracking-[-0.015em] leading-[1.3] text-ink">
        {principle.title}
      </h3>
      <p className="mt-4 text-[14.5px] leading-[1.65] text-muted">{principle.body}</p>
    </div>
  )
}
