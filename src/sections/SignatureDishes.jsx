import { useState } from 'react'
import { Section, SectionHeader } from '../components/Section'
import { DishCard } from '../components/DishCard'
import { DishQuickView } from '../components/DishQuickView'
import { signatureDishes } from '../data/menu'
import { ButtonLink } from '../components/Button'

export function SignatureDishes() {
  const [viewing, setViewing] = useState(null)
  const dishes = signatureDishes().slice(0, 6)

  return (
    <Section id="signatures" className="py-20 md:py-28" label="Signature dishes">
      <SectionHeader
        id="signatures-heading"
        eyebrow="22C Picks"
        title={
          <>
            Signatures of <em className="text-clay-600">the table</em>
          </>
        }
        copy="A first taste of 22C — the plates we’d point you to first. Save the ones you’re curious about and build your own little dish passport."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onView={setViewing} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <ButtonLink to="/menu" variant="outline" size="md" icon="arrow-right">
          See the full menu
        </ButtonLink>
      </div>

      <DishQuickView dish={viewing} onClose={() => setViewing(null)} onSelect={setViewing} />
    </Section>
  )
}
