import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import HeroUnna from './components/blocks/HeroUnna'
// Modal is eagerly loaded: it must be ready the instant the user clicks,
// and AnimatePresence requires the component to be mounted for the exit animation.
import ReserveModal from './components/ReserveModal'

// Below-fold sections split into separate chunks
const Essencia        = lazy(() => import('./components/Essencia'))
const Cycle           = lazy(() => import('./components/Cycle'))
const ScrollExpandHero = lazy(() => import('./components/ui/scroll-expansion-hero'))
const Idealizadora    = lazy(() => import('./components/Idealizadora'))
const Parceiros       = lazy(() => import('./components/Parceiros'))
const Events          = lazy(() => import('./components/Events'))
const Cta             = lazy(() => import('./components/Cta'))
const Footer          = lazy(() => import('./components/Footer'))
const Galeria         = lazy(() => import('./pages/Galeria'))


function HomePage({ onReserve }) {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [location.hash])

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroUnna />

      <Suspense fallback={<div style={{ minHeight: '200vh' }} />}>

        {/* ── Nossa Essência — propósito e significado do UNNA ── */}
        <Essencia />

        {/* ── Ciclo Atual — tema da temporada ── */}
        <Cycle />

        {/* ── NossosEncontros — parallax + revelação progressiva ── */}
        <ScrollExpandHero />



        {/* ── Próximos Eventos — circuito 2025 ── */}
        <Events />

        {/* ── Idealizadora — Ana Paula Nogueira ── */}
        <Idealizadora />

        {/* ── Parceiros ── */}
        <Parceiros />

        {/* ── CTA com scroll paralax ── */}
        <Cta />

        <Footer />
      </Suspense>
    </main>
  )
}

export default function App() {
  useLenis()
  const [modalData, setModalData] = useState(null)

  return (
    <>
      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>

      <Nav />

      <Routes>
        <Route path="/" element={<HomePage onReserve={setModalData} />} />
        <Route
          path="/galeria"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Galeria onReserve={setModalData} />
            </Suspense>
          }
        />
      </Routes>

      {/* Modal: AnimatePresence enables exit animation before unmount */}
      <AnimatePresence>
        {modalData && (
          <ReserveModal
            key="reserve-modal"
            data={modalData}
            onClose={() => setModalData(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
