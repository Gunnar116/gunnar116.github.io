import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

type LightboxItem = { src: string; alt: string }

type LightboxOpenInput =
  | LightboxItem
  | { items: LightboxItem[]; index?: number }

type LightboxContextValue = {
  open: (input: LightboxOpenInput) => void
  close: () => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[] | null>(null)
  const [index, setIndex] = useState(0)
  const previousFocus = useRef<HTMLElement | null>(null)

  const open = useCallback((input: LightboxOpenInput) => {
    previousFocus.current = document.activeElement as HTMLElement | null
    if ('items' in input) {
      const safeItems = input.items
      const safeIndex = Math.max(0, Math.min(input.index ?? 0, safeItems.length - 1))
      setItems(safeItems)
      setIndex(safeIndex)
    } else {
      setItems([{ src: input.src, alt: input.alt }])
      setIndex(0)
    }
  }, [])

  const close = useCallback(() => {
    setItems(null)
    requestAnimationFrame(() => {
      previousFocus.current?.focus?.()
    })
  }, [])

  // Esc closes; ArrowLeft / ArrowRight navigate when there's a set
  useEffect(() => {
    if (!items) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      } else if (e.key === 'ArrowRight' && items.length > 1) {
        e.preventDefault()
        setIndex((i) => (i + 1) % items.length)
      } else if (e.key === 'ArrowLeft' && items.length > 1) {
        e.preventDefault()
        setIndex((i) => (i - 1 + items.length) % items.length)
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [items, close])

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {items ? (
        <LightboxModal
          items={items}
          index={index}
          onIndexChange={setIndex}
          onClose={close}
        />
      ) : null}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) {
    throw new Error('useLightbox must be used inside <LightboxProvider />')
  }
  return ctx
}

/** Image that opens a full-screen lightbox on click. */
export function ClickableImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const { open } = useLightbox()
  return (
    <button
      type="button"
      onClick={() => open({ src, alt })}
      aria-label={`Enlarge image: ${alt}`}
      className="group block w-full cursor-zoom-in border-0 bg-transparent p-0"
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`block h-auto w-full transition-transform duration-300 group-hover:scale-[1.005] ${className}`}
      />
    </button>
  )
}

function LightboxModal({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[]
  index: number
  onIndexChange: (next: number) => void
  onClose: () => void
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const item = items[index]
  const count = items.length
  const hasSet = count > 1

  useEffect(() => {
    closeBtnRef.current?.focus()
  }, [])

  const prev = () => onIndexChange((index - 1 + count) % count)
  const next = () => onIndexChange((index + 1) % count)

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8 animate-[fadeIn_150ms_ease-out]"
      style={{ animationFillMode: 'both' }}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-ink shadow-md transition-transform hover:scale-105 sm:top-6 sm:right-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 3l10 10M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {hasSet && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink shadow-md transition-transform hover:scale-105 sm:left-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink shadow-md transition-transform hover:scale-105 sm:right-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            aria-live="polite"
            className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-cream/95 px-3 py-1.5 text-[12px] font-medium tabular-nums tracking-[0.04em] text-ink shadow-md sm:bottom-6"
          >
            {index + 1} <span className="text-muted">/</span> {count}
          </div>
        </>
      )}

      <img
        key={item.src}
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="block max-h-[92vh] w-auto max-w-[min(1600px,100%)] rounded-xl shadow-2xl animate-[fadeIn_180ms_ease-out]"
        style={{ animationFillMode: 'both' }}
      />
    </div>,
    document.body,
  )
}
