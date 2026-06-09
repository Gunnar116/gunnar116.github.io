export type Testimonial = {
  slug: string
  quote: string
  name: string
  title: string
  href?: string
}

/**
 * Placeholder content — replace with real, NDA-cleared references.
 * Keep each quote to 1–2 sentences, specific not generic.
 */
export const testimonials: Testimonial[] = [
  {
    slug: 'ref-1',
    quote:
      'Gunnar quickly understood a complex domain and turned it into something teams could actually use. The work was thoughtful, scalable, and shipped.',
    name: 'Reference Name',
    title: 'Director of Product',
  },
  {
    slug: 'ref-2',
    quote:
      'A rare designer who is equally comfortable in systems and in the small details. Gunnar made the team better at the parts of the product we had been avoiding.',
    name: 'Reference Name',
    title: 'Engineering Lead',
  },
  {
    slug: 'ref-3',
    quote:
      'Calm, clear, and consistently raising the bar on craft. The design system work continues to pay dividends across the org.',
    name: 'Reference Name',
    title: 'Head of Design',
  },
]
