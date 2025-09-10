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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Events</h1>
            <p className="text-sm text-gray-600">Find upcoming lectures, bazaars, and community activities.</p>
          </div>

          <EventsListClient initialData={initial} />
        </div>
      </SectionWrapper>
    </main>
  )
}
