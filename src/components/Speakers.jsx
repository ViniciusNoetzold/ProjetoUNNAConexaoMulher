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

const SPEAKERS = [
  {
    name: 'Ana Paula Nogueira',
    role: 'Nutricionista Holística / Idealizadora',
    bio:  'Especialista em saúde integrativa e equilíbrio feminino através da nutrição consciente.',
    img:  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVr0eAs79g30f2s7uII5_fBTEogcqwgIGmOjs6wD8tc2Xc_aakkocrtF6KEv0x3B83yoyFYAMX0sQd-XIzmx5Ryx663Rnz_iB54YqMf-EUJ20AGusiwv3_xLofajeayIErCTYbUSsC8lW2RooOQ810vpqpUsX7yElg6C4HgeuTIZvO_TwvoNbz7r_FVoPzYJVh0cTbk5jRCLfyTK1-aPXik-aLbqmP5HMeTr5jbrkyxsT37ZS0Zo3boR9DGz45aoA4XcK24AG3xzU3',
    alt:  'Foto profissional de Ana Paula Nogueira',
  },
  {
    name: 'Simone Zanatta',
    role: 'Terapeuta Constelação Familiar',
    bio:  'Guia de jornadas sistêmicas para libertação de pesos emocionais e cura geracional.',
    img:  'https://lh3.googleusercontent.com/aida-public/AB6AXuAMoWH6-HQ6kKjFfW9R2Owm1ndkMZDEJOXkx6KwCMuYRI27SriuOrpBMwDwuZvYZnqMmBofiOvoyBY1tp28tJaAQFFZqdy-dGO0m0h213AR23Mg39UWOCsQig4EfAtzshtWvIrDvCWNj1az5O0EWtbDy5zuFgox8NzPBw-56jz-oLX1ue4srOXhrD1CyOxbw2L9-Lp6GWSEP1vny8xm2kyAXHA1w1geV3HQvAXWsfGHW10uKkt-b23YL9baHpikDUbfS06FGEeVPAIi',
    alt:  'Retrato de Simone Zanatta, terapeuta de constelação familiar',
  },
]

export default function Speakers() {
  return (
    <section id="speakers" aria-labelledby="speakers-heading" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Pink Gradient Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #fff8f6, transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

        {/* ── Speaker list ────────────────────────── */}
        <div className="order-2 lg:order-1 space-y-10">
          {SPEAKERS.map((s, i) => (
            <motion.div
              key={s.name}
              className="flex gap-6 items-start"
              custom={i * 0.13}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <motion.div
                className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden"
                style={{ boxShadow: 'var(--shadow-warm)', filter: 'grayscale(1)' }}
                whileHover={{ filter: 'grayscale(0)', scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={96}
                  height={96}
                />
              </motion.div>
              <div>
                <h3 className="font-headline text-2xl text-on-background">{s.name}</h3>
                <p className="font-label text-primary text-xs uppercase tracking-widest font-bold mt-1">{s.role}</p>
                <p className="mt-2 text-on-surface-variant italic font-body">{s.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Section headline ─────────────────────── */}
        <motion.div
          className="order-1 lg:order-2 space-y-8"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span
            className="font-label text-xs uppercase tracking-[0.3em] px-4 py-1.5 rounded-full inline-block"
            style={{ backgroundColor: 'var(--clr-chip-bg)', color: 'var(--clr-chip-text)' }}
          >
            As Mentes
          </span>
          <h2 id="speakers-heading" className="font-headline text-5xl md:text-7xl text-on-background leading-[1.1]">
            Inspirando <br /><span className="italic text-primary">Novas Narrativas</span>
          </h2>
          <p className="font-body text-xl leading-relaxed text-on-surface/80">
            O encontro é conduzido por especialistas que dedicam suas vidas ao desenvolvimento humano
            integral, unindo ciência e sensibilidade.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

