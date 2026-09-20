import { useEffect } from 'react'
import { ButtonLink } from '../components/Button'
import { Logo } from '../components/art/Logo'
import { Stamp } from '../components/art/Stamp'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found — 22 Constanzaa'
  }, [])

  return (
    <main className="relative grid min-h-[80vh] place-items-center overflow-hidden px-6 pt-24">
      <Stamp text="WRONG TABLE" sub="404" color="#C4653C" rotate={-10} className="absolute right-8 top-24 w-28 opacity-60" />
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <Logo className="h-14 w-auto" />
        <p className="eyebrow">404 — Page not found</p>
        <h1 className="font-display text-5xl text-espresso">
          This table <em className="text-clay-600">isn’t set.</em>
        </h1>
        <p className="text-[0.95rem] leading-relaxed text-espresso-soft">
          The page you’re looking for has wandered off-menu. Let’s walk you back to the dining room.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" variant="primary" size="md" icon="arrow-right">
            Back to the table
          </ButtonLink>
          <ButtonLink to="/menu" variant="secondary" size="md">
            See the menu
          </ButtonLink>
        </div>
      </div>
    </main>
  )
}
