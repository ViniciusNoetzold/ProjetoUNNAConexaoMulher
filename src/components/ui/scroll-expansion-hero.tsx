/**
 * ScrollExpandMedia — reescrito com position:sticky + useScroll nativo.
 *
 * Abordagem anterior (wheel hijack + preventDefault) conflitava com o
 * layout da página. Esta versão usa scroll 100% nativo:
 *  - Container de 300vh cria espaço de scroll sem travar nada
 *  - position:sticky mantém o painel fixo enquanto o usuário rola
 *  - useScroll do framer-motion lê scrollYProgress do container
 *  - Zero conflito com Lenis, overflow-hidden vizinhos ou qualquer coisa
 *
 * Adaptações vs. original fornecido:
 *  - Removido 'use client' (React + Vite, não Next.js)
 *  - Removidos pauseLenis / resumeLenis (não são mais necessários)
 *  - Cor #f9a8d4 → #f4b8ce (paleta rosa UNNA estabelecida)
 *  - Overlay escuro usa #1a0008 (vinho UNNA) em vez de preto puro
 */

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title?: string
  date?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll 100% nativo — framer-motion lê scrollYProgress do container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const mediaWidth   = useTransform(scrollYProgress, [0, 0.5], [isMobile ? '280px' : '320px', '98vw'])
  const mediaHeight  = useTransform(scrollYProgress, [0, 0.5], [isMobile ? '380px' : '420px', '92vh'])
  const bgOpacity    = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.1])
  const titleX1      = useTransform(scrollYProgress, [0, 0.5], ['0vw', isMobile ? '-45vw' : '-40vw'])
  const titleX2      = useTransform(scrollYProgress, [0, 0.5], ['0vw', isMobile ? '45vw'  : '40vw'])
  const dateX        = useTransform(scrollYProgress, [0, 0.5], ['0vw', isMobile ? '-45vw' : '-40vw'])
  const expandX      = useTransform(scrollYProgress, [0, 0.5], ['0vw', isMobile ? '45vw'  : '40vw'])
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])

  const firstWord   = title?.split(' ')[0] ?? ''
  const restOfTitle = title?.split(' ').slice(1).join(' ') ?? ''

  return (
    // 300vh de altura cria o espaço de scroll sem travar a página
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>

      {/* Sticky: painel fica fixo na viewport enquanto se rola os 300vh */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── Background (desbota conforme expansão) ── */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src={bgImageSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1a0008]/30" />
        </motion.div>

        {/* ── Conteúdo centralizado ── */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

          {/* Mídia expansível */}
          <motion.div
            style={{
              width: mediaWidth,
              height: mediaHeight,
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              borderRadius: '12px',
              boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            {mediaType === 'image' ? (
              <div className="relative w-full h-full">
                <img
                  src={mediaSrc}
                  alt={title ?? 'Evento UNNA'}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  style={{ opacity: overlayOpacity }}
                  className="absolute inset-0 bg-[#1a0008]/50"
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <motion.div
                  style={{ opacity: overlayOpacity }}
                  className="absolute inset-0 bg-[#1a0008]/30"
                />
              </div>
            )}
          </motion.div>

          {/* Título que se abre para os lados */}
          <div
            className={[
              'relative z-10 flex flex-col items-center gap-4 w-full pointer-events-none',
              textBlend ? 'mix-blend-difference' : '',
            ].join(' ')}
          >
            <motion.h2
              style={{ x: titleX1 }}
              className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold italic"
              css={{ color: '#f4b8ce' }}
            >
              <span style={{ color: '#f4b8ce' }}>{firstWord}</span>
            </motion.h2>
            <motion.h2
              style={{ x: titleX2 }}
              className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-center"
            >
              <span style={{ color: '#f4b8ce' }}>{restOfTitle}</span>
            </motion.h2>
          </div>

          {/* Data + instrução de scroll */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 z-10 pointer-events-none">
            {date && (
              <motion.p
                style={{ x: dateX }}
                className="font-label text-lg font-semibold uppercase tracking-widest"
              >
                <span style={{ color: '#f4b8ce' }}>{date}</span>
              </motion.p>
            )}
            {scrollToExpand && (
              <motion.p
                style={{ x: expandX }}
                className="font-label text-xs uppercase tracking-[0.2em]"
              >
                <span style={{ color: '#f4b8ce' }}>{scrollToExpand}</span>
              </motion.p>
            )}
          </div>
        </div>

        {/* Conteúdo filho — aparece após a expansão completa */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center px-8 py-20"
          aria-hidden={false}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
