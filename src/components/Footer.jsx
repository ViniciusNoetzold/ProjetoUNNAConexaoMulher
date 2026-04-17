import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Instagram',      href: 'https://instagram.com', external: true },
  { label: 'LinkedIn',       href: 'https://linkedin.com',  external: true },
  { label: 'Privacy Policy', href: '#',                     external: false },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden"
      style={{ background: '#0f0005' }}
    >
      {/* Ambient glow — espelha o hero para criar bookend visual */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(141,0,50,0.28) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-headline text-2xl md:text-3xl font-bold italic text-white tracking-tight">
              UNNA – Conexão Mulher
            </p>
            <p className="font-body italic text-white/40 text-sm max-w-xs leading-relaxed">
              O palco onde ideias florescem, marcas ganham propósito e mulheres brilham juntas.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Links do rodapé" className="flex gap-8 md:gap-10">
            {LINKS.map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={link.external ? `${link.label} (abre em nova aba)` : link.label}
                className="font-label text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-[11px] uppercase tracking-widest text-white/25">
            © {new Date().getFullYear()} UNNA – Conexão Mulher. Todos os direitos reservados.
          </p>
          <p className="font-label text-[11px] uppercase tracking-widest text-white/20">
            Feito com propósito
          </p>
        </div>
      </div>
    </footer>
  )
}
