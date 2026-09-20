import { useEffect } from 'react'
import { Hero } from '../sections/Hero'
import { TableOf22 } from '../sections/TableOf22'
import { SignatureDishes } from '../sections/SignatureDishes'
import { TasteCompass } from '../sections/TasteCompass'
import { MenuExperience } from '../sections/MenuExperience'
import { TheSpace } from '../sections/TheSpace'
import { SeenAt22C } from '../sections/SeenAt22C'
import { BuildYourTable } from '../sections/BuildYourTable'
import { VisitSection } from '../sections/VisitSection'

export function HomePage() {
  useEffect(() => {
    document.title =
      '22 Constanzaa — Mediterranean & Middle Eastern Dining in Alwarpet, Chennai'
  }, [])

  return (
    <main>
      <Hero />
      <TableOf22 />
      <SignatureDishes />
      <TasteCompass />
      <MenuExperience />
      <TheSpace />
      <SeenAt22C />
      <BuildYourTable />
      <VisitSection />
    </main>
  )
}
