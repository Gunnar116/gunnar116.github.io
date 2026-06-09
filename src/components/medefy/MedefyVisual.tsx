import type { MedefyChapter } from '../../data/medefyChapters'
import { ChatVisual } from './visuals/ChatVisual'
import { MobileAppVisual } from './visuals/MobileAppVisual'
import { AccessibilityVisual } from './visuals/AccessibilityVisual'
import { SystemVisual } from './visuals/SystemVisual'

type Props = {
  variant: MedefyChapter['visual']
  /** Optional real preview image. When set, replaces the illustrated placeholder. */
  image?: MedefyChapter['image']
}

/**
 * Wraps each Medefy chapter visual in a uniform tinted surface.
 * The sage tint lives here, not on the section, so Medefy reads
 * as a featured story rather than a separate branded block.
 *
 * Prefers a real case-study preview image when one is provided; otherwise
 * falls back to the abstract illustrated visual keyed off `variant`.
 */
export function MedefyVisual({ variant, image }: Props) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8EEE8]">
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
          style={{ objectPosition: image.position ?? 'center' }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
          {variant === 'chat' && <ChatVisual />}
          {variant === 'mobile' && <MobileAppVisual />}
          {variant === 'accessibility' && <AccessibilityVisual />}
          {variant === 'system' && <SystemVisual />}
        </div>
      )}
    </div>
  )
}
