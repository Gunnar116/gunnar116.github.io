import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'

type Props = {
  next?: {
    slug: string
    title: string
  }
}

export function CaseStudyNext({ next }: Props) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-t border-border">
      <Container size="narrow">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Link
            to="/#work"
            className="hover-pill focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium text-muted underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
          >
            <span
              aria-hidden
              className="transition-transform duration-200 motion-safe:group-hover:-translate-x-0.5"
            >
              ←
            </span>
            All work
          </Link>

          {next && (
            <Link
              to={`/work/${next.slug}`}
              className="focus-ring group flex flex-col items-start sm:items-end gap-2"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-soft">
                Next case study
              </span>
              <span className="inline-flex items-center gap-2 text-[1.25rem] sm:text-[1.5rem] font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:underline decoration-border-strong underline-offset-[6px]">
                {next.title}
                <span
                  aria-hidden
                  className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  )
}
