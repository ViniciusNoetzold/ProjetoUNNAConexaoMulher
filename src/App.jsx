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
const Pilares         = lazy(() => import('./components/Pilares'))
const Idealizadora    = lazy(() => import('./components/Idealizadora'))
const Parceiros       = lazy(() => import('./components/Parceiros'))
const Events          = lazy(() => import('./components/Events'))
const Cta             = lazy(() => import('./components/Cta'))
const Footer          = lazy(() => import('./components/Footer'))
const Galeria         = lazy(() => import('./pages/Galeria'))

// ── Imagem para NossosEncontros ───────────────────────────────────────────
const HERO_MEDIA_SRC = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&auto=format&fit=crop&q=80'

function HomePage({ onReserve }) {
  const location = useLocation()

  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const timer = setTimeout(() => {
      const el = document.querySelector(target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
    return () => clearTimeout(timer)
  }, [location.state])

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroUnna />

      <Suspense fallback={<div style={{ minHeight: '200vh' }} />}>

        {/* ── Nossa Essência — propósito e significado do UNNA ── */}
        <Essencia />

        {/* ── Ciclo Atual — tema da temporada ── */}
        <Cycle />

        {/* ── NossosEncontros — parallax + revelação progressiva ── */}
        <ScrollExpandHero
          mediaSrc={HERO_MEDIA_SRC}
          title="Encontros que Transformam"
        />

        {/* ── Pilares — o que acontece nos encontros ── */}
        <Pilares />

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
