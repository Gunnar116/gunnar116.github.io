import { useEffect, useRef, useState } from 'react'
import { Container } from '../layout/Container'
import { ClickableImage } from '../Lightbox'
import { OutlineLink } from '../OutlineLink'
import { ChapterImageCarousel } from './ChapterImageCarousel'
import { ProductScreenFrame } from './ProductScreenFrame'

type Chapter = {
  index: string
  label: string
  title: string
  summary: string
  /** Optional subtle system/process callouts — used for text-only chapters that carry no product visual. */
  points?: Array<{ title: string; body: string }>
  image?: string
  imageAlt?: string
  /** Optional supporting gallery — additional images shown as a carousel */
  images?: Array<{
    src: string
    alt: string
  }>
  /** Carousel layout — 'single' (default) or 'three-up' */
  imagesLayout?: 'single' | 'three-up'
  /**
   * Optional scrollable product screenshot. Takes precedence over `image`
   * when set. Renders the full source inside a fixed-height scrollable
   * viewport with an "Open full image" link in the header.
   */
  scrollableImage?: {
    src: string
    alt: string
    height?: number
    label?: string
  }
  liveUrl?: string
  liveLabel?: string
  note?: string
  embed?: {
    url: string
    title: string
    /** 'prototype' (default) scales a fixed canvas; 'document' is a tall responsive iframe. */
    kind?: 'prototype' | 'document'
    height?: number
    naturalWidth?: number
    naturalHeight?: number
    variant?: 'default' | 'wide'
    badgeLabel?: string
    openLabel?: string
  }
}

type Props = {
  chapters: Chapter[]
}

