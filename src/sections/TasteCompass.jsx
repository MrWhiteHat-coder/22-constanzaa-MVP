import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Section, SectionHeader } from '../components/Section'
import { CompassDial, CRAVINGS } from '../components/art/CompassDial'
import { DishCard } from '../components/DishCard'
import { DishQuickView } from '../components/DishQuickView'
import { Icon } from '../components/Icon'
import { ButtonLink } from '../components/Button'
import { dishes } from '../data/menu'
import { runCompass } from '../utils/match'

const MOODS = [
  { id: 'light', label: 'Light', icon: 'waves' },
  { id: 'sharing', label: 'Sharing', icon: 'users' },
  { id: 'main', label: 'Main', icon: 'flame' },
  { id: 'dessert', label: 'Dessert', icon: 'sparkle' },
  { id: 'indulgent', label: 'Something indulgent', icon: 'star' },
]

const PREFS = [
  { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf' },
  { id: 'chicken', label: 'Chicken', icon: 'flame' },
  { id: 'lamb', label: 'Lamb', icon: 'flame' },
  { id: 'seafood', label: 'Seafood', icon: 'waves' },
  { id: 'any', label: 'No preference', icon: 'compass' },
]

const STEP_META = [
  { q: 'What are you craving?', sub: 'Pick the flavour pulling at you.' },
  { q: 'What are you in the mood for?', sub: 'How should the table feel tonight?' },
  { q: 'Choose your preference', sub: 'Any table rules we should know about?' },
]

export function TasteCompass() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ craving: null, mood: null, pref: null })
  const [viewing, setViewing] = useState(null)
  const [dialKey, setDialKey] = useState(0)

  const results = useMemo(
    () => (step === 3 ? runCompass(answers, dishes) : []),
    [step, answers]
  )

  const pick = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    if (key === 'craving') setDialKey((k) => k + 1)
    setTimeout(() => setStep((s) => Math.min(3, s + 1)), 340)
  }

  const reset = () => {
    setStep(0)
    setAnswers({ craving: null, mood: null, pref: null })
    setDialKey((k) => k + 1)
  }

  const meta = STEP_META[Math.min(step, 2)]

  return (
    <Section id="compass" className="bg-espresso py-20 text-ivory md:py-28" label="Taste Compass — find your dish">
      {/* ambient warm glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-clay-600/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-brass/15 blur-3xl" />
      </div>

      <div className="relative">
        <SectionHeader
          tone="light"
          eyebrow="Taste Compass"
          title={
            <>
              Not sure what to order? <em className="text-brass-soft">Ask the compass.</em>
            </>
          }
          copy="Three small questions. One honest set of suggestions — drawn from the real menu, no guesswork."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* dial column */}
          <div className="relative mx-auto w-full max-w-[380px]">
            <CompassDial key={dialKey} craving={answers.craving} step={Math.min(step + 1, 3)} />

            <div className="mt-10 flex items-center justify-center gap-2" aria-hidden="true">
              {[0, 1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s <= step ? 'w-8 bg-brass-soft' : 'w-3 bg-ivory/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* question / results column */}
          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              {step < 3 ? (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <p className="eyebrow !text-brass-soft">Question {step + 1} of 3</p>
                    <h3 className="mt-2 font-display text-3xl text-ivory">{meta.q}</h3>
                    <p className="mt-1.5 text-sm text-ivory/60">{meta.sub}</p>
                  </div>

                  <div className="flex flex-wrap gap-3" role="group" aria-label={meta.q}>
                    {step === 0 &&
                      CRAVINGS.map((c) => (
                        <motion.button
                          key={c.id}
                          type="button"
                          aria-pressed={answers.craving === c.id}
                          onClick={() => pick('craving', c.id)}
                          whileTap={{ scale: 0.94 }}
                          className="chip-dark tactile flex items-center gap-2.5 px-5 py-3 text-[0.9rem] font-bold text-ivory hover:brightness-125"
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-brass-soft" aria-hidden="true" />
                          {c.label}
                        </motion.button>
                      ))}

                    {step === 1 &&
                      MOODS.map((m) => (
                        <motion.button
                          key={m.id}
                          type="button"
                          aria-pressed={answers.mood === m.id}
                          onClick={() => pick('mood', m.id)}
                          whileTap={{ scale: 0.94 }}
                          className="chip-dark tactile flex items-center gap-2.5 px-5 py-3 text-[0.9rem] font-bold text-ivory hover:brightness-125"
                        >
                          <Icon name={m.icon} size={16} className="text-brass-soft" />
                          {m.label}
                        </motion.button>
                      ))}

                    {step === 2 &&
                      PREFS.map((p) => (
                        <motion.button
                          key={p.id}
                          type="button"
                          aria-pressed={answers.pref === p.id}
                          onClick={() => pick('pref', p.id)}
                          whileTap={{ scale: 0.94 }}
                          className="chip-dark tactile flex items-center gap-2.5 px-5 py-3 text-[0.9rem] font-bold text-ivory hover:brightness-125"
                        >
                          <Icon name={p.icon} size={16} className="text-brass-soft" />
                          {p.label}
                        </motion.button>
                      ))}
                  </div>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="inline-flex items-center gap-1.5 self-start text-[0.8rem] font-bold text-ivory/50 hover:text-ivory"
                    >
                      <Icon name="arrow-left" size={14} /> Back
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="eyebrow !text-brass-soft">Your compass points to</p>
                      <h3 className="mt-1 font-display text-3xl text-ivory">
                        {results.length} dish{results.length === 1 ? '' : 'es'} for you
                      </h3>
                    </div>
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={reset}
                        className="chip-dark tactile inline-flex items-center gap-2 px-4 py-2.5 text-[0.8rem] font-bold text-ivory hover:brightness-125"
                      >
                        <Icon name="compass" size={14} /> Spin again
                      </button>
                      <ButtonLink to="/menu" variant="brass" size="sm" icon="arrow-right">
                        Full menu
                      </ButtonLink>
                    </div>
                  </div>

                  {results.length === 0 ? (
                    <p className="clay-card rounded-[22px] bg-ivory/10 p-6 text-sm text-ivory/80">
                      Nothing matched that exact combination — try “No preference”, or explore the
                      full menu.
                    </p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {results.map((dish) => (
                        <DishCard key={dish.id} dish={dish} onView={setViewing} compact />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <DishQuickView dish={viewing} onClose={() => setViewing(null)} onSelect={setViewing} />
    </Section>
  )
}
