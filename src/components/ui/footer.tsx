import { scrollTo } from '@/hooks/useLenis'
import mezzoldLogo from '../../assets/mezzold.jpeg'

// ── Nav links — espelha a navbar ───────────────────────────────────────────
const NAV_LINKS = [
  { title: 'Nossa Essência', href: '#essencia'     },
  { title: 'Os Eventos',     href: '#pilares'       },
  { title: 'Edições 2026',   href: '#cidades'       },
  { title: 'Idealizadora',   href: '#idealizadora'  },
  { title: 'Galeria',        href: '/galeria', isPage: true },
]

// ── Social links ────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href:  'https://wa.me/5555996880252?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20UNNA%20Conex%C3%A3o%20Mulher.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/unnaconexaomulher.oficial?igsh=ZHE4djk3NW4xZmcz',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
      </svg>
    ),
  },
]

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage?: boolean) {
  if (isPage) return
  e.preventDefault()
  // Se estiver em outra página, navega para home + hash
  if (window.location.pathname !== '/') {
    window.location.href = '/' + href
    return
  }
  scrollTo(href, { offset: -80 })
}

export default function FooterSection() {
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden py-16"
      style={{ backgroundColor: '#0d0608' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 110%, rgba(141,0,50,0.22) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-6">

        {/* ── Brand ── */}
        <a
          href="/"
          aria-label="UNNA Conexão Mulher — início"
          className="mx-auto mb-8 block w-fit text-center group"
        >
          <span
            className="font-headline font-black italic text-2xl tracking-tight transition-colors duration-200 group-hover:text-[#c2637a]"
            style={{ color: 'rgba(255,255,255,0.90)' }}
          >
            UNNA
          </span>
          <span
            className="block font-label text-[10px] uppercase tracking-[0.28em] mt-0.5 transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.32)' }}
          >
            Conexão Mulher
          </span>
        </a>

        {/* ── Divisor ── */}
        <div
          aria-hidden="true"
          className="mx-auto mb-8 h-px w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(194,99,122,0.45), transparent)' }}
        />

        {/* ── Nav links ── */}
        <nav aria-label="Links do rodapé">
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                className={[
                  'font-label text-[11px] uppercase tracking-[0.12em] transition-colors duration-200',
                  link.isPage
                    ? 'italic font-bold'
                    : 'font-semibold',
                ].join(' ')}
                style={{ color: 'rgba(255,255,255,0.42)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c2637a' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)' }}
              >
                {link.title}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Social icons ── */}
        <div className="flex justify-center gap-6 mb-10">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(!s.noNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
              onClick={s.noNewTab ? (e: React.MouseEvent) => e.preventDefault() : undefined}
              aria-label={s.noNewTab ? s.label : `${s.label} (abre em nova aba)`}
              className="transition-all duration-200 ease-out hover:scale-[1.15]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,1)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* ── Copyright ── */}
        <p
          className="text-center font-label text-[10px] uppercase tracking-[0.22em]"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          © {new Date().getFullYear()} UNNA – Conexão Mulher. Todos os direitos reservados.
        </p>

        {/* ── Crédito Mezzold ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: '24px',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
          }}>
            Desenvolvido por
          </span>
          <a
            href="https://www.mezzoldstudio.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ height: '52px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <img
                src={mezzoldLogo}
                alt="Mezzold Studio"
                style={{
                  height: '88px',
                  width: 'auto',
                  display: 'block',
                  mixBlendMode: 'lighten',
                  opacity: 0.85,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.85' }}
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}
