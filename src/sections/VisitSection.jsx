import { Section, SectionHeader, Reveal } from '../components/Section'
import { SceneArt } from '../components/art/SceneArt'
import { Icon } from '../components/Icon'
import { ButtonLink } from '../components/Button'
import { fullAddress, restaurant } from '../data/restaurant'
import { telLink, directionsLink, instagramLink } from '../utils/links'

export function VisitSection() {
  const addressOneLine = `${fullAddress}`

  return (
    <Section id="visit" className="py-20 md:py-28" label="Visit us">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* info card */}
        <Reveal className="clay-card flex flex-col gap-6 p-7 sm:p-9">
          <SectionHeader
            align="left"
            eyebrow="Visit"
            title={
              <>
                Find your way <em className="text-clay-600">to the table</em>
              </>
            }
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3.5">
              <span className="clay-inset flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-clay-600">
                <Icon name="pin" size={18} />
              </span>
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-clay-600">Address</p>
                <p className="mt-0.5 text-[0.95rem] font-semibold leading-relaxed text-espresso">{addressOneLine}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="clay-inset flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-clay-600">
                <Icon name="phone" size={18} />
              </span>
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-clay-600">Reservations & enquiries</p>
                <a href={telLink} className="link-underline mt-0.5 inline-block font-display text-xl text-espresso">
                  {restaurant.phone.display}
                </a>
              </div>
            </div>

            {/* verified-only chips: hours / parking / wifi render only when confirmed */}
            {(restaurant.hours || restaurant.parking || restaurant.wifi) && (
              <div className="flex flex-wrap gap-2.5">
                {restaurant.hours && (
                  <span className="clay-inset inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-bold text-espresso">
                    <Icon name="clock" size={14} className="text-clay-600" /> {restaurant.hours}
                  </span>
                )}
                {restaurant.parking && (
                  <span className="clay-inset inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-bold text-espresso">
                    <Icon name="car" size={14} className="text-clay-600" /> {restaurant.parking}
                  </span>
                )}
                {restaurant.wifi && (
                  <span className="clay-inset inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-bold text-espresso">
                    <Icon name="wifi" size={14} className="text-clay-600" /> {restaurant.wifi}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile inline-flex items-center gap-2 rounded-full bg-clay-500 px-6 py-3.5 text-sm font-extrabold text-ivory hover:bg-clay-600"
            >
              <Icon name="pin" size={16} /> Get Directions
            </a>
            <a
              href={telLink}
              className="tactile inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 text-sm font-extrabold text-espresso shadow-clay-sm hover:text-clay-600"
            >
              <Icon name="phone" size={16} /> Call the Restaurant
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 text-sm font-extrabold text-espresso shadow-clay-sm hover:text-clay-600"
            >
              <Icon name="instagram" size={16} /> Instagram
            </a>
          </div>
        </Reveal>

        {/* visual + booking pull */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.08} className="arch-frame relative flex-1 overflow-hidden shadow-lift">
            <SceneArt scene="glow" className="h-full min-h-[320px] [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover" />
          </Reveal>
          <Reveal delay={0.14} className="clay-card flex items-center justify-between gap-4 rounded-[24px] bg-espresso p-6 text-ivory">
            <div>
              <p className="font-display text-2xl">The table is set.</p>
              <p className="text-sm text-ivory/60">Request yours for this week.</p>
            </div>
            <ButtonLink to="/book" variant="brass" size="md" icon="arrow-right">
              Book a Table
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
