export type ExperienceItem = {
  slug: string
  company: string
  role: string
  meta: string
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    slug: 'medefy',
    company: 'Medefy Health',
    role: 'Lead Product Designer',
    meta: '01/2026–Present',
    current: true,
  },
  {
    slug: 'kindness',
    company: 'Kindness.ai',
    role: 'Lead Product Designer (Contract)',
    meta: '08/2025–12/2025',
  },
  {
    slug: 'truops',
    company: 'TruOps Cyber Risk Management',
    role: 'Senior Product Designer',
    meta: '05/2023–06/2025',
  },
  {
    slug: 'fortress',
    company: 'Fortress Information Security',
    role: 'Lead Product Designer',
    meta: '11/2021–02/2023',
  },
  {
    slug: 'groove',
    company: 'Groove.co',
    role: 'UX/UI Designer (Contract)',
    meta: '08/2021–11/2021',
  },
  {
    slug: 'companycam',
    company: 'CompanyCam',
    role: 'UI Designer (Freelance)',
    meta: '05/2021–08/2021',
  },
  {
    slug: 'aet',
    company: 'American Estate & Trust',
    role: 'UI Designer (Freelance)',
    meta: '02/2021–05/2021',
  },
  {
    slug: 'thinkful',
    company: 'Thinkful',
    role: 'UX/UI Design Certificate',
    meta: '07/2020–12/2020',
  },
]
