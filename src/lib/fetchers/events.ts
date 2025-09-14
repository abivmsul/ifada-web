// src/lib/fetchers/events.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { eventsListQuery, eventsCountQuery, EVENT_BY_SLUG, EVENTS_FEATURED, EVENTS_LIST } from '@/lib/queries/events'
import type { PortableTextBlock } from '@portabletext/types'

export type PortableText = PortableTextBlock[]

// Define proper type for Sanity image
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  [key: string]: unknown
}

// Sanity's raw event shape
interface SanityEvent {
  _id: string
  title: string
  slug?: string
  start?: string
  end?: string
  coverImage?: SanityImage
  excerpt?: string
  featured?: boolean
  location?: {
    name?: string
    address?: string
    [key: string]: unknown
  }
  isOnline?: boolean
  registrationUrl?: string
  order?: number
  speakers?: Array<{
    _id: string
    name: string
    role?: string
    [key: string]: unknown
  }>
  // Portable Text body from Sanity (optional)
  body?: PortableText
  [key: string]: unknown
}

// Exported mapped shape used throughout the app — uses `undefined` for optional/missing values
export type MappedEvent = {
  _id: string
  title: string
  slug?: string
  start?: string // string | undefined
  end?: string
  startLabel?: string
  endLabel?: string
  coverImageUrl?: string
  excerpt?: string
  featured?: boolean
  location?: {
    name?: string
    address?: string
    [key: string]: unknown
  }
  isOnline?: boolean
  registrationUrl?: string
  order?: number
  speakers?: Array<{
    _id: string
    name: string
    role?: string
  }>
  // Strongly typed Portable Text body (optional)
  body?: PortableText
}

function mapImageAndLabels(p: SanityEvent): MappedEvent {
  const mapped: MappedEvent = {
    _id: p._id,
    title: p.title,
    slug: p.slug,
    start: p.start || undefined,
    end: p.end || undefined,
    excerpt: p.excerpt || undefined,
    featured: p.featured ?? false,
    location: p.location,
    isOnline: p.isOnline ?? false,
    registrationUrl: p.registrationUrl || undefined,
    order: p.order ?? undefined,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : undefined,
    body: p.body || undefined,
  }

  // Deterministic date formatting
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
    } catch {
      mapped.startLabel = mapped.start
    }
  } else {
    mapped.startLabel = undefined
  }

  if (mapped.end) {
    try {
      mapped.endLabel = formatter.format(new Date(mapped.end))
    } catch {
      mapped.endLabel = mapped.end
    }
  } else {
    mapped.endLabel = undefined
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
  const params: Record<string, string> = {}

  if (filterType === 'upcoming') predicate += ' && start >= now()'
  else if (filterType === 'ongoing') predicate += ' && start <= now() && (end > now() || !defined(end))'
  else if (filterType === 'past') predicate += ' && (defined(end) && end < now())'

  if (typeof featured === 'boolean') predicate += ` && featured == ${featured ? 'true' : 'false'}`

  if (search && search.trim().length) {
    predicate += ' && (title match $search || excerpt match $search)'
    params.search = `*${search}*`
  }

  const listQuery = eventsListQuery(offset, size, predicate)
  const countQuery = eventsCountQuery(predicate)

  const [itemsRaw, total] = await Promise.all([
    sanityServerClient.fetch<SanityEvent[]>(listQuery, params),
    sanityServerClient.fetch<number>(countQuery, params),
  ])

  const items = (itemsRaw || []).map(mapImageAndLabels)
  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

export async function getEventBySlug(slug: string): Promise<MappedEvent | null> {
  const p = await sanityServerClient.fetch<SanityEvent>(EVENT_BY_SLUG, { slug })
  if (!p) return null

  const mapped: MappedEvent = {
    _id: p._id,
    title: p.title,
    slug: p.slug,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : undefined,
    start: p.start || undefined,
    end: p.end || undefined,
    excerpt: p.excerpt || undefined,
    featured: p.featured ?? false,
    registrationUrl: p.registrationUrl || undefined,
    order: p.order ?? undefined,
    body: p.body || undefined,
    location: p.location,
    isOnline: p.isOnline ?? false,
    speakers: p.speakers ? p.speakers.map(s => ({ _id: s._id, name: s.name, role: s.role })) : undefined,
  }

  // Format labels for the detail page too
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  mapped.startLabel = mapped.start ? formatter.format(new Date(mapped.start)) : undefined
  mapped.endLabel = mapped.end ? formatter.format(new Date(mapped.end)) : undefined

  return mapped
}

export async function fetchFeaturedEvents(limit = 3): Promise<EventItem[]> {
  try {
    // Try featured events first
    let raw: SanityEvent[] | null = await sanityServerClient.fetch<SanityEvent[]>(EVENTS_FEATURED)

    // Fallback to full list if no featured events found
    if (!raw || raw.length === 0) {
      raw = await sanityServerClient.fetch<SanityEvent[]>(EVENTS_LIST)
    }

    const mapped = (raw || []).map((e: SanityEvent) => {
      const imageUrl = e.coverImage ? urlFor(e.coverImage).width(1400).auto('format').url() : undefined

      return {
        _id: e._id,
        title: e.title,
        slug: e.slug,
        start: e.start || undefined,
        end: e.end || undefined,
        location: e.location || undefined,
        isOnline: e.isOnline ?? false,
        registrationUrl: e.registrationUrl || undefined,
        excerpt: e.excerpt || undefined,
        coverImage: e.coverImage || undefined,
        imageUrl,
        featured: e.featured ?? false,
        order: e.order ?? undefined,
      } as EventItem
    })

    return mapped.slice(0, limit)
  } catch (err) {
    console.error('fetchFeaturedEvents error', err)
    return []
  }
}

export type EventItem = {
  _id: string
  title: string
  slug?: string
  start?: string
  end?: string
  location?: {
    name?: string
    address?: string
    [key: string]: unknown
  } | undefined
  isOnline?: boolean
  registrationUrl?: string
  excerpt?: string
  coverImage?: SanityImage | undefined
  imageUrl?: string
  featured?: boolean
  order?: number
}

export async function fetchEventsList(): Promise<EventItem[]> {
  try {
    const raw = await sanityServerClient.fetch<SanityEvent[]>(EVENTS_LIST)
    const mapped = (raw || []).map((e: SanityEvent) => {
      const imageUrl = e.coverImage ? urlFor(e.coverImage).width(1400).auto('format').url() : undefined

      return {
        _id: e._id,
        title: e.title,
        slug: e.slug,
        start: e.start || undefined,
        end: e.end || undefined,
        location: e.location || undefined,
        isOnline: e.isOnline ?? false,
        registrationUrl: e.registrationUrl || undefined,
        excerpt: e.excerpt || undefined,
        coverImage: e.coverImage || undefined,
        imageUrl,
        featured: e.featured ?? false,
        order: e.order ?? undefined,
      } as EventItem
    })

    return mapped
  } catch (err) {
    console.error('fetchEventsList error', err)
    return []
  }
}
