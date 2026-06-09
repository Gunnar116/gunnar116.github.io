import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { SelectedWork } from '../components/SelectedWork'
import { MedefySpotlight } from '../components/medefy/MedefySpotlight'
import { AboutPreview } from '../components/AboutPreview'
// import { Testimonials } from '../components/Testimonials' // hidden until real quotes are ready
import { DesignPrinciples } from '../components/DesignPrinciples'
// import { AdditionalWork } from '../components/AdditionalWork' // hidden — Kindness.ai promoted into Selected Work
import { ExperienceSnapshot } from '../components/ExperienceSnapshot'
import { Contact } from '../components/Contact'

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'Gunnar Morgan — Senior Product Designer'
  }, [])

  // Scroll to hash target when arriving with #work, #about, #contact, #medefy, etc.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location])

  return (
    <main>
      <Hero />
      <SelectedWork />
      <MedefySpotlight />
      <AboutPreview />
      {/* <Testimonials /> */}
      <DesignPrinciples />
      {/* <AdditionalWork /> */}
      <ExperienceSnapshot />
      <Contact />
    </main>
  )
}
