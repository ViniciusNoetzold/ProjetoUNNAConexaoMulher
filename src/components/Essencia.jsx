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

export default function Essencia() {
  return (
    <section
      id="essencia"
      aria-labelledby="essencia-heading"
      className="py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ background: '#0f0005' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(141,0,50,0.20) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left: heading */}
          <motion.div
            className="space-y-8"
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
              Nossa Essência
            </span>

            <h2
              id="essencia-heading"
              className="font-headline text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight"
            >
              O que é o<br />
              <span className="italic text-[#f4b8ce]">UNNA?</span>
            </h2>

            <div className="w-16 h-0.5" style={{ background: '#8d0032' }} />

            <p className="font-body text-xl italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              "Unir para fortalecer,<br />conectar para transformar."
            </p>
          </motion.div>

          {/* Right: paragraphs */}
          <motion.div
            className="space-y-7 lg:pt-14"
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              O UNNA Conexão Mulher é um movimento que nasce a partir do propósito de unir mulheres,
              promovendo conexão, autocuidado e fortalecimento feminino.
            </p>

            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              O nome{' '}
              <strong style={{ color: '#f4b8ce', fontWeight: 600 }}>UNNA</strong>{' '}
              vem do verbo <em>unir</em>. Ele carrega o significado de conexão, de aproximação, de
              troca. Representa o encontro entre mulheres que compartilham vivências, experiências e
              buscam crescimento pessoal e coletivo. Por isso, o UNNA é mais do que um nome — é a
              essência do projeto: unir para fortalecer, conectar para transformar.
            </p>

            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Voltado ao público feminino, foi criado para proporcionar momentos de pausa e
              reconexão, incentivando cada mulher a olhar para si e compreender a importância do
              autocuidado em todas as áreas da sua vida — física, emocional e mental.
            </p>

            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Além do impacto individual, o projeto também se posiciona como um espaço de
              fortalecimento de marcas e negócios locais, promovendo visibilidade, conexão e
              oportunidades através do networking entre mulheres, profissionais e empresas que
              compartilham desse propósito.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
