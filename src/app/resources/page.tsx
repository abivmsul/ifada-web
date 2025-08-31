// src/app/resources/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import ResourceCard from '@/components/ResourceCard'
import Link from 'next/link'
import Button from '@/components/Button'

export const metadata = {
  title: 'Resources — Ifada',
  description: 'Guides, sermon recordings and useful resources.',
}

const MOCK_RESOURCES = [
  { title: 'Ramadan Guide', imageUrl: '/images/ramadan.jpg', href: '/resources/ramadan-guide-2025', summary: 'Timetables, duas & tips.' },
  { title: 'Sermon Recording', imageUrl: '/images/sermon.jpg', href: '/resources/sermon-may-2025', summary: 'Audio & notes.' },
  { title: 'Volunteer Handbook', imageUrl: '/images/volunteer.jpg', href: '/resources/volunteer', summary: 'How to get involved.' },
]

export default function ResourcesPage() {
  return (
    <main>
      <Hero
        title="Resources"
        subtitle="Guides, audio, and practical help for our community."
        imageUrl="https://ifadaislamic.org/images/showcase-img/resources-hero.jpg"
        ctaText="See All Resources"
        ctaLink="/resources"
      />

      <SectionWrapper id="resourcesList" className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Latest Resources</h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_RESOURCES.map((r) => (
              <ResourceCard
                key={r.title}
                title={r.title}
                link={r.href}
                description={r.summary}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/resources"><Button>See All Resources</Button></Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
