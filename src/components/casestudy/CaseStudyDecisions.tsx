import { Container } from '../layout/Container'

type Decision = {
  title: string
  body: string
}

type Props = {
  decisions: Decision[]
}

export function CaseStudyDecisions({ decisions }: Props) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container size="narrow">
        <span className="eyebrow">Key design decisions</span>
        <h2 className="mt-3 text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-semibold tracking-[-0.02em] leading-[1.2] text-ink">
          A few decisions that shaped the work.
        </h2>

        <ol className="mt-10 space-y-10">
          {decisions.map((d, i) => (
            <li key={i} className="flex flex-col border-t border-border-strong pt-6">
              <span className="text-[12px] font-semibold tabular-nums tracking-[0.14em] text-muted-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[1.125rem] sm:text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.3] text-ink">
                {d.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-body">{d.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
