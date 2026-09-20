import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Logo } from '../components/art/Logo'
import { Icon } from '../components/Icon'
import { ButtonLink } from '../components/Button'
import { useSaved } from '../hooks/useSavedDishes'
import { telLink, directionsLink, instagramLink } from '../utils/links'
import { restaurant } from '../data/restaurant'

const NAV = [
  { label: 'The Table', to: '/#story' },
  { label: 'Taste Compass', to: '/#compass' },
  { label: 'The Space', to: '/#space' },
  { label: 'Visit', to: '/#visit' },
]

export function Header({ onOpenTable }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useSaved()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    return () => (document.documentElement.style.overflow = '')
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ivory/95 shadow-[0_10px_30px_-18px_rgb(122,66,35,0.45)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[72px]">
          <Link
            to="/"
            className="flex items-center rounded-2xl py-1.5 pr-2"
            aria-label="22 Constanzaa — home"
          >
            <Logo className="h-10 w-auto sm:h-12" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="link-underline text-[0.86rem] font-bold text-espresso-soft hover:text-clay-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenTable}
              aria-label={`My Table — ${count} saved dish${count === 1 ? '' : 'es'}`}
              className="tactile relative flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-espresso shadow-clay-sm hover:text-clay-600"
            >
              <Icon name="heart" size={18} filled={count > 0} />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-600 px-1 text-[0.62rem] font-extrabold text-ivory"
                >
                  {count}
                </span>
              )}
            </button>

            <ButtonLink to="/book" variant="primary" size="sm" className="hidden sm:inline-flex">
              Book a Table
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="tactile flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-espresso shadow-clay-sm lg:hidden"
            >
              <Icon name="burger" size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ivory lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <span className="flex items-center">
                <Logo className="h-9 w-auto" />
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="tactile clay-inset flex h-11 w-11 items-center justify-center rounded-full text-espresso"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[
                { label: 'Home', to: '/' },
                { label: 'Menu', to: '/menu' },
                ...NAV,
                { label: 'Book a Table', to: '/book' },
              ].map((item, i) => (
                <motion.div
                  key={item.label + item.to}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    className="group flex items-center justify-between border-b border-dune/40 py-4"
                  >
                    <span className="font-display text-3xl text-espresso group-hover:text-clay-700">
                      {item.label}
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={20}
                      className="text-clay-500 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="grid grid-cols-3 gap-2.5 px-8 pb-10">
              <a
                href={telLink}
                className="tactile clay-inset flex flex-col items-center gap-1 rounded-2xl py-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-espresso"
              >
                <Icon name="phone" size={17} /> Call
              </a>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile clay-inset flex flex-col items-center gap-1 rounded-2xl py-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-espresso"
              >
                <Icon name="pin" size={17} /> Directions
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile clay-inset flex flex-col items-center gap-1 rounded-2xl py-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-espresso"
              >
                <Icon name="instagram" size={17} /> Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
