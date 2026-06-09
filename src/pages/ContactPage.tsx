import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Portrait } from '../components/Portrait'
import { Reveal } from '../components/Reveal'

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
      <section className="border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-accent/25 bg-accent-soft px-7 py-9 sm:px-10 sm:py-12">
              <span aria-hidden className="block h-[2px] w-8 rounded-full bg-accent" />
              <span className="eyebrow mt-5 block">Next step</span>
              <h2 className="mt-3 text-[1.75rem] sm:text-[2.125rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
                Have a product problem worth untangling?
              </h2>
              <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-[1.6] text-muted">
                I’m always interested in thoughtful teams, messy workflows, and products that need
                more clarity. Send a note and I’ll get back to you.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="mailto:grmconcepts@gmail.com"
                  className="btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium motion-safe:hover:-translate-y-[1px]"
                >
                  Email me
                  <span
                    aria-hidden
                    className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
                <Link
                  to="/"
                  className="hover-pill focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink"
                >
                  View selected work
                  <span
                    aria-hidden
                    className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
