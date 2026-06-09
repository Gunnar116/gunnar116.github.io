import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container } from './layout/Container'
import { Reveal } from './Reveal'

/**
 * Sitewide closing CTA card — the single, recognizable call-to-action pattern
 * used across the portfolio (Contact, About, every case study, and the homepage
 * closing section). Visual style is the approved Contact-page closing card:
 * a large rounded accent-soft card with a small accent rule, uppercase eyebrow,
 * strong headline, short copy, a primary accent-filled button, and a secondary
 * hover-pill text link.
 *
 * Two variants share the same visual language:
 *  - "feature" (default): the larger, generously padded feature card used on
 *    the Contact page.
 *  - "compact": a shorter, wider banner — reduced vertical padding, a slightly
 *    smaller headline, and a horizontal (text left / actions right) layout on
 *    desktop. Used everywhere except Contact.
 *
 * Hrefs that are external (mailto:, http(s), or a static .pdf) render as <a>
 * with a new tab; internal routes (starting with "/") render as <Link>.
 */
type SiteCTAProps = {
  eyebrow: string
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  /** "feature" = large card (Contact); "compact" = wide banner (everywhere else). */
  variant?: 'feature' | 'compact'
  /** Container width — case studies read narrower than full pages. */
  containerSize?: 'narrow' | 'default' | 'wide'
  /** Optional id on the outer <section>, e.g. for hash-scroll anchors. */
  id?: string
  /** Override the outer <section> classes (spacing, borders) per page. */
  className?: string
}

function isExternal(href: string) {
  return (
    href.startsWith('mailto:') ||
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.endsWith('.pdf')
  )
}

/** Renders an <a> for external targets, a router <Link> otherwise. */
function CTALink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  if (isExternal(href)) {
    const newTab = !(href.startsWith('mailto:') || href.startsWith('tel:'))
    return (
      <a
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={className}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

const primaryClass =
  'btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium motion-safe:hover:-translate-y-[1px]'
const secondaryClass =
  'hover-pill focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-ink'
// Compact-variant secondary: the shared outlined pill (.btn-outline), which
// reads as secondary to the filled primary. Same layout utilities as the
// primary so the two stack as a matched pair.
const secondaryOutlineClass =
  'btn-outline group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium motion-safe:hover:-translate-y-[1px]'

const primaryArrow = (
  <span
    aria-hidden
    className="transition-[transform,color] duration-200 motion-safe:group-hover:translate-x-0.5"
  >
    →
  </span>
)
const secondaryArrow = (
  <span
    aria-hidden
    className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5"
  >
    →
  </span>
)

export function SiteCTA({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'feature',
  containerSize = 'default',
  id,
  className,
}: SiteCTAProps) {
  const compact = variant === 'compact'

  // Outer section spacing — compact pages get a tighter rhythm.
  const sectionClass =
    className ??
    (compact
      ? 'border-t border-border pt-12 pb-12 sm:pt-14 sm:pb-14'
      : 'border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20')

  const primaryEl = (
    <CTALink href={primaryHref} className={primaryClass}>
      {primaryLabel}
      {primaryArrow}
    </CTALink>
  )
  const hasSecondary = Boolean(secondaryLabel && secondaryHref)
  // Compact: secondary is an outlined pill button. Feature: secondary is a text link.
  const secondaryEl = hasSecondary ? (
    <CTALink
      href={secondaryHref as string}
      className={compact ? secondaryOutlineClass : secondaryClass}
    >
      {secondaryLabel}
      {compact ? primaryArrow : secondaryArrow}
    </CTALink>
  ) : null

  return (
    <section id={id} className={sectionClass}>
      <Container size={containerSize}>
        <Reveal>
          {compact ? (
            <div className="rounded-2xl border border-accent/25 bg-accent-soft px-6 py-7 sm:px-9 sm:py-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="lg:max-w-2xl">
                <span aria-hidden className="block h-[2px] w-8 rounded-full bg-accent" />
                <span className="eyebrow mt-4 block">{eyebrow}</span>
                <h2 className="mt-2 text-[1.375rem] sm:text-[1.625rem] font-semibold tracking-[-0.02em] leading-[1.2] text-ink">
                  {title}
                </h2>
                <p className="mt-2.5 max-w-xl text-[15px] sm:text-[16px] leading-[1.55] text-muted">
                  {description}
                </p>
              </div>
              <div className="mt-6 flex flex-col items-stretch gap-3.5 lg:mt-0 lg:shrink-0">
                {primaryEl}
                {secondaryEl}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-accent/25 bg-accent-soft px-7 py-9 sm:px-10 sm:py-12">
              <span aria-hidden className="block h-[2px] w-8 rounded-full bg-accent" />
              <span className="eyebrow mt-5 block">{eyebrow}</span>
              <h2 className="mt-3 text-[1.75rem] sm:text-[2.125rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-[1.6] text-muted">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                {primaryEl}
                {secondaryEl}
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
