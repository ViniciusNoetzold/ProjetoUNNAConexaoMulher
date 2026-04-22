import { motion } from 'framer-motion'

import cicloAtualImg from '../../Unna Conexão Mulher Fotos/CicloAtual/18.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const VP = { once: true, margin: '-40px' }

const pillars = [
  {
    icon: 'auto_awesome',
    title: 'Conteúdo que impacta',
    desc: 'Palestras e temas que fazem sentido real na sua vida',
  },
  {
    icon: 'favorite',
    title: 'Conexões verdadeiras',
    desc: 'Mulheres reais, histórias reais, vínculos que ficam',
  },
  {
    icon: 'star',
    title: 'Vivências práticas',
    desc: 'Dinâmicas imersivas de autoconhecimento e conexão',
  },
]

export default function Cycle() {
  return (
    <section
      id="cycle"
      aria-labelledby="cycle-heading"
      className="py-20 md:py-32 px-5 md:px-12 bg-white relative overflow-hidden"
    >
      {/* Soft Glow Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #fff8f6, transparent)',
        }}
      />

      {/* Ripple circles animation */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%', left: '20%',
            width: '300px', height: '300px',
            borderRadius: '50%',
            border: '1px solid rgba(249,196,212,0.3)',
            transform: 'translate(-50%,-50%)',
            animation: 'ripple 6s ease-out infinite',
            animationDelay: `${i * 2}s`,
          }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Topo: badge + título + subtítulo + separador ─── */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span
            className="inline-block font-label text-[0.7rem] uppercase tracking-[0.3em] font-semibold text-primary px-4 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(141, 0, 50, 0.08)',
              border: '1px solid rgba(141, 0, 50, 0.20)',
            }}
          >
            Ciclo Atual 2025
          </span>

          <h2
            id="cycle-heading"
            className="font-headline text-[2rem] sm:text-5xl md:text-7xl text-on-background leading-[1.02] tracking-tight"
          >
            IMPERFEITA, REAL E PODEROSA
          </h2>

          <p className="font-headline italic text-2xl md:text-3xl text-primary mt-4">
            – Seu poder é ser você
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-24"
            style={{ background: 'rgba(141, 0, 50, 0.45)' }}
          />
        </motion.div>

        {/* ── Corpo: grid 60/40 ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">

          {/* Coluna esquerda (60%) */}
          <motion.div
            className="md:col-span-3 flex flex-col justify-center"
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <p className="font-body text-xl md:text-2xl text-on-surface leading-relaxed">
              Um encontro que transforma. Palestra + vivências práticas para despertar
              o que há de mais poderoso em você.
            </p>

            {/* 3 cards em coluna — layout de feature list */}
            <div className="flex flex-col mt-12" style={{ gap: '16px' }}>
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  custom={0.18 + i * 0.08}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                  className="flex flex-row items-center gap-4"
                  style={{
                    background: 'rgba(141, 0, 50, 0.08)',
                    border: '1px solid rgba(141, 0, 50, 0.20)',
                    borderRadius: '12px',
                    padding: '16px',
                    minHeight: '80px',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 flex items-center justify-center material-symbols-outlined icon-fill text-primary"
                    style={{
                      width: '40px',
                      height: '40px',
                      fontSize: '28px',
                    }}
                  >
                    {p.icon}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-label font-bold text-on-surface text-base leading-snug">
                      {p.title}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-snug">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coluna direita (40%) */}
          <motion.div
            className="md:col-span-2 space-y-6"
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {/* Tema em destaque — canto superior direito */}
            <div className="text-left md:text-right">
              <p className="font-label text-[0.7rem] uppercase tracking-[0.3em] text-on-surface-variant mb-2">
                Tema em Destaque
              </p>
              <p className="font-headline italic text-lg md:text-xl text-primary leading-snug max-w-xs md:ml-auto">
                Resiliência em Ação – Como transformar o peso da vida em força
              </p>
            </div>

            {/* Imagem do evento */}
            <figure
              className="group overflow-hidden"
              style={{
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={cicloAtualImg}
                alt="Foto real do evento UNNA Conexão Mulher — Ciclo Atual"
                loading="lazy"
                className="transition-[transform,filter] duration-[400ms] ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                className="h-[260px] sm:h-[380px] md:h-[480px]"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  cursor: 'pointer',
                }}
              />
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
