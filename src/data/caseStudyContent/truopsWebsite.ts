import type { CaseStudyContent } from './types'

/**
 * TruOps Website / Brand Experience — first draft.
 * Body content adapted from the live Framer case study:
 *   https://grmconcepts.framer.website/project/truops-website-redesign-streamlined-intuitive-and-impactful
 *
 * Visuals are real screenshots captured from the live truops.com site
 * (see scripts/capture-truops-website.mjs to re-run). PNGs live in
 * public/work/truops-website/.
 *
 * Still needs Gunnar's confirmation on:
 *  - The five reported metrics in `outcome` (bounce −27%, lead conversion +25%,
 *    time on site +34%, demo requests +38% Q1 post-launch, product-page bounce 62%→34%).
 *    These come from the original Framer case study — kept here as reported case-study
 *    outcomes. Flag for review.
 *  - The "new enterprise contracts moving into the pipeline" language — confirm
 *    it still reflects the actual outcome and is okay to surface.
 */
export const truopsWebsiteCaseStudy: CaseStudyContent = {
  slug: 'truops-website',

  eyebrow: 'Case study',
  title: 'TruOps Website / Brand Experience',
  subtitle:
    'Rebuilding TruOps’ digital presence to clarify the product story, improve trust, and support go-to-market needs.',

  role: 'Senior Product Designer',
  timeline: '2024–2025',
  team: 'Marketing, Product, Executive Leadership, Engineering',

  focusAreas: [
    'Website redesign',
    'Brand experience',
    'Product storytelling',
    'Information architecture',
    'Design systems',
    'Conversion-focused UX',
    'Cross-functional delivery',
  ],

  heroVisual: 'truops-website',
  externalLinks: [
    {
      label: 'View live website',
      href: 'https://truops.com/',
    },
  ],
  heroImage: {
    src: '/work/truops-website/truops-site-01-home-hero.png',
    alt: 'TruOps homepage hero section showing the updated post-spinout positioning, navigation, primary CTA, and product story entry point',
  },

  overview:
    'TruOps is a cloud-based Governance, Risk, and Compliance platform that helps organizations manage risk and compliance with real-time insights and automated workflows. When TruOps separated from its parent company in 2025, the public-facing website did not yet reflect that change. The work was a full redesign: rebuilding the digital presence, sharpening the product story, and translating the company’s new positioning into a site that could carry buyer-facing conversations and support sales.',

  problem:
    'The legacy site had grown out of step with what TruOps had become. The look felt fragmented and dated, the message did not clearly articulate the standalone value proposition, and the competitive edge was difficult to find. Audits surfaced usability gaps, content redundancies, and a user flow that did not guide different audience segments (buyers, partners, and security professionals) toward the actions that mattered. The bigger issue was strategic: the website was not yet doing the work of a standalone GRC company, and that gap was being felt in marketing and sales conversations.',

  myRole:
    'As Senior Product Designer, I led the website redesign end-to-end, from discovery and research through information architecture, design system development, prototyping, and final implementation handoff. The work was deeply cross-functional. I partnered with marketing on positioning and messaging, with copywriters and subject matter experts on the core narrative, with product on how the site connected back into the platform experience, with executive leadership on the broader brand story, and with engineering on build, launch, and QA. I owned design strategy, visual direction, and the design system that the site is built on today.',

  chapters: [
    {
      index: '01',
      label: 'Product story',
      title: 'Product Story & Positioning',
      summary:
        'Sharpening the product narrative so the site could lead with what buyers actually came to evaluate. Working with marketing, copywriters, and subject matter experts, we rebuilt the value proposition around TruOps as a standalone GRC platform and clarified the differentiators that mattered to the audience. The result was a story the site could carry end-to-end, from homepage to product pages to demo CTAs.',
      // Intentionally no image — the hero above already shows the positioning section.
    },
    {
      index: '02',
      label: 'Information architecture',
      title: 'Website Information Architecture',
      summary:
        'Restructuring the site so visitors could find the right level of depth for the question they were asking. The new IA was built around buyer journeys: buyers, partners, and security professionals each have a clear path through the site that ends in a meaningful next step. Pages were consolidated, redundancies removed, and the hierarchy tightened so the platform’s capabilities became scannable rather than buried.',
      image: '/work/truops-website/truops-site-06-assessments-hero.png',
      imageAlt:
        'TruOps Assessments to Reports product page hero showing capability messaging, proof points, and customer story cards',
    },
    {
      index: '03',
      label: 'Visual system',
      title: 'Visual System & Page Design',
      summary:
        'A new web design system grounded the refreshed TruOps identity in a reusable component library: typography, color, layout, and patterns that work across the site and translate fluidly into the product surface. The visual language emphasizes clarity, confidence, and authority over flourish, with accessibility (WCAG) and responsive performance built into the components themselves.',
      image: '/work/truops-website/truops-site-04-grc-expertise.png',
      imageAlt:
        'TruOps website section explaining GRC expertise with supporting benefit points and a product interface visual',
    },
    {
      index: '04',
      label: 'Conversion pathways',
      title: 'Conversion & Demo Pathways',
      summary:
        'Designing the paths from interest to action. Each audience segment has a clear arc, from awareness content through product detail to demo request, and each major page is structured around a primary CTA that fits where the visitor is in that arc. Lead generation flows, contact paths, and the demo experience were treated as part of the design surface, not as separate marketing afterthoughts.',
      image: '/work/truops-website/truops-site-05-arcade-demo.png',
      imageAlt:
        'Interactive TruOps Arcade product demo showing an assessment-to-reports walkthrough inside a product frame',
    },
    {
      index: '05',
      label: 'Launch & iteration',
      title: 'Launch Support / Iteration',
      summary:
        'Carrying the work from staging to production. Engineering implementation was supported by a documented design system, dev-ready assets, and design QA sessions during the rollout. After launch, the site continued to evolve through stakeholder feedback, content updates, and ongoing visual checks, with the design system absorbing those refinements without breaking the cohesion of the whole.',
      image: '/work/truops-website/truops-site-07-risk-page.png',
      imageAlt:
        'TruOps Risk module page showing the Risk Register and Real-Time Risk Dashboards sections: two distinct module narratives stacked vertically with their own CTAs, demonstrating the design system supporting ongoing post-launch content',
    },
  ],

  decisions: [
    {
      title: 'Position TruOps as a standalone category leader, not a former subsidiary',
      body: 'The site needed to do more than reflect the corporate change. It had to actually carry TruOps’ identity as an independent GRC platform. Every page-level decision started from that positioning, and the visual and editorial system were built to support it.',
    },
    {
      title: 'Build the message hierarchy around the buyer, not the org chart',
      body: 'Information architecture followed how buyers actually evaluate a GRC platform (by capability, by use case, by trust signal) rather than mirroring how the company is internally organized. The result is a site visitors can navigate by intent.',
    },
    {
      title: 'Treat the design system as the source of truth, not a deliverable',
      body: 'A documented, reusable component library was scoped early so the site could grow and adapt after launch without losing visual consistency. Marketing and engineering inherited a system, not a snapshot.',
    },
    {
      title: 'Connect the marketing site and the product experience',
      body: 'The website’s visual language carries through into the TruOps platform itself. Buyers who move from a product page into a demo do not feel like they are crossing brands. The system holds across both surfaces.',
    },
    {
      title: 'Design conversion pathways alongside the content, not as a final layer',
      body: 'Lead generation, demo CTAs, and audience-specific paths were treated as design surfaces from the beginning. They are part of the page structure, not pasted on at the end of the project.',
    },
    {
      title: 'Bake accessibility and responsiveness into the components themselves',
      body: 'WCAG-aligned color, type, and component behavior were built into the design system from the start. The system makes accessibility the default, which is the only way it actually sticks long-term.',
    },
  ],

  outcome:
    'The redesign clarified TruOps’ positioning, tightened the buyer experience, and gave marketing and sales a digital presence that aligned with the rest of the product. Outcomes reported in the original case study include a 27% decrease in bounce rate, a 25% increase in lead conversion, a 34% increase in time on site, and a 38% increase in demo requests in the first quarter after launch, with product pages specifically moving from a 62% bounce rate to 34%. The team also reported new enterprise contracts moving into the pipeline as a direct result of the clearer buyer story. Beyond the numbers, the site now articulates TruOps’ value with the clarity and authority the company had earned but had not yet expressed online.',

  reflection:
    'This project reinforced something I think a lot of senior designers learn the hard way: a website redesign is rarely just about the website. The hardest, most valuable work was upstream: getting the story right, organizing the message around real buyer intent, and building a system the team could keep extending. Once that foundation was in place, the page-level decisions fell into place quickly. Visual polish matters, but it matters because it lets the story land. The design system is what keeps that story from coming apart over time.',

  next: {
    slug: 'fortress-a2v',
    title: 'Fortress A2V Network Redesign',
  },
}
