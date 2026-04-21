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

const PARCEIROS = [
  { nome: 'Festo Eventos',    papel: 'Organização de Eventos' },
  { nome: 'Morgane Gheller',  papel: 'Cerimonialista'         },
  { nome: 'Cleiton Pinheiro', papel: 'Fotografia e Filmagem'  },
  { nome: 'Muller Filmes',    papel: 'Produção Audiovisual'   },
  { nome: 'Maria Laux',       papel: 'Massoterapeuta'         },
]

function ParceiroCard({ nome, papel, delay }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      whileHover={{ y: -2, boxShadow: '0 6px 24px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
      style={{
        padding: '36px 40px',
        border: '1px solid #f0e8ec',
        borderRadius: '12px',
        background: 'white',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a0a12', lineHeight: 1.3 }}>
        {nome}
      </p>
      <p
        className="font-label uppercase"
        style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: '#8d0032', marginTop: '6px' }}
      >
        {papel}
      </p>
    </motion.div>
  )
}

export default function Parceiros() {
  const row1 = PARCEIROS.slice(0, 3)
  const row2 = PARCEIROS.slice(3)

  return (
    <section
      id="parceiros"
      aria-labelledby="parceiros-heading"
      className="pt-20 pb-24 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(253,143,174,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Diamond spin animation */}
      {[
        { top: '5%',  left: '2%',  size: 20, dur: 12, delay: 0   },
        { top: '10%', left: '94%', size: 14, dur: 9,  delay: 1.5 },
        { top: '50%', left: '1%',  size: 16, dur: 15, delay: 3   },
        { top: '45%', left: '96%', size: 20, dur: 11, delay: 0.8 },
        { top: '85%', left: '3%',  size: 14, dur: 13, delay: 2   },
        { top: '88%', left: '93%', size: 18, dur: 10, delay: 1   },
      ].map((d, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute',
          top: d.top, left: d.left,
          width: d.size, height: d.size,
          border: '1px solid rgba(249,196,212,0.4)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: `diamondSpin ${d.dur}s linear infinite`,
          animationDelay: `${d.delay}s`,
          transform: 'rotate(45deg)',
        }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center space-y-4"
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
            Parceiros
          </span>

          <h2
            id="parceiros-heading"
            className="font-headline text-4xl md:text-5xl text-on-background"
          >
            Quem Torna<br />
            <span className="italic text-primary">Tudo Possível</span>
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ maxWidth: '860px', margin: '48px auto 0' }}>

          {/* Linha 1 — 3 cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {row1.map((p, i) => (
              <ParceiroCard key={p.nome} nome={p.nome} papel={p.papel} delay={0.08 + i * 0.08} />
            ))}
          </div>

          {/* Linha 2 — 2 cards centralizados (≈ 2/3 do grid) */}
          {row2.length > 0 && (
            <div
              className="mt-6 mx-auto"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', maxWidth: '573px' }}
            >
              {row2.map((p, i) => (
                <ParceiroCard key={p.nome} nome={p.nome} papel={p.papel} delay={0.08 + (row1.length + i) * 0.08} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
