// src/lib/fetchers/programs.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { programsListQuery, programsCountQuery } from '@/lib/queries/programs'
import type { PortableTextBlock } from '@portabletext/types'

// Define proper types for Sanity image
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  [key: string]: unknown
}

// Define proper types for raw data from Sanity
interface SanityProgram {
  _id: string
  title: string
  slug?: {
    current?: string
    [key: string]: unknown
  } | string
  excerpt?: string
  coverImage?: SanityImage
  featured?: boolean
  order?: number
  body?: PortableTextBlock[] | null // typed portable text
  [key: string]: unknown
}

export type ProgramDTO = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: SanityImage | null
  coverImageUrl?: string | null
  featured?: boolean
  order?: number
  body?: PortableTextBlock[] | null
}

export async function fetchProgramsServer({
  page = 1,
  pageSize = 9,
  search,
  featured,
}: {
  page?: number
  pageSize?: number
  search?: string | undefined
  featured?: boolean | undefined
}): Promise<{ items: ProgramDTO[]; total: number; page: number; pageSize: number }> {
  const pageNum = Math.max(1, Number(page || 1))
  const size = Math.max(1, Number(pageSize || 9))
  const offset = (pageNum - 1) * size

  let predicate = ''
  const params: Record<string, string> = {}

  if (typeof featured === 'boolean') {
    predicate += ` && featured == ${featured ? 'true' : 'false'}`
  }

  if (search && search.trim().length > 0) {
    predicate += ` && (title match $search || excerpt match $search)`
    params.search = `*${search}*`
  }

  const listQuery = programsListQuery(offset, size, predicate)
  const countQuery = programsCountQuery(predicate)

  const [itemsRaw, total] = await Promise.all([
    sanityServerClient.fetch<SanityProgram[]>(listQuery, params),
    sanityServerClient.fetch<number>(countQuery, params),
  ])

  const items: ProgramDTO[] = (itemsRaw || []).map((p) => ({
    _id: p._id,
    title: p.title,
    slug: typeof p.slug === 'string' ? p.slug : p.slug?.current,
    excerpt: p.excerpt,
    coverImage: p.coverImage ?? null,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : null,
    featured: p.featured || false,
    order: p.order ?? 0,
    body: (p.body ?? null) as PortableTextBlock[] | null,
  }))

  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

// reuse existing function to get single program by slug (kept minimal)
export async function getProgramBySlug(slug: string): Promise<ProgramDTO | null> {
  const q = `*[_type == "program" && slug.current == $slug][0]{ _id, title, "slug": slug.current, excerpt, coverImage, body, featured, order }`
  const p = await sanityServerClient.fetch<SanityProgram>(q, { slug })
  if (!p) return null
  return {
    _id: p._id,
    title: p.title,
    slug: typeof p.slug === 'string' ? p.slug : p.slug?.current,
    excerpt: p.excerpt,
    coverImage: p.coverImage ?? null,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : null,
    featured: p.featured || false,
    order: p.order ?? 0,
    body: (p.body ?? null) as PortableTextBlock[] | null,
  }
}
