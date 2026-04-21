/**
 * FloralBackground — flores SVG animadas para seções com fundo claro.
 * position: absolute, inset: 0, z-index: 0, pointer-events: none.
 * O container pai precisa ter position: relative e overflow: hidden.
 * O conteúdo da seção deve ter position: relative e z-index: 1.
 */

// Posições nas bordas/cantos — flores nunca no centro da tela
const FLOWERS = [
  { top: '5%',  left:  '3%', size: 32, type: 'A', delay: 0,   dur: 6.0 },
  { top: '8%',  left: '92%', size: 24, type: 'B', delay: 1.2, dur: 8.0 },
  { top: '20%', left:  '7%', size: 18, type: 'C', delay: 0.5, dur: 9.5 },
  { top: '18%', left: '88%', size: 32, type: 'A', delay: 2.0, dur: 7.0 },
  { top: '35%', left:  '1%', size: 24, type: 'B', delay: 1.5, dur: 6.5 },
  { top: '40%', left: '95%', size: 18, type: 'C', delay: 0.8, dur: 10.0 },
  { top: '55%', left:  '5%', size: 32, type: 'A', delay: 2.5, dur: 7.5 },
  { top: '52%', left: '90%', size: 24, type: 'B', delay: 0.3, dur: 8.5 },
  { top: '70%', left:  '2%', size: 18, type: 'C', delay: 1.8, dur: 6.2 },
  { top: '68%', left: '93%', size: 32, type: 'A', delay: 1.0, dur: 9.0 },
  { top: '82%', left:  '8%', size: 24, type: 'B', delay: 2.2, dur: 7.2 },
  { top: '85%', left: '87%', size: 18, type: 'C', delay: 0.6, dur: 8.2 },
  { top: '92%', left:  '4%', size: 32, type: 'A', delay: 1.4, dur: 6.8 },
  { top: '90%', left: '91%', size: 24, type: 'B', delay: 1.9, dur: 7.8 },
]

const OPACITIES = [0.30, 0.35, 0.40, 0.28, 0.32, 0.38, 0.30, 0.35, 0.40, 0.28, 0.32, 0.38, 0.30, 0.35]

// ── Flor Tipo A — 5 pétalas arredondadas ──────────────────────────────────
function FlowerA({ size }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse
          key={a}
          cx="16" cy="16" rx="4" ry="9"
          fill="#f9c4d4"
          transform={`rotate(${a} 16 16) translate(0 -5)`}
        />
      ))}
      <circle cx="16" cy="16" r="3.5" fill="#f9c4d4" opacity="0.6" />
    </svg>
  )
}

// ── Flor Tipo B — 6 pétalas finas ─────────────────────────────────────────
function FlowerB({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse
          key={a}
          cx="12" cy="12" rx="2.5" ry="7"
          fill="#f9c4d4"
          transform={`rotate(${a} 12 12) translate(0 -3.5)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.5" fill="#f9c4d4" opacity="0.5" />
    </svg>
  )
}

// ── Flor Tipo C — 4 pétalas pequenas ──────────────────────────────────────
function FlowerC({ size }) {
  return (
    <svg viewBox="0 0 18 18" width={size} height={size}>
      {[0, 90, 180, 270].map(a => (
        <ellipse
          key={a}
          cx="9" cy="9" rx="2.5" ry="5.5"
          fill="#f9c4d4"
          transform={`rotate(${a} 9 9) translate(0 -2.5)`}
        />
      ))}
      <circle cx="9" cy="9" r="2" fill="#f9c4d4" opacity="0.5" />
    </svg>
  )
}

const COMPONENTS = { A: FlowerA, B: FlowerB, C: FlowerC }

export default function FloralBackground() {
  return (
    <>
      <style>{`
        @keyframes floralFloat {
          0%   { transform: translateY(0px)  rotate(0deg)  scale(1);    }
          25%  { transform: translateY(-6px) rotate(4deg)  scale(1.03); }
          50%  { transform: translateY(-3px) rotate(-2deg) scale(0.98); }
          75%  { transform: translateY(-8px) rotate(3deg)  scale(1.02); }
          100% { transform: translateY(0px)  rotate(0deg)  scale(1);    }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        {FLOWERS.map(({ top, left, size, type, delay, dur }, i) => {
          const Flower = COMPONENTS[type]
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top,
                left,
                opacity: OPACITIES[i],
                animation: `floralFloat ${dur}s ease-in-out ${delay}s infinite`,
              }}
            >
              <Flower size={size} />
            </div>
          )
        })}
      </div>
    </>
  )
}
