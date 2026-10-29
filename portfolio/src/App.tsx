import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { CursorProvider } from './context/CursorContext'
import { Cursor } from './components/ui/Cursor/Cursor'
import { ScrollProgress } from './components/common/ScrollProgress'
import { GrainOverlay } from './components/common/GrainOverlay'
import { Preloader } from './components/common/Preloader'
import { VantaBackground } from './components/common/VantaBackground'
import { Navbar } from './components/layout/Navbar'
import { PageTransition } from './components/motion/PageTransition'
import { HomePage } from './pages/HomePage'
import { useLenis } from './hooks/useLenis'

const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
)

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/work/:slug"
            element={
              <PageTransition>
                <ProjectDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function PortfolioRoot() {
  useLenis()
  const [, setPreloaderFinished] = useState(false)

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-[#f2f0eb] selection:bg-[#a855f7] selection:text-white">
        {/* Full-Website Vanta.js Fog Background */}
        <VantaBackground />

        {/* Grain Noise Overlay */}
        <GrainOverlay />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Preloader with 0-100 and curtain wipe */}
        <Preloader onComplete={() => setPreloaderFinished(true)} />

        {/* Smart Navigation */}
        <Navbar />

        {/* Main Routed Content */}
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>

        {/* Awwwards Dual-Layer Custom Cursor (highest z-index layer) */}
        <Cursor />
      </div>
    </CursorProvider>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <PortfolioRoot />
    </BrowserRouter>
  )
}
