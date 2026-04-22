import { FC } from "react"

export interface iCardItem {
  title: string
  description: string
  tag: string
  src: string
  link: string
  color: string
  textColor: string
}

interface iCardProps extends Omit<iCardItem, "link" | "tag"> {
  i: number
}

const Card: FC<iCardProps> = ({ title, description, color, textColor, src, i }) => {
  return (
    // h-screen: zona de scroll de 100vh por card — garante o empilhamento
    // sticky top-0 + flex items-center: centraliza o card no viewport
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-8">
      <div
        className="relative rounded-2xl overflow-hidden group"
        style={{
          width: "min(680px, 100%)",
          height: "480px",
          // Sombra progressiva: cards mais ao fundo parecem mais rebaixados
          boxShadow: `0 ${12 + i * 8}px ${32 + i * 16}px rgba(61, 10, 30, ${0.18 + i * 0.06})`,
        }}
      >
        {/* Imagem de fundo com hover scale */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Overlay de cor — identidade de cada card */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: color, opacity: 0.55 }}
        />

        {/* Gradiente de profundidade no rodapé */}
        <div
          className="absolute bottom-0 left-0 right-0 h-3/4 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${color}f0 0%, ${color}40 50%, transparent 100%)`,
          }}
        />

        {/* Linha decorativa superior — dá sensação de borda física do card */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundColor: textColor, opacity: 0.18 }}
        />

        {/* Conteúdo textual */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-10 py-9">
          <span
            className="block font-headline font-black tracking-tight leading-none mb-3 text-3xl sm:text-5xl md:text-6xl"
            style={{ color: textColor }}
          >
            {title}
          </span>
          <p
            className="text-base md:text-lg leading-relaxed lowercase tracking-wide max-w-md"
            style={{ color: textColor, opacity: 0.82 }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

interface iCardsParallaxProps {
  items: iCardItem[]
}

const CardsParallax: FC<iCardsParallaxProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, i) => (
        <Card key={`card_${i}`} {...item} i={i} />
      ))}
    </div>
  )
}

export { CardsParallax }
