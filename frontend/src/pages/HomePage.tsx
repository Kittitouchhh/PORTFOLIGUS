import { Hero } from '@/features/hero'
import { Intro } from '@/features/intro'
import { Stats } from '@/features/stats'
import { Gallery } from '@/features/gallery'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Stats />
      <Gallery />
    </>
  )
}
