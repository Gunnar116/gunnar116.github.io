import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { Reveal } from './Reveal'
import { experience, type ExperienceItem } from '../data/experience'

export function ExperienceSnapshot() {
  return (
    <Section id="experience" tone="cream" spacing="snug">
      <Container>
        <Reveal>
          <header className="mb-12 sm:mb-16 max-w-2xl">
            <span className="eyebrow">Experience</span>
            <h2 className="mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
              Where I&apos;ve been.
            </h2>
          </header>
        </Reveal>

        <Reveal>
          <ul className="border-t border-border">
            {experience.map((item) => (
              <ExperienceRow key={item.slug} item={item} />
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  return (
    <li className="group relative grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-border py-5 transition-colors duration-200 hover:border-accent/40 hover:bg-accent-soft sm:py-6">
      <span
        aria-hidden
        className="absolute left-[-14px] top-1/2 h-0 w-[2px] -translate-y-1/2 rounded-full bg-accent transition-all duration-300 ease-out group-hover:h-8"
      />
      <div className="col-span-12 sm:col-span-7 lg:col-span-7">
        <div className="inline-block text-[1rem] sm:text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1">
          {item.company}
        </div>
        <div className="mt-1 text-[14.5px] text-muted transition-colors duration-200 group-hover:text-body">{item.role}</div>
      </div>

      <div className="col-span-12 sm:col-span-5 lg:col-span-5 sm:text-right text-[13.5px] sm:text-[14px] font-medium text-muted tabular-nums transition-colors duration-200 group-hover:text-ink">
        {item.meta}
      </div>
    </li>
  )
}
