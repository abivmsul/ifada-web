// src/app/events/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import EventsListClient from '@/components/EventsListClient'
import { fetchEventsServer } from '@/lib/fetchers/events'

export const revalidate = 60

export default async function EventsPage() {
  const initial = await fetchEventsServer({ page: 1, pageSize: 9, filterType: 'upcoming' })
  return (
    <main>
      <SectionWrapper id="events" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Events</h1>
            <p className="text-sm text-secondary">Upcoming lectures and activities.</p>
          </div>
<svg viewBox="0 0 1200 30" className="w-full h-auto" preserveAspectRatio="none">
  <path d="M0,8 L600,0 L1200,8 L600,16 Z" fill="rgba(255, 200, 0, 0.95)" />
</svg>

          <EventsListClient initialData={initial} />
        </div>
      </SectionWrapper>
    </main>
  )
}
