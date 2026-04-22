import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion"
import { useState, useEffect, Fragment } from "react"
import { X, MapPin, Clock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Types ────────────────────────────────────────────────
export interface EventNewsCard {
  id: string
  title: string
  category: string
  subcategory: string       // city
  dateLabel: string         // "22 de Abril de 2025"
  badge: string             // "22 ABR"
  time: string              // "19h30"
  location: string          // venue name
  image: string
  gradientColors?: [string, string]
  content?: string[]
  proximo?: boolean
}

interface NewsCardsProps {
  cards: EventNewsCard[]
  enableAnimations?: boolean
}

// ── Animation variants ───────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 280, damping: 26, mass: 0.8 },
  },
}

const imageVariants = {
  hidden: { scale: 1.08, opacity: 0.85 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 30, delay: 0.15 },
  },
}

// ── Component ────────────────────────────────────────────
const WA_NAO_ME_TOQUE =
  "https://wa.me/5555996880252?text=Ol%C3%A1!%20Tenho%20interesse%20em%20participar%20do%20UNNA%20Conex%C3%A3o%20Mulher%20%E2%80%93%20N%C3%A3o-Me-Toque.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"

export function NewsCards({ cards, enableAnimations = true }: NewsCardsProps) {
  const [isLoaded, setIsLoaded]  = useState(false)
  const [selected, setSelected]  = useState<EventNewsCard | null>(null)
  const shouldReduceMotion       = useReducedMotion()
  const shouldAnimate            = enableAnimations && !shouldReduceMotion

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), shouldAnimate ? 100 : 0)
    return () => clearTimeout(t)
  }, [shouldAnimate])

  // Close on Escape
  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selected])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <motion.div
      className="w-full"
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isLoaded ? "visible" : "hidden"}
      variants={shouldAnimate ? containerVariants : {}}
    >
      <LayoutGroup>
        {/* ── Card grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
          {cards.map((card) => {
            if (selected?.id === card.id) return null
            return (
              <motion.article
                key={card.id}
                layoutId={`card-${card.id}`}
                className={cn(
                  "rounded-2xl overflow-hidden cursor-pointer group",
                  card.proximo
                    ? "bg-white border-2 border-[#8d0032]"
                    : "bg-white border border-[#e1bec1]/50",
                )}
                style={{
                  boxShadow: card.proximo
                    ? "0 4px 28px rgba(139,26,74,0.22), 0 1px 6px rgba(139,26,74,0.14)"
                    : "0 4px 24px rgba(141,0,50,0.07), 0 1px 4px rgba(141,0,50,0.04)",
                }}
                variants={shouldAnimate ? cardVariants : {}}
                whileHover={shouldAnimate ? {
                  y: -6, scale: 1.01,
                  boxShadow: "0 16px 40px rgba(141,0,50,0.13), 0 4px 12px rgba(141,0,50,0.07)",
                  transition: { type: "spring", stiffness: 380, damping: 24 },
                } : {}}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('closeNavMenu'))
                  setSelected(card)
                }}
              >
                {/* Próximo Evento banner */}
                {card.proximo && (
                  <motion.div
                    className="bg-[#8d0032] text-white font-label text-[9px] font-bold uppercase tracking-[0.25em] py-1.5 flex items-center justify-center gap-2"
                    animate={{ opacity: [0.82, 1, 0.82] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-[#f4b8ce] inline-block"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    Próximo Evento
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-[#f4b8ce] inline-block"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    />
                  </motion.div>
                )}

                {/* Image */}
                <motion.div
                  layoutId={`card-image-${card.id}`}
                  className="relative h-52 overflow-hidden"
                >
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    variants={shouldAnimate ? imageVariants : {}}
                    style={{ willChange: "transform" }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0008]/70 via-[#1a0008]/10 to-transparent" />

                  {/* Blur overlay — cards secundários apenas */}
                  {!card.proximo && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backdropFilter: 'blur(3px)',
                      WebkitBackdropFilter: 'blur(3px)',
                      backgroundColor: 'rgba(60, 0, 30, 0.35)',
                      borderRadius: 'inherit',
                      zIndex: 1,
                    }} />
                  )}

                  {/* Date badge — only on proximo card */}
                  {card.proximo && (
                    <div className="absolute top-3 left-3 bg-[#8d0032] text-white font-label text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {card.badge}
                    </div>
                  )}

                  {/* Bottom meta */}
                  <motion.div
                    layoutId={`card-meta-${card.id}`}
                    className="absolute bottom-3 left-3 right-3"
                    style={{ zIndex: 2 }}
                  >
                    <p className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#f4b8ce]/90 mb-0.5">
                      {card.category}
                    </p>
                    <p className="font-label text-xs text-white/70">{card.time} · {card.location}</p>
                  </motion.div>
                </motion.div>

                {/* Text body */}
                <motion.div
                  layoutId={`card-body-${card.id}`}
                  className="p-6 space-y-3"
                >
                  <motion.h3
                    layoutId={`card-title-${card.id}`}
                    className="font-headline text-lg leading-snug text-[#3d0a1e] group-hover:text-[#8d0032] transition-colors line-clamp-2"
                  >
                    {card.title}
                  </motion.h3>
                  <div className="flex items-center gap-4 text-[11px] font-label text-[#594043]/70 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {card.subcategory}
                    </span>
                    {card.proximo && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {card.dateLabel}
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.article>
            )
          })}
        </div>

        {/* ── Expanded modal ────────────────────────────── */}
        <AnimatePresence>
          {selected && (
            <Fragment key={selected.id}>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-[#1a0008]/60 backdrop-blur-sm z-[1100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              />

              {/* Expanded card */}
              <motion.div
                layoutId={`card-${selected.id}`}
                className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 rounded-2xl overflow-hidden z-[1200] flex flex-col"
                style={{ background: "#fff8f7", border: "1px solid rgba(225,190,193,0.5)" }}
              >
                {/* Close button */}
                <motion.button
                  type="button"
                  className="absolute top-4 left-4 md:left-auto md:right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-[#e1bec1]/60 hover:bg-white transition-colors"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 25 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4 text-[#3d0a1e]" />
                </motion.button>

                <div className="flex-1 overflow-y-auto">
                  {/* Hero image */}
                  <motion.div
                    layoutId={`card-image-${selected.id}`}
                    className="relative h-56 md:h-72 flex-shrink-0"
                  >
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0008]/75 via-[#1a0008]/15 to-transparent" />

                    {/* Blur overlay — eventos futuros (não Não-Me-Toque) */}
                    {!selected.proximo && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        backgroundColor: 'rgba(60, 0, 30, 0.45)',
                        zIndex: 1,
                      }} />
                    )}

                    {/* Meta over image */}
                    <motion.div
                      layoutId={`card-meta-${selected.id}`}
                      className="absolute bottom-4 left-6 right-6"
                      style={{ zIndex: 2 }}
                    >
                      <p className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#f4b8ce]/90 mb-1">
                        {selected.category}
                      </p>
                      <div className="flex flex-wrap gap-4 text-white/75 text-xs font-label">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {selected.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {selected.location}
                        </span>
                        {selected.proximo && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {selected.dateLabel}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="px-6 md:px-10 py-8 space-y-6">
                    <motion.div layoutId={`card-body-${selected.id}`}>
                      <motion.h1
                        layoutId={`card-title-${selected.id}`}
                        className="font-headline text-2xl md:text-3xl font-bold text-[#3d0a1e] leading-tight mb-2"
                      >
                        {selected.title}
                      </motion.h1>
                      <p className="font-label text-xs uppercase tracking-widest text-[#8d0032] font-semibold">
                        {selected.subcategory}
                      </p>
                    </motion.div>

                    {/* Body paragraphs */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {(selected.content ?? []).map((para, i) => (
                        <p key={i} className="font-body text-base text-[#3d0a1e]/75 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </motion.div>

                    {/* CTA — apenas no próximo evento, link direto WA */}
                    {selected.proximo && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="pt-2"
                      >
                        <motion.a
                          href={WA_NAO_ME_TOQUE}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
                          className="flex w-full justify-center items-center gap-3 md:w-auto px-10 py-4 bg-[#8d0032] text-white font-label font-bold text-sm uppercase tracking-widest rounded-full hover:brightness-110 transition-all"
                          style={{ boxShadow: "0 12px 32px rgba(141,0,50,0.28)" }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Garantir minha vaga via WhatsApp
                        </motion.a>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Fragment>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  )
}
