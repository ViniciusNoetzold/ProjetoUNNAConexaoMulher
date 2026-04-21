import { motion } from 'framer-motion'

const VP = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const PILARES = [
  {
    icon: 'spa',
    title: 'Autocuidado',
    desc: 'Redescubra o cuidado com você mesma como ato de poder e reconexão.',
  },
  {
    icon: 'favorite',
    title: 'Saúde Integral',
    desc: 'Corpo, mente e emoções em harmonia — saúde em todas as suas dimensões.',
  },
  {
    icon: 'psychology',
    title: 'Resiliência Feminina',
    desc: 'Transformando desafios em força e crescimento com autenticidade.',
  },
  {
    icon: 'wb_sunny',
    title: 'Qualidade de Vida',
    desc: 'Viver bem é uma escolha que começa dentro de você.',
  },
  {
    icon: 'diamond',
    title: 'Autoestima',
    desc: 'Reconheça seu valor e brilhe com toda a sua autenticidade.',
  },
  {
    icon: 'trending_up',
    title: 'Desenvolvimento Pessoal',
    desc: 'Evolução contínua, em cada versão de você.',
  },
  {
    icon: 'group',
    title: 'Networking & Conexão',
    desc: 'Mulheres que se encontram para crescer e construir juntas.',
  },
]

export default function Pilares() {
  return (
    <section
      id="pilares"
      aria-labelledby="pilares-heading"
      className="py-32 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(253,143,174,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Diagonal rain lines animation */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '-100%',
            left: `${i * 14}%`,
            width: '1px',
            height: '60%',
            background: 'linear-gradient(to bottom, transparent, rgba(249,196,212,0.25), transparent)',
            animation: 'slideDown 8s ease-in-out infinite',
            animationDelay: `${i * 0.9}s`,
          }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">

        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span
            className="font-label text-xs uppercase tracking-[0.3em] px-4 py-1.5 rounded-full inline-block"
            style={{
              backgroundColor: 'rgba(141,0,50,0.08)',
              color: '#8d0032',
              border: '1px solid rgba(141,0,50,0.20)',
            }}
          >
            Os Eventos
          </span>

          <h2
            id="pilares-heading"
            className="font-headline text-5xl md:text-6xl text-on-background leading-[1.05]"
          >
            O Que Acontece<br />
            <span className="italic text-primary">nos Encontros</span>
          </h2>

          <p className="font-body text-xl leading-relaxed text-on-surface/70 max-w-2xl mx-auto">
            Os eventos do UNNA são estruturados para oferecer uma experiência completa, que vai
            além do formato tradicional de palestras. A programação envolve conteúdos, vivências e
            interações que abordam a vida da mulher em sua totalidade.
          </p>
        </motion.div>

        {/* Pillar cards grid — 3 cols on lg, 2 on sm, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILARES.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              custom={0.07 + i * 0.07}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className={`group p-7 rounded-2xl cursor-default${i === 6 ? ' lg:col-start-2' : ''}`}
              style={{
                background: 'rgba(141,0,50,0.04)',
                border: '1px solid rgba(141,0,50,0.14)',
              }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined icon-fill text-primary mb-5 block"
                style={{ fontSize: '32px' }}
              >
                {p.icon}
              </span>

              <h3 className="font-label font-bold text-on-surface text-base mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
                {p.title}
              </h3>

              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center font-body italic text-on-surface/45 text-base max-w-2xl mx-auto leading-relaxed"
          variants={fadeUp}
          custom={0.65}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          Também fazem parte do evento momentos de networking e conexão, em um ambiente acolhedor
          e estrategicamente pensado para gerar troca, proximidade e relacionamento.
        </motion.p>
      </div>
    </section>
  )
}
