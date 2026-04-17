import { motion } from 'framer-motion'
import { CardsParallax } from './ui/scroll-cards'

const ctaCards = [
  {
    title: "Conexão",
    description: "encontros que transformam vidas e criam redes genuínas entre mulheres",
    tag: "conexão",
    src: "https://assets.codepen.io/7558/orange-portrait-001.jpg",
    link: "#",
    color: "#3d0a1e",
    textColor: "#fff8f7",
  },
  {
    title: "Propósito",
    description: "descubra sua marca, sua voz e o impacto que só você pode causar no mundo",
    tag: "propósito",
    src: "https://assets.codepen.io/7558/orange-portrait-003.jpg",
    link: "#",
    color: "#fff8f7",
    textColor: "#3d0a1e",
  },
  {
    title: "Crescimento",
    description: "cada conversa é uma semente para a sua próxima e melhor versão",
    tag: "crescimento",
    src: "https://assets.codepen.io/7558/orange-portrait-005.jpg",
    link: "#",
    color: "#8d0032",
    textColor: "#fff8f7",
  },
  {
    title: "Juntas",
    description: "mulheres que brilham iluminam todas ao redor — esse é o poder da união",
    tag: "juntas",
    src: "https://assets.codepen.io/7558/orange-portrait-002.jpg",
    link: "#",
    color: "#fce7ef",
    textColor: "#3d0a1e",
  },
]

export default function Cta() {
  return (
    <section id="cta" aria-labelledby="cta-heading" className="bg-white relative">
      {/* Soft Pink Glow Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #fee6ee, transparent)',
        }}
      />

      {/* Título fixo no topo — permanece visível durante o scroll dos cards */}
      <div className="sticky top-0 z-20 text-center pt-10 pb-6 px-6"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.97) 80%, transparent 100%)' }}
      >
        <motion.h2
          id="cta-heading"
          className="font-headline text-4xl md:text-6xl text-on-background max-w-3xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          Sua jornada começa com um sim para você mesma.
        </motion.h2>
      </div>

      {/* Scroll cards — empilhamento sobre o título sticky */}
      <div className="relative z-10">
        <CardsParallax items={ctaCards} />
      </div>
    </section>
  )
}
