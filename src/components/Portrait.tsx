type Props = {
  /** Sizing/positioning applied to the outer wrapper. */
  className?: string
  /** Crop ratio of the photo. Defaults to a 4/5 editorial portrait. */
  ratio?: string
  /** Hint the browser to load this image eagerly (above-the-fold heroes). */
  eager?: boolean
}

/**
 * Editorial framed portrait of Gunnar. A soft matted frame (subtle border +
 * inner padding + shadow) rather than a generic circular avatar. Lifts gently
 * on hover and eases the photo in slightly — both motion-gated, so it's a no-op
 * under prefers-reduced-motion. No rotation/translation, so it never pushes
 * past its column or causes horizontal overflow.
 */
export function Portrait({ className = '', ratio = '4/5', eager = false }: Props) {
  return (
    <figure className={`group relative ${className}`}>
      <div className="rounded-[22px] border border-border bg-surface p-2 shadow-[0_28px_64px_-36px_rgba(20,20,20,0.42)] transition-[transform,box-shadow] duration-500 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[0_34px_72px_-34px_rgba(20,20,20,0.46)]">
        <div className="overflow-hidden rounded-[15px] bg-cream-tint">
          <img
            src="/images/gunnar-portrait.jpg"
            alt="Gunnar Morgan"
            width={1182}
            height={1772}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
            style={{ aspectRatio: ratio }}
          />
        </div>
      </div>
    </figure>
  )
}
