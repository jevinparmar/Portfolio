import { Hero } from '../components/sections/Hero'
import { IntroAbout } from '../components/sections/IntroAbout'
import { SelectedWork } from '../components/sections/SelectedWork'
import { WorkHorizontal } from '../components/sections/WorkHorizontal'
import { TechStack } from '../components/sections/TechStack'
import { Experience } from '../components/sections/Experience'
import { Footer } from '../components/layout/Footer'

export function HomePage() {
  return (
    <main className="w-full relative">
      <Hero />
      <IntroAbout />
      <SelectedWork />
      <WorkHorizontal />
      <TechStack />
      <Experience />
      <Footer />
    </main>
  )
}
