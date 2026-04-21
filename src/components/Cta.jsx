import { motion } from 'framer-motion'

const WA_HREF = 'https://wa.me/5555996880252?text=Olá!%20Quero%20garantir%20minha%20vaga%20no%20UNNA%20Conexão%20Mulher.'

const VP = { once: true, margin: '-80px' }

const PHRASES = [
  {
    text:    'Você não precisa chegar pronta.',
    align:   'left',
    xFrom:   -30,
    style:   { fontStyle: 'italic', fontSize: '1.4rem', color: '#8d0032', fontWeight: 400 },
  },
  {
    text:    'Só precisa chegar.',
    align:   'right',
    xFrom:   30,
    style:   { fontWeight: 700, fontSize: '2rem', color: '#3D0A1E' },
  },
  {
    text:    'O resto, a UNNA cuida.',
    align:   'center',
    xFrom:   0,
    style:   {
      fontSize: '1.2rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#8d0032',
      fontWeight: 500,
    },
    line: true,
  },
]

export default function Cta() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="py-20"
      style={{ backgroundColor: '#fdf5f7' }}
    >
      <div className="max-w-3xl mx-auto px-6 space-y-12">

        {/* ── Título ──────────────────────────────────────────── */}
        <motion.h2
          id="cta-heading"
          className="font-headline text-3xl md:text-5xl text-center leading-tight"
          style={{ color: '#3D0A1E' }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          Sua jornada começa com um sim para você mesma.
        </motion.h2>

        {/* ── CTA WhatsApp ─────────────────────────────────────── */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
            className="inline-flex items-center gap-3 font-label font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full text-white"
            style={{ backgroundColor: '#8d0032', boxShadow: '0 12px 32px rgba(141,0,50,0.30)' }}
            whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Garantir minha vaga via WhatsApp
          </motion.a>
        </motion.div>

        {/* ── Frases ──────────────────────────────────────────── */}
        <div className="space-y-8 pb-4">
          {PHRASES.map(({ text, align, xFrom, style, line }, i) => (
            <div
              key={text}
              className={
                align === 'left'   ? 'text-left'   :
                align === 'right'  ? 'text-right'  :
                'text-center flex flex-col items-center'
              }
            >
              <motion.p
                className="font-headline leading-snug"
                style={style}
                initial={{ opacity: 0, x: xFrom }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {text}
              </motion.p>

              {line && (
                <motion.div
                  style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: '#8d0032',
                    originX: 0.5,
                    marginTop: '10px',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.6, delay: i * 0.2 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
