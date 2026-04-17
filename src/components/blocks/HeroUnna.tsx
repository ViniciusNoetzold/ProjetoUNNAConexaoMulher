import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { LuminaSlider } from "@/components/ui/lumina-interactive-list"
import { cn } from "@/lib/utils"
import { scrollTo } from "@/hooks/useLenis"

const WA_URL =
  "https://wa.me/5555996880252?text=Olá!%20Quero%20garantir%20minha%20vaga%20no%20UNNA%20Conexão%20Mulher."

// Staggered entrance timing for left column items
const LEFT_DELAYS = [0.2, 0.38, 0.54, 0.7, 0.88]

function fadeY(delay: number) {
  return {
    initial:    { y: 40, opacity: 0 },
    animate:    { y: 0,  opacity: 1 },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

export default function HeroUnna() {
  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── Lumina WebGL slider (full-section background) ── */}
      <LuminaSlider />

      {/* ── Gradient overlay: left fade for text readability ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,0,4,0.82) 0%, rgba(10,0,4,0.55) 45%, rgba(10,0,4,0.08) 75%, transparent 100%)",
        }}
      />

      {/* ── Bottom fade (over the slide caption area) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-56 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,0,4,0.75) 0%, transparent 100%)",
        }}
      />

      {/* ── UNNA brand overlay ──────────────────────────────── */}
      <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-center pt-24 pb-44">
        <div className="w-full lg:w-[52%] space-y-7">

          {/* Eyebrow */}
          <motion.span
            {...fadeY(LEFT_DELAYS[0])}
            className="block uppercase tracking-[0.28em] text-[0.68rem] font-semibold text-[#e8a0b4]/80"
          >
            Conexão &amp; Propósito
          </motion.span>

          {/* Main headline */}
          <motion.h1
            id="hero-heading"
            {...fadeY(LEFT_DELAYS[1])}
            className="font-headline text-5xl md:text-6xl lg:text-[5.25rem] font-bold text-white leading-[0.93] tracking-tight"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
          >
            UNNA –<br />
            <span className="italic text-[#f4b8ce]">Conexão Mulher</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fadeY(LEFT_DELAYS[2])}
            className="font-body text-lg md:text-xl italic leading-snug text-white/75 max-w-sm"
          >
            O palco onde ideias florescem, marcas ganham propósito e mulheres brilham juntas.
          </motion.p>

          {/* Body */}
          <motion.p
            {...fadeY(LEFT_DELAYS[3])}
            className="font-body text-sm md:text-base text-white/55 max-w-xs leading-relaxed"
          >
            Existem lugares que inspiram, e existem lugares que transformam.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeY(LEFT_DELAYS[4])}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            {/* Primary */}
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 font-semibold tracking-wide",
                "bg-[#8d0032] hover:bg-[#a8003b] text-white border-0"
              )}
              style={{ boxShadow: "0 12px 36px rgba(141,0,50,0.40)" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <span aria-hidden="true" className="material-symbols-outlined icon-fill text-lg leading-none">
                chat
              </span>
              Garantir minha vaga via WhatsApp
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#events"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo("#events") }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 font-semibold",
                "border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent"
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <span aria-hidden="true" className="text-base leading-none">📍</span>
              Ver todas as cidades
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
