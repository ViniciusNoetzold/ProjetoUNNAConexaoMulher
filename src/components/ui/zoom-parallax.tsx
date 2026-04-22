/**
 * ZoomParallax — adapted from sshahaider/zoom-parallax (21st.dev)
 * Changes vs. original:
 *  - Removed 'use client' (React + Vite, not Next.js)
 *  - Removed @studio-freight/lenis import (project uses global Lenis via useLenis)
 */

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

interface Image {
  src: string
  alt?: string
}

interface ZoomParallaxProps {
  /** Max 7 images */
  images: Image[]
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  // Background orb parallax — existing
  const orbY1    = useTransform(scrollYProgress, [0, 1], ['-20%', '40%'])
  const orbY2    = useTransform(scrollYProgress, [0, 1], ['20%', '-30%'])
  const orbX3    = useTransform(scrollYProgress, [0, 1], ['-60%', '-40%'])
  const orbY3    = useTransform(scrollYProgress, [0, 1], ['-50%', '-30%'])
  const lineW    = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '100%'])

  // Background orb parallax — extra
  const orbY4    = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const orbY5    = useTransform(scrollYProgress, [0, 1], ['30%', '-20%'])
  const orbX6    = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const orbY6    = useTransform(scrollYProgress, [0, 1], ['-20%', '30%'])
  const lineH1   = useTransform(scrollYProgress, [0.1,  0.7],  ['0px', '200px'])
  const lineH2   = useTransform(scrollYProgress, [0.2,  0.8],  ['0px', '150px'])
  const lineH3   = useTransform(scrollYProgress, [0.15, 0.75], ['0px', '180px'])
  const ringScale1   = useTransform(scrollYProgress, [0, 1], [0.5, 2.5])
  const ringOpacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.3, 0])
  const ringScale2   = useTransform(scrollYProgress, [0, 1], [0.3, 3])
  const ringOpacity2 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.3, 0.2, 0])

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  return (
    <div ref={container} className="relative h-[150vh] md:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Background animations ─────────────────────────── */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
          background: '#fdf5f7',
        }}>
          {/* Orbs */}
          <motion.div style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,196,212,0.35) 0%, transparent 70%)',
            y: orbY1,
          }} />
          <motion.div style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(141,0,50,0.12) 0%, transparent 70%)',
            y: orbY2,
          }} />
          <motion.div style={{
            position: 'absolute', top: '40%', left: '50%',
            width: '250px', height: '250px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,196,212,0.2) 0%, transparent 70%)',
            x: orbX3, y: orbY3,
          }} />

          {/* Lines */}
          <motion.div style={{
            position: 'absolute', top: '50%', left: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(249,196,212,0.4), transparent)',
            width: lineW, transformOrigin: 'left',
          }} />
          <motion.div style={{
            position: 'absolute', top: '50%', right: 0,
            height: '1px',
            background: 'linear-gradient(to left, transparent, rgba(249,196,212,0.4), transparent)',
            width: lineW, transformOrigin: 'right',
          }} />

          {/* Pulsing particles — existing */}
          {([
            { top:'15%', left:'8%',  size:5, dur:'4s', delay:'0s'   },
            { top:'25%', left:'92%', size:4, dur:'6s', delay:'1s'   },
            { top:'60%', left:'5%',  size:6, dur:'5s', delay:'0.5s' },
            { top:'70%', left:'88%', size:4, dur:'7s', delay:'2s'   },
            { top:'85%', left:'15%', size:5, dur:'4s', delay:'1.5s' },
            { top:'80%', left:'80%', size:3, dur:'5s', delay:'0.8s' },
          ] as const).map((p, i) => (
            <div key={i} style={{
              position: 'absolute', top: p.top, left: p.left,
              width: p.size, height: p.size, borderRadius: '50%',
              background: '#f9c4d4',
              animation: `starPulse ${p.dur} ease-in-out ${p.delay} infinite`,
            }} />
          ))}

          {/* Extra orbs */}
          <motion.div style={{
            position: 'absolute', top: '20%', right: '-5%',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,196,212,0.2) 0%, transparent 70%)',
            y: orbY4,
          }} />
          <motion.div style={{
            position: 'absolute', top: '60%', left: '10%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(141,0,50,0.1) 0%, transparent 70%)',
            y: orbY5,
          }} />
          <motion.div style={{
            position: 'absolute', top: '10%', left: '40%',
            width: '180px', height: '180px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,196,212,0.15) 0%, transparent 70%)',
            x: orbX6, y: orbY6,
          }} />

          {/* Extra particles */}
          {([
            { top:'10%', left:'20%', size:3, dur:'5s', delay:'0.3s' },
            { top:'35%', left:'75%', size:5, dur:'7s', delay:'1.2s' },
            { top:'55%', left:'30%', size:4, dur:'4s', delay:'2.1s' },
            { top:'75%', left:'60%', size:6, dur:'6s', delay:'0.7s' },
            { top:'20%', left:'55%', size:3, dur:'8s', delay:'1.8s' },
            { top:'90%', left:'45%', size:4, dur:'5s', delay:'0.4s' },
          ] as const).map((p, i) => (
            <div key={`extra-${i}`} style={{
              position: 'absolute', top: p.top, left: p.left,
              width: p.size, height: p.size, borderRadius: '50%',
              background: '#f9c4d4',
              animation: `starPulse ${p.dur} ease-in-out ${p.delay} infinite`,
            }} />
          ))}

          {/* Vertical lines that grow with scroll */}
          <motion.div style={{
            position: 'absolute', top: '25%', left: '50%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(249,196,212,0.2), transparent)',
            height: lineH1, transformOrigin: 'top',
          }} />
          <motion.div style={{
            position: 'absolute', top: '55%', left: '25%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(249,196,212,0.15), transparent)',
            height: lineH2, transformOrigin: 'top',
          }} />
          <motion.div style={{
            position: 'absolute', top: '40%', left: '75%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(249,196,212,0.15), transparent)',
            height: lineH3, transformOrigin: 'top',
          }} />

          {/* Expanding rings */}
          <motion.div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '300px', height: '300px', borderRadius: '50%',
            border: '1px solid rgba(249,196,212,0.12)',
            x: '-50%', y: '-50%',
            scale: ringScale1, opacity: ringOpacity1,
          }} />
          <motion.div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '500px', height: '500px', borderRadius: '50%',
            border: '1px solid rgba(141,0,50,0.08)',
            x: '-50%', y: '-50%',
            scale: ringScale2, opacity: ringOpacity2,
          }} />
        </div>

        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length]

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={[
                'absolute top-0 flex h-full w-full items-center justify-center',
                index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : '',
                index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : '',
                index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : '',
                index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : '',
                index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : '',
                index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : '',
              ].join(' ')}
            >
              <div className="relative h-[25vh] w-[25vw]">
                <img
                  src={src}
                  alt={alt ?? `Momento UNNA ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
