import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Icon } from './Icon'

let openCount = 0

function lockScroll() {
  openCount += 1
  const html = document.documentElement
  const prev = html.style.overflow
  html.style.overflow = 'hidden'
  return () => {
    openCount = Math.max(0, openCount - 1)
    if (openCount === 0) html.style.overflow = prev
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Dialog({ open, onClose, title, children, closeLabel = 'Close', labelledBy }) {
  const panelRef = useRef(null)
  const restoreRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const titleId = labelledBy || `dialog-${title?.replace(/\s+/g, '-').toLowerCase()}`

  // scroll lock + focus management + escape + focus trap
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    const release = lockScroll()
    const panel = panelRef.current
    panel?.focus({ preventScroll: true })

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const els = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      )
      if (els.length === 0) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      release()
      document.removeEventListener('keydown', onKeyDown, true)
      restoreRef.current?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] md:grid md:place-items-center md:p-6" role="presentation">
          <motion.div
            className="absolute inset-0 bg-espresso-deep/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            aria-labelledby={title ? undefined : titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: isDesktop ? 28 : '100%', scale: isDesktop ? 0.97 : 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isDesktop ? 24 : '100%', scale: isDesktop ? 0.98 : 1 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="clay-card relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[28px] md:max-h-[86vh] md:max-w-2xl md:rounded-[30px]"
          >
            {/* drag handle (mobile sheet affordance) */}
            <div className="flex justify-center pt-3 md:hidden" aria-hidden="true">
              <span className="h-1.5 w-12 rounded-full bg-espresso/15" />
            </div>

            <div className="flex items-start justify-between gap-4 px-6 pt-4 md:px-8 md:pt-7">
              {title && (
                <h3 id={titleId} className="font-display text-2xl text-espresso md:text-[1.7rem]">
                  {title}
                </h3>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="tactile clay-inset ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-espresso hover:text-clay-700"
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-4 md:px-8 md:pb-10">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
