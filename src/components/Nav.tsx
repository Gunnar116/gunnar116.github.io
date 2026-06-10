import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './layout/Container'

const RESUME = '/resume/Gunnar-Morgan-Resume-2026.pdf'

const LINKS = [
  { label: 'Work', to: '/#work', kind: 'route' as const },
  { label: 'About', to: '/about', kind: 'route' as const },
  { label: 'Resume', to: RESUME, kind: 'external' as const },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const pillTone = scrolled
    ? 'bg-surface/90 border-border/80 shadow-[0_10px_34px_-14px_rgba(20,20,20,0.28)]'
    : 'bg-surface/80 border-border/55 shadow-[0_6px_24px_-16px_rgba(20,20,20,0.22)]'

  const navLinkClass =
    'hover-pill focus-ring rounded-full px-3 py-1.5 text-[14px] font-medium text-muted transition-colors hover:text-ink'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container size="wide" className="pt-4 sm:pt-5">
        <div className="relative">
          <nav
            className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-full border py-2 pl-4 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 md:grid-cols-[1fr_auto_1fr] md:pl-5 md:pr-3 ${pillTone}`}
          >
            {/* Logo — left */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="focus-ring inline-flex w-fit items-center rounded-full px-1 py-1"
              aria-label="Gunnar Morgan — home"
            >
              <img
                src="/images/grm-logo.png"
                alt="GRM — Gunnar Morgan"
                width={807}
                height={325}
                className="h-6 w-auto sm:h-[26px]"
              />
            </Link>

            {/* Nav links — centered (desktop) */}
            <ul className="hidden items-center justify-center gap-1 md:flex">
              {LINKS.map((l) =>
                l.kind === 'route' ? (
                  <li key={l.label}>
                    <Link to={l.to} className={navLinkClass}>
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.label}>
                    <a
                      href={l.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${navLinkClass} inline-flex items-center gap-1`}
                    >
                      {l.label}
                      <span aria-hidden className="text-[11px]">
                        ↗
                      </span>
                    </a>
                  </li>
                ),
              )}
            </ul>

            {/* Actions — right */}
            <div className="flex items-center justify-end gap-1.5">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium motion-safe:hover:-translate-y-[1px]"
              >
                Contact
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-accent-soft md:hidden"
              >
                {open ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path
                      d="M4 4l10 10M14 4L4 14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path
                      d="M2.5 5h13M2.5 9h13M2.5 13h13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile menu panel */}
          {open && (
            <div
              id="mobile-nav"
              className="absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-border bg-surface/95 p-2 shadow-[0_18px_44px_-20px_rgba(20,20,20,0.32)] backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {LINKS.map((l) =>
                  l.kind === 'route' ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="focus-ring block rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="focus-ring flex items-center gap-1.5 rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft"
                      >
                        {l.label}
                        <span aria-hidden className="text-[12px]">
                          ↗
                        </span>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
