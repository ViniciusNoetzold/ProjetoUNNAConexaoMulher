import { useState } from 'react'

const WA_NUMBER = '5555996880252'

interface GalleryImage {
  src: string
  title: string
  city: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section
      className="w-full flex flex-col items-center py-20 px-4"
      style={{ backgroundColor: '#0d0608' }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-3xl text-center mb-12">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: '#c2637a' }}
        >
          Momentos Reais
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: '#f5e6ea', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          Encontros que ficam na memória
        </h2>
        <p className="text-base" style={{ color: 'rgba(245,230,234,0.6)' }}>
          Cada imagem é uma história de conexão, propósito e transformação.
          Mulheres que chegaram sozinhas e saíram juntas.
        </p>
      </div>

      {/* ── Fila expansível — hover expande a imagem ─────── */}
      <div
        className="flex items-stretch gap-2 w-full max-w-6xl"
        style={{ height: '480px' }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden cursor-pointer"
            style={{
              flexGrow: hoveredIdx === idx ? 4 : 1,
              flexShrink: 0,
              flexBasis: '80px',
              transition: 'flex-grow 0.5s ease',
              height: '480px',
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="h-full w-full object-cover object-center"
              style={{
                transform: hoveredIdx === idx ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease',
              }}
              loading="lazy"
            />

            {/* Overlay com info */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-5"
              style={{
                background: 'linear-gradient(to top, rgba(13,6,8,0.92) 0%, transparent 60%)',
                opacity: hoveredIdx === idx ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <span
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: '#c2637a' }}
              >
                {img.city}
              </span>
              <h3 className="text-lg font-semibold" style={{ color: '#f5e6ea' }}>
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ── Grade secundária — 3 colunas ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mt-4">
        {images.slice(0, 3).map((img, idx) => (
          <div
            key={idx}
            className="relative group rounded-xl overflow-hidden"
            style={{ height: '280px' }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to top, rgba(13,6,8,0.9) 0%, transparent 60%)',
              }}
            >
              <span
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: '#c2637a' }}
              >
                {img.city}
              </span>
              <h3 className="text-base font-semibold" style={{ color: '#f5e6ea' }}>
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="mt-16 text-center">
        <p className="text-base mb-6" style={{ color: 'rgba(245,230,234,0.7)' }}>
          Quer fazer parte do próximo encontro?
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá! Vi a galeria do UNNA e quero garantir minha vaga no próximo encontro!')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: '#8d0032',
            color: '#f5e6ea',
            boxShadow: '0 0 30px rgba(141,0,50,0.4)',
          }}
        >
          💬 Garantir minha vaga via WhatsApp
        </a>
      </div>
    </section>
  )
}
