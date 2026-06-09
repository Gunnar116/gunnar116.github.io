import { useEffect } from 'react'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Portrait } from '../components/Portrait'
import { Reveal } from '../components/Reveal'
import { SiteCTA } from '../components/SiteCTA'
import { OutlineLink } from '../components/OutlineLink'

type JourneyEntry = {
  period: string
  company: string
  title: string
  summary: string
  points?: string[]
}

const JOURNEY: JourneyEntry[] = [
  {
    period: '2026 — Present',
    company: 'Medefy Health',
    title: 'Lead Product Designer',
    summary:
      'Designing healthcare product experiences across the internal care-guide workflows, the member mobile app, accessibility, and the underlying product systems.',
    points: [
      'Care-guide workflows and member-facing mobile experiences',
      'Accessibility work and shared design-system foundations',
    ],
  },
  {
    period: '2025',
    company: 'Kindness.ai',
    title: 'Lead Product Designer · Contract',
    summary:
      'Built the design system from scratch and shaped the AI inbox workflows — how messages get labeled, filtered, and searched while keeping the user in control.',
    points: [
      'Design system created from the ground up',
      'AI-assisted labeling, filtering, and search',
    ],
  },
  {
    period: '2023 — 2025',
    company: 'TruOps',
    title: 'Senior Product Designer',
    summary:
      'Designed an enterprise GRC platform end to end: information architecture, core workflows, the design system, and early AI assistant concepts.',
    points: [
      'Platform IA and core governance, risk, and compliance workflows',
      'Design system and AI assistant concepts',
    ],
  },
  {
    period: '2021 — 2023',
    company: 'Fortress Information Security',
    title: 'Lead Product Designer',
    summary:
      'Led product design for vendor risk and supply-chain security, turning dense security data into dashboards teams could actually act on.',
    points: [
      'Vendor risk and supply-chain security workflows',
      'Data-dense monitoring and reporting dashboards',
    ],
  },
  {
    period: '2021',
    company: 'Groove.co',
    title: 'UX/UI Designer · Contract',
    summary:
      'Designed mobile sales-engagement workflows for a fast-moving SaaS team, focused on keeping reps in flow across a busy day.',
  },
  {
    period: 'Earlier',
    company: 'Design foundations',
    title: 'CompanyCam · American Estate & Trust · Thinkful',
    summary:
      'Early product work and design training that built the foundation for moving into complex, systems-heavy product design.',
  },
]

type Value = {
  index: string
  title: string
  body: string
}

const VALUES: Value[] = [
  {
    index: '01',
    title: 'Start with the workflow',
    body: 'Before designing the interface, I want to understand how the work actually gets done: the decisions, handoffs, edge cases, and moments where people lose context.',
  },
  {
    index: '02',
    title: 'Make systems usable, not just consistent',
    body: 'I like design systems that help teams move faster and make better decisions, not systems that flatten every product into the same generic pattern.',
  },
  {
    index: '03',
    title: 'Keep control visible',
    body: 'Especially with AI-assisted workflows, people need to understand what the system is doing, why it is doing it, and how to adjust it.',
  },
  {
    index: '04',
    title: 'Own the messy middle',
    body: 'I’m comfortable in the ambiguous part of product work where the problem is not fully defined yet and the best next step is creating clarity.',
  },
]

