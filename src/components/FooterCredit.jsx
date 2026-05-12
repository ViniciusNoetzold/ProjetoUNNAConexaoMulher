import mezzoldLogo from '../assets/mezzold.jpeg'

const MEZZOLD_URL = 'https://www.mezzoldstudio.com.br/'

export default function FooterCredit() {
  return (
    <div className="mezzold-credit-wrap">
      <style>{`
        .mezzold-credit-wrap {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: center;
        }

        .mezzold-credit {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-height: 54px;
          padding: 8px 11px 8px 13px;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 8px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
            rgba(25, 11, 18, 0.78);
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          transform-style: preserve-3d;
          perspective: 700px;
          box-shadow:
            0 10px 26px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.045);
          transition:
            border-color 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .mezzold-credit::before {
          content: '';
          position: absolute;
          inset: 5px;
          z-index: -1;
          border-radius: 7px;
          background: radial-gradient(circle at 72% 48%, rgba(255, 120, 170, 0.14), transparent 48%);
          opacity: 0.7;
          transition: opacity 220ms ease;
        }

        .mezzold-credit__text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          font-family: Manrope, sans-serif;
          line-height: 1;
          white-space: nowrap;
        }

        .mezzold-credit__eyebrow {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.48);
        }

        .mezzold-credit__name {
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .mezzold-credit__dot {
          color: #e71943;
          text-shadow: 0 0 12px rgba(231, 25, 67, 0.38);
          transition: text-shadow 220ms ease;
        }

        .mezzold-credit__mark {
          position: relative;
          width: 112px;
          height: 32px;
          overflow: hidden;
          border-radius: 7px;
          background: linear-gradient(180deg, #f7f5f3, #d8d2ce);
          box-shadow:
            0 11px 22px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.82),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          transform: translateZ(0);
          animation: mezzoldCreditFloat 7s ease-in-out infinite;
          transition:
            transform 260ms ease,
            box-shadow 260ms ease,
            background 260ms ease;
          will-change: transform;
        }

        .mezzold-credit__mark::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 18%, rgba(255, 255, 255, 0.38) 46%, transparent 62%);
          opacity: 0.34;
          transform: translateX(-65%);
          transition: transform 460ms ease, opacity 260ms ease;
          pointer-events: none;
        }

        .mezzold-credit__logo {
          width: 112px;
          height: 112px;
          object-fit: cover;
          object-position: center;
          display: block;
          transform: translateY(-40px) scale(1.04);
        }

        .mezzold-credit:hover,
        .mezzold-credit:focus-visible {
          border-color: rgba(231, 25, 67, 0.22);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.022)),
            rgba(30, 12, 20, 0.9);
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.16);
        }

        .mezzold-credit:hover::before,
        .mezzold-credit:focus-visible::before {
          opacity: 1;
        }

        .mezzold-credit:hover .mezzold-credit__mark,
        .mezzold-credit:focus-visible .mezzold-credit__mark {
          transform: translateY(-3px) rotateX(8deg) rotateY(-8deg);
          box-shadow:
            0 16px 28px rgba(0, 0, 0, 0.3),
            0 0 18px rgba(231, 25, 67, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 0 rgba(0, 0, 0, 0.12);
        }

        .mezzold-credit:hover .mezzold-credit__mark::after,
        .mezzold-credit:focus-visible .mezzold-credit__mark::after {
          opacity: 0.56;
          transform: translateX(74%);
        }

        .mezzold-credit:hover .mezzold-credit__dot,
        .mezzold-credit:focus-visible .mezzold-credit__dot {
          text-shadow: 0 0 16px rgba(231, 25, 67, 0.66);
        }

        @keyframes mezzoldCreditFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @media (max-width: 640px) {
          .mezzold-credit {
            flex-direction: column;
            gap: 8px;
            min-height: 0;
            padding: 10px 12px;
            text-align: center;
          }

          .mezzold-credit__text {
            align-items: center;
          }

          .mezzold-credit__name {
            font-size: 0.9rem;
          }

          .mezzold-credit__mark {
            width: 96px;
            height: 28px;
          }

          .mezzold-credit__logo {
            width: 96px;
            height: 96px;
            transform: translateY(-34px) scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mezzold-credit__mark {
            animation: none;
          }

          .mezzold-credit,
          .mezzold-credit::before,
          .mezzold-credit__mark,
          .mezzold-credit__mark::after,
          .mezzold-credit__dot {
            transition-duration: 0.01ms;
          }
        }
      `}</style>

      <a
        className="mezzold-credit"
        href={MEZZOLD_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir site da Mezzold Studio em nova aba"
      >
        <span className="mezzold-credit__text" aria-hidden="true">
          <span className="mezzold-credit__eyebrow">produzido por</span>
          <span className="mezzold-credit__name">
            mezzold<span className="mezzold-credit__dot">.</span>
          </span>
        </span>
        <span className="mezzold-credit__mark" aria-hidden="true">
          <img className="mezzold-credit__logo" src={mezzoldLogo} alt="" loading="lazy" />
        </span>
      </a>
    </div>
  )
}
