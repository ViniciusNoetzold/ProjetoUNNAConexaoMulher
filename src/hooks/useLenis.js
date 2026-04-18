import { useEffect } from 'react'
import Lenis from 'lenis'

// Module-level singleton — safe for a single-page landing app
let _lenis = null

/** Pause Lenis smooth scroll (e.g. while another component hijacks wheel events). */
export function pauseLenis() {
  _lenis?.stop()
}

/** Resume Lenis smooth scroll after it was paused. */
export function resumeLenis() {
  _lenis?.start()
}

/**
 * Scroll to a target via Lenis (falls back to native if not initialised yet).
 * @param {string|HTMLElement} target  CSS selector or element
 * @param {{ offset?: number }} opts
 */
export function scrollTo(target, opts = {}) {
  if (_lenis) {
    _lenis.scrollTo(target, { offset: opts.offset ?? 0, duration: 1.2 })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    _lenis = lenis

    let raf
    function tick(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      _lenis = null
    }
  }, [])
}
