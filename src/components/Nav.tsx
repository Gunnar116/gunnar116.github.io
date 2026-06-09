import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './layout/Container'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? 'bg-cream/85 backdrop-blur-md border-b border-border/60'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-ink"
            aria-label="Gunnar Morgan — home"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-cream text-[12px] font-semibold tracking-tight">
              GM
            </span>
            <span className="hidden sm:inline text-[15px] font-medium tracking-tight">
              Gunnar Morgan
            </span>
          </Link>

          <ul className="flex items-center gap-6 sm:gap-8 text-[14px] font-medium text-muted">
            <li>
              <Link to="/#work" className="transition-colors hover:text-ink">
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <a
                href="/resume/Gunnar-Morgan-Resume-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-ink"
              >
                Resume
                <span aria-hidden className="text-[11px]">↗</span>
              </a>
            </li>
            <li>
              <Link to="/#contact" className="transition-colors hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
