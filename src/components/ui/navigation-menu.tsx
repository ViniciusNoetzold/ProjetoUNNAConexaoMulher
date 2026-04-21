import * as React from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { scrollTo } from "@/hooks/useLenis"

// ── Constants ────────────────────────────────────────────────────────────────
const WA_HREF =
  "https://wa.me/5555996880252?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20no%20UNNA%20Conex%C3%A3o%20Mulher."

const NAV_ITEMS = [
  { label: "Essência",     href: "#essencia"      },
  { label: "Os Eventos",   href: "#events"        },
  { label: "Idealizadora", href: "#idealizadora"  },
  { label: "Galeria",      href: "/galeria", isPage: true },
]

const EXPAND_SCROLL_THRESHOLD = 80

// ── Desktop pill variants ─────────────────────────────────────────────────────
const containerVariants = {
  expanded: {
    y: 0, opacity: 1, width: "auto",
    transition: {
      y:       { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.3 },
      width:   { type: "spring" as const, damping: 20, stiffness: 300 },
      staggerChildren: 0.06, delayChildren: 0.15,
    },
  },
  collapsed: {
    y: 0, opacity: 1, width: "3rem",
    transition: {
      type: "spring" as const, damping: 20, stiffness: 300,
      when: "afterChildren", staggerChildren: 0.04, staggerDirection: -1,
    },
  },
}

