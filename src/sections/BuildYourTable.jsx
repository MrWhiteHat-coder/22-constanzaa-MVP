import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Section, SectionHeader, Reveal } from '../components/Section'
import { Icon } from '../components/Icon'
import { useToast } from '../hooks/useToast'
import { restaurant, whatsappUrl, bookingMessage } from '../data/restaurant'
import { telLink } from '../utils/links'

function todayISO() {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60 * 1000).toISOString().slice(0, 10)
}

function prettyDate(iso) {
  if (!iso) return ''
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

const ASSURANCES = [
  { icon: 'check', text: 'No apps, no accounts — your request goes straight to the team on WhatsApp.' },
  { icon: 'check', text: 'Edit the message before sending — it’s your table, your words.' },
  { icon: 'check', text: 'The team confirms availability and gets back to you on the same number.' },
]

export function BuildYourTable() {
  const toast = useToast()
  const [form, setForm] = useState({
    guests: 2,
    date: '',
    time: '',
    occasion: '',
    name: '',
    phone: '',
  })
  const [errors, setErrors] = useState({})
  const [stage, setStage] = useState('form') // form | review
  const [draftMessage, setDraftMessage] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const setGuests = (delta) =>
    setForm((f) => ({ ...f, guests: Math.min(restaurant.booking.maxGuests, Math.max(1, f.guests + delta)) }))

  const validate = () => {
    const errs = {}
    if (!form.date) errs.date = 'Pick a date for your visit.'
    if (!form.time) errs.time = 'Pick a preferred time.'
    if (!form.name.trim()) errs.name = 'Tell us your name.'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) errs.phone = 'Enter a valid phone number (at least 10 digits).'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      toast('A few details are missing', 'close')
      return
    }
    setDraftMessage(
      bookingMessage({
        guests: form.guests,
        date: prettyDate(form.date),
        time: form.time,
        name: form.name.trim(),
        phone: form.phone.trim(),
        occasion: form.occasion,
      })
    )
    setStage('review')
  }

  const waHref = useMemo(() => (stage === 'review' ? whatsappUrl(draftMessage) : '#'), [stage, draftMessage])

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(draftMessage)
      toast('Message copied — paste it in a chat or SMS', 'copy')
    } catch {
      toast('Could not copy — please select the text manually', 'close')
    }
  }

  const fieldCls =
    'clay-inset w-full rounded-2xl bg-ivory px-4 py-3 text-[0.92rem] font-semibold text-espresso outline-none placeholder:font-medium placeholder:text-espresso-soft/45'
  const labelCls = 'mb-1.5 flex items-center gap-2 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-espresso-soft'

  return (
    <Section id="book" className="bg-cream/60 py-20 md:py-28" label="Build your table — request a reservation">
      <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col gap-6">
          <SectionHeader
            align="left"
            eyebrow="Build Your Table"
            title={
              <>
                Request a table, <em className="text-clay-600">the human way.</em>
              </>
            }
            copy="Tell us who’s coming and when — we’ll turn it into a ready-to-send WhatsApp message to the restaurant. No forms lost in the void, no waiting on hold."
          />
          <Reveal delay={0.1} className="flex flex-col gap-3">
            {ASSURANCES.map((a) => (
              <p key={a.text} className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-espresso-soft">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-500/15 text-olive-600">
                  <Icon name={a.icon} size={13} />
                </span>
                {a.text}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <div className="clay-card flex items-center gap-4 rounded-[22px] bg-ivory p-5">
              <span className="clay-inset flex h-12 w-12 items-center justify-center rounded-2xl text-clay-600">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-clay-600">
                  Prefer to talk?
                </p>
                <a href={telLink} className="link-underline font-display text-xl text-espresso">
                  {restaurant.phone.display}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* form / review card */}
        <Reveal delay={0.1}>
          <div className="clay-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {stage === 'form' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* guests */}
                  <div>
                    <span className={labelCls}>
                      <Icon name="users" size={13} /> Guests
                    </span>
                    <div className="clay-inset flex items-center justify-between rounded-2xl px-2 py-2">
                      <button
                        type="button"
                        onClick={() => setGuests(-1)}
                        aria-label="Fewer guests"
                        className="tactile flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-espresso shadow-clay-sm hover:text-clay-600"
                      >
                        <Icon name="minus" size={16} />
                      </button>
                      <span className="font-display text-2xl text-espresso" aria-live="polite">
                        {form.guests} <span className="text-sm font-sans font-bold text-espresso-soft">guest{form.guests > 1 ? 's' : ''}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(1)}
                        aria-label="More guests"
                        className="tactile flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-espresso shadow-clay-sm hover:text-clay-600"
                      >
                        <Icon name="plus" size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-date" className={labelCls}>
                        <Icon name="calendar" size={13} /> Date
                      </label>
                      <input
                        id="bk-date"
                        type="date"
                        min={todayISO()}
                        value={form.date}
                        onChange={set('date')}
                        aria-invalid={!!errors.date}
                        className={fieldCls}
                      />
                      {errors.date && <p className="mt-1.5 text-[0.75rem] font-bold text-clay-700">{errors.date}</p>}
                    </div>
                    <div>
                      <label htmlFor="bk-time" className={labelCls}>
                        <Icon name="clock" size={13} /> Preferred time
                      </label>
                      <select id="bk-time" value={form.time} onChange={set('time')} aria-invalid={!!errors.time} className={fieldCls}>
                        <option value="">Select a time</option>
                        {restaurant.booking.times.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.time && <p className="mt-1.5 text-[0.75rem] font-bold text-clay-700">{errors.time}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bk-occasion" className={labelCls}>
                      <Icon name="sparkle" size={13} /> Occasion <span className="font-semibold normal-case tracking-normal text-espresso-soft/60">(optional)</span>
                    </label>
                    <select id="bk-occasion" value={form.occasion} onChange={set('occasion')} className={fieldCls}>
                      <option value="">Just dining</option>
                      {restaurant.booking.occasions
                        .filter((o) => o !== 'Just dining')
                        .map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-name" className={labelCls}>
                        <Icon name="users" size={13} /> Name
                      </label>
                      <input
                        id="bk-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={set('name')}
                        aria-invalid={!!errors.name}
                        className={fieldCls}
                      />
                      {errors.name && <p className="mt-1.5 text-[0.75rem] font-bold text-clay-700">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="bk-phone" className={labelCls}>
                        <Icon name="phone" size={13} /> Phone
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+91 …"
                        value={form.phone}
                        onChange={set('phone')}
                        aria-invalid={!!errors.phone}
                        className={fieldCls}
                      />
                      {errors.phone && <p className="mt-1.5 text-[0.75rem] font-bold text-clay-700">{errors.phone}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="tactile mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-clay-500 px-7 py-4 text-[0.95rem] font-extrabold text-ivory hover:bg-clay-600"
                  >
                    <Icon name="arrow-right" size={17} /> Request a Table
                  </button>
                  <p className="text-center text-[0.72rem] text-espresso-soft/70">
                    This opens WhatsApp with your request pre-filled — you stay in control of the send.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-500/15 text-olive-600">
                      <Icon name="check" size={17} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-espresso">Your request is ready</h3>
                      <p className="text-[0.8rem] text-espresso-soft">
                        Review the message — edit anything you like, then send.
                      </p>
                    </div>
                  </div>

                  <label htmlFor="bk-message" className="sr-only">
                    Editable WhatsApp message
                  </label>
                  <textarea
                    id="bk-message"
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    rows={11}
                    className="clay-inset w-full resize-y rounded-[20px] bg-ivory px-5 py-4 font-mono text-[0.85rem] leading-relaxed text-espresso outline-none"
                  />

                  <div className="flex flex-col gap-2.5">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => toast('Opening WhatsApp — press send to complete your request', 'whatsapp')}
                      className="tactile inline-flex items-center justify-center gap-2 rounded-full bg-[#1faa53] px-7 py-4 text-[0.95rem] font-extrabold text-white hover:brightness-105"
                    >
                      <Icon name="whatsapp" size={18} filled /> Send via WhatsApp
                    </a>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={copyMessage}
                        className="tactile inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-bold text-espresso shadow-clay-sm hover:text-clay-600"
                      >
                        <Icon name="copy" size={15} /> Copy message
                      </button>
                      <button
                        type="button"
                        onClick={() => setStage('form')}
                        className="tactile inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-bold text-espresso shadow-clay-sm hover:text-clay-600"
                      >
                        <Icon name="arrow-left" size={15} /> Edit details
                      </button>
                    </div>
                    <p aria-live="polite" className="text-center text-[0.75rem] text-espresso-soft/75">
                      WhatsApp should open in a new tab — press send there to complete your request. No
                      confirmation happens on this page.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
