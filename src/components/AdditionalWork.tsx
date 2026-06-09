import { Link } from 'react-router-dom'
import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { additionalWork, type AdditionalWorkItem } from '../data/additionalWork'

export function AdditionalWork() {
  if (additionalWork.length === 0) return null

  return (
    <Section id="additional-work" tone="cream" spacing="snug">
      <Container>
        <header className="mb-12 sm:mb-14 max-w-2xl">
          <span className="eyebrow">Additional product work</span>
          <h2 className="mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
            A few more recent projects.
          </h2>
        </header>

        <ul className="border-t border-border">
          {additionalWork.map((item) => (
            <AdditionalRow key={item.slug} item={item} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function AdditionalRow({ item }: { item: AdditionalWorkItem }) {
  return (
    <li className="border-b border-border py-7 sm:py-8">
      <Link to={item.href} className="group block">
        <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2">
          <div className="col-span-12 lg:col-span-8">
            <h3 className="text-[1.125rem] sm:text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.3] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 max-w-2xl text-[15px] sm:text-[15.5px] leading-[1.6] text-muted">
              {item.hook}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <div className="text-[14px] text-muted">{item.role}</div>
            <div className="mt-1 text-[13.5px] tabular-nums text-muted-soft">{item.meta}</div>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors group-hover:decoration-ink">
              Read case study
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}
