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
  { nome: 'Festo Eventos',    papel: 'Organização de Eventos'    },
  { nome: 'Morgane Gheller',  papel: 'Cerimonialista'            },
  { nome: 'Cleiton Pinheiro', papel: 'Fotografia e Filmagem'     },
  { nome: 'Muller Filmes',    papel: 'Produção Audiovisual'      },
  { nome: 'Maria Laux',       papel: 'Massoterapeuta'            },
]

export default function Parceiros() {
  return (
    <section
      id="parceiros"
      aria-labelledby="parceiros-heading"
      className="py-24 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(253,143,174,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-14">

        {/* Header */}
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

        {/* Partners grid with wine-line separators */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(141,0,50,0.12)' }}
        >
          {PARCEIROS.map((p, i) => (
            <motion.div
              key={p.nome}
              variants={fadeUp}
              custom={0.08 + i * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="bg-white px-8 py-7 flex flex-col gap-1.5 group hover:bg-[rgba(141,0,50,0.03)] transition-colors duration-200"
            >
              <p className="font-headline text-xl text-on-background group-hover:text-primary transition-colors duration-200 leading-snug">
                {p.nome}
              </p>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                {p.papel}
              </p>
            </motion.div>
          ))}

          {/* Filler cells to complete the last lg row (5 items → 6th cell) */}
          <div className="bg-white hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
