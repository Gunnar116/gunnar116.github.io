import { useRef, type ReactNode, type MouseEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Wraps card media in a relative surface with a soft, cursor-following
 * highlight (`.ic-glow`). The highlight tracks the pointer via CSS vars and
 * fades on leave. Pointer tracking is skipped when the user prefers reduced
 * motion (the glow is also hidden by CSS in that case), and it never blocks
 * pointer events or affects layout.
 */
export function InteractiveCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const reduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <div ref={ref} className={`ic ${className}`} onMouseMove={reduced ? undefined : onMove}>
      <span className="ic-glow" aria-hidden />
      {children}
    </div>
  )
}
