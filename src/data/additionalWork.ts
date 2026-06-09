export type AdditionalWorkItem = {
  slug: string
  title: string
  hook: string
  role: string
  meta: string
  href: string
}

/**
 * Smaller / supplementary projects that sit outside the main Selected Work grid.
 * Kept lightweight on purpose — easy to add or remove entries.
 */
export const additionalWork: AdditionalWorkItem[] = [
  {
    slug: 'kindness-ai',
    title: 'Kindness.ai Product Infrastructure & AI Inbox Workflows',
    hook: 'Product design foundation for an AI-assisted communication platform: design systems, inbox workflows, threading, labeling, and AI-powered search.',
    role: 'Lead Product Designer (Contract)',
    meta: '08/2025 — 12/2025',
    href: '/work/kindness-ai',
  },
]
