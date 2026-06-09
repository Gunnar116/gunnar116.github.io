import { useCallback, useEffect, useRef, useState } from 'react'
import { useLightbox } from '../Lightbox'

type CarouselImage = {
  src: string
  alt: string
}

type Props = {
  images: CarouselImage[]
  /**
   * 'single'     — one image per slide, controls cycle individual images.
   * 'three-up'   — up to 3 images per slide on desktop (2 on tablet, 1 on mobile),
   *                controls cycle by group. Counter shows page count.
   */
  layout?: 'single' | 'three-up'
  /** Optional aria-label for the carousel region. */
  label?: string
}

/**
 * Reusable chapter-level image carousel.
 * - Click any image to open the lightbox positioned on that image.
 * - The lightbox receives the full image set so prev/next inside the
 *   lightbox navigates across all images, not just the current page.
 * - Keyboard arrows navigate carousel pages when focus is inside the region.
 */
export function ChapterImageCarousel({ images, layout = 'single', label }: Props) {
  const { open } = useLightbox()
  const regionRef = useRef<HTMLDivElement>(null)
  const itemsPerView = useItemsPerView(layout)
  const [pageIndex, setPageIndex] = useState(0)

  const total = images.length
  const pageCount = Math.max(1, Math.ceil(total / itemsPerView))

  // Clamp pageIndex when itemsPerView (and pageCount) change due to resize
  useEffect(() => {
    setPageIndex((p) => Math.min(p, pageCount - 1))
  }, [pageCount])

  const goToPage = useCallback(
    (next: number) => {
      const wrapped = ((next % pageCount) + pageCount) % pageCount
      setPageIndex(wrapped)
    },
    [pageCount],
  )

  const prevPage = useCallback(() => goToPage(pageIndex - 1), [goToPage, pageIndex])
  const nextPage = useCallback(() => goToPage(pageIndex + 1), [goToPage, pageIndex])

  // Keyboard arrows when focus is inside the carousel
  useEffect(() => {
    const el = regionRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevPage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextPage()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [prevPage, nextPage])

  if (total === 0) return null

  const startIdx = pageIndex * itemsPerView
  const endIdx = Math.min(startIdx + itemsPerView, total)
  const visible = images.slice(startIdx, endIdx)

  const openAt = (globalIdx: number) =>
    open({
      items: images.map(({ src, alt }) => ({ src, alt })),
      index: globalIdx,
    })

  // Three-up uses a taller stage so portrait phones can grow without losing
  // vertical room to gaps. Single stays as it was.
  const stageHeight =
    layout === 'three-up' ? 'clamp(440px, 66vh, 700px)' : 'clamp(380px, 60vh, 620px)'

  // Three-up: tight centered triptych — flex with capped max-width and a
  // small bottom-aligned gap so portrait phones read as one composition.
  // Single: a single centered cell.
  const groupClass =
    layout === 'three-up'
      ? 'mx-auto flex h-full max-w-[900px] items-end justify-center gap-2.5 sm:gap-3 lg:gap-4'
      : 'grid h-full grid-cols-1'

  // Three-up sits flush against the stage so the triptych dominates;
  // single keeps the original generous padding for landscape report pages.
  const stagePadClass = layout === 'three-up' ? 'p-2 sm:p-3' : 'p-3 sm:p-5'

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label ?? 'Image carousel'}
      className="relative"
    >
      {/* Slide stage */}
      <div
        className={`overflow-hidden rounded-xl border border-border bg-cream-tint ${stagePadClass}`}
        style={{ height: stageHeight }}
      >
        <div className={groupClass} key={pageIndex}>
          {visible.map((img, i) => {
            const globalIdx = startIdx + i
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => openAt(globalIdx)}
                aria-label={`Enlarge image: ${img.alt}`}
                className={
                  layout === 'three-up'
                    ? 'group flex h-full min-h-0 cursor-zoom-in items-end justify-center border-0 bg-transparent p-0'
                    : 'group flex h-full min-h-0 w-full cursor-zoom-in items-center justify-center border-0 bg-transparent p-0'
                }
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="block h-full max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01] animate-[fadeIn_180ms_ease-out]"
                  style={{ animationFillMode: 'both' }}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Preload the first image of the next page so the first paginate has no flicker */}
      {pageCount > 1 && (
        <PreloadNextPage
          images={images}
          itemsPerView={itemsPerView}
          pageIndex={pageIndex}
          pageCount={pageCount}
        />
      )}

      {/* Controls row */}
      {pageCount > 1 && (
        <div className="mt-3 flex items-center justify-between gap-4">
          {/* Prev / next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              aria-label="Previous slide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-border-strong hover:bg-cream-tint focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextPage}
              aria-label="Next slide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-border-strong hover:bg-cream-tint focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Dot pagination — one dot per page */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === pageIndex}
                aria-label={`Show slide ${i + 1} of ${pageCount}`}
                onClick={() => goToPage(i)}
                className={`h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                  i === pageIndex ? 'w-6 bg-ink' : 'w-1.5 bg-muted-soft hover:bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Page counter */}
          <div
            aria-live="polite"
            className="text-[12px] font-medium tabular-nums tracking-[0.04em] text-muted"
          >
            {pageIndex + 1} <span className="text-muted-soft">/</span> {pageCount}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Responsive items-per-view.
 * - layout 'single':   always 1
 * - layout 'three-up': mobile=1, tablet (≥640px)=2, desktop (≥1024px)=3
 */
function useItemsPerView(layout: 'single' | 'three-up') {
  const [n, setN] = useState(() => {
    if (layout === 'single' || typeof window === 'undefined') return 1
    if (window.matchMedia('(min-width: 1024px)').matches) return 3
    if (window.matchMedia('(min-width: 640px)').matches) return 2
    return 1
  })

  useEffect(() => {
    if (layout === 'single') {
      setN(1)
      return
    }
    const mqLg = window.matchMedia('(min-width: 1024px)')
    const mqSm = window.matchMedia('(min-width: 640px)')
    const compute = () => setN(mqLg.matches ? 3 : mqSm.matches ? 2 : 1)
    compute()
    mqLg.addEventListener('change', compute)
    mqSm.addEventListener('change', compute)
    return () => {
      mqLg.removeEventListener('change', compute)
      mqSm.removeEventListener('change', compute)
    }
  }, [layout])

  return n
}

/** Invisible preloader for the first image of the next page. */
function PreloadNextPage({
  images,
  itemsPerView,
  pageIndex,
  pageCount,
}: {
  images: CarouselImage[]
  itemsPerView: number
  pageIndex: number
  pageCount: number
}) {
  const nextPageIdx = (pageIndex + 1) % pageCount
  const nextFirst = images[nextPageIdx * itemsPerView]
  if (!nextFirst) return null
  return <img src={nextFirst.src} alt="" aria-hidden className="hidden" />
}
