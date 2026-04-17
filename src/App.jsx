import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import HeroUnna from './components/blocks/HeroUnna'
// Modal is eagerly loaded: it must be ready the instant the user clicks,
// and AnimatePresence requires the component to be mounted for the exit animation.
import ReserveModal from './components/ReserveModal'

// Below-fold sections split into separate chunks
const Cycle    = lazy(() => import('./components/Cycle'))
const Events   = lazy(() => import('./components/Events'))
const Speakers = lazy(() => import('./components/Speakers'))
const Cta      = lazy(() => import('./components/Cta'))
const Footer   = lazy(() => import('./components/Footer'))

export default function App() {
  useLenis()
  const [modalData, setModalData] = useState(null)

  return (
    <>
      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <HeroUnna />

        <Suspense fallback={<div style={{ minHeight: '200vh' }} />}>
          <Cycle />
          <Events onReserve={setModalData} />
          <Speakers />
          <Cta />
          <Footer />
        </Suspense>
      </main>

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
