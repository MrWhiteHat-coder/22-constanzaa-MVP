import { NavLink } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { telLink, directionsLink } from '../utils/links'

const ITEMS = [
  { label: 'Menu', to: '/menu', icon: 'book', external: false },
  { label: 'Book', to: '/book', icon: 'calendar', external: false },
  { label: 'Call', to: telLink, icon: 'phone', external: true },
  { label: 'Directions', to: directionsLink, icon: 'pin', external: true },
]

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-dune/60 bg-ivory/97 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-18px_rgb(122,66,35,0.5)] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-4">
        {ITEMS.map((item) => {
          const inner = (
            <>
              <Icon name={item.icon} size={19} />
              <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em]">{item.label}</span>
            </>
          )
          const cls = ({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
              isActive ? 'text-clay-700' : 'text-espresso-soft'
            }`
          return item.external ? (
            <a
              key={item.label}
              href={item.to}
              target={item.to.startsWith('http') ? '_blank' : undefined}
              rel={item.to.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center justify-center gap-1 py-2.5 text-espresso-soft"
            >
              {inner}
            </a>
          ) : (
            <NavLink key={item.label} to={item.to} className={cls}>
              {inner}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
