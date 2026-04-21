/**
 * NossosEncontros — "Cortina que Revela"
 *
 * Seção 200vh com sticky container. A cena começa escura (overlay sólido) e
 * se abre conforme o usuário scrolla, revelando a imagem com zoom suave e
 * o conteúdo em layers progressivos. Compatível com Lenis.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface NossosEncontrosProps {
  mediaSrc: string
  title?: string
}

const PILLS = ['CONEXÃO REAL', 'MULHERES TRANSFORMADAS', 'EXPERIÊNCIA ÚNICA'] as const

export default function NossosEncontros({ mediaSrc }: NossosEncontrosProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Progresso: 0 = seção começa a pinnar, 1 = saiu da tela
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Imagem — zoom out suave + fade in ────────────────────────────────────
  const imageScale   = useTransform(scrollYProgress, [0, 0.5],  [1.12, 1.0])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3],  [0.25, 0.9])

  // ── Overlay gradiente — começa sólido, abre para translúcido ─────────────
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.55])

  // ── Linha rose que cresce da esquerda ─────────────────────────────────────
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  // ── Conteúdo central (título) ─────────────────────────────────────────────
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
  const contentY       = useTransform(scrollYProgress, [0.2, 0.6], [60, 0])

  // ── Badge ─────────────────────────────────────────────────────────────────
  const badgeOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  // ── Subtítulo ─────────────────────────────────────────────────────────────
  const subtitleOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1])

  // ── Pills — stagger horizontal ────────────────────────────────────────────
  const pill0Opacity = useTransform(scrollYProgress, [0.50, 0.80], [0, 1])
  const pill0X       = useTransform(scrollYProgress, [0.50, 0.80], [-28, 0])
  const pill1Opacity = useTransform(scrollYProgress, [0.55, 0.82], [0, 1])
  const pill1X       = useTransform(scrollYProgress, [0.55, 0.82], [0, 0])
  const pill2Opacity = useTransform(scrollYProgress, [0.60, 0.85], [0, 1])
  const pill2X       = useTransform(scrollYProgress, [0.60, 0.85], [28, 0])

  const pillMotion = [
    { opacity: pill0Opacity, x: pill0X },
    { opacity: pill1Opacity, x: pill1X },
    { opacity: pill2Opacity, x: pill2X },
  ]

  // ── Texto lateral decorativo ──────────────────────────────────────────────
  const sideTextOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.15])

  return (
    <section
      ref={sectionRef}
      style={{ height: '200vh', position: 'relative' }}
    >
      {/* Sticky container — permanece fixo enquanto a seção scrolla */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── CAMADA 1 — Imagem com zoom lento ─────────────────────────── */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ scale: imageScale, opacity: imageOpacity, zIndex: 0 }}
        >
          <img
            src={mediaSrc}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* ── CAMADA 2 — Overlay gradiente vinho que se abre ───────────── */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: 1,
            opacity: overlayOpacity,
            background: 'linear-gradient(135deg, #3D0A1E 0%, #1a0010 50%, #3D0A1E 100%)',
          }}
        />

        {/* ── CAMADA 3 — Linha rose que cresce da esquerda ─────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: '#8d0032',
            scaleX: lineScale,
            transformOrigin: 'left',
            zIndex: 2,
          }}
        />

        {/* ── CAMADA 4 — Conteúdo central ──────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ zIndex: 3 }}
        >
          {/* Badge */}
          <motion.span
            className="inline-block font-label font-bold rounded-full mb-6"
            style={{
              opacity: badgeOpacity,
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase' as const,
              padding: '8px 20px',
              backgroundColor: 'rgba(141, 0, 50, 0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Os Encontros
          </motion.span>

          {/* Título */}
          <motion.h2
            className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            Nossos Encontros
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            className="font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            style={{
              opacity: subtitleOpacity,
              color: 'rgba(255,255,255,0.70)',
            }}
          >
            Cada encontro UNNA é um espaço onde mulheres se conectam, compartilham
            histórias e saem transformadas. Um palco onde ideias florescem e marcas
            ganham propósito.
          </motion.p>

          {/* Pills stagger horizontal */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PILLS.map((label, i) => (
              <motion.span
                key={label}
                style={{
                  opacity: pillMotion[i].opacity,
                  x: pillMotion[i].x,
                  display: 'inline-block',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.12em',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(141, 0, 50, 0.2)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderRadius: '999px',
                  padding: '8px 20px',
                }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── CAMADA 5 — "UNNA" decorativo lateral ─────────────────────── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            opacity: sideTextOpacity,
            zIndex: 2,
            pointerEvents: 'none',
            userSelect: 'none' as const,
          }}
        >
          <span
            style={{
              display: 'block',
              transform: 'rotate(-90deg) translateX(-50%)',
              transformOrigin: 'left center',
              fontSize: '8rem',
              fontWeight: 900,
              color: 'rgba(141, 0, 50, 1)',
              letterSpacing: '0.3em',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-headline, serif)',
            }}
          >
            UNNA
          </span>
        </motion.div>

      </div>
    </section>
  )
}
