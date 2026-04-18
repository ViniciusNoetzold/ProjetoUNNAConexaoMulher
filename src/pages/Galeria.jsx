import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ZoomParallax } from '../components/ui/zoom-parallax'
import ImageGallery from '../components/ui/image-gallery'
import Footer from '../components/Footer'

const WA_NUMBER = '5555996880252'

const VP = { once: true, margin: '-40px' }
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ── 7 imagens — máximo suportado pelo ZoomParallax ────────
// Todas retratam mulheres em eventos, conexão e liderança
const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&h=720&fit=crop&q=80',
    alt: 'Mulheres em evento de networking e conexão',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1280&h=720&fit=crop&q=80',
    alt: 'Evento de empreendedorismo feminino',
  },
  {
    src: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1280&h=720&fit=crop&q=80',
    alt: 'Mulheres conectando e conversando em evento',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1280&h=720&fit=crop&q=80',
    alt: 'Palestra e liderança feminina',
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&h=720&fit=crop&q=80',
    alt: 'Celebração e encerramento de evento',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1280&h=720&fit=crop&q=80',
    alt: 'Noite de encontro e propósito',
  },
  {
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1280&h=720&fit=crop&q=80',
    alt: 'Palco e apresentação no evento UNNA',
  },
]

export default function Galeria({ onReserve }) {
  const navigate = useNavigate()

  function handleWA() {
    const msg = encodeURIComponent('Olá! Vi a galeria do UNNA Conexão Mulher e quero garantir minha vaga no próximo evento!')
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        aria-labelledby="galeria-heading"
        className="relative overflow-hidden pt-32 pb-24 px-6 md:px-12"
        style={{ background: 'linear-gradient(160deg, #1a0008 0%, #3d0a1e 55%, #6b1535 100%)' }}
      >
        {/* Orb top-right */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(141,0,50,0.35) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        {/* Orb bottom-left */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(244,184,206,0.12) 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.span
            className="inline-block font-label text-[10px] font-bold uppercase tracking-[0.35em] text-[#f4b8ce]/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Circuito 2025 · Rio Grande do Sul
          </motion.span>

          <motion.h1
            id="galeria-heading"
            className="font-headline text-5xl md:text-7xl text-white leading-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Galeria
            <span className="block italic" style={{ color: '#f4b8ce' }}>
              Momentos que Inspiram
            </span>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Cada imagem guarda uma história de conexão genuína, propósito
            e mulheres que escolheram crescer juntas.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-6 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.18em] text-white/50 hover:text-[#f4b8ce] transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-base">arrow_back</span>
              Voltar ao site
            </button>

            <span aria-hidden="true" className="w-px h-4 bg-white/20" />

            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/35">
              Role para explorar
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Intro label ───────────────────────────────────── */}
      <motion.div
        className="py-16 px-6 text-center"
        custom={0}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#8d0032] font-bold">
          Role para ampliar
        </span>
        <p className="font-headline text-2xl md:text-3xl italic text-[#3d0a1e]/70 mt-3 leading-snug">
          A energia dos nossos encontros, em imagens
        </p>
      </motion.div>

      {/* ── Zoom Parallax ─────────────────────────────────── */}
      <ZoomParallax images={GALLERY_IMAGES} />

      {/* ── Image Gallery ─────────────────────────────────── */}
      <ImageGallery
        images={[
          {
            src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
            title: 'Encontro UNNA – Não-Me-Toque',
            city: 'Não-Me-Toque / RS',
          },
          {
            src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
            title: 'Conexão & Propósito',
            city: 'Cruz Alta / RS',
          },
          {
            src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
            title: 'Palco de Transformação',
            city: 'Panambi / RS',
          },
          {
            src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
            title: 'Mulheres que Inspiram',
            city: 'Palmeira das Missões / RS',
          },
          {
            src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80',
            title: 'Juntas Brilhamos',
            city: 'Sarandi / RS',
          },
          {
            src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
            title: 'Negócio com Propósito',
            city: 'Passo Fundo / RS',
          },
        ]}
      />

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        aria-labelledby="galeria-cta-heading"
        className="py-24 px-6 md:px-12"
        style={{ background: 'linear-gradient(160deg, #1a0008 0%, #3d0a1e 100%)' }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#f4b8ce]/70 font-bold">
            Faça parte da próxima edição
          </span>

          <h2
            id="galeria-cta-heading"
            className="font-headline text-3xl md:text-5xl text-white leading-tight"
          >
            Sua foto pode estar{' '}
            <em className="not-italic" style={{ color: '#f4b8ce' }}>aqui</em>.
          </h2>

          <p className="font-body text-lg text-white/55 leading-relaxed max-w-xl mx-auto">
            As vagas das próximas edições são limitadas. Entre em contato agora e
            garanta o seu lugar nessa história.
          </p>

          <motion.button
            onClick={handleWA}
            className="inline-flex items-center gap-3 bg-[#8d0032] text-white font-label font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all"
            style={{ boxShadow: '0 12px 32px rgba(141,0,50,0.35)' }}
            whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}
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
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
