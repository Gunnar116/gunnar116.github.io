import type { CaseStudyContent } from './types'

/**
 * Kindness.ai case study.
 *
 * Visuals are portfolio-safe abstracted product compositions (no real
 * customer data or sample messages). Source HTML at
 * public/work/kindness-ai/mockups.html — regenerate with
 *   node scripts/capture-kindness-mockups.mjs
 *
 * If/when production screenshots become safe to publish, swap the
 * heroImage src and chapter image paths to point to those real assets.
 */
export const kindnessAICaseStudy: CaseStudyContent = {
  slug: 'kindness-ai',

  eyebrow: 'Case study',
  title: 'Kindness.ai Product Infrastructure & AI Inbox Workflows',
  subtitle:
    'Building the product design foundation for an AI-assisted communication platform: a design system created from scratch, and the inbox, message threading, labeling, filtering, and AI-assisted search workflows built on top of it.',

  role: 'Lead Product Designer (Contract)',
  timeline: '08/2025–12/2025',
  team: 'Founder / leadership, Product, Engineering',

  focusAreas: [
    'AI-assisted workflows',
    'Product infrastructure',
    'Design systems',
    'Inbox UX',
    'Message threading',
    'Labeling and filtering',
    'AI-assisted search',
    'Design-to-development handoff',
  ],

  heroVisual: 'kindness-ai',
  heroImagePair: {
    label: 'FINAL INBOX VIEW',
    light: {
      src: '/work/kindness-ai/kindness-final-inbox-view.png',
      alt: 'Kindness.ai final inbox view (light mode) showing message triage, conversation management, labels, filters, and AI-assisted workflow organization.',
    },
    dark: {
      src: '/work/kindness-ai/kindness-final-inbox-view-dark.png',
      alt: 'Kindness.ai final inbox view (dark mode) showing message triage, conversation management, labels, filters, and AI-assisted workflow organization.',
    },
  },

  notice:
    'Kindness.ai is a stealth-stage startup that has not fully launched publicly. Because of that, some product details, workflows, and implementation specifics have been abstracted or omitted. The visuals shown here focus on public-safe design system work, workflow structure, and representative interaction patterns.',

  overview:
    'Kindness.ai is an AI-assisted communication platform for teams managing high volumes of inbound messages. As the product matured, it needed stronger design infrastructure underneath it and clearer workflows on top. The work started with creating the design system and Figma library from scratch (component architecture, design tokens, and standardized patterns), then applied that foundation to the core surfaces: inbox organization, message triage, threading, labeling, filtering, search, and AI-assisted auto-labeling. The goal stayed the same throughout: give the team a foundation that holds up as the product grows, and make a high-volume inbox calmer to work in.',

  problem:
    'High-volume communication products get hard to manage quickly. Teams have to triage, search, label, and respond without losing the thread of any single conversation, and the inbox becomes the operational center of the work. Without a shared design system underneath, design and engineering both slow down: every feature reinvents its own patterns, the system fragments, and small inconsistencies compound into real friction. AI adds another layer. Done well, it reduces manual organization; done poorly, it feels opaque, and trust erodes the moment someone cannot tell why something happened. The problem was never simply to add AI. It was to make organization and automation understandable enough to trust.',

  myRole:
    'As Lead Product Designer on contract, I established the product design infrastructure from scratch: I built the Figma library and design system, defined the component architecture, tokens, and reusable patterns, and set the workflow standards the team could build against. From there the work moved into the product itself: information architecture, inbox organization, message threading, labeling, filtering, and search, along with the AI-assisted auto-labeling behavior. I worked closely with engineering throughout so the system translated cleanly into production: consistent components, shared tokens, and handoff that held up instead of living only as Figma artifacts.',

  decisions: [
    {
      title: 'Built the system before scaling the screens',
      body: 'The work started with infrastructure (Figma organization, component architecture, tokens) before any product surface was redesigned. Investing in the foundation first kept the rest of the work from compounding inconsistencies, and gave engineering something stable to build against.',
    },
    {
      title: 'The inbox as an operational workspace, not a message list',
      body: 'High-volume teams do not just read messages, they triage them. The inbox redesign treats it as the place the work actually happens, with density, sort, and quick-action patterns that hold up across a long workday.',
    },
    {
      title: 'AI suggestions visible and explainable',
      body: 'Every AI suggestion, whether a label or a search result, is paired with the signal it is based on, and stays dismissible. The user can accept it, override it, or ignore it without losing context. That trust trade-off is worth more than the convenience of silent automation.',
    },
    {
      title: 'Reusable interaction patterns for labels, filters, and threading',
      body: 'Labels, filters, and threading controls share a common interaction language across the product. Learn it once, and it works the same way everywhere, which is what makes the inbox scannable at speed.',
    },
    {
      title: 'Designed for engineering handoff and production consistency',
      body: 'The design system was structured to translate cleanly into the codebase: component variants matched implementation variants, tokens matched what engineering could consume, and handoff was scoped so the work landed in production looking like the work that shipped in Figma.',
    },
    {
      title: 'Reduced manual organization without removing user control',
      body: 'AI-assisted auto-labeling automates the work the user should not have to do, while keeping every decision reversible. The result is faster organization that does not cost the user a sense of agency.',
    },
  ],

  chapters: [
    {
      index: '01',
      label: 'Foundations',
      title: 'Product Design Infrastructure',
      summary:
        'The foundation came first: organizing Figma, defining design tokens and reusable patterns, and giving design and engineering one contract to build against. The interactive artifact here represents the Figma library and design system I built from scratch: the Kindness logo, the four color token families (Kindigo, Kindle, Kindness, Kindred), button and input states, the icon set, and the inbox row patterns the product is built on. Toggle light and dark to see the tokens hold up across both modes.',
      embed: {
        url: '/work/kindness-ai/kindness-design-library.html',
        title: 'Kindness design library',
        kind: 'document',
        height: 820,
        variant: 'wide',
        badgeLabel: 'DESIGN SYSTEM ARTIFACT',
        openLabel: 'Open in new tab',
      },
    },
    {
      index: '02',
      label: 'Inbox workflows',
      title: 'Inbox Workflow Redesign',
      summary:
        'The inbox is where high-volume teams actually work, so it was designed as an operational workspace rather than a message list, built for scanning, triage, and staying oriented across a heavy day.',
      points: [
        {
          title: 'Triage-first',
          body: 'Priority and status states surface what needs attention now.',
        },
        {
          title: 'Adjustable density',
          body: 'Comfortable and compact modes for long sessions in the inbox.',
        },
        {
          title: 'Saved views & filters',
          body: 'Reusable slices for the recurring ways teams work.',
        },
        {
          title: 'Quick actions',
          body: 'Act on a message without leaving the row.',
        },
      ],
    },
    {
      index: '03',
      label: 'Threading & organization',
      title: 'Threading, Labeling & Organization',
      summary:
        'Early requirements defined labels as sidebar filters, but the workflow still needed structure: how labels were created, edited, applied, and used to organize conversations. I translated that into a focused labeling system with sidebar filtering, row-level label chips, editable metadata, color, and optional AI auto-labeling, giving teams a way to organize high-volume messages without losing control. The final workflow focused on three core moments: seeing organization in the inbox, editing existing labels, and creating new labels with AI-assisted auto-apply behavior.',
      embed: {
        url: '/work/kindness-ai/threading-organization-workflow.html',
        title: 'Kindness.ai labeling and organization workflow',
        kind: 'document',
        height: 900,
        variant: 'wide',
        badgeLabel: 'INTERACTIVE WORKFLOW',
        openLabel: 'Open in new tab',
      },
      image: '/work/kindness-ai/kindness-threading-labels-filters.png',
      imageAlt:
        'Kindness.ai labeling and organization workflow preview: the organized inbox alongside the edit-label and create-label steps, including AI auto-labeling.',
    },
    {
      index: '04',
      label: 'AI features',
      title: 'AI-Assisted Search and Auto-Labeling',
      summary:
        'With organization handled at the label level, this work focused on retrieval: helping people find the right message or thread quickly, and letting AI assist without becoming a black box.',
      points: [
        {
          title: 'Explainable matching',
          body: 'Every result shows why it matched, so ranking is never opaque.',
        },
        {
          title: 'Search as a peer',
          body: 'AI-assisted search runs alongside ordinary search, not instead of it.',
        },
        {
          title: 'Classification counterpart',
          body: 'Auto-labeling suggests where a message belongs and shows the signal behind it.',
        },
        {
          title: 'User in control',
          body: 'Matches can be accepted, adjusted, or ignored.',
        },
      ],
    },
  ],

  outcome:
    'The work gave Kindness.ai a stronger design foundation to build on. The design system brought consistency to the core workflows and a shared language between design and engineering, which should speed up delivery as new surfaces are added. The inbox, labeling, and search work gave the product a clearer structure for managing high-volume communication, and the AI-assisted patterns established a way to reduce manual effort while keeping the user in control. As a stealth-stage product, the lasting value is the foundation itself: it is built to hold up as Kindness.ai grows.',

  reflection:
    'The interface around AI matters just as much as the intelligence behind it. When people understand what the system is doing, why it is useful, and how to stay in control, trust becomes part of the product experience, and the foundation underneath the interface is what lets that trust scale as the product grows.',

  next: {
    slug: 'medefy',
    title: 'Medefy Product Experience',
  },
}
