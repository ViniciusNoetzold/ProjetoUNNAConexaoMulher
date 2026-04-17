import * as React from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { scrollTo } from "@/hooks/useLenis"

const NAV_ITEMS = [
  { label: "Sobre",         href: "#about" },
  { label: "Encontros",     href: "#events" },
  { label: "Especialistas", href: "#speakers" },
  { label: "Participar",    href: "#cta" },
]

const EXPAND_SCROLL_THRESHOLD = 80

// ── Variants ────────────────────────────────────────────
const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
}

const logoVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
}

const itemVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -16,
    scale: 0.95,
    transition: { duration: 0.18 },
  },
}

const collapsedIconVariants = {
  expanded: {
    opacity: 0,
    scale: 0.7,
    transition: { duration: 0.15 },
  },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.12 },
  },
}

// ── Component ────────────────────────────────────────────
export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true)

  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)
  const scrollOnCollapse = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current

    if (isExpanded && latest > prev && latest > 150) {
      setExpanded(false)
      scrollOnCollapse.current = latest
    } else if (
      !isExpanded &&
      latest < prev &&
      scrollOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true)
    }

    lastScrollY.current = latest
  })

  function handleWrapperClick(e: React.MouseEvent) {
    if (!isExpanded) {
      e.preventDefault()
      setExpanded(true)
    }
  }

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    e.stopPropagation()
    scrollTo(href, { offset: -80 })
  }

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        aria-label="Navegação principal"
        initial={{ y: -72, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.08 } : {}}
        whileTap={!isExpanded ? { scale: 0.94 } : {}}
        onClick={handleWrapperClick}
        className={cn(
          // Pill shape
          "flex items-center overflow-hidden rounded-full h-12",
          // Glass effect — fundo branco translúcido + blur
          "border border-white/40",
          "shadow-[0_8px_32px_rgba(141,0,50,0.10),0_1px_0_rgba(255,255,255,0.6)_inset]",
          !isExpanded && "cursor-pointer justify-center"
        )}
        style={{
          background: "rgba(255, 252, 253, 0.55)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
        }}
      >
        {/* Logo — visível só quando expandido */}
        <motion.a
          href="#"
          variants={logoVariants}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex-shrink-0 pl-5 pr-1 font-headline font-black italic text-[#3d0a1e] text-[13px] tracking-tight whitespace-nowrap hover:text-primary transition-colors"
          aria-label="UNNA Conexão Mulher — início"
        >
          UNNA
        </motion.a>

        {/* Separador */}
        <motion.span
          variants={itemVariants}
          className="w-px h-4 bg-[#3d0a1e]/15 mx-1 flex-shrink-0"
          aria-hidden="true"
        />

        {/* Links de navegação */}
        <motion.div
          className={cn(
            "flex items-center gap-0 pr-2",
            !isExpanded && "pointer-events-none"
          )}
        >
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3d0a1e]/60 hover:text-[#8d0032] transition-colors px-3 py-1 whitespace-nowrap"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA — último item quando expandido */}
        <motion.a
          href="#cta"
          variants={itemVariants}
          onClick={(e) => handleLinkClick(e, "#cta")}
          className={cn(
            "flex-shrink-0 mr-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all",
            "bg-[#8d0032] text-white hover:brightness-110",
            !isExpanded && "pointer-events-none"
          )}
          style={{ boxShadow: "0 4px 14px rgba(141,0,50,0.25)" }}
        >
          Quero Participar
        </motion.a>

        {/* Ícone do estado colapsado — centralizado absolutamente */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <Menu className="h-5 w-5 text-[#3d0a1e]" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  )
}
