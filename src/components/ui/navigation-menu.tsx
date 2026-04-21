import * as React from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { scrollTo } from "@/hooks/useLenis"

// ── Constants ────────────────────────────────────────────────────────────────
const WA_HREF =
  "https://wa.me/5555996880252?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20no%20UNNA%20Conex%C3%A3o%20Mulher."

const NAV_LINKS = [
  { label: "Essência",     href: "#essencia"     },
  { label: "Os Eventos",   href: "#events"       },
  { label: "Idealizadora", href: "#idealizadora" },
]

const EXPAND_SCROLL_THRESHOLD = 80

// ── Dark glass pill style ────────────────────────────────────────────────────
const SEP_STYLE: React.CSSProperties = {
  width: "1px",
  height: "18px",
  background: "rgba(255,255,255,0.15)",
  flexShrink: 0,
  margin: "0 20px",
}

// ── Desktop pill variants (width only — no per-item stagger) ─────────────────
const pillVariants = {
  expanded: {
    opacity: 1, y: 0, scale: 1, width: "auto",
    transition: { type: "spring" as const, damping: 22, stiffness: 280 },
  },
  collapsed: {
    opacity: 1, y: 0, scale: 1, width: "3rem",
    transition: { type: "spring" as const, damping: 22, stiffness: 280 },
  },
}

const collapsedIconVariants = {
  expanded:  { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  collapsed: { opacity: 1, scale: 1,   transition: { type: "spring" as const, damping: 15, stiffness: 300, delay: 0.1 } },
}

// ── Mobile drawer variants ────────────────────────────────────────────────────
const drawerVariants = {
  hidden:  { x: "100%", transition: { type: "spring" as const, damping: 30, stiffness: 250 } },
  visible: { x: 0,      transition: { type: "spring" as const, damping: 28, stiffness: 220 } },
}

// ── Component ─────────────────────────────────────────────────────────────────
export function AnimatedNavFramer() {
  const [isExpanded, setExpanded]   = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isScrolled, setScrolled]   = React.useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const { scrollY }      = useScroll()
  const lastScrollY      = React.useRef(0)
  const scrollOnCollapse = React.useRef(0)

  React.useEffect(() => { setMobileOpen(false) }, [location.pathname])

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

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

    setScrolled(latest > 20)
    lastScrollY.current = latest
  })

  function navigateToSection(href: string) {
    if (location.pathname === "/") {
      scrollTo(href, { offset: -80 })
    } else {
      navigate("/" + href)
    }
  }

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

  function handleMobileItemClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage?: boolean) {
    e.preventDefault()
    setMobileOpen(false)
    if (isPage) {
      if (href === "/galeria" && location.pathname === "/galeria") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        navigate(href)
      }
      return
    }
    navigateToSection(href)
  }

  function handleGaleriaClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (location.pathname === "/galeria") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate("/galeria")
    }
  }

  const isGaleriaActive = location.pathname === "/galeria"

  return (
    <>
      {/* ── Desktop floating pill (md+) ────────────────────────────────────── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.nav
          aria-label="Navegação principal"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={pillVariants}
          whileHover={!isExpanded ? { scale: 1.06 } : {}}
          whileTap={!isExpanded  ? { scale: 0.94 } : {}}
          onClick={handleWrapperClick}
          className="flex items-center overflow-hidden rounded-full h-11"
          style={{
            background: isScrolled ? "rgba(26, 0, 16, 0.92)" : "rgba(26, 0, 16, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: isScrolled
              ? "0 6px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "background 300ms ease, box-shadow 300ms ease",
            cursor: !isExpanded ? "pointer" : "default",
          }}
        >
          {/* UNNA logotipo */}
          <motion.a
            href="/"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (location.pathname !== "/") navigate("/")
              else window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            style={{
              fontWeight: 800,
              fontStyle: "italic",
              color: "#e8cfc4",
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              paddingLeft: "20px",
              paddingRight: "4px",
              flexShrink: 0,
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
              pointerEvents: isExpanded ? "auto" : "none",
            }}
            aria-label="UNNA Conexão Mulher — início"
          >
            UNNA
          </motion.a>

          {/* Separador 1 */}
          <motion.span
            aria-hidden="true"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={SEP_STYLE}
          />

          {/* Links principais */}
          <motion.div
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              pointerEvents: isExpanded ? "auto" : "none",
              whiteSpace: "nowrap",
            }}
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleDesktopLinkClick(e, item.href)}
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(232,207,196,0.7)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(232,207,196,1)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(232,207,196,0.7)" }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          {/* Separador 2 */}
          <motion.span
            aria-hidden="true"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={SEP_STYLE}
          />

          {/* GALERIA */}
          <motion.a
            href="/galeria"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleGaleriaClick}
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontStyle: "italic",
              fontWeight: 600,
              color: "#f9c4d4",
              textDecoration: "none",
              whiteSpace: "nowrap",
              pointerEvents: isExpanded ? "auto" : "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#f9c4d4" }}
          >
            Galeria
          </motion.a>

          {/* Separador 3 */}
          <motion.span
            aria-hidden="true"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={SEP_STYLE}
          />

          {/* CTA — Quero Participar */}
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Garantir minha vaga via WhatsApp (abre em nova aba)"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            whileHover={isExpanded ? { scale: 1.02, filter: "brightness(1.2)" } : {}}
            whileTap={isExpanded   ? { scale: 0.97 } : {}}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#f9c4d4",
              textDecoration: "none",
              background: "linear-gradient(135deg, #8d0032, #5c0a28)",
              borderRadius: "999px",
              padding: "8px 20px",
              border: "1px solid rgba(249,196,212,0.2)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              marginRight: "6px",
              pointerEvents: isExpanded ? "auto" : "none",
            }}
          >
            Quero Participar
          </motion.a>

          {/* Collapsed hamburger icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              variants={collapsedIconVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <Menu className="h-5 w-5 text-[#e8cfc4]" />
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
            boxShadow: "0 4px 16px rgba(141,0,50,0.12)",
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
                <span className="font-label text-[9px] uppercase tracking-[0.28em] text-[#8d0032]/60">
                  Conexão Mulher
                </span>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col gap-0.5 px-5 py-6">
                {[...NAV_LINKS, { label: "Galeria", href: "/galeria", isPage: true }].map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleMobileItemClick(e, item.href, (item as { isPage?: boolean }).isPage)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className={
                      (item as { isPage?: boolean }).isPage
                        ? "flex items-center gap-2 px-4 py-3.5 rounded-xl font-label text-sm italic font-bold uppercase tracking-[0.08em] text-[#8d0032] bg-[rgba(141,0,50,0.06)] hover:bg-[rgba(141,0,50,0.10)] transition-colors duration-200"
                        : "flex items-center gap-2 px-4 py-3.5 rounded-xl font-label text-sm font-semibold uppercase tracking-[0.08em] text-[#3d0a1e]/70 hover:text-[#8d0032] hover:bg-[rgba(141,0,50,0.04)] transition-colors duration-200"
                    }
                  >
                    {item.label}
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
