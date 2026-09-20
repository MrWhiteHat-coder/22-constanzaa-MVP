import { useEffect } from 'react'
import { MenuExperience } from '../sections/MenuExperience'
import { Section } from '../components/Section'
import { ButtonLink } from '../components/Button'

export function MenuPage() {
  useEffect(() => {
    document.title = 'Menu — 22 Constanzaa | Mediterranean & Middle Eastern, Chennai'
  }, [])

  return (
    <main className="pt-24 md:pt-28">
      <MenuExperience />
      <Section className="pb-20">
        <div className="clay-card flex flex-col items-center justify-between gap-4 rounded-[28px] bg-cream/70 px-8 py-8 text-center sm:flex-row sm:text-left">
          <p className="font-display text-2xl text-espresso">
            Found your table? <em className="text-clay-600">Now set it.</em>
          </p>
          <ButtonLink to="/book" variant="primary" size="md" icon="arrow-right">
            Book a Table
          </ButtonLink>
        </div>
      </Section>
    </main>
  )
}
