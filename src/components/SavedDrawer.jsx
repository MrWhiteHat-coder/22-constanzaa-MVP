import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useSaved } from '../hooks/useSavedDishes'
import { useToast } from '../hooks/useToast'
import { PlateArt } from './art/PlateArt'
import { Icon } from './Icon'
import { ButtonLink } from './Button'
import { shareDish } from '../utils/share'
import { categoryOf } from '../data/menu'
import { whatsappUrl } from '../data/restaurant'
import { motifFor } from './DishCard'

let openCount = 0

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function SavedDrawer({ open, onClose, onViewDish }) {
  const { saved, count, remove, clear } = useSaved()
  const toast = useToast()
  const panelRef = useRef(null)
  const restoreRef = useRef(null)
  const confirmRef = useRef(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    openCount += 1
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    panelRef.current?.focus({ preventScroll: true })

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const els = Array.from(panelRef.current.querySelectorAll(FOCUSABLE))
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
      openCount = Math.max(0, openCount - 1)
      if (openCount === 0) html.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown, true)
      restoreRef.current?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  const onShare = async (dish) => {
    const res = await shareDish(dish)
    if (res.ok) toast(res.copied ? 'Link copied to clipboard' : 'Shared', 'share')
  }

  const onClear = () => {
    if (!confirmRef.current) {
      confirmRef.current = true
      toast('Tap clear again to empty your table', 'trash')
      setTimeout(() => (confirmRef.current = false), 2600)
      return
    }
    clear()
    confirmRef.current = false
    toast('My Table cleared', 'trash')
  }

  const askMessage = whatsappUrl(
    saved.length
      ? `Hello 22 Constanzaa,\nI have saved these dishes from your menu and would like to know more:\n\n${saved
          .map((d) => `• ${d.name}`)
          .join('\n')}\n\nCould you share today's availability and pricing?`
      : ''
  )

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[65]" role="presentation">
          <motion.div
            className="absolute inset-0 bg-espresso-deep/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="My Table — saved dishes"
            tabIndex={-1}
            initial={{ opacity: 0, x: isDesktop ? 60 : 0, y: isDesktop ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isDesktop ? 60 : 0, y: isDesktop ? 0 : '100%' }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="clay-card absolute bottom-0 right-0 top-0 flex w-full flex-col rounded-none rounded-l-[30px] md:w-[420px]"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-dune/50 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl text-espresso">My Table</h2>
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-clay-600">
                  {count === 0 ? 'Nothing saved yet' : `${count} dish${count > 1 ? 'es' : ''} set aside`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close My Table"
                className="tactile clay-inset flex h-10 w-10 items-center justify-center rounded-full text-espresso hover:text-clay-700"
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            {/* list */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {saved.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
                  <div className="w-36 opacity-80">
                    <PlateArt variant="bowl" label="Empty plate illustration" className="rounded-full shadow-clay-sm" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-espresso">Your table is empty</p>
                    <p className="mt-1 text-sm text-espresso-soft">
                      Tap the heart on any dish to keep it here — your own little passport of plates.
                    </p>
                  </div>
                  <ButtonLink to="/menu" variant="primary" size="sm" icon="arrow-right">
                    Explore the menu
                  </ButtonLink>
                </div>
              ) : (
                <ul className="flex flex-col gap-3" aria-label="Saved dishes">
                  {saved.map((dish) => {
                    const cat = categoryOf(dish.category)
                    return (
                      <li
                        key={dish.id}
                        className="clay-card--flat flex items-center gap-3.5 rounded-[20px] bg-ivory p-3 shadow-clay-sm"
                      >
                        <PlateArt
                          variant={motifFor(dish)}
                          label=""
                          className="h-14 w-14 shrink-0 rounded-full shadow-[0_4px_10px_-4px_rgb(122,66,35,0.4)]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-espresso">{dish.name}</p>
                          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.13em] text-clay-600">
                            {cat?.label}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onViewDish(dish)}
                            aria-label={`View ${dish.name}`}
                            className="tactile flex h-9 w-9 items-center justify-center rounded-full text-espresso-soft hover:bg-cream hover:text-clay-700"
                          >
                            <Icon name="eye" size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onShare(dish)}
                            aria-label={`Share ${dish.name}`}
                            className="tactile flex h-9 w-9 items-center justify-center rounded-full text-espresso-soft hover:bg-cream hover:text-clay-700"
                          >
                            <Icon name="share" size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(dish.id)}
                            aria-label={`Remove ${dish.name}`}
                            className="tactile flex h-9 w-9 items-center justify-center rounded-full text-espresso-soft hover:bg-cream hover:text-clay-700"
                          >
                            <Icon name="close" size={15} />
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* footer */}
            {saved.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-dune/50 px-5 py-4">
                <a
                  href={askMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile inline-flex items-center justify-center gap-2 rounded-full bg-clay-500 px-5 py-3 text-sm font-bold text-ivory hover:bg-clay-600"
                >
                  <Icon name="whatsapp" size={16} filled /> Ask about these dishes
                </a>
                <button
                  type="button"
                  onClick={onClear}
                  className="mx-auto inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-espresso-soft hover:text-clay-700"
                >
                  <Icon name="trash" size={13} /> Clear my table
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
