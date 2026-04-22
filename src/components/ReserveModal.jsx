import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WA_NUMBER } from '../constants/links'

function maskPhone(raw) {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length >= 7) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
  if (d.length >= 3) return `(${d.slice(0,2)}) ${d.slice(2)}`
  if (d.length > 0)  return `(${d}`
  return ''
}

export default function ReserveModal({ data, onClose }) {
  const [name,      setName]      = useState('')
  const [phone,     setPhone]     = useState('')
  const [errors,    setErrors]    = useState({})
  const [submitted, setSubmitted] = useState(false)

  const closeRef = useRef(null)
  const prevRef  = useRef(null)

  // Lock body scroll and restore focus on close
  useEffect(() => {
    prevRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 80)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      prevRef.current?.focus()
    }
  }, [])

  // Keyboard: Escape closes, Tab stays inside panel
  const onKeyDown = useCallback(e => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key !== 'Tab') return
    const panel = document.getElementById('modal-panel')
    if (!panel) return
    const nodes = panel.querySelectorAll(
      'button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    )
    const focusable = Array.from(nodes).filter(n => !n.closest('[data-hidden]'))
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  function validate() {
    const errs = {}
    if (!name.trim())                              errs.name  = 'Por favor, informe seu nome.'
    if (phone.replace(/\D/g, '').length < 10)      errs.phone = 'Informe um WhatsApp válido com DDD.'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    const msg = encodeURIComponent(
      `Olá! Me chamo ${name.trim()} e quero reservar minha vaga no evento ${data.event} (${data.date}). Meu WhatsApp: ${phone}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        id="modal-panel"
        className="relative bg-surface-container-lowest rounded-3xl p-8 md:p-12 w-full max-w-lg"
        style={{ boxShadow: '0 32px 64px rgba(62,2,21,0.14)' }}
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        exit={{   opacity: 0, y: 24,  scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {/* Close button */}
        <button
          type="button"
          ref={closeRef}
          aria-label="Fechar"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
        >
          <span aria-hidden="true" className="material-symbols-outlined">close</span>
        </button>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              <div>
                <span className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold">
                  Reservar Convite
                </span>
                <h3 id="modal-title" className="font-headline text-3xl text-on-background mt-2">
                  {data.event}
                </h3>
                <p className="font-body italic text-on-surface-variant mt-1">{data.date}</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="r-name" className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                    Seu Nome{' '}
                    <span aria-hidden="true" className="text-primary">*</span>
                    <span className="sr-only"> (obrigatório)</span>
                  </label>
                  <input
                    id="r-name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name || undefined}
                    aria-describedby={errors.name ? 'r-name-err' : undefined}
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })) }}
                    placeholder="Como posso te chamar?"
                    autoComplete="name"
                    className="input-lined"
                  />
                  {errors.name && (
                    <p id="r-name-err" role="alert" className="text-xs mt-1" style={{ color: '#ba1a1a' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="r-phone" className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                    WhatsApp{' '}
                    <span aria-hidden="true" className="text-primary">*</span>
                    <span className="sr-only"> (obrigatório)</span>
                  </label>
                  <input
                    id="r-phone"
                    type="tel"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.phone || undefined}
                    aria-describedby={errors.phone ? 'r-phone-err' : undefined}
                    value={phone}
                    onChange={e => { setPhone(maskPhone(e.target.value)); setErrors(p => ({ ...p, phone: undefined })) }}
                    placeholder="(00) 00000-0000"
                    autoComplete="tel"
                    className="input-lined"
                  />
                  {errors.phone && (
                    <p id="r-phone-err" role="alert" className="text-xs mt-1" style={{ color: '#ba1a1a' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-label font-bold py-4 rounded-xl uppercase tracking-widest"
                  whileHover={{ filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  Confirmar Interesse
                </motion.button>

                <p className="font-body text-sm italic text-on-surface-variant text-center">
                  Entraremos em contato pelo WhatsApp para confirmar sua vaga.
                </p>
              </form>
            </motion.div>

          ) : (
            <motion.div
              key="success"
              data-hidden
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-5 py-6"
            >
              <motion.span
                aria-hidden="true"
                className="text-6xl block"
                initial={{ scale: 0.4, rotate: -12 }}
                animate={{ scale: 1,   rotate: 0 }}
                transition={{ type: 'spring', damping: 13, delay: 0.1 }}
              >
                🌸
              </motion.span>
              <h4 id="modal-title-success" className="font-headline text-2xl text-on-background">
                Interesse registrado!
              </h4>
              <p className="font-body italic text-on-surface-variant">
                Entraremos em contato em breve pelo WhatsApp.
              </p>
              <motion.button
                type="button"
                onClick={onClose}
                autoFocus
                className="mt-2 bg-primary text-on-primary font-label font-bold py-3 px-8 rounded-xl uppercase tracking-widest"
                whileHover={{ filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.97 }}
              >
                Fechar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
