import { motion } from 'framer-motion'
import { NewsCards } from './ui/news-cards'

import foto36 from '../../Unna Conexão Mulher Fotos/FotosQueSobraram/36.jpg'
import foto37 from '../../Unna Conexão Mulher Fotos/FotosQueSobraram/37.jpg'
import foto38 from '../../Unna Conexão Mulher Fotos/FotosQueSobraram/38.jpg'
import foto39 from '../../Unna Conexão Mulher Fotos/FotosQueSobraram/39.jpg'

const VP = { once: true, margin: '-40px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const UNNA_EVENTS = [
  {
    id: 'nao-me-toque',
    proximo: true,
    title: 'UNNA Conexão Mulher – Não-Me-Toque',
    category: 'Networking & Propósito',
    subcategory: 'Não-Me-Toque / RS',
    dateLabel: '13 de Maio de 2025',
    badge: '13 MAI',
    time: '19h30',
    location: 'Balão Mágico',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    content: [
      'Uma noite de conexão genuína entre mulheres que constroem, inspiram e transformam o Rio Grande do Sul. Em Não-Me-Toque, reunimos líderes locais, empreendedoras e profissionais para um encontro que vai além do networking.',
      'Prepare-se para palestras provocadoras, rodadas de conexão guiada e momentos que ficam. O Balão Mágico recebe com exclusividade essa edição especial do UNNA.',
      'Vagas limitadas. Venha como você é, saia diferente do que chegou.',
    ],
  },
  {
    id: 'panambi',
    title: 'UNNA Conexão Mulher – Panambi',
    category: 'Networking & Propósito',
    subcategory: 'Panambi / RS',
    dateLabel: '6 de Maio de 2025',
    badge: '06 MAI',
    time: '19h00',
    location: 'Salão Steffen',
    image: foto36,
    content: [
      'Panambi entra no circuito UNNA com uma edição que promete ser referência na região. Mulheres do agronegócio, do comércio e da saúde se encontram num ambiente desenhado para conversas que transformam.',
      'O Salão Steffen recebe mesas temáticas, mentoria rápida com especialistas convidadas e uma programação musical ao vivo para fechar a noite com estilo.',
    ],
  },
  {
    id: 'palmeira',
    title: 'UNNA Conexão Mulher – Palmeira das Missões',
    category: 'Networking & Propósito',
    subcategory: 'Palmeira das Missões / RS',
    dateLabel: '13 de Maio de 2025',
    badge: '13 MAI',
    time: '19h30',
    location: 'Espaço Mirante',
    image: foto37,
    content: [
      'Das Missões para o mundo — Palmeira das Missões recebe o UNNA com uma visão ampliada do que é possível quando mulheres se unem. O Espaço Mirante oferece o cenário perfeito para este encontro.',
      'Rodadas de conexão, painel de líderes regionais e um espaço de escuta ativa para quem está num momento de transição ou crescimento profissional.',
    ],
  },
  {
    id: 'sarandi',
    title: 'UNNA Conexão Mulher – Sarandi',
    category: 'Networking & Propósito',
    subcategory: 'Sarandi / RS',
    dateLabel: '20 de Maio de 2025',
    badge: '20 MAI',
    time: '19h00',
    location: 'Villa Carvalho Eventos',
    image: foto38,
    content: [
      'Sarandi recebe sua primeira edição UNNA numa noite de pura conexão. A Villa Carvalho Eventos abre suas portas para mulheres que querem mais — mais propósito, mais rede, mais impacto.',
      'Uma programação pensada para quem está começando e para quem já chegou longe. Porque no UNNA, todas têm algo a oferecer e muito a receber.',
    ],
  },
  {
    id: 'passo-fundo',
    title: 'UNNA Conexão Mulher – Passo Fundo',
    category: 'Networking & Propósito',
    subcategory: 'Passo Fundo / RS',
    dateLabel: '3 de Junho de 2025',
    badge: '03 JUN',
    time: '19h30',
    location: 'Gran Marquise Hall',
    image: foto39,
    content: [
      'A maior edição do circuito 2025 acontece em Passo Fundo. O Gran Marquise Hall recebe centenas de mulheres numa noite que será marco no movimento feminino gaúcho.',
      'Keynotes nacionais, espaço de exposição para marcas lideradas por mulheres, sessões de conexão e um jantar especial para encerrar com a potência que só o UNNA sabe criar.',
      'Esta edição contará com transmissão ao vivo e cobertura especial. Reserve já — as inscrições têm lista de espera.',
    ],
  },
]

export default function Events() {
  return (
    <section id="events" aria-labelledby="events-heading" className="py-16 md:py-24 px-5 md:px-12 bg-white relative overflow-hidden">
      {/* Soft Pink Glow background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #fbb6ce, transparent)',
          opacity: 0.45,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10 md:space-y-16">

        <motion.div
          className="text-center space-y-4"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <h2 id="events-heading" className="font-headline text-2xl sm:text-4xl md:text-5xl text-on-background">
            Próximos Encontros
          </h2>
          <p className="font-label text-xs text-on-surface/60 uppercase tracking-[0.2em]">
            Garanta seu lugar no palco da transformação
          </p>
        </motion.div>

        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <NewsCards cards={UNNA_EVENTS} />
        </motion.div>

        <motion.div
          className="p-6 sm:p-10 md:p-12 bg-surface-container rounded-2xl text-center space-y-5"
          style={{ boxShadow: 'var(--shadow-warm)' }}
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
            Em breve nas cidades
          </span>
          <p className="font-headline text-xl md:text-3xl italic text-on-surface/80 leading-relaxed max-w-4xl mx-auto">
            Rondinha, Constantina e mais cidades em confirmação
          </p>
        </motion.div>
      </div>
    </section>
  )
}
