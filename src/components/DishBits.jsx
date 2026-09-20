import { Icon } from './Icon'

// Indian veg / non-veg convention: green square-dot = veg, terracotta = non-veg
export function DietDot({ dietary, size = 15 }) {
  if (!dietary) return null
  const veg = dietary === 'vegetarian'
  const color = veg ? '#6F7048' : '#B54B22'
  return (
    <span
      title={veg ? 'Vegetarian' : dietary.charAt(0).toUpperCase() + dietary.slice(1)}
      className="inline-flex shrink-0 items-center justify-center rounded-[4px] border-[1.5px]"
      style={{ width: size, height: size, borderColor: color }}
    >
      <span className="rounded-full" style={{ width: size * 0.45, height: size * 0.45, backgroundColor: color }} />
    </span>
  )
}

export function DietLabel({ dietary }) {
  if (!dietary) return null
  const labels = {
    vegetarian: 'Vegetarian',
    chicken: 'Chicken',
    lamb: 'Lamb',
    seafood: 'Seafood',
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-olive-600">
      <DietDot dietary={dietary} size={13} />
      {labels[dietary] || dietary}
    </span>
  )
}

export function SpiceMeter({ level }) {
  if (level == null) return null
  return (
    <span
      className="inline-flex items-center gap-0.5"
      title={level >= 3 ? 'Fiery' : level === 2 ? 'Spiced' : level === 1 ? 'Mild warmth' : 'Not spicy'}
    >
      {[1, 2, 3].map((i) => (
        <Icon
          key={i}
          name="flame"
          size={13}
          className={i <= level ? 'text-clay-600' : 'text-espresso/15'}
          filled={i <= level}
        />
      ))}
    </span>
  )
}

export function Price({ price }) {
  if (price == null) return null // never display an unconfirmed price
  return (
    <span className="font-display text-lg text-espresso">
      ₹{price}
    </span>
  )
}

export function TagChips({ tags }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="clay-inset rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-espresso-soft">
          {t}
        </span>
      ))}
    </div>
  )
}