const OUTSIDE = [
  {
    title: 'Outdoors',
    body: 'Mountain biking, dirt biking, hiking, snowboarding, and climbing.',
  },
  {
    title: 'Building & tuning',
    body: 'Always making something, then refining the details until it feels right.',
  },
  {
    title: 'Two Border Collies',
    body: 'Usually somewhere nearby, keeping me moving and outside.',
  },
  {
    title: 'Learning by doing',
    body: 'I get into things by building them, not just reading about them.',
  },
]

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = 'About — Gunnar Morgan'
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
              <span className="eyebrow">About</span>
              <h1 className="mt-4 text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
                I design products for complex, messy, high-stakes workflows.
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] sm:text-[18px] leading-[1.6] text-body">
                I’m Gunnar Morgan, a product designer focused on turning complex workflows into
                clear, usable product experiences. My work sits at the intersection of product
                strategy, systems thinking, and hands-on interface design — usually in spaces
                where the workflows are messy, the product is complex, and clarity matters.
              </p>
              <p className="mt-5 max-w-2xl text-[16px] sm:text-[16.5px] leading-[1.65] text-muted">
                I’ve worked across healthcare, cybersecurity, GRC, AI-assisted communication, and
                enterprise SaaS. The industries change, but the work often starts in the same
                place: understanding how people move through information, where things break down,
                and what needs to become clearer before the interface can feel simple.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 text-[14px] font-medium">
                <OutlineLink href="/#work">View selected work</OutlineLink>
                <OutlineLink href="/resume/Gunnar-Morgan-Resume-2026.pdf" arrow="↗">
                  Download resume
                </OutlineLink>
                <a
                  href="mailto:grmconcepts@gmail.com"
                  className="hover-pill focus-ring inline-flex items-center px-1 text-muted transition-colors hover:text-ink"
                >
                  Email me
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:justify-self-end">
              <Portrait
                eager
                className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* My journey */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-x-6 gap-y-4">
              <div className="col-span-12 lg:col-span-4">
                <span className="eyebrow">My journey</span>
                <p className="mt-4 max-w-xs text-[15px] leading-[1.6] text-muted">
                  A short version of the path — the industries shift, but the kind of problem
                  stays familiar.
                </p>
              </div>

              <ol className="col-span-12 lg:col-span-8 lg:col-start-5">
                {JOURNEY.map((j) => {
                  const isCurrent = j.period.includes('Present')
                  return (
                  <li
                    key={j.company}
                    className="group grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[136px_1fr]"
                  >
                    <div className="pt-0.5 sm:text-right">
                      <span className="text-[12px] font-semibold tabular-nums tracking-[0.06em] text-accent-strong">
                        {j.period}
                      </span>
                    </div>
                    <div className="relative border-l border-border pb-10 pl-6 last:pb-0 sm:pl-7">
                      <span
                        aria-hidden
                        className={`absolute left-0 top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent transition-colors duration-300 ${
                          isCurrent
                            ? 'bg-accent ring-4 ring-accent-soft'
                            : 'bg-cream group-hover:bg-accent'
                        }`}
                      />
                      <h3 className="text-[1.0625rem] sm:text-[1.125rem] font-semibold tracking-[-0.01em] leading-[1.3] text-ink transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5">
                        {j.company}
                      </h3>
                      <div className="mt-0.5 text-[13.5px] font-medium text-muted">
                        {j.title}
                      </div>
                      <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-body">
                        {j.summary}
                      </p>
                      {j.points && j.points.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {j.points.map((pt) => (
                            <li
                              key={pt}
                              className="flex gap-2.5 text-[14px] leading-[1.55] text-muted"
                            >
                              <span
                                aria-hidden
                                className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                              />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                  )
                })}
              </ol>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Values I come back to */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <Reveal>
            <span className="eyebrow">Values I come back to</span>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
              {VALUES.map((v) => (
                <article
                  key={v.index}
                  className="group rounded-2xl border border-border bg-surface px-6 py-7 sm:px-7 sm:py-8 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(20,20,20,0.28)]"
                >
                  <div className="flex items-center gap-2 text-[12px] font-semibold tabular-nums tracking-[0.14em] text-accent-strong">
                    {v.index}
                    <span
                      aria-hidden
                      className="h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-6"
                    />
                  </div>
                  <h3 className="mt-3 text-[1.125rem] sm:text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.3] text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[15px] sm:text-[15.5px] leading-[1.6] text-muted">
                    {v.body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Outside of design */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 lg:col-span-5">
                <span className="eyebrow">Outside of design</span>
                <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.55] tracking-[-0.01em] text-ink">
                  Outside of design, I’m usually outside — mountain biking, dirt biking, hiking,
                  snowboarding, climbing, or spending time with my two Border Collies. I like
                  building things, tuning details, and getting better at whatever I’m into, which
                  probably explains why I’m drawn to product design in the first place.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {OUTSIDE.map((o) => (
                    <div
                      key={o.title}
                      className="group rounded-xl border border-border bg-surface px-5 py-5 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-border-strong"
                    >
                      <div className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
                        {o.title}
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted">
                        {o.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <SiteCTA
        eyebrow="Next step"
        title="Let’s make complex products easier to use."
        description="I’m open to senior product design roles, contract work, and teams building products that need more clarity, structure, and momentum."
        primaryLabel="Get in touch"
        primaryHref="/contact"
        secondaryLabel="View selected work"
        secondaryHref="/"
        variant="compact"
      />
    </main>
  )
}
