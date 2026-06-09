import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Reveal } from '../Reveal'
import { OutlineLink } from '../OutlineLink'
import { medefyChapters } from '../../data/medefyChapters'
import { MedefyChapterCard } from './MedefyChapterCard'

export function MedefySpotlight() {
  return (
    <Section id="medefy" tone="cream" spacing="default">
      <Container>
        <div className="rounded-[32px] border border-border bg-surface/60 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">Featured story</span>
              <h2 className="mt-3 text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold tracking-[-0.02em] leading-[1.1] text-ink">
                Medefy Product Experience
              </h2>
              <p className="mt-6 text-[17px] sm:text-[18px] leading-[1.55] text-body">
                Designing healthcare product experiences across care guide workflows, member mobile
                experiences, accessibility, and scalable product systems.
              </p>
            </div>
          </Reveal>

          {/* Chapter grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            {medefyChapters.map((chapter, i) => (
              <Reveal key={chapter.slug} delay={(i % 2) * 80}>
                <MedefyChapterCard chapter={chapter} />
              </Reveal>
            ))}
          </div>

          {/* Quiet CTA */}
          <div className="mt-12 sm:mt-14 flex justify-center">
            <OutlineLink href="/work/medefy">Read the Medefy story</OutlineLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
