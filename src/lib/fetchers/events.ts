// src/lib/fetchers/events.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { eventsListQuery, eventsCountQuery, EVENT_BY_SLUG ,EVENTS_FEATURED, EVENTS_LIST} from '@/lib/queries/events'


function mapImageAndLabels(p: any) {
  const mapped = p.coverImage
    ? { ...p, coverImageUrl: urlFor(p.coverImage).width(1200).auto('format').url() }
    : { ...p, coverImageUrl: null }
    
  // Deterministic date formatting: produce ISO and a human label using a fixed locale + options
  // This avoids server/client mismatch. We choose en-US but you can change.
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  if (mapped.start) {
    try {
      mapped.startLabel = formatter.format(new Date(mapped.start))
    } catch (e) {
      mapped.startLabel = mapped.start
    }
  } else {
    mapped.startLabel = null
  }

  if (mapped.end) {
    try {
      mapped.endLabel = formatter.format(new Date(mapped.end))
    } catch (e) {
      mapped.endLabel = mapped.end
    }
  } else {
    mapped.endLabel = null
  }

  return mapped
}

export async function fetchEventsServer({
  page = 1,
  pageSize = 9,
  search,
  featured,
  filterType,
}: {
  page?: number
  pageSize?: number
  search?: string
  featured?: boolean
  filterType?: 'upcoming' | 'ongoing' | 'past'
}) {
  const pageNum = Math.max(1, Number(page || 1))
  const size = Math.max(1, Number(pageSize || 9))
  const offset = (pageNum - 1) * size

  let predicate = ''
  const params: Record<string, any> = {}

  if (filterType === 'upcoming') predicate += ` && start >= now()`
  else if (filterType === 'ongoing') predicate += ` && start <= now() && (end > now() || !defined(end))`
  else if (filterType === 'past') predicate += ` && (defined(end) && end < now())`

  if (typeof featured === 'boolean') predicate += ` && featured == ${featured ? 'true' : 'false'}`

  if (search && search.trim().length) {
    predicate += ` && (title match $search || excerpt match $search)`
    params.search = `*${search}*`
  }

  const listQuery = eventsListQuery(offset, size, predicate)
  const countQuery = eventsCountQuery(predicate)

  const [itemsRaw, total] = await Promise.all([
    sanityServerClient.fetch(listQuery, params),
    sanityServerClient.fetch(countQuery, params),
  ])

  const items = (itemsRaw || []).map(mapImageAndLabels)
  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

export async function getEventBySlug(slug: string) {
  const p = await sanityServerClient.fetch(EVENT_BY_SLUG, { slug })
  if (!p) return null
  const mapped = {
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : null,
  }

  // Format labels for the detail page too
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
  mapped.startLabel = mapped.start ? formatter.format(new Date(mapped.start)) : null
  mapped.endLabel = mapped.end ? formatter.format(new Date(mapped.end)) : null

  // Map speaker references to simple shape if present
  if (mapped.speakers && Array.isArray(mapped.speakers)) {
    mapped.speakers = mapped.speakers.map((s: any) => ({ _id: s._id, name: s.name, role: s.role }))
  }

  return mapped
}

function fmtDateLabel(dateStr?: string | null) {
  if (!dateStr) return null
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

export async function fetchFeaturedEvents(limit = 3): Promise<EventItem[]> {
  try {
    // Try featured events first
    let raw: any[] | null = await sanityServerClient.fetch(EVENTS_FEATURED)

    // Fallback to full list if no featured events found
    if (!raw || raw.length === 0) {
      raw = await sanityServerClient.fetch(EVENTS_LIST)
    }

    const mapped = (raw || []).map((e: any) => {
      const imageUrl = e?.imageUrl ?? (e?.coverImage ? urlFor(e.coverImage).width(1400).auto('format').url() : null)

      return {
        _id: e._id,
        title: e.title,
        slug: e.slug,
        start: e.start ?? null,
        end: e.end ?? null,
        location: e.location ?? null,
        isOnline: e.isOnline ?? false,
        registrationUrl: e.registrationUrl ?? null,
        excerpt: e.excerpt ?? null,
        coverImage: e.coverImage ?? null,
        imageUrl,
        featured: e.featured ?? false,
        order: e.order ?? null,
      } as EventItem
    })

    return mapped.slice(0, limit)
  } catch (err) {
    console.error('fetchFeaturedEvents error', err)
    return []
  }
}

export type EventItem = {
  date: any
  _id: string
  title: string
  slug?: string
  start?: string | null
  end?: string | null
  location?: string | null
  isOnline?: boolean
  registrationUrl?: string | null
  excerpt?: string | null
  coverImage?: any
  imageUrl?: string | null
  featured?: boolean
  order?: number | null
}
export async function fetchEventsList(): Promise<EventItem[]> {
  try {
    const raw = await sanityServerClient.fetch(EVENTS_LIST)
    const mapped = (raw || []).map((e: any) => {
      const imageUrl = e?.imageUrl ?? (e?.coverImage ? urlFor(e.coverImage).width(1400).auto('format').url() : null)
      return {
        _id: e._id,
        title: e.title,
        slug: e.slug,
        start: e.start ?? null,
        end: e.end ?? null,
        location: e.location ?? null,
        isOnline: e.isOnline ?? false,
        registrationUrl: e.registrationUrl ?? null,
        excerpt: e.excerpt ?? null,
        coverImage: e.coverImage ?? null,
        imageUrl,
        featured: e.featured ?? false,
        order: e.order ?? null,
      } as EventItem
    })
    return mapped
  } catch (err) {
    console.error('fetchEventsList error', err)
    return []
  }
}