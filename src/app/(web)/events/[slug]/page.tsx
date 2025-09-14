
// File: src/app/(web)/events/[slug]/page.tsx
import { getEventBySlug, MappedEvent } from '@/lib/fetchers/events'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SectionWrapper from '@/components/SectionWrapper'
import PortableTextRenderer from '@/components/PortableTextRenderer'

export const revalidate = 60

// local Props shape used internally after awaiting/casting
interface Props {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function EventDetail(props: unknown) {
  // await props and cast to our Props shape to be safe with Next's routing internals
  const { params } = (await props) as Props
  const { slug } = params

  const event = await getEventBySlug(slug)
  if (!event) return notFound()

  const startLabel = event.start ? new Date(event.start as string).toLocaleString() : ''
  const endLabel = event.end ? new Date(event.end as string).toLocaleString() : ''

  // helper to ensure href receives string | undefined (not null)
  const safeHref = (u: string | null | undefined) => u ?? undefined

  // Narrow body to the official PortableTextBlock[] type for the renderer
  const body = event.body as PortableTextBlock[] | undefined

  return (
    <main>
      <SectionWrapper id="event-detail" className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          {event.coverImageUrl && (
            <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
              <Image src={event.coverImageUrl as string} alt={event.title as string} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="text-sm text-secondary mb-2">
            {event.isOnline ? (
              <a href={safeHref(event.registrationUrl as string | null | undefined)} target="_blank" rel="noreferrer">
                Online event
              </a>
            ) : (
              <>
                {event.location?.name ?? ''} • {startLabel}
                {event.end ? ` — ${endLabel}` : ''}
              </>
            )}
          </div>

          {event.excerpt && <p className="text-gray-700 mb-6">{event.excerpt}</p>}

          {/* Render PortableText only when body exists and is typed */}
          {body && (
            <div className="prose max-w-none">
              <PortableTextRenderer value={body} />
            </div>
          )}

          {/* Registration CTA */}
          <div className="mt-8">
            {event.registrationUrl ? (
              <a
                href={safeHref(event.registrationUrl as string | null | undefined)}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-secondary text-white px-4 py-2 rounded"
              >
                Register / More info
              </a>
            ) : (
              <span className="text-sm text-gray-500">.</span>
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
