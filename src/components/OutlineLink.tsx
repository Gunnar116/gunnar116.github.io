import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

/**
 * Standalone outlined-pill CTA link — the site's single secondary-action
 * treatment. Shares the `.btn-outline` utility with the SiteCTA compact
 * secondary so every CTA-style link reads the same: transparent ground,
 * accent-strong text, soft accent border, subtle accent fill + stronger
 * border on hover, accent focus ring, and a trailing arrow that nudges.
 *
 * Renders an <a> (new tab) for external targets — http(s), mailto:, tel:, or a
 * static .pdf — and a router <Link> for internal routes. Use this in place of
 * the old "plain text + underline + arrow" CTA links. It is NOT for nav links,
 * footer minimal links, or inline links inside body copy.
 */
type OutlineLinkProps = {
  href: string
  children: ReactNode
  /** Trailing arrow glyph; pass false to omit. Defaults to "→". */
  arrow?: string | false
  size?: 'default' | 'sm' | 'xs'
  /** Force a new-tab <a> — for static assets (e.g. .html) not caught by isExternal. */
  external?: boolean
  /** Extra classes from the caller (margins, alignment, etc.). */
  className?: string
  ariaLabel?: string
}

const SIZES = {
  default: 'gap-2 px-6 py-3 text-[14px]',
  sm: 'gap-1.5 px-4 py-2 text-[13px]',
  xs: 'gap-1 px-3 py-1.5 text-[12px]',
} as const

function isExternal(href: string) {
  return (
    href.startsWith('mailto:') ||
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.endsWith('.pdf')
  )
}

export function OutlineLink({
  href,
  children,
  arrow = '→',
  size = 'default',
  external = false,
  className = '',
  ariaLabel,
}: OutlineLinkProps) {
  const cls = `btn-outline group inline-flex items-center justify-center rounded-full font-medium motion-safe:hover:-translate-y-[1px] ${SIZES[size]} ${className}`.trim()

  const inner = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
        >
          {arrow}
        </span>
      )}
    </>
  )

  if (external || isExternal(href)) {
    const newTab = !(href.startsWith('mailto:') || href.startsWith('tel:'))
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cls}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link to={href} aria-label={ariaLabel} className={cls}>
      {inner}
    </Link>
  )
}
