import { motion } from 'motion/react'
import { ArchScene } from '../components/art/ArchScene'
import { Stamp } from '../components/art/Stamp'
import { Icon } from '../components/Icon'
import { ButtonLink } from '../components/Button'
import { telLink, directionsLink, instagramLink } from '../utils/links'
import { restaurant } from '../data/restaurant'

const ease = [0.22, 1, 0.36, 1]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28" aria-label="Welcome to 22 Constanzaa">
      {/* soft backdrop washes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-clay-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-sand/60 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        {/* copy */}
        <div className="relative z-10 flex max-w-xl flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="inline-block h-[3px] w-7 rounded-full bg-brass" aria-hidden="true" />
            {restaurant.locality}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="text-[2.7rem] leading-[1.04] text-espresso sm:text-6xl lg:text-[4.2rem]"
          >
            A table set for <em className="font-display text-clay-600">curious</em> palates.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="max-w-md text-[1.02rem] leading-relaxed text-espresso-soft"
          >
            {restaurant.description} Come hungry for mezze, shawarma and fire-kissed grills — leave
            planning your next visit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <ButtonLink to="/menu" variant="primary" size="lg" icon="arrow-right">
              Explore the Menu
            </ButtonLink>
            <ButtonLink to="/book" variant="secondary" size="lg" icon="calendar">
              Book a Table
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1"
          >
            <a href={telLink} className="link-underline inline-flex items-center gap-2 text-[0.83rem] font-bold text-espresso-soft hover:text-clay-700">
              <Icon name="phone" size={15} /> Call
            </a>
            <a href={directionsLink} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 text-[0.83rem] font-bold text-espresso-soft hover:text-clay-700">
              <Icon name="pin" size={15} /> Directions
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 text-[0.83rem] font-bold text-espresso-soft hover:text-clay-700">
              <Icon name="instagram" size={15} /> Instagram
            </a>
          </motion.div>
        </div>

        {/* art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="arch-frame relative overflow-hidden bg-sand/40 shadow-lift">
            <ArchScene className="w-full" />
          </div>

          {/* floating stamps */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-6 top-10 w-24 sm:-left-10 sm:w-28"
            aria-hidden="true"
          >
            <Stamp text="TABLE OF 22" sub="CHENNAI" color="#A94E2C" rotate={-12} className="drop-shadow-[0_10px_20px_rgb(122,66,35,0.35)]" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -right-4 bottom-24 w-20 sm:-right-8 sm:w-24"
            aria-hidden="true"
          >
            <Stamp text="EST. TASTE" sub="MEDITERRANEAN" color="#B98A33" rotate={10} className="drop-shadow-[0_10px_20px_rgb(122,66,35,0.35)]" />
          </motion.div>

          {/* flavour chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="clay-card absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ivory px-5 py-3"
          >
            <span className="h-2 w-2 rounded-full bg-olive-500" aria-hidden="true" />
            <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-espresso">
              Mediterranean · Middle Eastern
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-clay-500/50 pt-2"
        >
          <span className="h-2 w-1 rounded-full bg-clay-500/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}
