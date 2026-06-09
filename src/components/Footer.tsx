import { Container } from './layout/Container'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-cream">
      <Container>
        <div className="flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <p className="text-[13px] text-muted">© {year} Gunnar Morgan</p>
          <div className="flex items-center gap-5 text-[13px] text-muted">
            <a
              href="https://www.linkedin.com/in/gunnarmorgan"
              target="_blank"
              rel="noreferrer"
              className="hover-pill focus-ring transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href="mailto:grmconcepts@gmail.com"
              className="hover-pill focus-ring transition-colors hover:text-ink"
            >
              Email
            </a>
            <a
              href="/resume/Gunnar-Morgan-Resume-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-pill focus-ring transition-colors hover:text-ink"
            >
              Resume
            </a>
            <a href="#top" className="hover-pill focus-ring transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
