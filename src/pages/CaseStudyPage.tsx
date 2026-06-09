import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { caseStudyContent } from '../data/caseStudyContent'
import { BackToWork } from '../components/casestudy/BackToWork'
import { CaseStudyHeader } from '../components/casestudy/CaseStudyHeader'
import { CaseStudyHero } from '../components/casestudy/CaseStudyHero'
import { CaseStudySection } from '../components/casestudy/CaseStudySection'
import { CaseStudyDecisions } from '../components/casestudy/CaseStudyDecisions'
import { CaseStudyChapters } from '../components/casestudy/CaseStudyChapters'
import { CaseStudyNext } from '../components/casestudy/CaseStudyNext'
import { ConfidentialityNote } from '../components/casestudy/ConfidentialityNote'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? caseStudyContent[slug] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    if (content) document.title = `${content.title} — Gunnar Morgan`
    return () => {
      document.title = 'Gunnar Morgan — Senior Product Designer'
    }
  }, [content, slug])

  if (!content) {
    return <Navigate to="/" replace />
  }

  return (
    <main>
      <BackToWork />
      <CaseStudyHeader content={content} />
      {(content.heroImagePair ||
        content.heroScrollableImage ||
        content.heroImage ||
        (content.heroVisual && content.heroVisual !== 'none')) && (
        <CaseStudyHero
          variant={content.heroVisual ?? 'none'}
          image={content.heroImage}
          scrollableImage={content.heroScrollableImage}
          imagePair={content.heroImagePair}
        />
      )}
      {content.confidentialityNote && (
        <ConfidentialityNote note={content.confidentialityNote} />
      )}

      {content.overview && (
        <CaseStudySection heading="Project overview" eyebrow="Overview">
          <p>{content.overview}</p>
        </CaseStudySection>
      )}

      {content.problem && (
        <CaseStudySection heading="Problem & context" eyebrow="Context">
          <p>{content.problem}</p>
        </CaseStudySection>
      )}

      {content.myRole && (
        <CaseStudySection heading="My role" eyebrow="Role">
          <p>{content.myRole}</p>
        </CaseStudySection>
      )}

      {content.process && (
        <CaseStudySection heading="Process & approach" eyebrow="Process">
          <p>{content.process}</p>
        </CaseStudySection>
      )}

      {content.chapters && content.chapters.length > 0 && (
        <CaseStudyChapters chapters={content.chapters} />
      )}

      {content.decisions && content.decisions.length > 0 && (
        <CaseStudyDecisions decisions={content.decisions} />
      )}

      {content.outcome && (
        <CaseStudySection heading="Outcome & impact" eyebrow="Outcome">
          <p>{content.outcome}</p>
        </CaseStudySection>
      )}

      {content.reflection && (
        <CaseStudySection heading="Reflection" eyebrow="Looking back">
          <p>{content.reflection}</p>
        </CaseStudySection>
      )}

      <CaseStudyNext next={content.next} />
    </main>
  )
}
