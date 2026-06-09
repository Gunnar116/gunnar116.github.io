import { medefyCaseStudy } from './medefy'
import { truopsPlatformCaseStudy } from './truopsPlatform'
import { truopsWebsiteCaseStudy } from './truopsWebsite'
import { fortressA2VCaseStudy } from './fortressA2V'
import { kindnessAICaseStudy } from './kindnessAI'
import type { CaseStudyContent } from './types'

/**
 * Registry of full case study content keyed by slug.
 * The CaseStudyPage component looks up content here by `useParams.slug`.
 */
export const caseStudyContent: Record<string, CaseStudyContent> = {
  [medefyCaseStudy.slug]: medefyCaseStudy,
  [truopsPlatformCaseStudy.slug]: truopsPlatformCaseStudy,
  [truopsWebsiteCaseStudy.slug]: truopsWebsiteCaseStudy,
  [fortressA2VCaseStudy.slug]: fortressA2VCaseStudy,
  [kindnessAICaseStudy.slug]: kindnessAICaseStudy,
}

export { type CaseStudyContent } from './types'
