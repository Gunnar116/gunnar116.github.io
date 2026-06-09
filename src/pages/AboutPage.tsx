import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'

const FOCUS = [
  {
    title: 'Complex product workflows',
    body: 'I like working on products where the problem is not just the UI, but the underlying workflow, information architecture, and decision-making model.',
  },
  {
    title: 'Design systems that actually support teams',
    body: 'I care about systems that help designers and engineers move faster without flattening the product into generic components.',
  },
  {
    title: 'AI-assisted experiences with user control',
    body: 'I’m interested in AI features that make work easier to organize, search, and understand — while keeping the user in control of what is happening.',
  },
  {
    title: 'Designing through ambiguity',
    body: 'I’m comfortable in early-stage or undefined spaces where the work starts with making sense of the problem before jumping into screens.',
  },
]

const PRINCIPLES = [
  'I start by understanding the workflow before designing the interface.',
  'I look for the parts of a product that create friction, uncertainty, or unnecessary decision-making.',
  'I use systems to create consistency, but I avoid making everything feel over-templated.',
  'I care about the handoff between design and engineering — good design only matters if it can be built well.',
  'I prefer direct communication, fast iteration, and clear ownership.',
]

const EXPERIENCE = [
  { company: 'Medefy Health', role: 'Lead Product Designer' },
  { company: 'Kindness.ai', role: 'Lead Product Designer, Contract' },
  { company: 'TruOps', role: 'Senior Product Designer' },
  { company: 'Fortress Information Security', role: 'Lead Product Designer' },
  { company: 'Groove.co', role: 'UX/UI Designer, Contract' },
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
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-48">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">About</span>
            <h1 className="mt-4 text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
              More about me
            </h1>
            <p className="mt-7 text-[1.25rem] sm:text-[1.4rem] leading-[1.4] tracking-[-0.01em] text-ink font-medium">
              I’m Gunnar Morgan, a product designer focused on turning complex workflows into
              clear, usable product experiences.
            </p>
            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-body">
              My work sits at the intersection of product strategy, systems thinking, and
              hands-on interface design. I’ve designed across healthcare, cybersecurity,
              AI-assisted workflows, enterprise SaaS, and early-stage startups — usually in
              spaces where the product is complex, the workflows are messy, and clarity matters.
            </p>
          </div>
        </Container>
      </section>

      {/* What I focus on */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <span className="eyebrow">What I focus on</span>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
            {FOCUS.map((f, i) => (
              <article
                key={f.title}
                className="group rounded-2xl border border-border bg-surface px-6 py-7 sm:px-7 sm:py-8 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_18px_40px_-24px_rgba(20,20,20,0.28)]"
              >
                <div className="flex items-center gap-2 text-[12px] font-semibold tabular-nums tracking-[0.14em] text-muted-soft transition-colors duration-300 group-hover:text-ink">
                  {String(i + 1).padStart(2, '0')}
                  <span
                    aria-hidden
                    className="h-px w-0 bg-border-strong transition-all duration-300 ease-out group-hover:w-6"
                  />
                </div>
                <h3 className="mt-3 text-[1.125rem] sm:text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.3] text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] sm:text-[15.5px] leading-[1.6] text-muted">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* How I work */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-4">
              <span className="eyebrow">How I work</span>
              <p className="mt-4 max-w-xs text-[15px] leading-[1.6] text-muted">
                A few principles that shape how I approach the work.
              </p>
            </div>
            <ul className="col-span-12 lg:col-span-8 lg:col-start-5 flex flex-col">
              {PRINCIPLES.map((p, i) => (
                <li
                  key={i}
                  className="group flex gap-4 border-t border-border py-5 first:border-t-0 first:pt-0"
                >
                  <span className="mt-[2px] text-[12px] font-semibold tabular-nums tracking-[0.12em] text-muted-soft transition-colors duration-200 group-hover:text-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="inline-block text-[16px] sm:text-[16.5px] leading-[1.6] text-body transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-ink">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Where I've worked */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <span className="eyebrow">Where I’ve worked</span>
              <p className="mt-6 text-[18px] sm:text-[19px] leading-[1.55] tracking-[-0.01em] text-ink font-medium max-w-2xl">
                Across recent roles, I’ve worked on products for healthcare operations,
                AI-assisted communication, GRC, cybersecurity, vendor risk, and sales
                engagement. The common thread has been designing tools for people who need to
                move through complex information quickly and confidently.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <ul className="flex flex-col">
                {EXPERIENCE.map((e) => (
                  <li
                    key={e.company}
                    className="group flex items-baseline justify-between gap-4 border-t border-border py-4 first:border-t-0 first:pt-0"
                  >
                    <span className="inline-block text-[15.5px] font-semibold text-ink transition-transform duration-200 ease-out group-hover:translate-x-1">
                      {e.company}
                    </span>
                    <span className="text-right text-[13.5px] leading-[1.4] text-muted transition-colors duration-200 group-hover:text-ink">
                      {e.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Outside of design */}
      <Section tone="cream" spacing="snug" className="border-t border-border">
        <Container size="narrow" className="!mx-0 sm:!mx-auto">
          <span className="eyebrow">Outside of design</span>
          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.55] tracking-[-0.01em] text-ink">
            Outside of design, I’m usually outside — mountain biking, dirt biking, hiking,
            snowboarding, climbing, or spending time with my two Border Collies. I like building
            things, tuning details, and getting better at whatever I’m into, which probably
            explains why I’m drawn to product design in the first place.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="charcoal" spacing="default">
        <Container size="narrow">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-[-0.02em] leading-[1.1] text-cream">
            Let’s make complex products easier to use.
          </h2>
          <p className="mt-6 text-[17px] sm:text-[18px] leading-[1.6] text-cream/70 max-w-2xl">
            I’m open to senior product design roles, contract work, and teams building products
            that need more clarity, structure, and momentum.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 rounded-full bg-cream px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              View selected work
              <span aria-hidden className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="/resume/Gunnar-Morgan-Resume-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-5 py-2.5 text-[14px] font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              Download resume
              <span aria-hidden className="text-[11px]">↗</span>
            </a>
            <a
              href="mailto:hello@grmconcepts.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-5 py-2.5 text-[14px] font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              Email me
            </a>
          </div>
        </Container>
      </Section>
    </main>
  )
}
