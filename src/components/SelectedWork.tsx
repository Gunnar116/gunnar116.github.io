import { Link } from 'react-router-dom'
import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { CaseVisual } from './CaseVisual'
import { Reveal } from './Reveal'
import { InteractiveCard } from './InteractiveCard'
import { caseStudies, type CaseStudy } from '../data/caseStudies'

export function SelectedWork() {
  return (
    <Section id="work" tone="cream" spacing="snug">
      <Container>
        <Reveal>
          <header className="mb-14 sm:mb-20 max-w-3xl">
            <span className="eyebrow">Selected Work</span>
            <h2 className="mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
              Selected work
            </h2>
            <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-muted">
              A selection of product design work across healthcare, AI-assisted workflows,
              enterprise SaaS, accessibility, and complex systems.
            </p>
          </header>
        </Reveal>

        <div className="space-y-[72px] sm:space-y-[88px] lg:space-y-[112px]">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 80}>
              <CaseRow caseStudy={cs} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function CaseRow({ caseStudy, reverse }: { caseStudy: CaseStudy; reverse: boolean }) {
  return (
    <article className="group">
      <div
        className={`flex flex-col gap-8 sm:gap-10 lg:gap-16 ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } lg:items-center`}
      >
        {/* Visual */}
        <Link
          to={caseStudy.href}
          aria-label={`${caseStudy.title} — view case study`}
          className="focus-ring block w-full lg:flex-[7] rounded-2xl transition-[transform,box-shadow] duration-300 ease-out group-hover:shadow-[0_26px_55px_-32px_rgba(20,20,20,0.4)] motion-safe:group-hover:-translate-y-[3px]"
        >
          <InteractiveCard className="rounded-2xl overflow-hidden">
            <CaseVisual
              variant={caseStudy.visual}
              tint={caseStudy.tint}
              image={caseStudy.homeImage}
            />
          </InteractiveCard>
        </Link>

        {/* Text */}
        <div className="w-full lg:flex-[5]">
          <div className="flex items-center gap-3 text-muted-soft">
            <span className="eyebrow !text-muted-soft">{caseStudy.tag}</span>
            <span className="h-[1px] w-6 bg-border-strong" aria-hidden />
            <span className="text-[12px] font-medium tabular-nums tracking-[0.04em] text-muted-soft">
              {caseStudy.year}
            </span>
          </div>

          <h3 className="mt-4 text-[1.625rem] sm:text-[1.875rem] lg:text-[2.125rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
            {caseStudy.title}
          </h3>

          <p className="mt-4 max-w-prose text-[16px] sm:text-[17px] leading-[1.6] text-body">
            {caseStudy.hook}
          </p>

          <p className="mt-5 text-[14px] text-muted">{caseStudy.role}</p>

          <Link
            to={caseStudy.href}
            className="hover-pill focus-ring mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            {caseStudy.cta ?? 'Read case study'}
            <span
              className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
