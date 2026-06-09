export type MedefyChapter = {
  slug: string
  index: string
  label: string
  title: string
  caption: string
  visual: 'chat' | 'mobile' | 'accessibility' | 'system'
  /**
   * Optional real case-study preview image. When set, the card renders this
   * instead of the abstract illustrated `visual` — composed/cropped versions
   * of approved case-study assets so the homepage previews the real story.
   */
  image?: {
    src: string
    alt: string
    /** object-position for the 16:10 cover crop. Default 'center'. */
    position?: string
  }
}

export const medefyChapters: MedefyChapter[] = [
  {
    slug: 'texoma-chat',
    index: '01',
    label: 'Care guide workflows',
    title: 'Texoma Care Guide Chat Platform',
    caption:
      'Designing the chat experience that connects members with their care guides — including conversation flows, escalation states, and the internal care guide workspace.',
    visual: 'chat',
    image: {
      src: '/work/medefy/medefy-homepage-texoma-interface-preview.png',
      alt: 'Texoma care guide chat interface — the active conversation list, a member care-guide chat thread, and the context panel with benefits and AI response suggestions.',
    },
  },
  {
    slug: 'member-mobile',
    index: '02',
    label: 'Mobile product',
    title: 'Medefy Member Mobile App',
    caption:
      'The member-facing mobile experience for navigating benefits, claims, pharmacy, and support, designed for clarity on a small screen.',
    visual: 'mobile',
    image: {
      src: '/work/medefy/medefy-homepage-mobile-preview.png',
      alt: 'Medefy member mobile app — benefits navigation home screen and a health-benefits detail view with plan, deductible, and spending information.',
    },
  },
  {
    slug: 'mybf-accessibility',
    index: '03',
    label: 'Accessibility leadership',
    title: 'MyBenefitsFlorida Accessibility Remediation',
    caption:
      'WCAG remediation across iOS and Android, with a leadership-facing report and design QA that became engineering’s source of truth.',
    visual: 'accessibility',
    image: {
      src: '/work/medefy/medefy-homepage-accessibility-preview.png',
      alt: 'MyBenefitsFlorida accessibility remediation — before/after comparison of a Contact Support form showing failing form-field states alongside the remediated states that pass WCAG contrast and focus requirements.',
    },
  },
  {
    slug: 'product-system',
    index: '04',
    label: 'Product system',
    title: 'Healthcare Product System Thinking',
    caption:
      'Reusable patterns and design tokens that connect the chat, the mobile app, and the accessibility work into one consistent system.',
    visual: 'system',
    image: {
      src: '/work/medefy/medefy-homepage-system-preview.png',
      alt: 'Medefy product system — color token reference with token names, color swatches, and recommended hex values that scale across the product.',
    },
  },
]
