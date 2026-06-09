import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { LightboxProvider } from './components/Lightbox'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { CaseStudyPage } from './pages/CaseStudyPage'

function App() {
  return (
    <LightboxProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
      </Routes>
      <Footer />
    </LightboxProvider>
  )
}

export default App
