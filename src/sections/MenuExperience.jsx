import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Section } from '../components/Section'
import { DishCard } from '../components/DishCard'
import { DishQuickView } from '../components/DishQuickView'
import { Icon } from '../components/Icon'
import { dishes, getDish, activeCategories } from '../data/menu'
import { restaurant } from '../data/restaurant'

const PREF_FILTERS = [
  { id: 'vegetarian', label: 'Veg', icon: 'leaf' },
  { id: 'chicken', label: 'Chicken', icon: 'flame' },
  { id: 'lamb', label: 'Lamb', icon: 'flame' },
  { id: 'seafood', label: 'Seafood', icon: 'waves' },
  { id: 'spicy', label: 'Spicy', icon: 'flame' },
]

export function MenuExperience({ heading = true }) {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [filters, setFilters] = useState([])
  const [viewing, setViewing] = useState(null)

  // deep link: /menu?dish=id → open quick view
  useEffect(() => {
    const id = params.get('dish')
    if (id) {
      const dish = getDish(id)
      if (dish) setViewing(dish)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openDish = (dish) => {
    setViewing(dish)
    setParams({ dish: dish.id }, { replace: true })
  }
  const closeDish = () => {
    setViewing(null)
    setParams({}, { replace: true })
  }

  const cats = activeCategories()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return dishes.filter((d) => {
      if (!d.available) return false
      if (category !== 'all' && d.category !== category) return false
      if (filters.includes('vegetarian') && d.dietary !== 'vegetarian') return false
      if (filters.includes('chicken') && d.dietary !== 'chicken') return false
      if (filters.includes('lamb') && d.dietary !== 'lamb') return false
      if (filters.includes('seafood') && d.dietary !== 'seafood') return false
      if (filters.includes('spicy') && !(d.spiceLevel >= 2)) return false
      if (q) {
        const hay = `${d.name} ${d.description} ${(d.tags || []).join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [query, category, filters])

  const toggleFilter = (id) =>
    setFilters((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  const hasActiveFilters = filters.length > 0 || category !== 'all' || query

  return (
    <Section id="menu" className="py-16 md:py-24" label="The menu" containerClassName="!max-w-7xl">
      {heading && (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow flex items-center gap-3">
            <span className="inline-block h-[3px] w-7 rounded-full bg-brass" aria-hidden="true" />
            The Menu
            <span className="inline-block h-[3px] w-7 rounded-full bg-brass" aria-hidden="true" />
          </span>
          <h2 className="max-w-2xl text-3xl text-espresso sm:text-4xl lg:text-[2.9rem]">
            Every plate, <em className="text-clay-600">on the table</em>
          </h2>
          <p className="max-w-xl text-[0.98rem] text-espresso-soft">
            Search, filter and save your way through the menu. Prices are confirmed by the team —
            ask us anything on WhatsApp.
          </p>
        </div>
      )}

      {/* search + filters */}
      <div className="sticky top-16 z-30 -mx-5 mt-8 border-b border-dune/50 bg-ivory/95 px-5 pb-4 pt-4 backdrop-blur-md sm:-mx-8 sm:px-8 md:top-[72px]">
        <div className="flex flex-col gap-3">
          <div className="clay-inset flex items-center gap-3 rounded-full px-5 py-3.5">
            <Icon name="search" size={18} className="shrink-0 text-espresso-soft" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes — try “smoky”, “knafeh”, “lamb”…"
              aria-label="Search the menu"
              className="w-full bg-transparent text-[0.92rem] font-semibold text-espresso outline-none placeholder:font-medium placeholder:text-espresso-soft/50"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="shrink-0 text-espresso-soft hover:text-clay-700"
              >
                <Icon name="close" size={15} />
              </button>
            )}
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto" role="group" aria-label="Menu filters">
            {PREF_FILTERS.map((f) => {
              const on = filters.includes(f.id)
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleFilter(f.id)}
                  className={`tactile flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-bold ${
                    on
                      ? 'bg-clay-600 text-ivory shadow-clay-sm'
                      : 'clay-inset text-espresso-soft hover:text-espresso'
                  }`}
                >
                  <Icon name={f.icon} size={13} />
                  {f.label}
                </button>
              )
            })}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setFilters([])
                  setCategory('all')
                  setQuery('')
                }}
                className="ml-auto shrink-0 text-[0.75rem] font-bold text-clay-700 underline underline-offset-4"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* category bar */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
        {cats.map((c) => {
          const on = category === c.id
          const count = c.id === 'all' ? dishes.filter((d) => d.available).length : dishes.filter((d) => d.available && d.category === c.id).length
          if (count === 0 && c.id !== 'all') return null
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setCategory(c.id)}
              className={`tactile flex shrink-0 items-center gap-2 rounded-full px-4.5 py-2.5 text-[0.8rem] font-bold ${
                on
                  ? 'bg-espresso text-ivory shadow-clay-sm'
                  : 'clay-inset text-espresso-soft hover:text-espresso'
              }`}
            >
              {c.label}
              <span className={`rounded-full px-1.5 text-[0.62rem] font-extrabold ${on ? 'bg-ivory/20 text-ivory' : 'bg-espresso/10 text-espresso-soft'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* results */}
      <div aria-live="polite" className="mt-4 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-espresso-soft/70">
        Showing {filtered.length} dish{filtered.length === 1 ? '' : 'es'}
      </div>

      {filtered.length === 0 ? (
        <div className="clay-card mt-6 flex flex-col items-center gap-4 rounded-[28px] bg-cream/70 p-10 text-center">
          <Icon name="search" size={30} className="text-clay-500" />
          <p className="font-display text-2xl text-espresso">Nothing on the table for that</p>
          <p className="max-w-sm text-sm text-espresso-soft">
            Try a broader search — “smoky”, “sweet”, “sharing” — or reset the filters below.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilters([])
              setCategory('all')
              setQuery('')
            }}
            className="tactile rounded-full bg-clay-500 px-5 py-2.5 text-sm font-bold text-ivory hover:bg-clay-600"
          >
            Reset the table
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dish) => (
            <DishCard key={dish.id} dish={dish} onView={openDish} />
          ))}
        </div>
      )}

      {/* note */}
      <p className="mt-10 text-center text-[0.8rem] text-espresso-soft/70">
        Menu highlights curated from the current {restaurant.name} menu — the full printed menu is
        available at the restaurant.
      </p>

      <DishQuickView dish={viewing} onClose={closeDish} onSelect={openDish} />
    </Section>
  )
}
