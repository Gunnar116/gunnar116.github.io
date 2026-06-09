import type { ReactNode } from 'react'
import { Container } from '../layout/Container'

type Props = {
  heading: string
  eyebrow?: string
  children: ReactNode
}

export function CaseStudySection({ heading, eyebrow, children }: Props) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container size="narrow">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2
          className={`text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-semibold tracking-[-0.02em] leading-[1.2] text-ink ${
            eyebrow ? 'mt-3' : ''
          }`}
        >
          {heading}
        </h2>
        <div className="mt-6 text-[16.5px] sm:text-[17px] leading-[1.7] text-body space-y-5">
          {children}
        </div>
      </Container>
    </section>
  )
}
