type Props = {
  src: string
  alt: string
  /** Height of the scrollable viewport in CSS pixels. Wrapped in clamp() so
   *  it stays usable on shorter laptops and mobile. Default 760. */
  height?: number
  /** Header badge label. Default "PRODUCT SCREEN". */
  label?: string
  /** Optional title for the new-tab link (defaults to alt). */
  title?: string
}

/**
 * A polished frame for tall product screenshots. The full source image
 * renders inside a fixed-height viewport that scrolls vertically, so a
 * visitor can explore the page without the case study layout fighting it.
 *
 * Intentionally no lightbox click handler: scrolling inside the frame
 * would conflict with click-to-zoom. The header bar instead links to
 * the source image so users who want a full-size view can open it in a
 * new tab.
 */
export function ProductScreenFrame({
  src,
  alt,
  height = 760,
  label = 'PRODUCT SCREEN',
  title,
}: Props) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-cream-tint">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#5B4E91]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            {label}
          </span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          title={title ?? alt}
          className="group inline-flex items-center gap-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
        >
          Open full image
          <span aria-hidden>↗</span>
        </a>
      </div>

      <div
        className="overflow-y-auto overflow-x-hidden bg-surface"
        style={{ height: `clamp(440px, 72vh, ${height}px)` }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full select-none"
          draggable={false}
        />
      </div>
    </figure>
  )
}
