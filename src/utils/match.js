// ============================================================
// TASTE COMPASS — deterministic dish matching
// No external AI. Pure scoring over the structured menu dataset.
// Scoring: craving +4, mood +3, dietary/pref +5.
// Safety rule: a chosen preference never surfaces mismatched dishes
// (e.g. lamb for a vegetarian). Dishes with unknown dietary (null) are
// only used as fillers when strictly-matching results are too few —
// and never for "vegetarian".
// ============================================================

const PREFS = ['vegetarian', 'chicken', 'lamb', 'seafood']

export function runCompass({ craving, mood, pref }, allDishes) {
  const pool = allDishes.filter((d) => d.available !== false)

  const strict = pref && pref !== 'any'
  const strictVeg = strict && pref === 'vegetarian'

  const scored = pool
    .map((d) => {
      let score = 0
      if (craving && d.tags?.includes(craving)) score += 4
      if (mood && d.mood?.includes(mood)) score += 3
      if (craving === 'spiced' && (d.spiceLevel ?? 0) > 0) score += 1

      if (strict) {
        if (d.dietary === pref) score += 5
        else if (d.dietary === null && !strictVeg) score -= 1 // unknown: allowed, de-prioritised
        else if (d.dietary === null && strictVeg) score = -100 // exclude unknowns for vegetarians
        else score = -100 // hard mismatch — never surface
      }
      return { dish: d, score }
    })
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.dish.signature ? 1 : 0) - (a.dish.signature ? 1 : 0) ||
        a.dish.id.localeCompare(b.dish.id)
    )

  let matches = scored.slice(0, 6).map((s) => s.dish)

  // Fill toward at least 3 with unknown-dietary dishes (never for vegetarian)
  if (strict && !strictVeg && matches.length < 3) {
    const fillers = pool
      .filter((d) => d.dietary === null && !matches.includes(d))
      .sort((a, b) => (b.signature ? 1 : 0) - (a.signature ? 1 : 0))
      .slice(0, 3 - matches.length)
    matches = [...matches, ...fillers]
  }

  // Graceful fallback: never return an empty table
  if (matches.length === 0) {
    matches = pool
      .filter((d) => (strict ? d.dietary === pref || (d.dietary === null && !strictVeg) : true))
      .sort((a, b) => (b.signature ? 1 : 0) - (a.signature ? 1 : 0))
      .slice(0, 3)
  }

  return matches
}
