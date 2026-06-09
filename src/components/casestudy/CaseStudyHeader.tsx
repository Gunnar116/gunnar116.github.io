import type { CaseStudyContent } from '../../data/caseStudyContent'
import { Container } from '../layout/Container'
import { CaseStudyNotice } from './CaseStudyNotice'

type Props = {
  content: CaseStudyContent
}

export function CaseStudyHeader({ content }: Props) {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24">
      <Container>
        <div className="max-w-4xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 className="mt-4 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
            {content.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[18px] sm:text-[19px] leading-[1.55] text-body">
            {content.subtitle}
          </p>

          {content.notice && <CaseStudyNotice text={content.notice} />}

          {content.externalLinks && content.externalLinks.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {content.externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-transparent px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-cream-tint"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Meta block */}
        <dl className="mt-12 grid grid-cols-2 gap-y-7 gap-x-8 sm:grid-cols-4 sm:mt-14 lg:mt-16 border-t border-border pt-8">
          <MetaItem label="Role" value={content.role} />
          <MetaItem label="Timeline" value={content.timeline} />
          {content.team && <MetaItem label="Team" value={content.team} />}
          <MetaItem
            label="Focus areas"
            value={
              <ul className="flex flex-col gap-1">
                {content.focusAreas.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            }
          />
        </dl>
      </Container>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
        {label}
      </dt>
      <dd className="mt-2 text-[14.5px] leading-[1.55] text-ink">{value}</dd>
    </div>
  )
}
