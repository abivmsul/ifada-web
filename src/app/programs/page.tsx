// src/app/programs/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import Card from '@/components/Card'
import Link from 'next/link'
import Button from '@/components/Button'

export const metadata = {
  title: 'Programs — Ifada',
  description: 'Explore our education, counseling and outreach programs.',
}

const MOCK_PROGRAMS = [
  { title: 'Youth Classes', imageUrl: '/images/youth.jpg', href: '/programs/youth-classes', excerpt: 'Quran, tajweed and character.' },
  { title: 'Community Outreach', imageUrl: '/images/outreach.jpg', href: '/programs/community-outreach', excerpt: 'Food drives & interfaith events.' },
  { title: 'Counseling Services', imageUrl: '/images/counsel.jpg', href: '/programs/counseling-services', excerpt: 'Family & youth support.' },
]

export default function ProgramsPage() {
  return (
    <main>
      <Hero
        title="Our Programs"
        subtitle="Education, outreach, and support for every stage of life."
        imageUrl="https://ifadaislamic.org/images/showcase-img/programs-hero.jpg"
        ctaText="Join a Program"
        ctaLink="/contact"
      />

      <SectionWrapper id="programsList" className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Featured Programs</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_PROGRAMS.map((p) => (
              <Card key={p.title}>
                <div className="flex flex-col h-full">
                  <img src={p.imageUrl} alt={p.title} className="h-44 w-full object-cover rounded-md mb-4" />
                  <h4 className="text-lg font-semibold">{p.title}</h4>
                  <p className="text-gray-700 flex-1">{p.excerpt}</p>
                  <div className="mt-4">
                    <Link href={p.href}><Button as="a">Explore</Button></Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
