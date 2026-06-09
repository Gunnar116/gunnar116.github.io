import type { CaseStudyContent } from './types'

/**
 * Fortress A2V Network Redesign.
 *
 * Visuals are portfolio-safe abstracted compositions (no real customer
 * names, vendor names, or data). Source HTML at public/work/fortress/mockups.html
 * Re-run with: node scripts/capture-fortress-mockups.mjs
 *
 * TODO: Confirm whether old Framer case study metrics (engagement, navigation
 * improvement, time-to-find numbers) are still accurate before publishing them
 * as visible copy. Kept out of visible body until confirmed.
 */
export const fortressA2VCaseStudy: CaseStudyContent = {
  slug: 'fortress-a2v',

  eyebrow: 'Case study',
  title: 'Fortress A2V Network Redesign',
  subtitle:
    'Improving how security teams understand asset, vendor, and risk relationships across complex supply chain ecosystems.',

  role: 'Lead Product Designer',
  timeline: '11/2021 — 02/2023',
  team: 'Design team, Product, Engineering, Leadership',

  focusAreas: [
    'Cybersecurity workflows',
    'Vendor risk',
    'Risk visualization',
    'Enterprise dashboards',
    'Design leadership',
    'Complex data UX',
    'Design systems',
  ],

  heroVisual: 'fortress',
  heroScrollableImage: {
    src: '/work/fortress/source/dashboard-home.png',
    alt: 'AV Network home dashboard — completed requests, top reports ordered, top clients by requests, pending requests and approvals, vendor lists, alerts and incidents, recently added vendors, and recent orders',
    height: 760,
    label: 'PRODUCT SCREEN',
  },

  confidentialityNote:
    'This case study reflects enterprise cybersecurity product work. Some details, data, and implementation specifics have been abstracted to protect confidentiality.',

  overview:
    'Fortress A2V is a high-security enterprise platform where vendors and security teams access, manage, and understand the cybersecurity information that connects them — documentation, attestations, risk signals, and the asset-to-vendor relationships that frame all of it. The redesign focused on making that surface more usable, navigable, consistent, and scalable, without weakening the security and compliance context it had to operate inside. The goal was not to lighten the platform — it was to make a serious tool feel like one a serious operator could actually move through quickly.',

  problem:
    'Over time, the platform had become fragmented and difficult to navigate. Vendors needed secure access to sensitive client and security documentation, but the interface created friction around the work they were there to do. UI patterns were inconsistent across surfaces, navigation felt disjointed, and finding critical information often meant relearning the product from screen to screen. The visual foundation had also aged past the point where new features could ship cleanly on top of it, which made every new workflow harder than it should have been. The real design challenge was balancing strict security and compliance requirements with usability — keeping the trust signals and access guarantees the platform demanded, while removing the friction that had built up around them.',

  myRole:
    'As Lead Product Designer at Fortress Information Security, I led UX/UI strategy for the A2V redesign and directed a team of designers working across the broader cybersecurity and vendor-risk management platform. I partnered closely with product, engineering, leadership, and stakeholders to translate complex vendor-risk workflows into clearer, more navigable interfaces. The work spanned dashboards, mapping surfaces, and workflow patterns for real-time supply chain risk visibility, vendor intelligence, and operational decision-making — and it leaned heavily on a shared design system so the patterns we shipped could carry the rest of the platform forward, not just the screens immediately in front of us.',

  process:
    'The work started with the people using the product — security analysts, vendor-risk teams, and the vendors themselves — and the friction they hit inside the existing flows. From there, design moved between modes: sketching relationship models, prototyping dashboard and map layouts, validating with internal experts, and pressure-testing patterns inside the broader Fortress design system. Engineering and product partners were close collaborators throughout, so design decisions could be grounded in what was actually buildable inside an enterprise platform with real performance, access, and compliance constraints. The cadence rewarded patterns that held up across many surfaces over one-off solutions tuned to a single screen.',

  decisions: [
    {
      title: 'Show relationships, not just records',
      body: 'A vendor profile or an asset record on its own does not tell a security team what they need to know. The product was designed around the relationships between entities — which vendors were tied to which assets, where risk signals crossed those lines — so users could see exposure as a network, not as a list of independent rows.',
    },
    {
      title: 'Design dashboards around investigation and prioritization',
      body: 'Dashboards were structured to answer the questions teams actually opened the product to ask: where is risk concentrated right now, what changed recently, and what should I look at first. Overview surfaces lead into investigation paths so users move from awareness to a specific record without losing the thread.',
    },
    {
      title: 'Use filtering and progressive disclosure to reduce cognitive load',
      body: 'There is always more data than a screen can hold. The product favors filtered, intentional views over showing everything by default, with progressive disclosure as users drill into detail. The signals that matter most — severity, tier, recent change — are surfaced first, and the longer tail is reachable but never crowding the foreground.',
    },
    {
      title: 'Make risk states visually scannable without oversimplifying the data',
      body: 'Severity is consistent across maps, tables, and event lists so users do not have to relearn the color or shape of a high-exposure signal on each surface. At the same time, the visual model preserves nuance underneath the indicators — exposure scores, tier, last event — so a quick glance can become a real investigation without leaving the view.',
    },
    {
      title: 'Create reusable patterns for dense enterprise workflows',
      body: 'Summary cards, filter chips, severity indicators, data table rows, and the map/list toggle were designed as shared patterns rather than one-off components. The same vendor row pattern appears across Risk, Vendors, and Investigation surfaces. Teams shipped faster because new screens pulled from the same kit, and users moved between surfaces without re-learning what each component meant.',
    },
    {
      title: 'Balance leadership visibility with analyst-level detail',
      body: 'The same product had to serve two audiences with different needs: leadership scanning for posture, and analysts working specific cases. Overview surfaces stayed legible at a glance for the first audience, while the investigation paths underneath them gave the second audience the granularity they needed. Both audiences shared the same components, so reporting and operational work spoke the same language.',
    },
    {
      title: 'Support design consistency through shared system patterns',
      body: 'The Fortress design system was where the work compounded. Tokens, components, and shared patterns let multiple designers ship to multiple surfaces while keeping the product feeling like one product. The system also gave engineering a stable contract to build against, which made handoff faster and consistency the default.',
    },
  ],

  chapters: [
    {
      index: '01',
      label: 'Network model',
      title: 'Asset-to-Vendor Network',
      summary:
        'The relationship model at the center of A2V — helping users understand how vendors, assets, clients, documentation, and risk signals actually connect. The visualization is built around exposure and ownership: which vendors are tied to which asset groups, which documents and attestations sit behind each relationship, and where high-severity signals are concentrated. Severity reads the same way across the map and the inspector so the same risk does not look like two different things depending on where a user enters from.',
      image: '/work/fortress/fortress-a2v-network-map.png',
      imageAlt:
        'AV Network marketplace showing a grid of vendor cards with company security controls and quick-action affordances for browsing the asset-to-vendor network',
    },
    {
      index: '02',
      label: 'Risk visualization',
      title: 'Risk Visualization',
      summary:
        'Turning dense vendor and security data into scannable views that support prioritization and investigation. The visualization stack pairs a severity distribution with a trend over time, an active events list, and an exposure heatmap across vendors. Each layer answers a different question — what does the posture look like, what changed recently, what is happening right now, and which vendors are drifting — so teams can read the picture quickly and then move into a specific event without leaving the view.',
      scrollableImage: {
        src: '/work/fortress/source/product-profile.png',
        alt: 'Product profile page — overall score (severity, grade, risk score), category breakdown table, Overall Score by Category visualization, SBM document data, and assessment & reports list',
        height: 820,
        label: 'PRODUCT SCREEN',
      },
    },
    {
      index: '03',
      label: 'Dashboard usability',
      title: 'Dashboard Usability',
      summary:
        'Tightening the structure, filtering, and scanability of the surfaces teams used every day, and shortening the path from overview to detailed investigation. Summary cards anchor the top, a top-vendor exposure table sits below for scanning, and an investigation queue gives owners a clear list of what to act on. Sorting, filtering, and saved views keep the surface usable as data volume grows, and consistent affordances mean a user does not have to relearn the dashboard each time the product gains another workflow.',
      scrollableImage: {
        src: '/work/fortress/source/cyber-hygiene.png',
        alt: 'Cyber Hygiene Discovery dashboard — vendor profile header with risk rank and risk score, Target Location world map, target location table, DNS scan findings, detailed findings, and SSL/TLS / App Security / Vulnerabilities sections',
        height: 820,
        label: 'PRODUCT SCREEN',
      },
    },
    {
      index: '04',
      label: 'Design leadership',
      title: 'Design Leadership & System Patterns',
      summary:
        'The design system work created shared foundations for brand, color, typography, buttons, badges, form controls, indicators, and reusable interface patterns. These foundations gave designers and engineers a more consistent product language to build from across A2V and the broader Fortress platform — and a documented contract that kept new workflows feeling like part of the same product instead of a different one on every surface.',
      embed: {
        url: '/work/fortress/design-system-board.html',
        title: 'A2V design system artifact',
        kind: 'document',
        height: 820,
        variant: 'wide',
        badgeLabel: 'Design system artifact',
        openLabel: 'Open in new tab',
      },
    },
  ],

  outcome:
    'The redesign created a clearer foundation for vendor-risk workflows, secure documentation access, dashboard usability, and scalable product patterns. It helped align design, product, and engineering around a more consistent platform direction while preserving the needs of a high-security enterprise environment. The most durable outcome was structural — the patterns the team relied on by the end of the work were ones that could keep absorbing new feature areas without becoming a different product on each surface.',

  reflection:
    'This project reinforced that complex security products do not become better by showing more data. They become better when the interface helps people understand relationships, identify priority, and take action with confidence. The strongest design work was often structural: clearer navigation, reusable patterns, consistent risk states, and workflows that respected both usability and security.',

  next: {
    slug: 'kindness-ai',
    title: 'Kindness.ai Product Infrastructure & AI Inbox Workflows',
  },
}
