import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { scrollTo } from '../hooks/useLenis'

import heroBg1 from '../../Unna Conexão Mulher Fotos/HeroFotos/3.jpg'
import heroBg2 from '../../Unna Conexão Mulher Fotos/HeroFotos/10.jpg'
import heroBg3 from '../../Unna Conexão Mulher Fotos/HeroFotos/15.jpg'
import heroBg4 from '../../Unna Conexão Mulher Fotos/HeroFotos/17.jpg'
import heroBg5 from '../../Unna Conexão Mulher Fotos/HeroFotos/21.jpg'
import heroBg6 from '../../Unna Conexão Mulher Fotos/HeroFotos/24.jpg'

const heroSlides = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5, heroBg6]

// ⚠ Substitua pelo número real de WhatsApp
const WA_VAGA = 'https://wa.me/5555996880252?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20no%20UNNA%20Conex%C3%A3o%20Mulher.'

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.18,
    },
  },
}

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: bg blob moves slower than scroll, image moves slightly
  const blobY   = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const quoteY  = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative min-h-[92vh] flex items-center px-6 md:px-12 py-20 pt-28 overflow-hidden"
      style={{ background: 'var(--gradient-editorial)' }}
    >
      {/* Background slideshow */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.img
            key={slideIndex}
            src={heroSlides[slideIndex]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Parallax ambient blob */}
      <motion.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 w-full">

        {/* ── Left: Copy ─────────────────────────── */}
        <motion.div
          className="lg:col-span-7 space-y-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="space-y-4">
            <motion.span variants={rise} className="font-label text-primary uppercase tracking-[0.3em] text-xs block">
              Conexão &amp; Propósito
            </motion.span>
            <motion.h1
              id="hero-heading"
              variants={rise}
              className="font-headline text-6xl md:text-8xl text-on-background leading-[0.9] tracking-tighter"
              style={{ textShadow: '0 0 40px rgba(141,0,50,0.12)' }}
            >
              UNNA –<br />
              <span className="italic">Conexão Mulher</span>
            </motion.h1>
          </div>

          <motion.p
            variants={rise}
            className="font-body text-2xl md:text-3xl text-on-surface-variant max-w-xl italic leading-snug"
          >
            O palco onde ideias florescem, marcas ganham propósito e mulheres brilham juntas.
          </motion.p>

          <motion.p variants={rise} className="font-body text-lg text-on-surface/80 max-w-md">
            Existem lugares que inspiram, e existem lugares que transformam ambientes.
          </motion.p>

          <motion.div variants={rise} className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.a
              href={WA_VAGA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-label font-semibold tracking-wide"
              style={{ boxShadow: '0 16px 40px rgba(141,0,50,0.22)' }}
              whileHover={{ filter: 'brightness(1.12)', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <span aria-hidden="true" className="material-symbols-outlined icon-fill text-xl">chat</span>
              Garantir minha vaga via WhatsApp
            </motion.a>

            <motion.a
              href="#events"
              onClick={e => { e.preventDefault(); scrollTo('#events') }}
              className="bg-surface-container-highest text-on-secondary-container px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-label font-semibold hover:bg-surface-dim transition-colors"
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <span aria-hidden="true">📍</span> Ver todas as cidades
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: Image ───────────────────────── */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY }}
        >
          <div
            className="aspect-[4/5] rounded-xl overflow-hidden rotate-3 scale-105 border-[12px] border-white/30 group"
            style={{ boxShadow: 'var(--shadow-warm-lg)' }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz5ZxJdxtytcTHcsL8miKQuwe8KEY-1UDAi5j6JwE8NjOyZU6FgBTuweAaaSQiMmys6W6skNJEpmd5beRf7TYIb4d5wzUejN6Pvycq_gVHp5uu9oWLog4so0RH9PjQcXoInl9cwBq_cXCsVRImfbjOyH_KtvH_zq0sikkUz0TrA9ctHq5K9X_ZyXd6ZY2xFPHebRgggJJhQOmS0USxajdI9TOWYGIVzJAQepBY19YOscTgAY4IPHhlWfOPdd968VhGeGljFbFcZn82"
              alt="Mulher profissional em ambiente arquitetônico sereno com iluminação editorial natural"
              width={520}
              height={650}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          </div>

          {/* Floating quote card */}
          <motion.blockquote
            className="absolute -bottom-10 -left-6 lg:-left-14 glass p-6 md:p-8 rounded-xl max-w-xs"
            style={{
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: 'var(--shadow-warm)',
              y: quoteY,
            }}
            initial={{ opacity: 0, rotate: -5, y: 20 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, rotate: -1 }}
          >
            <p className="font-body italic text-on-surface text-base md:text-lg leading-relaxed">
              "A capa pesou, mas foi quando eu tirei que me senti leve de verdade."
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  )
}
