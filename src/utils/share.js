import { dishUrl } from './links'
import { restaurant } from '../data/restaurant'

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  }
}

async function nativeShare(data) {
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share(data)
      return true
    } catch (err) {
      if (err?.name === 'AbortError') return true // user closed the sheet — not an error
    }
  }
  return false
}

export async function shareDish(dish) {
  const url = dishUrl(dish.id)
  const text = `${dish.name} — at ${restaurant.name}, Chennai`
  if (await nativeShare({ title: restaurant.name, text, url })) return { ok: true, copied: false }
  const copied = await copy(`${text}\n${url}`)
  return { ok: copied, copied: true }
}

export async function sharePlace() {
  const url = `${restaurant.siteUrl}/`
  const text = `${restaurant.name} — Mediterranean & Middle Eastern dining in ${restaurant.locality}`
  if (await nativeShare({ title: restaurant.name, text, url })) return { ok: true, copied: false }
  const copied = await copy(`${text}\n${url}`)
  return { ok: copied, copied: true }
}
