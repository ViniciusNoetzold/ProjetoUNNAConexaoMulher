/**
 * NossosEncontros — "Cortina que Revela" com Aurora Vinho
 *
 * Seção 300vh com sticky container. Background generativo em CSS (orbs +
 * partículas). A cena começa escura (overlay sólido) e se abre conforme
 * o usuário scrolla. Conteúdo totalmente visível a partir de ~70% do scroll.
 * Compatível com Lenis.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PILLS = ['CONEXÃO REAL', 'MULHERES TRANSFORMADAS', 'EXPERIÊNCIA ÚNICA'] as const

// 18 partículas com posição/timing variados (gerado estaticamente)
const PARTICLES: Array<{ top: string; left: string; duration: string; delay: string }> = [
  { top:  '8%', left: '12%', duration: '2.8s', delay: '0.0s' },
  { top: '23%', left: '34%', duration: '3.5s', delay: '0.8s' },
  { top: '45%', left: '67%', duration: '2.2s', delay: '1.5s' },
  { top: '72%', left: '89%', duration: '4.1s', delay: '0.3s' },
  { top: '15%', left: '78%', duration: '3.0s', delay: '2.1s' },
  { top: '88%', left: '23%', duration: '2.5s', delay: '1.0s' },
  { top: '55%', left: '45%', duration: '4.5s', delay: '3.2s' },
  { top: '33%', left: '11%', duration: '2.9s', delay: '0.6s' },
  { top: '61%', left: '56%', duration: '3.7s', delay: '1.9s' },
  { top:  '9%', left: '90%', duration: '2.3s', delay: '2.7s' },
  { top: '78%', left: '70%', duration: '4.0s', delay: '0.4s' },
  { top: '42%', left: '27%', duration: '3.2s', delay: '1.6s' },
  { top: '19%', left: '53%', duration: '2.6s', delay: '3.8s' },
  { top: '93%', left: '40%', duration: '3.9s', delay: '0.9s' },
  { top: '67%', left: '82%', duration: '2.4s', delay: '2.3s' },
  { top: '31%', left: '95%', duration: '4.3s', delay: '1.1s' },
  { top: '82%', left:  '6%', duration: '3.1s', delay: '3.5s' },
  { top: '50%', left: '60%', duration: '2.7s', delay: '0.5s' },
]

export default function NossosEncontros() {
  const sectionRef = useRef<HTMLElement>(null)

  // Progresso: 0 = seção começa a pinnar, 1 = saiu da tela (300vh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Overlay — começa sólido, abre para translúcido ───────────────────────
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.55])

  // ── Linha rose que cresce da esquerda ────────────────────────────────────
  const lineScale = useTransform(scrollYProgress, [0.07, 0.35], [0, 1])

  // ── Conteúdo central ─────────────────────────────────────────────────────
  const contentOpacity = useTransform(scrollYProgress, [0.14, 0.42], [0, 1])
  const contentY       = useTransform(scrollYProgress, [0.14, 0.42], [60, 0])

  // ── Badge ─────────────────────────────────────────────────────────────────
  const badgeOpacity = useTransform(scrollYProgress, [0.21, 0.42], [0, 1])

  // ── Subtítulo ─────────────────────────────────────────────────────────────
  const subtitleOpacity = useTransform(scrollYProgress, [0.28, 0.49], [0, 1])

  // ── Pills — stagger horizontal ────────────────────────────────────────────
  const pill0Opacity = useTransform(scrollYProgress, [0.35, 0.56], [0, 1])
  const pill0X       = useTransform(scrollYProgress, [0.35, 0.56], [-28, 0])
  const pill1Opacity = useTransform(scrollYProgress, [0.38, 0.57], [0, 1])
  const pill1X       = useTransform(scrollYProgress, [0.38, 0.57], [0, 0])
  const pill2Opacity = useTransform(scrollYProgress, [0.42, 0.60], [0, 1])
  const pill2X       = useTransform(scrollYProgress, [0.42, 0.60], [28, 0])

  const pillMotion = [
    { opacity: pill0Opacity, x: pill0X },
    { opacity: pill1Opacity, x: pill1X },
    { opacity: pill2Opacity, x: pill2X },
  ]

  // ── Texto lateral decorativo ──────────────────────────────────────────────
  const sideTextOpacity = useTransform(scrollYProgress, [0, 0.70], [0, 0.15])

  return (
    <>
      {/* Injeção de CSS para orbs e partículas */}
      <style>{`
        @keyframes float {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(40px, -30px) scale(1.05); }
          66%  { transform: translate(-20px, 20px) scale(0.97); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50%       { opacity: 0.7; transform: scale(1); }
        }
        .unna-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float linear infinite;
          opacity: 0.4;
        }
        .unna-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #8d0032, transparent);
          top: -200px; left: -100px;
          animation-duration: 18s;
        }
        .unna-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #c0396b, transparent);
          bottom: -100px; right: 10%;
          animation-duration: 24s;
          animation-direction: reverse;
        }
        .unna-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #5c0a28, transparent);
          top: 40%; left: 50%;
          animation-duration: 15s;
        }
        .unna-particle {
          position: absolute;
          width: 2px; height: 2px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: sparkle ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{ height: '300vh', position: 'relative' }}
      >
        {/* Sticky container — permanece fixo enquanto a seção scrolla */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* ── CAMADA 1 — Aurora Vinho: background generativo ───────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: [
                'radial-gradient(ellipse at 20% 50%, #5c0a28 0%, transparent 60%)',
                'radial-gradient(ellipse at 80% 20%, #8d0032 0%, transparent 50%)',
                'radial-gradient(ellipse at 60% 80%, #3D0A1E 0%, transparent 55%)',
                'linear-gradient(135deg, #1a0010 0%, #3D0A1E 50%, #1a0010 100%)',
              ].join(', '),
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            <div className="unna-orb unna-orb-1" />
            <div className="unna-orb unna-orb-2" />
            <div className="unna-orb unna-orb-3" />

            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="unna-particle"
                style={{
                  top: p.top,
                  left: p.left,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          {/* ── CAMADA 2 — Overlay vinho que se abre ─────────────────────── */}
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
                color: 'rgba(141, 0, 50, 0.12)',
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
    </>
  )
}
