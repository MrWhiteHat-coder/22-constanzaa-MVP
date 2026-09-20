import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Section, SectionHeader, Reveal } from '../components/Section'
import { Stamp } from '../components/art/Stamp'
import { Icon } from '../components/Icon'

// Flavour motifs — culinary character, not origin claims.
const FLAVOURS = [
  { id: 'smoke', label: 'Smoke', line: 'Charcoal and embers — shawarma carved hot, kebabs kissed by the grill.', tone: '#8C3D22' },
  { id: 'citrus', label: 'Citrus', line: 'Lemon and brightness, cutting through every rich, slow-cooked bite.', tone: '#D9A24A' },
  { id: 'spice', label: 'Spice', line: 'Warm spice blends, layered with patience rather than heat for its own sake.', tone: '#C4653C' },
  { id: 'herb', label: 'Herb', line: 'Green and alive — zaatar, coriander and mint doing quiet work.', tone: '#6F7048' },
  { id: 'sesame', label: 'Sesame', line: 'Tahini’s deep, nutty calm — the soul of the mezze table.', tone: '#B98A33' },
  { id: 'rose', label: 'Rose', line: 'A floral whisper that drifts across the dessert plate.', tone: '#C2708A' },
]

export function TableOf22() {
  const [active, setActive] = useState('smoke')
  const current = FLAVOURS.find((f) => f.id === active)

  return (
    <Section id="story" className="mt-8 bg-cream/60 py-20 md:mt-16 md:py-28" label="The Table of 22 — our story">
      {/* decorative stamps */}
      <Stamp text="PASSPORT OF FLAVOUR" sub="22C" color="#B98A33" rotate={-14} className="absolute right-6 top-10 hidden w-28 opacity-70 lg:block" />
      <Stamp text="ONE TABLE" sub="MANY INFLUENCES" color="#C4653C" rotate={8} className="absolute bottom-12 left-8 hidden w-24 opacity-50 xl:block" />

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeader
            align="left"
            eyebrow="Enter the Table of 22"
            title={
              <>
                Many culinary influences. <em className="text-clay-600">One table.</em>
              </>
            }
            copy="22C is what happens when the Mediterranean and the Middle East decide to share a table in Chennai — mezze to pass around, shawarma carved to order, grills that announce themselves, and sweets that refuse to end the evening quietly."
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-espresso-soft">
              Tap a flavour to follow its thread through the menu — every plate at 22C carries at
              least one of these signatures.
            </p>
          </Reveal>

          {/* interactive flavour line */}
          <Reveal delay={0.15} className="min-h-[76px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="clay-card flex items-start gap-4 rounded-[22px] bg-ivory p-5"
              >
                <span
                  className="mt-1 h-9 w-9 shrink-0 rounded-full"
                  style={{ backgroundColor: current.tone, boxShadow: `0 6px 14px -6px ${current.tone}` }}
                  aria-hidden="true"
                />
                <p className="text-[0.92rem] leading-relaxed text-espresso">
                  <strong className="font-extrabold">{current.label}.</strong> {current.line}
                </p>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.2}>
            <a href="#compass" className="link-underline inline-flex items-center gap-2 text-sm font-bold text-clay-700">
              <Icon name="compass" size={17} /> Let the Taste Compass choose for you
            </a>
          </Reveal>
        </div>

        {/* flavour plates */}
        <Reveal delay={0.1} className="relative">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3" role="list" aria-label="Signature flavours of the table">
            {FLAVOURS.map((f, i) => {
              const isActive = active === f.id
              return (
                <motion.button
                  key={f.id}
                  type="button"
                  role="listitem"
                  aria-pressed={isActive}
                  onClick={() => setActive(f.id)}
                  onMouseEnter={() => setActive(f.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ rotate: isActive ? 0 : -3, y: -4 }}
                  className={`tactile group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-full text-center ${
                    isActive ? 'clay-card' : 'clay-card clay-card--flat opacity-85'
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: f.tone }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-[1.05rem] text-espresso">{f.label}</span>
                  <span className={`text-[0.6rem] font-extrabold uppercase tracking-[0.2em] ${isActive ? 'text-clay-600' : 'text-espresso-soft/60'}`}>
                    {isActive ? 'On the menu' : 'Flavour'}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
