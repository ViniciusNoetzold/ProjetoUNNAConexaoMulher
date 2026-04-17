import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion"
import { useState, useEffect } from "react"
import { Heart, X, MapPin, Clock, Calendar } from "lucide-react"
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
}

interface NewsCardsProps {
  cards: EventNewsCard[]
  enableAnimations?: boolean
  onReserve?: (data: { event: string; date: string }) => void
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
export function NewsCards({ cards, enableAnimations = true, onReserve }: NewsCardsProps) {
  const [isLoaded, setIsLoaded]       = useState(false)
  const [selected, setSelected]       = useState<EventNewsCard | null>(null)
  const [saved, setSaved]             = useState<Set<string>>(new Set())
  const shouldReduceMotion            = useReducedMotion()
  const shouldAnimate                 = enableAnimations && !shouldReduceMotion

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

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
                  "bg-white border border-[#e1bec1]/50",
                )}
                style={{ boxShadow: "0 4px 24px rgba(141,0,50,0.07), 0 1px 4px rgba(141,0,50,0.04)" }}
                variants={shouldAnimate ? cardVariants : {}}
                whileHover={shouldAnimate ? {
                  y: -6, scale: 1.01,
                  boxShadow: "0 16px 40px rgba(141,0,50,0.13), 0 4px 12px rgba(141,0,50,0.07)",
                  transition: { type: "spring", stiffness: 380, damping: 24 },
                } : {}}
                onClick={() => setSelected(card)}
              >
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

                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-[#8d0032] text-white font-label text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {card.badge}
                  </div>

                  {/* Save button */}
                  <motion.button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    onClick={(e) => toggleSave(card.id, e)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={saved.has(card.id) ? "Remover dos salvos" : "Salvar evento"}
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4 transition-colors",
                        saved.has(card.id) ? "fill-[#f4b8ce] text-[#f4b8ce]" : "text-white/90"
                      )}
                    />
                  </motion.button>

                  {/* Bottom meta */}
                  <motion.div
                    layoutId={`card-meta-${card.id}`}
                    className="absolute bottom-3 left-3 right-3"
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
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {card.dateLabel}
                    </span>
                  </div>
                </motion.div>
              </motion.article>
            )
          })}
        </div>

        {/* ── Expanded modal ────────────────────────────── */}
        <AnimatePresence>
          {selected && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-[#1a0008]/60 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              />

              {/* Expanded card */}
              <motion.div
                layoutId={`card-${selected.id}`}
                className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 rounded-2xl overflow-hidden z-50 flex flex-col"
                style={{ background: "#fff8f7", border: "1px solid rgba(225,190,193,0.5)" }}
              >
                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-[#e1bec1]/60 hover:bg-white transition-colors"
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

                    {/* Meta over image */}
                    <motion.div
                      layoutId={`card-meta-${selected.id}`}
                      className="absolute bottom-4 left-6 right-6"
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
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {selected.dateLabel}
                        </span>
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

                    {/* CTA */}
                    {onReserve && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="pt-2"
                      >
                        <motion.button
                          onClick={() => {
                            onReserve({ event: selected.subcategory, date: selected.dateLabel })
                            setSelected(null)
                          }}
                          className="w-full md:w-auto px-10 py-4 bg-[#8d0032] text-white font-label font-bold text-sm uppercase tracking-widest rounded-full hover:brightness-110 transition-all"
                          style={{ boxShadow: "0 12px 32px rgba(141,0,50,0.28)" }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Reservar meu convite
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  )
}
