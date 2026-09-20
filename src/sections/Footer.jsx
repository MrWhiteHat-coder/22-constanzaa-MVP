import { Link } from 'react-router-dom'
import { Logo } from '../components/art/Logo'
import { Icon } from '../components/Icon'
import { fullAddress, restaurant } from '../data/restaurant'
import { telLink, directionsLink, instagramLink } from '../utils/links'

export function Footer() {
  return (
    <footer className="relative z-10 mt-10 rounded-t-[36px] bg-espresso-deep text-ivory">
      <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-14 md:pb-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-4">
              <Logo className="h-11 w-auto" plaque />
              <span className="text-[0.62rem] font-extrabold uppercase leading-relaxed tracking-[0.28em] text-brass-soft">
                {restaurant.locality}
              </span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/60">
              {restaurant.tagline} Mediterranean and Middle Eastern flavours, served in the heart of Chennai.
            </p>
            <div className="flex gap-2.5">
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="22 Constanzaa on Instagram"
                className="tactile flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20"
              >
                <Icon name="instagram" size={17} />
              </a>
              <a
                href={telLink}
                aria-label={`Call ${restaurant.phone.display}`}
                className="tactile flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20"
              >
                <Icon name="phone" size={16} />
              </a>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions on Google Maps"
                className="tactile flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20"
              >
                <Icon name="pin" size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="eyebrow mb-4 !text-brass-soft">Visit</h3>
            <address className="not-italic text-sm leading-relaxed text-ivory/70">
              {fullAddress}
            </address>
            <a href={telLink} className="link-underline mt-3 inline-block text-sm font-bold text-ivory/90">
              {restaurant.phone.display}
            </a>
          </nav>

          <nav aria-label="Explore">
            <h3 className="eyebrow mb-4 !text-brass-soft">Explore</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-bold text-ivory/80">
              <li><Link className="link-underline" to="/menu">The Menu</Link></li>
              <li><Link className="link-underline" to="/book">Book a Table</Link></li>
              <li><Link className="link-underline" to="/#compass">Taste Compass</Link></li>
              <li><a className="link-underline" href={instagramLink} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a className="link-underline" href={directionsLink} target="_blank" rel="noopener noreferrer">Directions</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-6 text-[0.72rem] font-semibold tracking-wide text-ivory/45 sm:flex-row">
          <span>© {new Date().getFullYear()} 22 Constanzaa · Alwarpet, Chennai</span>
          <span className="flex items-center gap-2">
            Made with warmth in Chennai <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-brass" /> {restaurant.shortName}
          </span>
        </div>
      </div>
    </footer>
  )
}
