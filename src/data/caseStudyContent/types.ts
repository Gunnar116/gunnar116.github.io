/**
 * Case study content shape. All long-form fields are optional —
 * the CaseStudyPage renders only the sections that have content.
 * Mark placeholder text with `[Placeholder]` so it's easy to grep
 * and replace when real content is ready.
 */
export type CaseStudyContent = {
  /** URL slug, e.g. "medefy" → /work/medefy */
  slug: string

  /** Header */
  eyebrow: string
  title: string
  subtitle: string

  /** Meta block — what + when + with whom */
  role: string
  timeline: string
  team?: string
  focusAreas: string[]

  /** Hero visual variant — keys into a registry on the page. Used when no heroImage is provided. */
  heroVisual?:
    | 'medefy'
    | 'truops-platform'
    | 'truops-website'
    | 'fortress'
    | 'kindness-ai'
    | 'none'

  /** Optional image hero. When set, the page renders this image instead of the abstract variant. */
  heroImage?: {
    src: string
    alt: string
    /**
     * Optional opinionated visual treatment for the hero. Same set as
     * caseStudies.ts `homeImage.treatment`. When set, the hero swaps its
     * plain framed image for a stylized backdrop + floating image layout.
     */
    treatment?: 'medefy-stylized'
  }

  /**
   * Optional scrollable-image hero. When set, the hero renders the full
   * source image inside a fixed-height scrollable viewport — used for
   * tall product screenshots that should be explored vertically rather
   * than top-cropped or shrunken. Takes precedence over `heroImage`.
   */
  heroScrollableImage?: {
    src: string
    alt: string
    /** Scroll viewport height in CSS pixels. Default 760. */
    height?: number
    /** Header label. Default "PRODUCT SCREEN". */
    label?: string
  }

  /**
   * Optional light/dark image-pair hero. Renders a framed hero with a
   * segmented Light/Dark toggle in its header; clicking the image opens
   * the active variant in the lightbox. Takes precedence over `heroImage`.
   */
  heroImagePair?: {
    light: { src: string; alt: string }
    dark: { src: string; alt: string }
    /** Header label. Default "FINAL PRODUCT VIEW". */
    label?: string
  }

  /** Body sections — render in this order if present */
  overview?: string
  problem?: string
  myRole?: string
  process?: string
  decisions?: Array<{ title: string; body: string }>
  outcome?: string
  reflection?: string

  /** Chapters (used for multi-chapter case studies like Medefy) */
  chapters?: Array<{
    index: string
    label: string
    title: string
    summary: string
    /** Optional subtle system/process callouts — for text-only chapters that intentionally carry no product visual. */
    points?: Array<{ title: string; body: string }>
    /** Optional supporting visual: path to image asset (served from /public) */
    image?: string
    /** Optional alt text for the image */
    imageAlt?: string
    /** Optional link to a live interactive prototype */
    liveUrl?: string
    /** Optional label for the live link, defaults to "View live prototype" */
    liveLabel?: string
    /** Optional confidentiality note (e.g. for NDA-protected work) */
    note?: string
    /**
     * Optional scrollable product screenshot. Renders the full source image
     * inside a fixed-height scrollable viewport (with an "Open full image"
     * action). Takes precedence over `image` when set. Use for tall product
     * pages that should be explored vertically.
     */
    scrollableImage?: {
      src: string
      alt: string
      /** Scroll viewport height in CSS pixels. Default 760. */
      height?: number
      /** Header label. Default "PRODUCT SCREEN". */
      label?: string
    }
    /** Optional supporting gallery — additional images rendered as a clickable carousel. */
    images?: Array<{
      src: string
      alt: string
    }>
    /**
     * Carousel layout for the `images` array.
     *  - 'single'   (default) — one image per slide
     *  - 'three-up'           — up to 3 images per slide on desktop (2 tablet, 1 mobile)
     */
    imagesLayout?: 'single' | 'three-up'
    /** Optional embedded interactive prototype (iframe). Renders in place of the image when set. */
    embed?: {
      url: string
      title: string
      /**
       * Embed kind:
       *  - 'prototype' (default) — fixed-canvas interactive demo, scaled to fit width.
       *    Requires naturalWidth / naturalHeight (or legacy `height`) for layout math.
       *  - 'document'            — responsive long-form artifact (report, doc). Renders at
       *    100% width with a fixed tall iframe and internal scrolling.
       */
      kind?: 'prototype' | 'document'
      /** Legacy: display height fallback (used only if naturalHeight is not set). Defaults to 720. */
      height?: number
      /** The prototype's natural canvas width in CSS pixels. Used to compute scale-to-fit. Default 1280. */
      naturalWidth?: number
      /** The prototype's natural canvas height in CSS pixels. Used to compute container height. Default 720. */
      naturalHeight?: number
      /** Layout breakout. 'wide' extends beyond the case study container on larger screens. */
      variant?: 'default' | 'wide'
      /** Header badge label override (default: 'Interactive prototype'). */
      badgeLabel?: string
      /** "Open in new tab" link label override (default: 'Open in new tab'). */
      openLabel?: string
    }
  }>

  /** Optional quiet context notice shown high in the header (right under the
   *  subtitle, above the fold). Rendered as a subtle card, not a banner. */
  notice?: string
  /** Optional bold lead-in label for the notice. Defaults to "About this case study." */
  noticeLabel?: string

  /** Optional external action links (e.g. "View live website"), rendered in the case study header */
  externalLinks?: Array<{
    label: string
    href: string
  }>

  /** Next case study to navigate to */
  next?: {
    slug: string
    title: string
  }
}
