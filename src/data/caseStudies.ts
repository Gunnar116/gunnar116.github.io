export type CaseStudy = {
  slug: string
  tag: string
  title: string
  hook: string
  role: string
  year: string
  /** Internal route (case study page) or external URL */
  href: string
  /** When true, scroll-anchors to the Medefy spotlight on the same page */
  anchorOnHome?: string
  visual: 'medefy' | 'truops-platform' | 'truops-website' | 'fortress' | 'kindness-ai'
  tint: 'medefy' | 'truops' | 'website' | 'fortress' | 'kindness'
  /**
   * Optional real-image preview shown on the homepage Selected Work row.
   * When omitted, the abstract `visual` placeholder renders instead.
   * `fit` defaults to 'cover'; use 'contain' for portrait-heavy composites
   * that crop badly when filled.
   */
  homeImage?: {
    src: string
    alt: string
    fit?: 'cover' | 'contain'
    /**
     * Optional opinionated visual treatment. When set, CaseVisual swaps the
     * flat tint background for a custom backdrop suited to that project.
     *  - 'medefy-stylized': soft off-white base with Medefy blue / pink / sage
     *    radial blurs, image floats without an inner card.
     */
    treatment?: 'medefy-stylized'
  }
  cta?: string
  featured?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'medefy',
    tag: 'Healthcare · Mobile',
    title: 'Medefy Product Experience',
    hook: 'Designing the care guide chat, the member mobile app, the accessibility work, and the product system that ties it all together.',
    role: 'Lead Product Designer',
    year: '2026 — Present',
    href: '/work/medefy',
    anchorOnHome: '#medefy',
    visual: 'medefy',
    tint: 'medefy',
    homeImage: {
      src: '/work/medefy/raw/triptych.png',
      alt: 'Medefy member mobile app — three phone screens showing the care guide chat, welcome flow, and benefits dashboard',
      fit: 'contain',
      treatment: 'medefy-stylized',
    },
    cta: 'Read the Medefy story',
    featured: true,
  },
  {
    slug: 'kindness-ai',
    tag: 'AI Workflows · Design Systems',
    title: 'Kindness.ai Product Infrastructure & AI Inbox Workflows',
    hook: 'Building the product design foundation for an AI-assisted communication platform, then redesigning the inbox across threading, labeling, filtering, search, and AI-assisted auto-labeling.',
    role: 'Lead Product Designer (Contract)',
    year: '2025',
    href: '/work/kindness-ai',
    visual: 'kindness-ai',
    tint: 'kindness',
    homeImage: {
      src: '/work/kindness-ai/kindness-homepage-product-hero.png',
      alt: 'Kindness.ai inbox shown in a browser frame on a soft Kindigo-tinted backdrop — sidebar label filters, row-level label chips, and the message list, composed as an editorial product hero.',
      fit: 'cover',
    },
  },
  {
    slug: 'truops-platform',
    tag: 'Enterprise SaaS',
    title: 'TruOps Platform Redesign',
    hook: 'A feature-heavy GRC platform restructured into a clear, scalable workflow for teams managing compliance at scale.',
    role: 'Senior Product Designer',
    year: '2023 — 2025',
    href: '/work/truops-platform',
    visual: 'truops-platform',
    tint: 'truops',
    homeImage: {
      src: '/work/truops/truops-mockup-01-solo-hero.png',
      alt: 'TruOps platform dashboard composed mockup — compliance readiness, risk posture, and decision surfaces',
      fit: 'cover',
    },
  },
  {
    slug: 'truops-website',
    tag: 'Brand & Marketing',
    title: 'TruOps Website / Brand Experience',
    hook: 'A marketing site and digital presence built to support a relaunched company, with clearer product storytelling.',
    role: 'Senior Product Designer',
    year: '2024 — 2025',
    href: '/work/truops-website',
    visual: 'truops-website',
    tint: 'website',
    homeImage: {
      src: '/work/truops-website/truops-site-01-home-hero.png',
      alt: 'TruOps marketing site hero — composed product storytelling and brand experience',
      fit: 'cover',
    },
  },
  {
    slug: 'fortress',
    tag: 'Data Visualization',
    title: 'Fortress A2V Network Redesign',
    hook: 'Interactive asset and vulnerability mapping for enterprise security teams, supported by a shared design system.',
    role: 'Lead Product Designer',
    year: '2021 — 2023',
    href: '/work/fortress-a2v',
    visual: 'fortress',
    tint: 'fortress',
    homeImage: {
      src: '/work/fortress/fortress-homepage-hero.png',
      alt: 'Fortress A2V Network homepage preview — AV Network dashboard with pending requests, completed requests, and top vendor metrics, paired with a floating product-profile risk-scoring card and a subtle relationship-network backdrop',
      fit: 'cover',
    },
  },
]
