import { Section } from './layout/Section'
import { Container } from './layout/Container'
import { Reveal } from './Reveal'
import { OutlineLink } from './OutlineLink'
import { AboutCollage } from './AboutCollage'

export function AboutPreview() {
  return (
    <Section id="about" tone="cream" spacing="snug">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro copy */}
          <Reveal className="lg:col-span-6">
            <span className="eyebrow">About</span>

            <p className="mt-5 text-[1.375rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-[1.4] tracking-[-0.015em] text-ink font-medium">
              My work usually sits where complex workflows, product systems, and visual clarity
              meet, helping teams turn dense product experiences into something easier to
              understand, use, and ship.
            </p>

            <p className="mt-6 max-w-xl text-[16px] sm:text-[17px] leading-[1.65] text-body">
              I partner closely with engineering and product on the details that make complex
              software feel usable, and on the systems that let products scale beyond a single
              screen. Focus areas include design systems, AI-assisted workflows, accessibility,
              enterprise SaaS, and complex product experiences across regulated, operational, and
              high-growth product environments.
            </p>

            <OutlineLink href="/about" className="mt-8">
              More about me
            </OutlineLink>
          </Reveal>

          {/* Personal photo collage */}
          <Reveal delay={120} className="lg:col-span-6">
            <AboutCollage />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
