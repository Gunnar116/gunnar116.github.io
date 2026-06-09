import { useEffect } from 'react'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Portrait } from '../components/Portrait'
import { Reveal } from '../components/Reveal'
import { SiteCTA } from '../components/SiteCTA'

const EMAIL = 'grmconcepts@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/gunnarmorgan'
const RESUME = '/resume/Gunnar-Morgan-Resume-2026.pdf'

type Channel = {
  label: string
  body: string
  cta: string
  href: string
  external: boolean
  arrow: string
}

const CHANNELS: Channel[] = [
  {
    label: 'Email',
    body: 'The most direct way to reach me. Good for roles, projects, or a quick question.',
    cta: 'Send email',
    href: `mailto:${EMAIL}`,
    external: false,
    arrow: '→',
  },
  {
    label: 'LinkedIn',
    body: 'Connect with me or send a message about an opportunity.',
    cta: 'Open LinkedIn',
    href: LINKEDIN,
    external: true,
    arrow: '↗',
  },
  {
    label: 'Resume',
    body: 'Download my latest resume as a PDF.',
    cta: 'Download resume',
    href: RESUME,
    external: true,
    arrow: '↗',
  },
]

export function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = 'Contact — Gunnar Morgan'
    return () => {
      document.title = 'Gunnar Morgan — Senior Product Designer'
    }
  }, [])

  return (
    <main>
      {/* Hero / intro */}
      <section className="pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-48">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow">Contact</span>
              <h1 className="mt-4 text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
                Let’s make complex products easier to use.
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] sm:text-[18px] leading-[1.6] text-body">
                I’m open to senior product design roles, contract work, and teams building products
                that need more clarity, structure, and momentum.
              </p>
              <p className="mt-5 max-w-2xl text-[16px] sm:text-[16.5px] leading-[1.65] text-muted">
                Whether you’re hiring for a full-time role, exploring a contract project, or just
                want to talk through a product or design challenge, feel free to reach out.
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:justify-self-end">
              <Portrait className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ways to reach me */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <Reveal>
            <span className="eyebrow">Ways to reach me</span>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="focus-ring group flex min-h-[180px] flex-col justify-between rounded-2xl border border-border bg-surface p-6 sm:p-7 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:bg-accent-soft"
                >
                  <div>
                    <span className="eyebrow">{c.label}</span>
                    <p className="mt-3 text-[15px] leading-[1.6] text-muted">{c.body}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
                    {c.cta}
                    <span
                      aria-hidden
                      className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
                    >
                      {c.arrow}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA */}
      <SiteCTA
        eyebrow="Next step"
        title="Have a product problem worth untangling?"
        description="I’m always interested in thoughtful teams, messy workflows, and products that need more clarity. Send a note and I’ll get back to you."
        primaryLabel="Email me"
        primaryHref="mailto:grmconcepts@gmail.com"
        secondaryLabel="View selected work"
        secondaryHref="/"
      />
    </main>
  )
}
