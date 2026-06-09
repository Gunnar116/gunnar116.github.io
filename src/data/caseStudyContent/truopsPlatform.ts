import type { CaseStudyContent } from './types'

/**
 * TruOps Platform Redesign — first draft.
 * Body content adapted from the live Framer case study:
 *   https://grmconcepts.framer.website/project/truops-platform-redefining-what-a-grc-platform-can-be
 *
 * Visuals reuse existing TruOps mockups (copied into /public/work/truops/)
 * plus the live Clark prototype (clark.html, served from the same path).
 *
 * Still needs Gunnar's confirmation on:
 *  - The three reported metrics in `outcome` (85% onboarding reduction,
 *    25% click reduction, 34% feature discoverability lift). These come from
 *    the original Framer case study — keeping them, labelled as
 *    reported case-study outcomes, but flag for review.
 *  - Whether to re-host an interactive truops_prototype.html if it becomes
 *    available again (it was not on disk when this draft was written).
 */
export const truopsPlatformCaseStudy: CaseStudyContent = {
  slug: 'truops-platform',

  eyebrow: 'Case study',
  title: 'TruOps Platform Redesign',
  subtitle:
    'Redesigning a complex enterprise SaaS platform to make GRC workflows clearer, more usable, and easier to scale.',

  role: 'Senior Product Designer',
  timeline: '05/2023 — 06/2025',
  team: 'Product, Engineering, Customer Success, Executive Leadership',

  focusAreas: [
    'Enterprise SaaS',
    'GRC workflows',
    'Design systems',
    'Information architecture',
    'Workflow simplification',
    'AI product integration',
    'Cross-functional delivery',
  ],

  heroVisual: 'truops-platform',
  heroImage: {
    src: '/work/truops/truops-mockup-01-solo-hero.png',
    alt: 'Editorial TruOps dashboard mockup showing the CIS executive view inside a polished product frame',
  },

  noticeLabel: 'Confidentiality.',
  notice:
    'This case study reflects real product work for a high-security enterprise SaaS platform. Some details, screens, and implementation specifics have been abstracted or omitted to protect confidentiality.',

  overview:
    'TruOps is a Governance, Risk, and Compliance (GRC) platform that helps organizations manage IT risk, compliance, cybersecurity operations, and vendor risk at enterprise scale. The platform is technically capable, but the user experience had fallen behind the needs of the people working in it day to day. The redesign was a platform-wide modernization effort focused on making dense, technical workflows clearer to scan, faster to navigate, and easier to scale as new product surfaces — including AI-assisted features — were added.',

  problem:
    'GRC is genuinely complex. The product was not. Years of feature growth had outpaced the underlying UX, and the result was a platform that asked too much of every user — from new operators trying to onboard, to power users running compliance programs every day. Findability was poor, with critical tools buried under inconsistent menus and screens. Routine workflows had become click-heavy, taking more steps than they needed to. The visual system had drifted; the UI felt cluttered, especially as new AI-driven features were bolted on without a shared pattern language. The goal of the redesign was not to remove the complexity of GRC — that complexity is real and necessary. The goal was to organize it, so users could understand where they were in the platform, what mattered, and what action to take next.',

  myRole:
    'As Senior Product Designer leading the platform redesign effort, I owned the UX and UI direction across the major workstreams: navigation, dashboards, core compliance and risk workflows, and the design system underneath them. The work started with discovery — stakeholder interviews, user research, workflow analysis, heuristic review, and benchmarking against enterprise SaaS leaders. From there I led design strategy, defined shared design principles with product and engineering, ran usability testing with novice and experienced users, and partnered closely with engineering and customer success through a phased rollout, including design QA during implementation. The redesign also laid the foundation for new AI-assisted product features like Clark to land cleanly inside the platform rather than as a separate experience.',

  chapters: [
    {
      index: '01',
      label: 'IA & Navigation',
      title: 'Platform IA & Navigation',
      summary:
        'A fully restructured navigation system, both global and contextual, that mirrors how compliance and risk teams actually move through their work. Multi-tenant context, workspace switching, and the most frequent actions sit where users expect them. The IA tightens findability across dense product areas without flattening the depth the product genuinely needs.',
      image: '/work/truops/truops-mockup-02-system-pair.png',
      imageAlt:
        'Editorial TruOps system mockup showing compliance readiness and multi-tenant product surfaces',
    },
    {
      index: '02',
      label: 'Workflow simplification',
      title: 'Workflow Simplification',
      summary:
        'Routine workflows were rebuilt around fewer steps and clearer next actions. Templates, contextual actions, and consistent task patterns replaced click-heavy flows that had grown over time. The result is a platform that is faster for power users and easier to learn for new ones, without losing the configurability enterprise customers depend on.',
      image: '/work/truops/truops-mockup-03-detail-focus.png',
      imageAlt:
        'Editorial TruOps compliance templates mockup showing structured workflow setup',
    },
    {
      index: '03',
      label: 'Decision surfaces',
      title: 'Dashboard & Decision Surfaces',
      summary:
        'Dashboards were redesigned around decision-making rather than data display. Risk posture, compliance status, and outstanding actions are surfaced in the right places, with consistent components and clear hierarchy. The dashboard work was built as a clickable prototype to validate how dense GRC data could feel both legible and actionable in the same view.',
      embed: {
        url: '/work/truops/dashboard.html',
        title: 'TruOps Compliance Readiness Dashboard — live interactive prototype',
        naturalWidth: 1920,
        naturalHeight: 1100,
        variant: 'wide',
      },
    },
    {
      index: '04',
      label: 'AI integration',
      title: 'Clark AI Assistant',
      summary:
        'Clark is the AI assistant inside the TruOps platform. It was designed as a workflow assistant — helping users find information, understand context, reduce manual effort, and take action — rather than as a separate novelty feature. The design emphasizes visibility (who is responding, what the suggestion is based on) and control (the user can accept, override, or ignore), so AI supports the workflow instead of becoming another layer of complexity.',
      embed: {
        url: '/work/truops/clark.html',
        title: 'Clark AI assistant — live interactive prototype',
        naturalWidth: 1400,
        naturalHeight: 820,
      },
    },
    {
      index: '05',
      label: 'Design system',
      title: 'Design System Foundation',
      summary:
        'A new design system replaced the inconsistent visual language that had grown across the platform. Reusable components, tokens, and documented patterns brought visual cohesion to existing surfaces and made future features — including AI integrations like Clark — faster to design, easier to build, and consistent by default. Accessibility, scalability, and engineering handoff were treated as first-class constraints, not afterthoughts.',
      // TODO: Add unique TruOps mockup for this chapter (System Pair is already used on Chapter 01).
      // Best candidates: a design system component sheet, a token swatch composition, or a
      // before/after pattern grid produced from the design system.
    },
  ],

  decisions: [
    {
      title: 'Organize complexity instead of removing necessary detail',
      body: 'GRC work is inherently detailed. The goal was never to hide that — it was to give the detail structure. The redesign keeps the depth users depend on, while making sure they can always tell where they are, what matters, and what to do next.',
    },
    {
      title: 'Treat navigation as a workflow system, not just a menu',
      body: 'Global and contextual navigation were rebuilt around the way teams actually move through compliance and risk work, not the way the underlying data model is structured. Tenant context, frequent actions, and workspace switching live where users expect them.',
    },
    {
      title: 'Design dashboards around decision-making, not data display',
      body: 'A dashboard is only as useful as the decisions it supports. The redesigned dashboards prioritize risk posture, compliance status, and the actions users need to take — with the underlying data still accessible, but no longer the headline.',
    },
    {
      title: 'Reduce click-heavy workflows through clearer paths and contextual actions',
      body: 'Routine tasks were rebuilt around fewer steps and contextual actions placed where users already are. The platform stays configurable for enterprise customers while feeling much faster for the everyday work.',
    },
    {
      title: 'Build reusable patterns for dense enterprise workflows',
      body: 'Tables, filters, side panels, summary cards, empty states — the platform now leans on a small set of shared patterns rather than re-inventing them per feature. Consistency reduces cognitive load and speeds up shipping.',
    },
    {
      title: 'Design Clark as a workflow assistant, not a separate novelty feature',
      body: 'Clark lives inside the platform, not next to it. It supports the user inside the workflows they are already in, with visible signals about what it is doing and why, and full user control over the result.',
    },
    {
      title: 'Build a scalable design system to improve consistency and handoff',
      body: 'The system was built so that what shipped in design matched what landed in production. Reusable components, tokens, and documented patterns made the team faster and the platform more coherent at the same time.',
    },
  ],

  outcome:
    'The redesign produced a clearer information architecture, task-driven interfaces that move users through complex workflows faster, a component-based design system that brought consistency across the platform, better onboarding and guidance patterns for new users, and a stronger foundation for Clark and future AI-assisted product features to land cleanly inside the existing experience. Pilot users and internal teams reported a clearer, cleaner, and more empowering platform that aligned with how they actually work. Outcomes reported in the original case study: an 85% reduction in user onboarding time, a 25% click reduction across key workflows, and a 34% increase in feature discoverability. As the redesign continues to roll out, the foundation supports the next chapter of TruOps as a more intuitive, scalable, and AI-ready GRC platform.',

  reflection:
    'This project reinforced something that defines senior enterprise design: the goal is not to make complex products feel artificially simple. It is to create structure, hierarchy, and reusable systems that help users move through that complexity with more confidence. The most valuable design work on this project was not visual flourish. It was the quieter work — naming things consistently, surfacing the right action at the right moment, making dense data feel scannable, and giving AI features a clear, predictable place inside the workflow.',

  next: {
    slug: 'truops-website',
    title: 'TruOps Website / Brand Experience',
  },
}
