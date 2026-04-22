import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import anaPaula1 from '../../Unna Conexão Mulher Fotos/AnaPaulaPictures/7.jpg'
import anaPaula2 from '../../Unna Conexão Mulher Fotos/AnaPaulaPictures/8.jpg'
import anaPaula3 from '../../Unna Conexão Mulher Fotos/AnaPaulaPictures/9.jpg'

const FOTOS = [anaPaula1, anaPaula2, anaPaula3]

const VP = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export default function Idealizadora() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FOTOS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="idealizadora"
      aria-labelledby="idealizadora-heading"
      className="pt-20 pb-12 px-5 md:px-12 md:pt-32 md:pb-16 bg-white relative overflow-hidden"
    >
      {/* Soft pink glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 80% 50%, rgba(253,143,174,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Star pulse dots animation */}
      {[
        [8,3],[15,92],[25,6],[35,89],[42,4],[55,94],
        [60,7],[70,88],[78,5],[85,91],[90,2],[95,93],
      ].map(([top, left], i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
          width: i % 3 === 0 ? '6px' : '4px',
          height: i % 3 === 0 ? '6px' : '4px',
          borderRadius: '50%',
          background: '#f9c4d4',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'starPulse ease-in-out infinite',
          animationDuration: `${3 + (i % 4)}s`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* Left: image */}
          <motion.div
            className="relative"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <motion.figure
              className="overflow-hidden rounded-2xl"
              style={{ boxShadow: '0 24px 72px rgba(141,0,50,0.16)' }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full h-[320px] sm:h-[420px] md:h-[560px]">
                <AnimatePresence>
                  <motion.img
                    key={currentIndex}
                    src={FOTOS[currentIndex]}
                    alt="Foto de Ana Paula Nogueira, nutricionista holística e idealizadora do UNNA"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: 'grayscale(0.15)' }}
                  />
                </AnimatePresence>
              </div>
            </motion.figure>

            {/* Decorative dot */}
            <div
              className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full -z-[1]"
              style={{ background: 'rgba(141,0,50,0.07)' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Right: bio */}
          <motion.div
            className="space-y-8"
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <div className="space-y-3">
              <span
                className="font-label text-xs uppercase tracking-[0.3em] px-4 py-1.5 rounded-full inline-block"
                style={{
                  backgroundColor: 'rgba(141,0,50,0.08)',
                  color: '#8d0032',
                  border: '1px solid rgba(141,0,50,0.20)',
                }}
              >
                Quem Está Por Trás
              </span>

              <h2
                id="idealizadora-heading"
                className="font-headline text-4xl md:text-6xl text-on-background leading-[1.05]"
              >
                Ana Paula<br />
                <span className="italic text-primary">Nogueira</span>
              </h2>

              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">
                Nutricionista Holística · Idealizadora
              </p>
            </div>

            <div
              className="h-px w-16"
              style={{ background: 'rgba(141,0,50,0.35)' }}
            />

            <div className="space-y-5">
              <p className="font-body text-lg leading-relaxed text-on-surface/80">
                Ana Paula Nogueira é nutricionista holística, com atuação voltada à saúde da mulher.
                Ao longo de sua trajetória profissional, tem se dedicado ao cuidado integral,
                promovendo saúde, bem-estar e qualidade de vida por meio de uma abordagem que
                integra corpo, mente e emoções.
              </p>
              <p className="font-body text-lg leading-relaxed text-on-surface/80">
                Com o UNNA Conexão Mulher, amplia seu propósito profissional, levando sua
                experiência para um formato coletivo, impactando grupos de mulheres por meio de
                eventos que unem conteúdo, vivência e conexão.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              <motion.a
                href="https://instagram.com/anapaulanogueiranutri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Ana Paula Nogueira (abre em nova aba)"
                className="inline-flex items-center gap-2 font-label text-sm font-semibold text-primary hover:text-primary/70 group transition-colors duration-200"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <InstagramIcon />
                <span className="underline underline-offset-4 decoration-primary/30 group-hover:decoration-primary/70 transition-all duration-200">
                  @anapaulanogueiranutri
                </span>
              </motion.a>

              <motion.a
                href="https://www.ananogueiranutri.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Site profissional de Ana Paula Nogueira (abre em nova aba)"
                className="inline-flex items-center gap-2 font-label text-sm font-semibold text-on-surface-variant hover:text-primary group transition-colors duration-200"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <span
                  className="material-symbols-outlined flex-shrink-0"
                  style={{ fontSize: '16px' }}
                  aria-hidden="true"
                >
                  language
                </span>
                <span className="underline underline-offset-4 decoration-on-surface-variant/30 group-hover:decoration-primary/50 transition-all duration-200">
                  ananogueiranutri.com.br
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
