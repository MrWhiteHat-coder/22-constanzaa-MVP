import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Section, SectionHeader, Reveal } from '../components/Section'
import { SceneArt } from '../components/art/SceneArt'
import { ButtonLink } from '../components/Button'

const CARDS = [
  { scene: 'chairs', title: 'Arched windows, garden light', copy: 'Daylight through the arches, greenery at the edge of every view.' },
  { scene: 'glow', title: 'Terracotta evenings', copy: 'As the sun dips, the lamps take over and the room turns amber.' },
]

export function TheSpace() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 34, reduce ? 0 : -34])
  const yB = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -22, reduce ? 0 : 22])

  return (
    <Section
      id="space"
      className="overflow-hidden bg-gradient-to-b from-clay-600 to-clay-700 py-20 text-ivory md:py-28"
      label="The Space — restaurant ambience"
    >
      {/* subtle texture dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(#FBF7EF 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative">
        <SectionHeader
          tone="light"
          eyebrow="The Space"
          title={
            <>
              Come for the flavour. <em className="text-brass-soft">Stay for the atmosphere.</em>
            </>
          }
          copy="Arched windows and garden light. Terracotta warmth and orange chairs. Long tables, slow evenings, and the 22C glow at reception."
        />

        <div ref={ref} className="mt-14 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* hero tile */}
          <Reveal className="relative">
            <div className="arch-soft overflow-hidden shadow-lift">
              <SceneArt scene="windows" className="w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full" />
            </div>
            <div className="clay-card absolute -bottom-6 left-6 rounded-[20px] bg-ivory px-5 py-4">
              <p className="font-display text-lg leading-tight text-espresso">Abhiramapuram 4th Street</p>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-clay-600">
                Alwarpet · Chennai
              </p>
            </div>
          </Reveal>

          {/* overlapping cards */}
          <div className="relative flex flex-col gap-6 pt-0 lg:pt-14">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.scene}
                style={{ y: i === 0 ? yA : yB }}
                className={`relative ${i === 1 ? 'lg:-ml-16' : ''}`}
              >
                <Reveal delay={0.08 * i} className="clay-card overflow-hidden rounded-[26px] bg-ivory">
                  <div className="grid grid-cols-[0.9fr_1.1fr] items-stretch">
                    <SceneArt scene={c.scene} className="[&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover" />
                    <div className="flex flex-col justify-center gap-1.5 p-5">
                      <h3 className="font-display text-[1.15rem] leading-snug text-espresso">{c.title}</h3>
                      <p className="text-[0.8rem] leading-relaxed text-espresso-soft">{c.copy}</p>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            ))}

            <Reveal delay={0.15} className="lg:pl-10">
              <ButtonLink to="/book" variant="secondary" size="md" icon="arrow-right">
                Reserve your evening
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
