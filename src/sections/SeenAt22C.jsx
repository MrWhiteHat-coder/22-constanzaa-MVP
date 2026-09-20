import { Section, SectionHeader, Reveal } from '../components/Section'
import { SceneArt } from '../components/art/SceneArt'
import { Icon } from '../components/Icon'
import { Button } from '../components/Button'
import { useToast } from '../hooks/useToast'
import { sharePlace } from '../utils/share'
import { instagramLink, directionsLink } from '../utils/links'
import { restaurant, social } from '../data/restaurant'

const TILES = [
  { scene: 'mural', alt: 'Mediterranean mural artwork in brand colours' },
  { scene: 'reception', alt: 'The 22C monogram glowing at reception' },
  { scene: 'plates', alt: 'Plates and brass cutlery laid out overhead' },
  { scene: 'greenery', alt: 'Greenery spilling through an arched window' },
  { scene: 'glow', alt: 'Warm pendant lamps over evening tables' },
  { scene: 'chairs', alt: 'Orange dining chairs in arched alcoves' },
]

export function SeenAt22C() {
  const toast = useToast()

  const onShare = async () => {
    const res = await sharePlace()
    if (res.ok) toast(res.copied ? 'Link copied — pass it on' : 'Shared', 'share')
    else toast('Could not share right now', 'close')
  }

  return (
    <Section id="social" className="py-20 md:py-28" label="Seen at 22C — social">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          align="left"
          id="social-heading"
          eyebrow={social.tagline}
          title={
            <>
              Life at <em className="text-clay-600">22C</em>
            </>
          }
          copy="Follow along on Instagram for new plates, evenings and the occasional chef’s special — then tag us in yours."
        />
        <Reveal delay={0.1} className="flex flex-wrap gap-2.5">
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-bold text-ivory hover:bg-espresso-deep"
          >
            <Icon name="instagram" size={16} /> Follow {social.instagramHandle}
          </a>
          <Button variant="secondary" size="md" icon="share" onClick={onShare}>
            Share this place
          </Button>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {TILES.map((t, i) => (
            <a
              key={t.scene}
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Instagram — ${t.alt}`}
              className={`group relative block overflow-hidden rounded-[24px] shadow-clay-sm ${
                i === 0 ? 'col-span-2 row-span-2 sm:col-span-1' : ''
              }`}
            >
              <SceneArt
                scene={t.scene}
                className="[&>svg]:block [&>svg]:aspect-square [&>svg]:h-full [&>svg]:w-full [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:ease-out group-hover:[&>svg]:scale-[1.05]"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso-deep/45 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-espresso">
                  <Icon name="instagram" size={12} /> {social.instagramHandle}
                </span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.12} className="clay-card mt-8 flex flex-col items-center justify-between gap-4 rounded-[26px] bg-cream/70 px-6 py-6 sm:flex-row">
        <p className="text-center text-sm font-semibold text-espresso sm:text-left">
          <Icon name="sparkle" size={14} className="mr-1.5 inline text-brass" aria-hidden="true" />
          Visited us? Tag <strong className="font-extrabold">{social.instagramHandle}</strong> — we’d love to see your table.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile rounded-full bg-clay-500 px-5 py-2.5 text-sm font-bold text-ivory hover:bg-clay-600"
          >
            Tag us on Instagram
          </a>
          <a
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile rounded-full bg-ivory px-5 py-2.5 text-sm font-bold text-espresso shadow-clay-sm hover:text-clay-600"
          >
            Visit us
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
