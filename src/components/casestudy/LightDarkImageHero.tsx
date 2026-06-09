import { useState } from 'react'
import { useLightbox } from '../Lightbox'

type Variant = { src: string; alt: string }

type Props = {
  light: Variant
  dark: Variant
}

/**
 * Stylized case-study hero: the product screen floats inside a browser frame
 * on a Kindness-tinted gradient backdrop, rising and bleeding off the bottom
 * edge of the panel for depth. A Light / Dark segmented control in the header
 * swaps the screenshot (and the whole panel theme) live. Click the screen to
 * open the active variant in the lightbox.
 */
export function LightDarkImageHero({ light, dark }: Props) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const isDark = mode === 'dark'
  const active = isDark ? dark : light
  const { open } = useLightbox()

  // Layered gradient backdrop, tinted with the Kindness token families
  // (Kindigo indigo, Kindness coral, Kindle warm). Calm, low-contrast glows.
  const backdrop = isDark
    ? 'radial-gradient(120% 90% at 12% 0%, rgba(72,99,219,0.26) 0%, rgba(72,99,219,0) 55%),' +
      'radial-gradient(110% 80% at 100% 100%, rgba(214,48,78,0.20) 0%, rgba(214,48,78,0) 55%),' +
      'radial-gradient(90% 70% at 85% 5%, rgba(235,147,95,0.10) 0%, rgba(235,147,95,0) 60%),' +
      'linear-gradient(160deg, #17171d 0%, #101015 100%)'
    : 'radial-gradient(120% 90% at 10% 0%, rgba(90,115,223,0.18) 0%, rgba(90,115,223,0) 55%),' +
      'radial-gradient(110% 80% at 100% 100%, rgba(223,90,115,0.16) 0%, rgba(223,90,115,0) 55%),' +
      'radial-gradient(90% 70% at 88% 8%, rgba(235,147,95,0.12) 0%, rgba(235,147,95,0) 60%),' +
      'linear-gradient(160deg, #fbfaf7 0%, #f3f1fb 100%)'

  return (
    <figure
      className={
        'relative overflow-hidden rounded-[1.75rem] border transition-colors duration-300 ' +
        (isDark ? 'border-[#2c2c34]' : 'border-border')
      }
      style={{ backgroundImage: backdrop }}
    >
      {/* faint inner ring for crispness against either backdrop */}
      <div
        aria-hidden
        className={
          'pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ' +
          (isDark ? 'ring-white/[0.04]' : 'ring-black/[0.04]')
        }
      />

      {/* Header strip: Light/Dark toggle, floating over the backdrop */}
      <div className="relative flex items-center justify-end px-5 py-4 sm:px-7 sm:py-5">
        <div
          role="tablist"
          aria-label="Color mode"
          className={
            'inline-flex items-center gap-1 rounded-full border p-[2px] backdrop-blur-sm transition-colors duration-300 ' +
            (isDark
              ? 'border-white/10 bg-white/5'
              : 'border-black/[0.06] bg-white/55')
          }
        >
          <ModeButton active={!isDark} isDarkChrome={isDark} onClick={() => setMode('light')}>
            Light
          </ModeButton>
          <ModeButton active={isDark} isDarkChrome={isDark} onClick={() => setMode('dark')}>
            Dark
          </ModeButton>
        </div>
      </div>

      {/* Floating browser-framed screen — rises from the bottom and bleeds off */}
      <div className="relative px-5 pt-1 sm:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => open({ src: active.src, alt: active.alt })}
          aria-label={`Enlarge image: ${active.alt}`}
          className="group block w-full cursor-zoom-in border-0 bg-transparent p-0"
        >
          <div
            className={
              'overflow-hidden rounded-t-2xl border-x border-t transition-colors duration-300 ' +
              (isDark ? 'border-[#33333d] bg-[#1b1b21]' : 'border-[#e9e7e0] bg-white')
            }
            style={{
              maxHeight: 'min(62vh, 30rem)',
              boxShadow: isDark
                ? '0 32px 64px -28px rgba(0,0,0,0.7), 0 8px 20px -12px rgba(0,0,0,0.5)'
                : '0 32px 64px -28px rgba(40,40,70,0.42), 0 8px 20px -12px rgba(40,40,70,0.18)',
            }}
          >
            {/* Browser chrome: traffic lights + URL pill */}
            <div
              className={
                'flex items-center gap-3 border-b px-4 py-2.5 transition-colors duration-300 ' +
                (isDark ? 'border-[#2a2a32] bg-[#22222a]' : 'border-[#efede7] bg-[#f7f6f2]')
              }
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div
                className={
                  'mx-auto flex max-w-[280px] flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-[11px] font-medium transition-colors duration-300 ' +
                  (isDark ? 'bg-[#15151a] text-[#8e90a2]' : 'bg-white text-[#8a8778]')
                }
              >
                <LockIcon className={isDark ? 'text-[#6f7183]' : 'text-[#b3b0a4]'} />
                app.kindness.ai/inbox
              </div>
              <div className="w-[52px]" aria-hidden />
            </div>

            <img
              src={active.src}
              alt={active.alt}
              loading="eager"
              draggable={false}
              className="block h-auto w-full select-none object-top transition-transform duration-300 group-hover:scale-[1.004]"
            />
          </div>
        </button>
      </div>
    </figure>
  )
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

function ModeButton({
  active,
  isDarkChrome,
  onClick,
  children,
}: {
  active: boolean
  isDarkChrome: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        'rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-150 ' +
        (active
          ? isDarkChrome
            ? 'bg-white/90 text-[#17171d] shadow-sm'
            : 'bg-white text-ink shadow-sm'
          : isDarkChrome
            ? 'text-[#b9bccc] hover:text-white'
            : 'text-muted hover:text-ink')
      }
    >
      {children}
    </button>
  )
}
