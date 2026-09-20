import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route-aware scrolling: top on path change, smooth to element on #hash change.
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // wait a frame for the target to mount
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        // section may be further down a freshly-loaded page
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 350)
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' })
    }
  }, [pathname, hash])

  return null
}
