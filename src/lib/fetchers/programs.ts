// src/lib/fetchers/programs.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { programsListQuery, programsCountQuery } from '@/lib/queries/programs'

export type ProgramDTO = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: any
  coverImageUrl?: string | null
  featured?: boolean
  order?: number
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

  // build predicate; use parameterized search for safety
  let predicate = ''
  const params: Record<string, any> = {}

  if (typeof featured === 'boolean') {
    predicate += ` && featured == ${featured ? 'true' : 'false'}`
  }

  if (search && search.trim().length > 0) {
    // use GROQ match operator: match is case-insensitive and supports substrings
    predicate += ` && (title match $search || excerpt match $search)`
    params.search = `*${search}*`
  }

  // build queries with slice (offset..offset+size)
  const listQuery = programsListQuery(offset, size, predicate)
  const countQuery = programsCountQuery(predicate)

  const [itemsRaw, total] = await Promise.all([
    sanityServerClient.fetch(listQuery, params),
    sanityServerClient.fetch(countQuery, params),
  ])

  const items = (itemsRaw || []).map((p: any) => ({
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : null,
  }))

  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

// reuse existing function to get single program by slug (kept minimal)
export async function getProgramBySlug(slug: string) {
  const q = `*[_type == "program" && slug.current == $slug][0]{ _id, title, "slug": slug.current, excerpt, coverImage, body }`
  const p = await sanityServerClient.fetch(q, { slug })
  if (!p) return null
  return {
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : null,
  }
}
