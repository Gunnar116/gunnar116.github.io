import { Portrait } from './Portrait'
import { Reveal } from './Reveal'

/**
 * Hero portrait wrapped in a subtle "complexity to clarity" systems layer:
 * a faint dot-grid behind (architecture) and a few small system cards anchored
 * OUTSIDE the portrait frame, related to it by thin connector lines that reach
 * the frame edges (not the person). It reads as a quiet product-system diagram
 * around a personal photo, with the portrait kept as the clear focal point.
 *
 * Cards reveal with a gentle stagger (motion-safe; static under reduced motion
 * via the shared .reveal styles) and are progressively revealed by breakpoint
 * so the hero never crowds or overflows: one card on mobile, two from sm, three
 * from lg.
 */
type CardProps = {
  label: string
  text: string
  /** Which side the connector points toward the portrait frame. */
  connector: 'toRight' | 'toLeft'
  /** Positioning + responsive visibility for the card. */
  className: string
  /** Visibility classes for the connector (lets the mobile card drop it). */
  connectorClassName?: string
  delay: number
}

function SystemCard({
  label,
  text,
  connector,
  className,
  connectorClassName = 'inline-flex',
  delay,
}: CardProps) {
  const node = <span className="h-1 w-1 shrink-0 rounded-full bg-accent ring-[3px] ring-accent-soft" />
  const line = <span className="h-px w-4 bg-border-strong/55" />
  return (
    <Reveal delay={delay} className={`absolute z-20 ${className}`}>
      <div className="relative w-[112px] rounded-[10px] border border-border/70 bg-surface/90 px-2.5 py-1.5 shadow-[0_10px_26px_-18px_rgba(20,20,20,0.34)] backdrop-blur-sm sm:w-[128px]">
        <div className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-accent-strong/85">
          {label}
        </div>
        <div className="mt-0.5 text-[10.5px] leading-snug text-muted-soft">{text}</div>

        {connector === 'toRight' ? (
          <span
            aria-hidden
            className={`absolute left-full top-1/2 -translate-y-1/2 items-center ${connectorClassName}`}
          >
            {line}
            {node}
          </span>
        ) : (
          <span
            aria-hidden
            className={`absolute right-full top-1/2 -translate-y-1/2 items-center ${connectorClassName}`}
          >
            {node}
            {line}
          </span>
        )}
      </div>
    </Reveal>
  )
}

export function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]">
      {/* Faint dot-grid / architecture layer, fading out at the edges. */}
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

      {/* SYSTEM — outside the upper-left frame edge (sm and up). */}
      <SystemCard
        label="System"
        text="reusable patterns"
        connector="toRight"
        delay={320}
        className="top-8 right-full mr-3 hidden sm:block"
      />

      {/* WORKFLOW — outside the lower-left frame edge (lg only). */}
      <SystemCard
        label="Workflow"
        text="fewer decision points"
        connector="toRight"
        delay={460}
        className="bottom-12 right-full mr-3 hidden lg:block"
      />

      {/* CLARITY — anchored just off the bottom-right frame corner. Stays
          within the column (the portrait is right-aligned, so it can't flank
          fully outside the right edge without clipping). Connector reaches back
          toward the frame from sm up. */}
      <SystemCard
        label="Clarity"
        text="structure over noise"
        connector="toLeft"
        delay={400}
        connectorClassName="hidden sm:inline-flex"
        className="-bottom-5 -right-3 sm:-right-5 lg:-right-6"
      />
    </div>
  )
}
