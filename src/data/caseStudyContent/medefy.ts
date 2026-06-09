import type { CaseStudyContent } from './types'

/**
 * Medefy case study.
 * Body content is real prose. Polish and confirm any details before publishing.
 *
 * Visuals are abstracted, portfolio-safe mockups (no PHI, no persona names,
 * no plan data). Source HTML at public/work/medefy/mockups.html.
 * Re-run with: node scripts/capture-medefy-mockups.mjs
 *
 * If/when production screenshots become safe to publish (anonymized, NDA-cleared),
 * swap the heroImage src and chapter image paths to point to those real assets.
 */
export const medefyCaseStudy: CaseStudyContent = {
  slug: 'medefy',

  eyebrow: 'Featured story',
  title: 'Medefy Product Experience',
  subtitle:
    'Designing healthcare product experiences across care guide workflows, member mobile experiences, accessibility, and scalable product systems.',

  role: 'Lead Product Designer',
  timeline: '01/2026 — Present',
  team: 'Engineering, Product, Care Operations',

  focusAreas: [
    'Mobile UX/UI',
    'AI-assisted chat workflows',
    'Accessibility / WCAG',
    'Design systems',
    'Healthcare workflows',
    'Cross-platform product design',
  ],

  externalLinks: [
    {
      label: 'View app on App Store',
      href: 'https://apps.apple.com/us/app/medefy-benefits-app/id1469105142',
    },
  ],

  heroVisual: 'medefy',
  heroImage: {
    src: '/work/medefy/raw/triptych.png',
    alt: 'Medefy member mobile app — three phone screens showing the care guide chat, welcome flow, and benefits dashboard',
    treatment: 'medefy-stylized',
  },

  overview:
    'Medefy is building a new healthcare product experience that connects two sides of the same conversation: the members navigating their benefits, and the care guides who help them get there. The work spans the Texoma care guide chat platform, the member-facing mobile app, an accessibility remediation effort across legacy mobile surfaces, and a shared product system underneath all of it. What ties the work together is a focus on clarity. Healthcare asks people to make decisions during moments that already feel uncertain, and the design across each surface is about making those moments feel calmer, more legible, and more trustworthy.',

  problem:
    'Healthcare experiences are often fragmented, high-stakes, and hard to understand. Members are making real decisions about coverage, claims, and care, and the products meant to help them often add friction instead of removing it. On the member side, the experience needs to feel simple, reliable, and accessible — clear at every step, without forcing anyone to learn a product to use it. On the care guide side, the tooling needs to keep up with the pace of conversation: a high volume of member messages, clean handoffs between AI assistance and human attention, and case status that is easy to track. Legacy systems and inconsistent patterns make both sides harder, because every new feature ends up re-inventing affordances that should be shared.',

  myRole:
    'As Lead Product Designer, I lead UX and UI direction across the Texoma platform and the member mobile app, contribute to the internal care guide workflows, lead a WCAG 2.1 AA accessibility audit and remediation effort across legacy mobile surfaces, and build the design system foundation underneath. The role is deeply cross-functional. I partner with product, engineering, and leadership to balance member needs against the technical realities and privacy considerations that come with healthcare product design, and translate individual design decisions into patterns the team can use beyond a single screen.',

  decisions: [
    {
      title: 'Calm, plain-language communication over dense terminology',
      body: 'Healthcare terms can feel intimidating during the moments members actually need them. The product favors plain-language phrasing and short explanations, even when the underlying system is technical. Members get answers that feel human, especially in the chat experience where the underlying question is often about something that already feels unclear.',
    },
    {
      title: 'System status visible at every step of a conversation',
      body: 'Chat experiences fall apart when members cannot tell what is happening — whether a message was sent, whether someone is reading it, whether the conversation has been escalated. The Texoma design surfaces status clearly across active, waiting, offline, and failed-message states so neither members nor care guides have to guess.',
    },
    {
      title: 'Reusable patterns instead of one-off mobile screens',
      body: 'Each new feature pulls from a small set of shared patterns — list rows, summary cards, navigation, empty states — rather than introducing a new structure every time. The product stays calmer to scan, faster to build, and easier to test for accessibility.',
    },
    {
      title: 'Accessibility as product quality, not a checklist',
      body: 'The WCAG remediation work was scoped as ongoing product craft, not a one-time audit. Accessibility lives inside the components themselves and gets reviewed alongside any new design, the same way performance or copy would.',
    },
    {
      title: 'AI assistance with clear human handoff moments',
      body: 'AI works best in care guide workflows when members can tell when they are talking to an assistant versus a person, and when they can move between the two without losing context. The design makes the handoff visible: who is responding, when an escalation has happened, and what the care guide is seeing.',
    },
    {
      title: 'UI patterns that scale across member and internal surfaces',
      body: 'The internal care guide workspace and the member experiences share a common visual and interaction language. A status chip, a list row, or a conversation header behaves the same way in either context — which makes the product easier to extend and the team faster to ship.',
    },
  ],

  chapters: [
    {
      index: '01',
      label: 'Care guide workflows',
      title: 'Texoma Care Guide Chat Platform',
      summary:
        'Designing the chat workflows that connect members with their care guides, including conversation management, escalation states, and the points where AI assistance hands off to a human. The work emphasizes status clarity across the active state of a conversation: who is typing, when a message is waiting, where a thread sits in the larger queue. The internal care guide workspace is built around the same patterns so the experience feels coherent across both sides of the conversation.',
      image: '/work/medefy/medefy-texoma-chat-workflow.png',
      imageAlt:
        'Texoma care guide workflow visual showing a three-step AI-to-human handoff paired with the internal care guide monitoring interface.',
    },
    {
      index: '02',
      label: 'Mobile product',
      title: 'Medefy Member Mobile App',
      summary:
        'The member-facing mobile experience for navigating benefits, claims, pharmacy, and support, designed for clarity on a small screen. The work focuses on consistent navigation, a small set of repeated patterns instead of one-off screens, and copy that uses plain language instead of dense healthcare terminology. The goal is that a member can open the app during a stressful moment and know where to go next without thinking.',
      imagesLayout: 'three-up',
      images: [
        {
          src: '/work/medefy/figma/figma-01.png',
          alt: 'Medefy member home — Superhuman benefits navigation, welcome screen with Care Guide, Find a Doctor, and Search for Lower Cost actions',
        },
        {
          src: '/work/medefy/figma/figma-02.png',
          alt: 'Medefy member testimonials — Thousands of lives changed, quotes from real members about the app and care team',
        },
        {
          src: '/work/medefy/figma/figma-03.png',
          alt: 'Medefy 24/7 real-time support — How can we help, topic selector with Medical service/doctor, $0 procedure, Benefits, MRI/CT/Ultrasound, Billing, Pharmacy, and Other',
        },
        {
          src: '/work/medefy/figma/figma-04.png',
          alt: 'Medefy Cost savings — chat with a care guide to find high-quality low cost care in your network',
        },
        {
          src: '/work/medefy/figma/figma-05.png',
          alt: 'Medefy Track spending — My Health Benefits with plan summary, deductible, and out-of-pocket progress',
        },
        {
          src: '/work/medefy/figma/figma-06.png',
          alt: 'Medefy Card wallet — Insurance Cards, one convenient location for all benefits cards',
        },
      ],
    },
    {
      index: '03',
      label: 'Accessibility leadership',
      title: 'MyBenefitsFlorida Accessibility Remediation',
      summary:
        'A WCAG 2.1 AA accessibility audit across the existing MyBenefitsFlorida mobile experience on iOS and Android, focused on color and contrast issues and the patterns that consistently failed. The work produced design recommendations for both platforms, a leadership-facing document that became engineering’s source of truth, and implementation guidance for the developers shipping the fixes. Accessibility is treated as a product quality issue rather than a checkbox at the end of the cycle.',
      embed: {
        url: '/work/medefy/mybf-accessibility-report.html',
        title: 'MyBenefitsFlorida WCAG 2.1 AA accessibility report',
        kind: 'document',
        height: 960,
        variant: 'wide',
        badgeLabel: 'Accessibility report',
        openLabel: 'Open report in new tab',
      },
    },
    {
      index: '04',
      label: 'Product system',
      title: 'Healthcare Product System Thinking',
      summary:
        'The reusable patterns, design tokens, and component foundations that tie the chat platform, the mobile app, and the accessibility work into one consistent system. The system supports light and dark variants, cross-platform consistency between iOS and Android where relevant, and accessibility built into the components themselves. Investments in the system compound: each new feature becomes faster to design, and the team spends less time re-inventing affordances that already exist somewhere else.',
      embed: {
        url: '/work/medefy/medefy-design-system.html',
        title: 'Medefy design system',
        kind: 'prototype',
        naturalWidth: 1600,
        naturalHeight: 1788,
        variant: 'wide',
        badgeLabel: 'DESIGN SYSTEM ARTIFACT',
        openLabel: 'Open in new tab',
      },
      image: '/work/medefy/medefy-design-system-artifact.png',
      imageAlt:
        'Medefy design system artifact showing brand foundations, color tokens, product components, mobile patterns, and accessibility states.',
    },
  ],

  outcome:
    'The work has created a clearer design foundation for Medefy’s next-generation product experience. The Texoma and mobile workstreams have aligned member-facing and internal care guide experiences around a shared set of communication patterns. The accessibility audit gave the team a concrete, documented path toward WCAG-aligned improvements across the legacy mobile surfaces, with engineering carrying the work forward. The design system — patterns, tokens, components — has created a stronger foundation the team can build on as the product expands. As the work continues to ship, the foundation is in place for a more consistent, accessible, and trustworthy product experience across Medefy’s member and care guide surfaces.',

  reflection:
    'This work reinforced something now central to how I think about healthcare product design: the goal is not simplification, it is trust. Members and care guides do not need fewer pixels. They need the right signal at the right moment, and a clear path forward when a moment feels uncertain. The design decisions that mattered most on this project were not the visually striking ones. They were the quiet ones — a clearer status label, a calmer empty state, a piece of copy that says what is actually happening.',

  next: {
    slug: 'truops-platform',
    title: 'TruOps Platform Redesign',
  },
}
