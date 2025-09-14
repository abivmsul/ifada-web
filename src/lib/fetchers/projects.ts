// src/lib/fetchers/projects.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import {
  projectsListQuery,
  projectsCountQuery,
  PROJECT_BY_SLUG,
  PROJECTS_FEATURED,
  PROJECTS_LIST,
} from '@/lib/queries/projects'
import type { PortableTextBlock } from '@portabletext/types'

export type PortableText = PortableTextBlock[]

/* ---------- helpers ---------- */
function normalizeSlug(raw: unknown, fallbackId?: string): string | undefined {
  let val: unknown = undefined
  if (typeof raw === 'string') val = raw
  else if (raw && typeof raw === 'object' && 'current' in (raw as Record<string, unknown>)) {
    // cast to an object shape that may contain `current` without using `any`
    val = (raw as { current?: unknown }).current
  } else if (fallbackId) val = fallbackId

  if (val === undefined || val === null) return undefined
  try {
    const s = String(val).trim()
    // remove leading/trailing slashes
    return s.replace(/^\/+|\/+$/g, '') || undefined
  } catch {
    return undefined
  }
}

function formatDateLabel(date?: string | undefined): string | undefined {
  if (!date) return undefined
  try {
    const f = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    return f.format(new Date(date))
  } catch {
    return date
  }
}

/* ---------- Sanity raw shapes ---------- */
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  [key: string]: unknown
}

interface SanityProject {
  _id: string
  title: string
  slug?: { current?: string } | string
  status?: string
  startDate?: string
  endDate?: string
  excerpt?: string
  coverImage?: SanityImage
  coverImageUrl?: string
  featured?: boolean
  order?: number
  body?: PortableText
  [key: string]: unknown
}

/* ---------- Mapped shapes consumed by the app ---------- */
export type ProjectDTO = {
  _id: string
  title: string
  slug?: string
  status?: string
  startDate?: string
  endDate?: string
  startLabel?: string
  endLabel?: string
  excerpt?: string
  coverImageUrl?: string
  featured?: boolean
  order?: number
  body?: PortableText
}

export type ProjectItem = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: SanityImage
  coverImageUrl?: string
  featured?: boolean
  order?: number
}

/* ---------- mapping ---------- */
function mapProject(p: SanityProject): ProjectDTO {
  const slug = normalizeSlug(p.slug, p._id)

  const mapped: ProjectDTO = {
    _id: p._id,
    title: p.title,
    slug,
    status: p.status ?? undefined,
    startDate: p.startDate ?? undefined,
    endDate: p.endDate ?? undefined,
    excerpt: p.excerpt ?? undefined,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1400).auto('format').url() : p.coverImageUrl ?? undefined,
    featured: p.featured ?? false,
    order: p.order ?? undefined,
    body: p.body ?? undefined,
    startLabel: undefined,
    endLabel: undefined,
  }

  mapped.startLabel = formatDateLabel(mapped.startDate)
  mapped.endLabel = formatDateLabel(mapped.endDate)

  return mapped
}

/* ---------- fetchers ---------- */
export async function fetchProjectsServer({
  page = 1,
  pageSize = 9,
  search,
  featured,
  status,
}: {
  page?: number
  pageSize?: number
  search?: string
  featured?: boolean
  status?: 'upcoming' | 'ongoing' | 'completed' | undefined
}): Promise<{ items: ProjectDTO[]; total: number; page: number; pageSize: number }> {
  const pageNum = Math.max(1, Number(page || 1))
  const size = Math.max(1, Number(pageSize || 9))
  const offset = (pageNum - 1) * size

  let predicate = ''
  const params: Record<string, string> = {}

  if (typeof featured === 'boolean') predicate += ` && featured == ${featured ? 'true' : 'false'}`

  if (status) {
    predicate += ` && status == "${status}"`
  }

  if (search && search.trim().length) {
    predicate += ` && (title match $search || excerpt match $search)`
    params.search = `*${search}*`
  }

  const listQuery = projectsListQuery(offset, size, predicate)
  const countQuery = projectsCountQuery(predicate)

  const [itemsRaw, total] = await Promise.all([
    sanityServerClient.fetch<SanityProject[]>(listQuery, params),
    sanityServerClient.fetch<number>(countQuery, params),
  ])

  const items = (itemsRaw || []).map(mapProject)
  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

export async function getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
  // try slug lookup first (PROJECT_BY_SLUG should use slug.current == $slug)
  let p = await sanityServerClient.fetch<SanityProject | null>(PROJECT_BY_SLUG, { slug })
  if (!p) {
    // fallback: try lookup by _id (if caller accidentally passed an _id)
    try {
      p = await sanityServerClient.fetch<SanityProject | null>('*[_id == $id][0]', { id: slug })
    } catch {
      p = null
    }
  }
  if (!p) return null

  // normalize slug to string (prefer slug.current, fallback to _id)
  const normalizedSlug = normalizeSlug(p.slug, p._id)

  const mapped: ProjectDTO = {
    _id: p._id,
    title: p.title,
    slug: normalizedSlug,
    status: p.status ?? undefined,
    startDate: p.startDate ?? undefined,
    endDate: p.endDate ?? undefined,
    excerpt: p.excerpt ?? undefined,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : p.coverImageUrl ?? undefined,
    featured: p.featured ?? false,
    order: p.order ?? undefined,
    body: p.body ?? undefined,
    startLabel: formatDateLabel(p.startDate ?? undefined),
    endLabel: formatDateLabel(p.endDate ?? undefined),
  }

  return mapped
}

export async function fetchFeaturedProjects(limit = 3): Promise<ProjectItem[]> {
  try {
    let raw: SanityProject[] | null = await sanityServerClient.fetch<SanityProject[]>(PROJECTS_FEATURED)

    if (!raw || raw.length === 0) {
      raw = await sanityServerClient.fetch<SanityProject[]>(PROJECTS_LIST)
    }

    const mapped = (raw || []).map((p: SanityProject) => {
      const coverImageUrl = p.coverImageUrl ?? (p.coverImage ? urlFor(p.coverImage).width(1400).auto('format').url() : undefined)

      return {
        _id: p._id,
        title: p.title,
        slug: normalizeSlug(p.slug, p._id),
        excerpt: p.excerpt ?? undefined,
        coverImage: p.coverImage,
        coverImageUrl,
        featured: p.featured ?? false,
        order: p.order ?? undefined,
      } as ProjectItem
    })

    return mapped.slice(0, limit)
  } catch (err) {
    console.error('fetchFeaturedProjects error', err)
    return []
  }
}

export async function fetchProjectsList(): Promise<ProjectItem[]> {
  const raw = await sanityServerClient.fetch<SanityProject[]>(PROJECTS_LIST)
  return (raw || []).map((p: SanityProject) => {
    const coverImageUrl = p.coverImageUrl ?? (p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : undefined)
    return {
      _id: p._id,
      title: p.title,
      slug: normalizeSlug(p.slug, p._id),
      excerpt: p.excerpt ?? undefined,
      coverImage: p.coverImage,
      coverImageUrl,
      featured: p.featured ?? false,
      order: p.order ?? undefined,
    } as ProjectItem
  })
}
