import { Portrait } from './Portrait'
import { Reveal } from './Reveal'

/**
 * Hero portrait with a small "design focus" layer: four concept cards naming
 * what the work is about (systems, workflows, AI with user control, product
 * logic), plus a faint dot-grid behind for a quiet sense of structure.
 *
 * On desktop (lg+) the cards float at the four corners of the portrait as a
 * supporting layer beside the photo (no connector lines, face never covered).
 * Below lg they drop into a clean 2x2 grid under the portrait so nothing
 * crowds or overflows. Each card has a subtle accent outline and a tactile
 * hover (lift + deeper shadow + slightly stronger border), all motion-safe and
 * static under prefers-reduced-motion. The portrait stays the focal point.
 */
type Card = { label: string; text: string }

const CARDS: Card[] = [
  { label: 'SYSTEMS', text: 'Shared patterns for faster, clearer product work.' },
  { label: 'WORKFLOWS', text: 'Messy processes translated into usable paths.' },
  { label: 'AI + CONTROL', text: 'Assisted experiences that keep users in the loop.' },
  { label: 'PRODUCT LOGIC', text: 'Clear structure behind simple interfaces.' },
]

function CardBody({ label, text }: Card) {
  return (
    <div className="w-full rounded-[10px] border border-accent/30 bg-surface/90 px-3 py-2 shadow-[0_10px_24px_-18px_rgba(20,20,20,0.3)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-accent/55 hover:shadow-[0_18px_38px_-20px_rgba(20,20,20,0.42)] motion-safe:hover:-translate-y-[5px]">
      <div className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-accent-strong/85">
        {label}
      </div>
      <div className="mt-1 text-[10.5px] leading-snug text-muted">{text}</div>
    </div>
  )
}

/** Floating card placements at the four corners (desktop only). */
const FLOATING = [
  { card: CARDS[0], className: 'top-6 -left-16', delay: 320 }, // SYSTEMS — top-left
  { card: CARDS[3], className: 'top-6 -right-9', delay: 380 }, // PRODUCT LOGIC — top-right
  { card: CARDS[1], className: 'bottom-14 -left-20', delay: 460 }, // WORKFLOWS — lower-left
  { card: CARDS[2], className: '-bottom-4 -right-9', delay: 420 }, // AI + CONTROL — lower-right
]

export function HeroVisual() {
  return (
    <div className="w-full">
      <div className="relative isolate mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:mx-0 lg:ml-auto lg:max-w-[320px]">
        {/* Faint dot-grid / structure layer, fading out at the edges. */}
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 opacity-50 sm:-inset-12"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-border-strong) 1px, transparent 1.4px)',
            backgroundSize: '22px 22px',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 68% at 50% 44%, #000 26%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse 70% 68% at 50% 44%, #000 26%, transparent 70%)',
          }}
        />

        {/* Portrait — the clear focal point. */}
        <Portrait eager className="relative z-10 w-full" />

        {/* Floating concept cards at the four corners (desktop only). */}
        {FLOATING.map((f) => (
          <Reveal
            key={f.card.label}
            delay={f.delay}
            className={`absolute z-20 hidden w-[150px] lg:block ${f.className}`}
          >
            <CardBody {...f.card} />
          </Reveal>
        ))}
      </div>

      {/* Compact 2x2 grid under the portrait (mobile + tablet). */}
      <div className="mx-auto mt-6 grid max-w-[400px] grid-cols-2 gap-2.5 lg:hidden">
        {CARDS.map((c, i) => (
          <Reveal key={c.label} delay={i * 90}>
            <CardBody {...c} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
