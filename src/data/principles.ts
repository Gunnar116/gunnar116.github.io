export type Principle = {
  index: string
  title: string
  body: string
}

export const principles: Principle[] = [
  {
    index: '01',
    title: 'Make complexity feel simple.',
    body: 'Dense problems do not need dense interfaces. The work is in removing the noise without losing the substance.',
  },
  {
    index: '02',
    title: 'Design systems, not one-off screens.',
    body: 'Patterns and tokens compound. Investment in the system makes every future screen faster, calmer, and more consistent.',
  },
  {
    index: '03',
    title: 'Hold user, business, and engineering at once.',
    body: 'Good design balances all three. Defaulting to any single perspective tends to produce brittle, short-lived products.',
  },
  {
    index: '04',
    title: 'Sweat the details that build trust.',
    body: 'Empty states, transitions, copy, microinteractions. The quiet details are what users actually feel about a product.',
  },
]
