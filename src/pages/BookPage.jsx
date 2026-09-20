import { useEffect } from 'react'
import { BuildYourTable } from '../sections/BuildYourTable'

export function BookPage() {
  useEffect(() => {
    document.title = 'Book a Table — 22 Constanzaa, Alwarpet Chennai'
  }, [])

  return (
    <main className="pt-24 md:pt-28">
      <BuildYourTable />
    </main>
  )
}