export function CaseStudyChapters({ chapters }: Props) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">Chapters</span>
          <h2 className="mt-3 text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-ink">
            What the work covers.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-muted">
            Each chapter is a self-contained piece of the larger product experience.
          </p>
        </div>

        <ol className="mt-12 sm:mt-16 space-y-16 sm:space-y-20">
          {chapters.map((c) => (
            <li
              key={c.index}
              className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-border-strong pt-6 sm:pt-8"
            >
              {/* Index + label column */}
              <div className="col-span-12 sm:col-span-3">
                <div className="text-[12px] font-semibold tabular-nums tracking-[0.14em] text-accent-strong">
                  {c.index}
                </div>
                <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {c.label}
                </div>
              </div>

              {/* Title + summary column */}
              <div className="col-span-12 sm:col-span-9">
                <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold tracking-[-0.015em] leading-[1.25] text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[16px] sm:text-[16.5px] leading-[1.65] text-body">
                  {c.summary}
                </p>

                {c.points && c.points.length > 0 && (
                  <ul className="mt-7 grid max-w-2xl gap-x-8 gap-y-4 sm:grid-cols-2">
                    {c.points.map((pt) => (
                      <li key={pt.title} className="border-t border-border pt-3">
                        <div className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
                          {pt.title}
                        </div>
                        <div className="mt-1 text-[14px] leading-[1.55] text-muted">
                          {pt.body}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Interactive embed (iframe) — full row width, optional wide breakout */}
              {c.embed && (
                <div
                  className={
                    c.embed.variant === 'wide'
                      ? 'col-span-12 -mx-6 sm:-mx-8 lg:-mx-12 2xl:-mx-32'
                      : 'col-span-12'
                  }
                >
                  <ChapterEmbed embed={c.embed} />
                </div>
              )}

              {/* Scrollable product screenshot — takes precedence over `image`.
                  Spans full row width. No lightbox to avoid scroll conflicts. */}
              {!c.embed && c.scrollableImage && (
                <div className="col-span-12">
                  <ProductScreenFrame
                    src={c.scrollableImage.src}
                    alt={c.scrollableImage.alt}
                    height={c.scrollableImage.height}
                    label={c.scrollableImage.label}
                  />
                </div>
              )}

              {/* Image — full row width, lightbox-enabled */}
              {!c.embed && !c.scrollableImage && c.image && (
                <div className="col-span-12">
                  <figure className="overflow-hidden rounded-2xl border border-border bg-cream-tint">
                    <ClickableImage src={c.image} alt={c.imageAlt ?? c.title} />
                  </figure>
                </div>
              )}

              {/* Image carousel — full row width when it's the sole visual,
                  indented under the text column when sitting beneath a main image. */}
              {!c.embed && c.images && c.images.length > 0 && (
                <div
                  className={
                    c.image
                      ? 'col-span-12 sm:col-span-9 sm:col-start-4'
                      : 'col-span-12'
                  }
                >
                  <ChapterImageCarousel
                    images={c.images}
                    layout={c.imagesLayout}
                    label={`${c.title} — image carousel`}
                  />
                </div>
              )}

              {/* Live link + optional note row — aligned under the title column */}
              {(c.liveUrl || c.note) && (
                <div className="col-span-12 sm:col-span-9 sm:col-start-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
                  {c.liveUrl && (
                    <OutlineLink href={c.liveUrl} arrow="↗" size="sm" external>
                      {c.liveLabel ?? 'View live prototype'}
                    </OutlineLink>
                  )}
                  {c.note && <span className="italic">{c.note}</span>}
                </div>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/**
 * Polished iframe frame used for two kinds of embeds:
 *
 *  - 'prototype' (default) — a fixed-canvas interactive demo. JS-driven
 *    transform scale fits the natural canvas into the container width.
 *    Interactions remain pixel-accurate because transform: scale doesn't
 *    affect event coordinates.
 *
 *  - 'document' — a responsive long-form artifact (report, doc, slide deck).
 *    The iframe renders at 100% width and a fixed tall height; content
 *    scrolls inside the iframe.
 */
function ChapterEmbed({ embed }: { embed: NonNullable<Chapter['embed']> }) {
  const kind = embed.kind ?? 'prototype'
  const badgeLabel =
    embed.badgeLabel ?? (kind === 'document' ? 'Report artifact' : 'Interactive prototype')
  const openLabel = embed.openLabel ?? 'Open in new tab'

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-cream-tint">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#3F8B6E]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            {badgeLabel}
          </span>
        </div>
        <OutlineLink href={embed.url} arrow="↗" size="xs" external>
          {openLabel}
        </OutlineLink>
      </div>

      {kind === 'document' ? (
        <DocumentEmbed embed={embed} />
      ) : (
        <PrototypeEmbed embed={embed} />
      )}
    </figure>
  )
}

function PrototypeEmbed({ embed }: { embed: NonNullable<Chapter['embed']> }) {
  const naturalWidth = embed.naturalWidth ?? 1280
  const naturalHeight = embed.naturalHeight ?? embed.height ?? 720

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const update = () => {
      const width = el.clientWidth
      const next = Math.min(1, width / naturalWidth)
      setScale(next)
    }

    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [naturalWidth])

  const displayHeight = Math.max(320, Math.round(naturalHeight * scale))

  return (
    <div
      ref={wrapperRef}
      className="relative bg-cream"
      style={{ height: `${displayHeight}px`, overflow: 'hidden' }}
    >
      <iframe
        src={embed.url}
        title={embed.title}
        loading="lazy"
        className="block border-0 bg-cream"
        style={{
          width: `${naturalWidth}px`,
          height: `${naturalHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}

function DocumentEmbed({ embed }: { embed: NonNullable<Chapter['embed']> }) {
  // Tall responsive iframe — content scrolls inside.
  // Default ~900px desktop, slightly shorter on mobile via CSS clamp.
  const height = embed.height ?? embed.naturalHeight ?? 900
  return (
    <div className="bg-surface">
      <iframe
        src={embed.url}
        title={embed.title}
        loading="lazy"
        className="block w-full border-0 bg-surface"
        style={{ height: `clamp(560px, 80vh, ${height}px)` }}
      />
    </div>
  )
}