const linksWrapperVariants = {
  expanded:  { transition: { staggerChildren: 0.05, delayChildren: 0 } },
  collapsed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const logoVariants = {
  expanded:  { opacity: 1, x: 0,   transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

const itemVariants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -16, scale: 0.95, transition: { duration: 0.18 } },
}

const collapsedIconVariants = {
  expanded:  { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  collapsed: { opacity: 1, scale: 1,   transition: { type: "spring" as const, damping: 15, stiffness: 300, delay: 0.12 } },
}

// ── Mobile drawer variants ────────────────────────────────────────────────────
const drawerVariants = {
  hidden:  { x: "100%", transition: { type: "spring" as const, damping: 30, stiffness: 250 } },
  visible: { x: 0,      transition: { type: "spring" as const, damping: 28, stiffness: 220 } },
}

// ── Component ─────────────────────────────────────────────────────────────────
export function AnimatedNavFramer() {
  const [isExpanded, setExpanded]   = React.useState(true)
  const [scrolled,   setScrolled]   = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const { scrollY }      = useScroll()
  const lastScrollY      = React.useRef(0)
  const scrollOnCollapse = React.useRef(0)

  // Close mobile menu on route change
  React.useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  // Desktop pill collapse / expand on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current
    setScrolled(latest > 30)

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

  // Navigate to a hash section — works from any page
  function navigateToSection(href: string) {
    if (location.pathname === "/") {
      scrollTo(href, { offset: -80 })
    } else {
      navigate("/", { state: { scrollTo: href } })
    }
  }

  // Desktop click handler
  function handleDesktopLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isExpanded) return
    if (!href.startsWith("#")) return
    e.preventDefault()
    e.stopPropagation()
    navigateToSection(href)
  }

  function handleWrapperClick(e: React.MouseEvent) {
    if (!isExpanded) { e.preventDefault(); setExpanded(true) }
  }

  // Mobile click handler (closes menu + navigates)
  function handleMobileItemClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage?: boolean) {
    setMobileOpen(false)
    if (isPage) return
    e.preventDefault()
    navigateToSection(href)
  }

  const isGaleriaActive = location.pathname === "/galeria"

  return (
    <>
      {/* ── Desktop floating pill (md+) ────────────────────────────────────── */}
      <div className="fixed top-7 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.nav
          aria-label="Navegação principal"
          initial={{ y: -20, opacity: 0 }}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.08 } : {}}
          whileTap={!isExpanded  ? { scale: 0.94 } : {}}
          onClick={handleWrapperClick}
          className={cn(
            "flex items-center overflow-hidden rounded-full h-12",
            "border border-white/40 transition-shadow duration-300",
            scrolled
              ? "shadow-[0_8px_32px_rgba(141,0,50,0.18),0_2px_8px_rgba(0,0,0,0.10),0_1px_0_rgba(255,255,255,0.6)_inset]"
              : "shadow-[0_8px_32px_rgba(141,0,50,0.10),0_1px_0_rgba(255,255,255,0.6)_inset]",
            !isExpanded && "cursor-pointer justify-center"
          )}
          style={{
            background: scrolled
              ? "rgba(255, 252, 253, 0.88)"
              : "rgba(255, 252, 253, 0.55)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            transition: "background 0.35s ease",
          }}
        >
          {/* Logo */}
          <motion.a
            href="/"
            variants={logoVariants}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (location.pathname !== "/") navigate("/")
              else window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex-shrink-0 pl-5 pr-1 font-headline font-black italic text-[#3d0a1e] text-[13px] tracking-tight whitespace-nowrap hover:text-[#8d0032] transition-colors duration-200"
            aria-label="UNNA Conexão Mulher — início"
          >
            UNNA
          </motion.a>

          {/* Separator */}
          <motion.span
            variants={itemVariants}
            className="w-px h-4 bg-[#3d0a1e]/15 mx-1 flex-shrink-0"
            aria-hidden="true"
          />

          {/* Links */}
          <motion.div
            variants={linksWrapperVariants}
            className={cn("flex items-center gap-0.5 pr-2", !isExpanded && "pointer-events-none")}
          >
            {NAV_ITEMS.map((item) =>
              item.isPage ? (
                /* Galeria — differentiated item */
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={itemVariants}
                  onClick={(e) => handleDesktopLinkClick(e, item.href)}
                  className={cn(
                    "relative flex flex-col items-center px-3 py-1 whitespace-nowrap group",
                    "text-[10.5px] font-bold italic uppercase tracking-[0.08em] transition-colors duration-200",
                    isGaleriaActive
                      ? "text-[#8d0032]"
                      : "text-[#8d0032]/65 hover:text-[#8d0032]"
                  )}
                >
                  {/* Pulse dot */}
                  <motion.span
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8d0032]"
                    animate={{ scale: [1, 1.7, 1], opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                  <span className="relative">
                    {item.label}
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent, #8d0032 40%, #8d0032 60%, transparent)" }}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, rgba(141,0,50,0.10) 0%, transparent 70%)" }}
                    aria-hidden="true"
                  />
                </motion.a>
              ) : (
                /* Regular nav link */
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={itemVariants}
                  onClick={(e) => handleDesktopLinkClick(e, item.href)}
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3d0a1e]/60 hover:text-[#8d0032] transition-colors duration-200 px-3 py-1 whitespace-nowrap"
                >
                  {item.label}
                </motion.a>
              )
            )}
          </motion.div>

          {/* CTA → WhatsApp */}
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
            variants={itemVariants}
            whileHover={isExpanded ? { scale: 1.03, boxShadow: "0 6px 20px rgba(141,0,50,0.42)" } : {}}
            whileTap={isExpanded   ? { scale: 0.97 } : {}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "flex-shrink-0 mr-2 px-5 py-1.5 rounded-full",
              "text-[11px] font-bold uppercase tracking-widest whitespace-nowrap",
              "bg-[#8d0032] text-white",
              !isExpanded && "pointer-events-none"
            )}
            style={{ boxShadow: "0 4px 14px rgba(141,0,50,0.28)" }}
          >
            Quero Participar
          </motion.a>

          {/* Collapsed hamburger icon */}
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

      {/* ── Mobile hamburger button (< md) ────────────────────────────────── */}
      <div className="fixed top-5 right-5 z-[60] md:hidden">
        <motion.button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-white/40"
          style={{
            background: "rgba(255, 252, 253, 0.88)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            boxShadow: scrolled
              ? "0 4px 20px rgba(141,0,50,0.18)"
              : "0 4px 16px rgba(141,0,50,0.10)",
          }}
          whileTap={{ scale: 0.92 }}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <X className="w-5 h-5 text-[#3d0a1e]" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <Menu className="w-5 h-5 text-[#3d0a1e]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile drawer + backdrop ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-[50] bg-[#0d0608]/55 md:hidden"
              style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-nav"
              key="mobile-drawer"
              aria-label="Menu de navegação mobile"
              className="fixed top-0 right-0 h-full w-72 z-[55] md:hidden flex flex-col"
              style={{
                background: "rgba(255, 251, 252, 0.97)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                borderLeft: "1px solid rgba(141,0,50,0.10)",
                boxShadow: "-8px 0 32px rgba(13,6,8,0.18)",
              }}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-8 pb-6 border-b border-[#f0e8ec]">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileOpen(false)
                    if (location.pathname !== "/") navigate("/")
                    else window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="font-headline font-black italic text-[#3d0a1e] text-xl tracking-tight hover:text-[#8d0032] transition-colors duration-200"
                >
                  UNNA
                </a>
                <span
                  className="font-label text-[9px] uppercase tracking-[0.28em] text-[#8d0032]/60"
                >
                  Conexão Mulher
                </span>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col gap-0.5 px-5 py-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleMobileItemClick(e, item.href, item.isPage)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3.5 rounded-xl font-label text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
                      item.isPage
                        ? "italic font-bold text-[#8d0032] bg-[rgba(141,0,50,0.06)] hover:bg-[rgba(141,0,50,0.10)]"
                        : "text-[#3d0a1e]/70 hover:text-[#8d0032] hover:bg-[rgba(141,0,50,0.04)]"
                    )}
                  >
                    {item.label}
                    {item.isPage && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8d0032] flex-shrink-0" aria-hidden="true" />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <div className="px-5 pb-10">
                <motion.a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center w-full py-4 bg-[#8d0032] text-white font-label font-bold text-sm uppercase tracking-widest rounded-full hover:brightness-110 transition-all"
                  style={{ boxShadow: "0 8px 24px rgba(141,0,50,0.28)" }}
                >
                  Quero Participar
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
