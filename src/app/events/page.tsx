// src/app/events/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import EventCard from '@/components/EventCard'
import Link from 'next/link'
import Button from '@/components/Button'

export const metadata = {
  title: 'Events — Ifada',
  description: 'Upcoming events and community gatherings.',
}

const MOCK_EVENTS = [
  { id: 'summer-lecture', title: 'Summer Lecture', date: '2025-08-10T18:00:00Z', location: 'Main Hall', imageUrl: '/images/lecture.jpg', excerpt: 'Tawhid in daily life.' },
  { id: 'charity-bazaar', title: 'Charity Bazaar', date: '2025-09-05T10:00:00Z', location: 'Community Lawn', imageUrl: '/images/bazaar.jpg', excerpt: 'Food & family fun.' },
]

export default function EventsPage() {
  return (
    <main>
      <Hero
        title="Events"
        subtitle="Join our upcoming lectures, bazaars and community days."
        imageUrl="https://ifadaislamic.org/images/showcase-img/events-hero.jpg"
        ctaText="Subscribe"
        ctaLink="/contact"
      />

      <SectionWrapper id="eventsList" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Upcoming Events</h3>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_EVENTS.map((e) => (
              <EventCard
                key={e.id}
                title={e.title}
                date={e.date}
                description={e.excerpt}
                className=""
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/events/archive"><Button>View Past & Future Events</Button></Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
