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

const CIDADES = [
  { cidade: 'Passo Fundo',          estado: 'RS', status: 'Em breve', pausado: false },
  { cidade: 'Panambi',              estado: 'RS', status: 'Em breve', pausado: false },
  { cidade: 'Sarandi',              estado: 'RS', status: 'Em breve', pausado: false },
  { cidade: 'Palmeira das Missões', estado: 'RS', status: 'Em breve', pausado: false },
  { cidade: 'Cruz Alta',            estado: 'RS', status: 'Pausado',  pausado: true  },
]

export default function Cidades() {
  return (
    <section
      id="cidades"
      aria-labelledby="cidades-heading"
      className="py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ background: '#1a0009' }}
    >
      {/* Ambient glow — bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 110%, rgba(141,0,50,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <motion.div
          className="text-center space-y-5"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span
            className="font-label text-xs uppercase tracking-[0.3em] px-4 py-1.5 rounded-full inline-block"
            style={{ backgroundColor: 'rgba(141,0,50,0.25)', color: '#f4b8ce' }}
          >
            Próximas Edições · 2026
          </span>

          <h2
            id="cidades-heading"
            className="font-headline text-5xl md:text-6xl text-white leading-[1.05]"
          >
            Em Expansão pelo<br />
            <span className="italic text-[#f4b8ce]">Rio Grande do Sul</span>
          </h2>

          <p
            className="font-body text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.50)' }}
          >
            Datas a serem divulgadas em breve. Acompanhe nossas redes sociais para não perder o
            lançamento.
          </p>
        </motion.div>

        {/* Cities grid — 2 cols sm, 3 cols lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {CIDADES.map((c, i) => (
            <motion.div
              key={c.cidade}
              variants={fadeUp}
              custom={0.08 + i * 0.09}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className={`relative p-7 rounded-2xl flex flex-col gap-5${c.pausado ? ' opacity-55' : ''}`}
              style={{
                background: c.pausado
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(141,0,50,0.12)',
                border: c.pausado
                  ? '1px solid rgba(255,255,255,0.07)'
                  : '1px solid rgba(141,0,50,0.30)',
              }}
            >
              {/* Status badge */}
              <span
                className="self-start font-label text-[10px] uppercase tracking-[0.28em] px-3 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: c.pausado
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(141,0,50,0.28)',
                  color: c.pausado ? 'rgba(255,255,255,0.30)' : '#f4b8ce',
                }}
              >
                {c.status}
              </span>

              <div>
                <p className="font-headline text-2xl text-white leading-tight">{c.cidade}</p>
                <p
                  className="font-label text-xs uppercase tracking-widest mt-1"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {c.estado}
                </p>
              </div>

              <div
                className="h-px w-full"
                style={{
                  background: c.pausado
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(141,0,50,0.28)',
                }}
              />

              <p
                className="font-body text-sm italic"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {c.pausado ? 'Edição pausada no momento' : 'Data a confirmar'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center font-label text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.22)' }}
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          Mais cidades em confirmação · Acompanhe{' '}
          <a
            href="https://instagram.com/unnaconexaomulher"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f4b8ce] transition-colors duration-200"
            aria-label="Instagram do UNNA Conexão Mulher (abre em nova aba)"
          >
            @unnaconexaomulher
          </a>
        </motion.p>
      </div>
    </section>
  )
}
