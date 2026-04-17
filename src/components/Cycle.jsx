import { motion } from 'framer-motion'

// Shared reveal variant factory — accepts a stagger delay via `custom` prop
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const VP = { once: true, margin: '-40px' }

export default function Cycle() {
  return (
    <section id="cycle" aria-labelledby="cycle-heading" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Soft Glow Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #fff8f6, transparent)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header row ─────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 mb-20 ghost-rule">
          <motion.div
            className="max-w-2xl"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span className="font-label text-secondary uppercase tracking-widest text-xs mb-4 block">
              Ciclo Atual
            </span>
            <h2 id="cycle-heading" className="font-headline text-4xl md:text-6xl text-on-background leading-tight">
              IMPERFEITA, REAL E PODEROSA
              <br />
              <span className="italic text-primary">– Seu poder é ser você</span>
            </h2>
          </motion.div>

          <motion.div
            className="text-right"
            custom={0.14}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">
              Tema em Destaque
            </p>
            <p className="font-headline text-xl italic max-w-xs">
              Resiliência em Ação – Como transformar o peso da vida em força
            </p>
          </motion.div>
        </div>

        {/* ── Content grid ───────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            className="space-y-8"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <p className="font-body text-xl text-on-surface leading-relaxed">
              Para mulheres únicas que merecem confiança e vivem com autodefesa. Um encontro que une
              palestra e vivências práticas para o despertar da consciência e saúde.
            </p>
            <div className="flex gap-4 items-center p-6 bg-surface-container-low rounded-xl">
              <span
                aria-hidden="true"
                className="material-symbols-outlined icon-fill text-4xl text-primary"
              >
                psychology
              </span>
              <div>
                <h3 className="font-label font-semibold text-on-surface">Vivências Transformadoras</h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  Práticas imersivas de autoconhecimento e conexão.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.figure
            className="rounded-xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-warm)' }}
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS8L41d0NXt3DYp0mbaob5NKTeohTy3IArEF5naWT1MaC1iL3SNrYWA3OvHj5hRo-G6zZZzZiul2eldxB-lEHGkogeLhF-BwBvC9fLNiawDMurAvWgIi6ygWT2igkpBg6xocuPUN4dydFjSro7Xaab2CWXg63jwZMXm8phQy9fS7bKq0rAOJVFUt48XC9Od7pI9vVr2Yrwg4Hg0toka_U7xh_hPTwPocHcSF7LXdTwHhwwM13zqNOozC-pz8lSn-VqLLibgFtmHFkm"
              alt="Grupo de mulheres diversas sentadas em círculo em conversa significativa num estúdio luminoso"
              className="w-full h-80 object-cover"
              loading="lazy"
              width={600}
              height={320}
            />
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
