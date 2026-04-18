import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import HeroUnna from './components/blocks/HeroUnna'
// Modal is eagerly loaded: it must be ready the instant the user clicks,
// and AnimatePresence requires the component to be mounted for the exit animation.
import ReserveModal from './components/ReserveModal'

// Below-fold sections split into separate chunks
const Cycle              = lazy(() => import('./components/Cycle'))
const ScrollExpandHero   = lazy(() => import('./components/ui/scroll-expansion-hero'))
const Events             = lazy(() => import('./components/Events'))
const Speakers           = lazy(() => import('./components/Speakers'))
const Cta                = lazy(() => import('./components/Cta'))
const Footer             = lazy(() => import('./components/Footer'))
const Galeria            = lazy(() => import('./pages/Galeria'))

const WA_URL = 'https://wa.me/5555996880252?text=Olá!%20Quero%20garantir%20minha%20vaga%20no%20UNNA%20Conexão%20Mulher.'

// ── Imagens para o ScrollExpandHero ──────────────────────────────────────
// mediaSrc  : foto de evento/mulheres em networking (Unsplash)
// bgImageSrc: fundo atmosférico escuro para contraste com o overlay vinho
const HERO_MEDIA_SRC = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&auto=format&fit=crop&q=80'
const HERO_BG_SRC    = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&auto=format&fit=crop&q=80'

function HomePage({ onReserve }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroUnna />
      <Suspense fallback={<div style={{ minHeight: '200vh' }} />}>
        <Cycle />

        {/* ── ScrollExpandMedia — após "IMPERFEITA, REAL E PODEROSA" ── */}
        <ScrollExpandHero
          mediaType="image"
          mediaSrc={HERO_MEDIA_SRC}
          bgImageSrc={HERO_BG_SRC}
          title="Encontros que Transformam"
          date="UNNA – Conexão Mulher"
          scrollToExpand="Role para expandir"
          textBlend={false}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-headline text-3xl md:text-4xl text-white leading-tight">
              Nossos Encontros
            </h2>
            <p className="font-body text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              Cada encontro UNNA é um espaço onde mulheres se conectam, compartilham
              histórias e saem transformadas. Um palco onde ideias florescem e marcas
              ganham propósito.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#8d0032] text-white font-label font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:brightness-110 transition-all"
              style={{ boxShadow: '0 12px 32px rgba(141,0,50,0.35)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Garantir minha vaga via WhatsApp
            </a>
          </div>
        </ScrollExpandHero>

        <Events onReserve={onReserve} />
        <Speakers />
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
