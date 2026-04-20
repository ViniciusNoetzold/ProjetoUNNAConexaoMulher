import { motion } from 'framer-motion'

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-3.5 h-3.5 flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    label: '@unnaconexaomulher',
    sublabel: 'UNNA – Projeto',
    href: 'https://instagram.com/unnaconexaomulher',
  },
  {
    label: '@anapaulanogueiranutri',
    sublabel: 'Ana Paula Nogueira',
    href: 'https://instagram.com/anapaulanogueiranutri',
  },
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
          background:
            'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(141,0,50,0.28) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20">

        {/* Top row */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Brand */}
          <div className="space-y-3 max-w-xs">
            <p className="font-headline text-2xl md:text-3xl font-bold italic text-white tracking-tight">
              UNNA – Conexão Mulher
            </p>
            <p className="font-body italic text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Conexão que transforma. Mulheres que se fortalecem.
            </p>
          </div>

          {/* Instagram links */}
          <nav aria-label="Redes sociais" className="flex flex-col gap-5">
            {SOCIAL_LINKS.map(link => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.sublabel} no Instagram (abre em nova aba)`}
                className="flex items-center gap-2 group"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <InstagramIcon />
                <div className="flex flex-col">
                  <span
                    className="font-label text-xs font-semibold tracking-wide group-hover:text-white transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="font-label text-[10px] uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {link.sublabel}
                  </span>
                </div>
              </motion.a>
            ))}

            {/* Site da idealizadora */}
            <motion.a
              href="https://www.ananogueiranutri.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Site de Ana Paula Nogueira (abre em nova aba)"
              className="flex items-center gap-2 group"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span
                className="material-symbols-outlined flex-shrink-0"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}
                aria-hidden="true"
              >
                language
              </span>
              <div className="flex flex-col">
                <span
                  className="font-label text-xs font-semibold tracking-wide group-hover:text-white transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  ananogueiranutri.com.br
                </span>
                <span
                  className="font-label text-[10px] uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  Ana Paula Nogueira
                </span>
              </div>
            </motion.a>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="font-label text-[11px] uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            © {new Date().getFullYear()} UNNA – Conexão Mulher. Todos os direitos reservados.
          </p>
          <p
            className="font-label text-[11px] uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            Feito com propósito
          </p>
        </div>
      </div>
    </footer>
  )
}
