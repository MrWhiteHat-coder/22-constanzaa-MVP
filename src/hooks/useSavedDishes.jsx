import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getDish } from '../data/menu'

const KEY = 'constanzaa.saved.v1'

const SavedContext = createContext(null)

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    const ids = raw ? JSON.parse(raw) : []
    return Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function SavedProvider({ children }) {
  const [ids, setIds] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* storage unavailable (private mode) — session-only save */
    }
  }, [ids])

  const has = useCallback((id) => ids.includes(id), [ids])

  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), [])
  const clear = useCallback(() => setIds([]), [])

  const saved = useMemo(() => ids.map(getDish).filter(Boolean), [ids])

  const value = useMemo(
    () => ({ ids, saved, count: saved.length, has, toggle, remove, clear }),
    [ids, saved, has, toggle, remove, clear]
  )

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
}

export function useSaved() {
  const ctx = useContext(SavedContext)
  if (!ctx) throw new Error('useSaved must be used inside <SavedProvider>')
  return ctx
}
