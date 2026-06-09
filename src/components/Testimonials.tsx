import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { testimonials, type Testimonial } from '../data/testimonials'

export function Testimonials() {
  return (
    <Section id="references" tone="cream" spacing="snug">
      <Container>
        <header className="mb-12 sm:mb-16 max-w-2xl">
          <span className="eyebrow">References</span>
          <h2 className="mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
            From people I&apos;ve shipped with.
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-muted">
            A few quotes from designers, engineers, and product partners. More available on
            request.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((t) => (
            <TestimonialCard key={t.slug} testimonial={t} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <span className="text-[36px] leading-none text-border-strong" aria-hidden>
        &ldquo;
      </span>
      <blockquote className="mt-2 text-[15.5px] sm:text-[16px] leading-[1.6] text-body">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden
          className="inline-block h-7 w-7 rounded-full bg-cream-tint border border-border"
        />
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-ink">{testimonial.name}</span>
          <span className="text-[12.5px] text-muted">{testimonial.title}</span>
        </div>
      </figcaption>
    </figure>
  )
}
