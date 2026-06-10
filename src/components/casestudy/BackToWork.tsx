import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'

export function BackToWork() {
  return (
    <div className="pt-24">
      <Container>
        <Link
          to="/#work"
          className="hover-pill focus-ring group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
        >
          <span
            aria-hidden
            className="transition-[transform,color] duration-200 group-hover:text-accent motion-safe:group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Back to work
        </Link>
      </Container>
    </div>
  )
}
