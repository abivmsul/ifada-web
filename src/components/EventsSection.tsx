// src/components/EventsSection.tsx
'use client'

import Link from 'next/link'
import EventCard from './EventCard'
import { EventItem } from '@/lib/fetchers/events'

export default function EventsSection({ events }: { events: EventItem[] }) {
  const displayed = (events || []).slice(0, 3)

  if (!displayed.length) {
    return <div className="max-w-4xl mx-auto py-6 text-center text-gray-600">No upcoming events yet.</div>
  }

  return (
    
     <div className="max-w-6xl mx-auto px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((ev) => (
            <EventCard
            key={ev._id}
            title={ev.title}
            location={ev.location}
            excerpt={ev.excerpt ?? undefined}
            imageUrl={ev.imageUrl ?? undefined}
            href={ev.slug ? `/events/${ev.slug}` : `/events/${ev._id}`}
          />
        ))}
      </div>
       <div className="mt-6 text-center">
        <Link
            href="/events"
            className="inline-block px-6 py-2 border border-primary text-primary rounded-lg 
                      transition-all duration-300 ease-in-out 
                      hover:bg-primary hover:text-primary hover:shadow-lg hover:scale-[1.02]"
          >
            View all Events
        </Link>

      </div>
    </div>
  )
}
