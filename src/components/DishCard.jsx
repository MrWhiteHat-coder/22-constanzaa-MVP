import { memo } from 'react'
import { motion } from 'motion/react'
import { PlateArt } from './art/PlateArt'
import { Icon } from './Icon'
import { DietDot, SpiceMeter, Price } from './DishBits'
import { useSaved } from '../hooks/useSavedDishes'
import { useToast } from '../hooks/useToast'
import { shareDish } from '../utils/share'
import { categoryOf } from '../data/menu'

export function motifFor(dish) {
  switch (dish.id) {
    case 'falafel':
      return 'falafel'
    case 'knafeh-prawns':
      return 'prawns'
    case 'zaatar-fried-fish':
      return 'seafood'
    case 'shawarma-bowls':
      return 'bowlBig'
    case 'classic-arabic-knafeh':
    case 'mango-knafeh':
    case 'chocolate-knafeh':
      return 'knafeh'
    case 'chocolate-infused-baklava':
    case 'assorted-baklava':
      return 'baklava'
    case 'knafeh-ice-cream-cone':
      return 'cone'
    case 'iranian-sambusa':
    case 'chicken-cheese-filo-pastry':
      return 'fried'
    default:
      switch (dish.category) {
        case 'shawarma':
          return 'wrap'
        case 'mezze':
          return 'bowl'
        case 'mains':
          return 'skewer'
        case 'desserts':
          return 'knafeh'
        default:
          return 'bowl'
      }
  }
}

function DishCardBase({ dish, onView, priority = false, compact = false }) {
  const { has, toggle } = useSaved()
  const toast = useToast()
  const saved = has(dish.id)
  const cat = categoryOf(dish.category)

  const onSave = () => {
    toggle(dish.id)
    toast(saved ? 'Removed from My Table' : 'Saved to My Table', saved ? 'heart' : 'heart')
  }

  const onShare = async () => {
    const res = await shareDish(dish)
    if (res.ok) toast(res.copied ? 'Link copied to clipboard' : 'Shared', 'share')
    else toast('Could not share this dish', 'close')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="clay-card card-lift group relative flex flex-col overflow-hidden rounded-[26px]"
    >
      {/* art */}
      <button
        type="button"
        onClick={() => onView?.(dish)}
        aria-label={`View ${dish.name}`}
        className="relative block w-full cursor-pointer overflow-hidden rounded-t-[26px] focus-visible:outline-offset-[-3px]"
        tabIndex={0}
      >
        <PlateArt
          variant={motifFor(dish)}
          label={`Illustration representing ${dish.name}`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        {dish.signature && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-espresso/85 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-brass-soft backdrop-blur-sm">
            <Icon name="star" size={10} filled /> 22C Pick
          </span>
        )}
      </button>

      {/* floating actions */}
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${dish.name} from saved` : `Save ${dish.name}`}
          className={`tactile flex h-9 w-9 items-center justify-center rounded-full shadow-clay-sm ${
            saved ? 'bg-clay-600 text-ivory' : 'bg-ivory/95 text-espresso hover:text-clay-600'
          }`}
        >
          <Icon name="heart" size={15} filled={saved} />
        </button>
        <button
          type="button"
          onClick={onShare}
          aria-label={`Share ${dish.name}`}
          className="tactile flex h-9 w-9 items-center justify-center rounded-full bg-ivory/95 text-espresso shadow-clay-sm hover:text-clay-600"
        >
          <Icon name="share" size={14} />
        </button>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[1.22rem] leading-tight text-espresso">
            <button type="button" onClick={() => onView?.(dish)} className="cursor-pointer text-left">
              {dish.name}
            </button>
          </h3>
          <span className="mt-1 flex items-center gap-1.5">
            <DietDot dietary={dish.dietary} />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {cat && (
            <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-clay-600">
              {cat.label}
            </span>
          )}
          <SpiceMeter level={dish.spiceLevel} />
          <Price price={dish.price} />
        </div>

        {!compact && (
          <p className="line-clamp-2 text-sm leading-relaxed text-espresso-soft">{dish.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => onView?.(dish)}
            className="link-underline inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-espresso hover:text-clay-700"
          >
            View dish <Icon name="arrow-right" size={14} />
          </button>
          <span className="h-[3px] w-8 rounded-full bg-clay-500/30 transition-all duration-300 group-hover:w-12 group-hover:bg-clay-500" aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  )
}

export const DishCard = memo(DishCardBase)
