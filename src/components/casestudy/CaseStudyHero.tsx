import { Container } from '../layout/Container'
import { CaseVisual } from '../CaseVisual'
import { ClickableImage, useLightbox } from '../Lightbox'
import { MedefyStylizedBackdrop } from '../MedefyStylizedBackdrop'
import { ProductScreenFrame } from './ProductScreenFrame'
import { LightDarkImageHero } from './LightDarkImageHero'

type HeroVariant = 'medefy' | 'truops-platform' | 'truops-website' | 'fortress' | 'kindness-ai' | 'none'

type Props = {
  variant: HeroVariant
  image?: {
    src: string
    alt: string
    treatment?: 'medefy-stylized'
  }
  scrollableImage?: {
    src: string
    alt: string
    height?: number
    label?: string
  }
  imagePair?: {
    light: { src: string; alt: string }
    dark: { src: string; alt: string }
    label?: string
  }
}

const tintMap: Record<
  Exclude<HeroVariant, 'none'>,
  'medefy' | 'truops' | 'website' | 'fortress' | 'kindness'
> = {
  medefy: 'medefy',
  'truops-platform': 'truops',
  'truops-website': 'website',
  fortress: 'fortress',
  'kindness-ai': 'kindness',
}

/**
 * Renders a case study hero. Prefers a real image when one is provided
 * (e.g. a composed editorial mockup); falls back to the abstract CaseVisual
 * placeholder keyed off `variant`. When the image opts into a stylized
 * treatment, the hero swaps its plain frame for a designed backdrop with
 * the image floating on top.
 */
export function CaseStudyHero({ variant, image, scrollableImage, imagePair }: Props) {
  if (imagePair) {
    return (
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container size="wide">
          <LightDarkImageHero light={imagePair.light} dark={imagePair.dark} />
        </Container>
      </section>
    )
  }

  if (scrollableImage) {
    return (
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container size="wide">
          <ProductScreenFrame
            src={scrollableImage.src}
            alt={scrollableImage.alt}
            height={scrollableImage.height}
            label={scrollableImage.label}
          />
        </Container>
      </section>
    )
  }

  if (image?.treatment === 'medefy-stylized') {
    return (
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container size="wide">
          <MedefyStylizedHero src={image.src} alt={image.alt} />
        </Container>
      </section>
    )
  }

  if (image) {
    return (
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container size="wide">
          <figure className="overflow-hidden rounded-2xl">
            <ClickableImage src={image.src} alt={image.alt} loading="eager" />
          </figure>
        </Container>
      </section>
    )
  }

  if (variant === 'none') return null

  const tint = tintMap[variant]
  return (
    <section className="pb-16 sm:pb-20 lg:pb-24">
      <Container size="wide">
        <CaseVisual variant={variant} tint={tint} />
      </Container>
    </section>
  )
}

/**
 * Medefy hero variant: shared stylized backdrop + triptych on top, click to
 * open the source image in the lightbox. Aspect runs taller on mobile and
 * widens on desktop so the phones stay generously sized at both ends.
 */
function MedefyStylizedHero({ src, alt }: { src: string; alt: string }) {
  const { open } = useLightbox()
  return (
    <button
      type="button"
      onClick={() => open({ src, alt })}
      aria-label={`Enlarge image: ${alt}`}
      className="group relative block aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-2xl border-0 bg-transparent p-0"
    >
      <MedefyStylizedBackdrop />
      <img
        src={src}
        alt={alt}
        loading="eager"
        className="relative h-full w-full object-contain object-bottom px-6 pt-10 pb-3 sm:px-12 sm:pt-14 sm:pb-4 lg:px-20 lg:pt-16 lg:pb-6 transition-transform duration-300 group-hover:scale-[1.005]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]"
      />
    </button>
  )
}
