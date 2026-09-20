import { Dialog } from './Dialog'
import { PlateArt } from './art/PlateArt'
import { Icon } from './Icon'
import { DietLabel, SpiceMeter, Price, TagChips } from './DishBits'
import { DishCard, motifFor } from './DishCard'
import { useSaved } from '../hooks/useSavedDishes'
import { useToast } from '../hooks/useToast'
import { shareDish } from '../utils/share'
import { categoryOf, relatedDishes } from '../data/menu'
import { restaurant } from '../data/restaurant'

export function DishQuickView({ dish, onClose, onSelect }) {
  const { has, toggle } = useSaved()
  const toast = useToast()
  const saved = dish ? has(dish.id) : false
  const cat = dish ? categoryOf(dish.category) : null
  const related = dish ? relatedDishes(dish, 3) : []

  if (!dish) {
    return (
      <Dialog open={false} onClose={onClose} title="Dish">
        <span hidden />
      </Dialog>
    )
  }

  const onSave = () => {
    toggle(dish.id)
    toast(saved ? 'Removed from My Table' : 'Saved to My Table', 'heart')
  }

  const onShare = async () => {
    const res = await shareDish(dish)
    if (res.ok) toast(res.copied ? 'Link copied to clipboard' : 'Shared', 'share')
    else toast('Could not share this dish', 'close')
  }

  return (
    <Dialog open onClose={onClose} title={dish.name} closeLabel="Back to menu">
      <div className="grid gap-6 md:grid-cols-[1fr_1.15fr]">
        {/* art */}
        <div className="clay-card--flat relative overflow-hidden rounded-[24px] shadow-clay-sm">
          <PlateArt
            variant={motifFor(dish)}
            label={`Illustration representing ${dish.name}`}
            className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[280px]"
          />
          {dish.signature && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-espresso/85 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-brass-soft">
              <Icon name="star" size={10} filled /> 22C Pick
            </span>
          )}
        </div>

        {/* details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {cat && (
              <span className="clay-inset rounded-full px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-clay-700">
                {cat.label}
              </span>
            )}
            <DietLabel dietary={dish.dietary} />
            <SpiceMeter level={dish.spiceLevel} />
          </div>

          <p className="text-[0.95rem] leading-relaxed text-espresso-soft">{dish.description}</p>

          {dish.ingredients && (
            <p className="text-sm text-espresso-soft">
              <span className="font-bold text-espresso">Good to know: </span>
              {dish.ingredients}
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <Price price={dish.price} />
            <TagChips tags={dish.tags} />
          </div>

          <div className="mt-1 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={onSave}
              aria-pressed={saved}
              className={`tactile inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ${
                saved
                  ? 'bg-clay-600 text-ivory shadow-clay-sm'
                  : 'bg-ivory text-espresso shadow-clay-sm hover:text-clay-600'
              }`}
            >
              <Icon name="heart" size={15} filled={saved} />
              {saved ? 'Saved' : 'Save to My Table'}
            </button>
            <button
              type="button"
              onClick={onShare}
              className="tactile inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-sm font-bold text-espresso shadow-clay-sm hover:text-clay-600"
            >
              <Icon name="share" size={15} /> Share
            </button>
            <a
              href={`https://wa.me/${restaurant.phone.whatsapp}?text=${encodeURIComponent(
                `Hello 22 Constanzaa, could you tell me more about the ${dish.name}?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-bold text-ivory hover:bg-espresso-deep"
            >
              <Icon name="whatsapp" size={15} filled /> Ask about it
            </a>
          </div>

          <p className="text-[0.72rem] text-espresso-soft/70">
            {dish.price == null && 'Pricing available on the menu / at the restaurant.'}
          </p>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-8 border-t border-dune/50 pt-6">
          <h4 className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-[3px] w-6 rounded-full bg-brass" aria-hidden="true" />
            Pairs well with
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <DishCard key={r.id} dish={r} onView={onSelect} compact />
            ))}
          </div>
        </div>
      )}
    </Dialog>
  )
}
