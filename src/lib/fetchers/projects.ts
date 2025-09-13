// src/lib/fetchers/projects.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { projectsListQuery, projectsCountQuery, PROJECT_BY_SLUG , PROJECTS_FEATURED, PROJECTS_LIST} from '@/lib/queries/projects'

export type ProjectDTO = {
  _id: string
  title: string
  slug?: string
  status?: string
  startDate?: string | null
  endDate?: string | null
  startLabel?: string | null
  endLabel?: string | null
  excerpt?: string
  coverImageUrl?: string | null
  featured?: boolean
  order?: number
  body?: any[]
}
export type ProjectItem = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: any
  coverImageUrl?: string | null
  featured?: boolean
  order?: number
}
function formatDateLabel(date?: string | null) {
  if (!date) return null
  try {
    // deterministic server formatting — same on Node for SSR
    const f = new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    })
    return f.format(new Date(date))
  } catch {
    return date
  }
}

function mapProject(p: any) {
  const mapped = {
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1400).auto('format').url() : null,
  }
  mapped.startLabel = formatDateLabel(mapped.startDate)
  mapped.endLabel = formatDateLabel(mapped.endDate)
  return mapped
}

/**
 * Fetch paginated projects
 */
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
}) {
  const pageNum = Math.max(1, Number(page || 1))
  const size = Math.max(1, Number(pageSize || 9))
  const offset = (pageNum - 1) * size

  let predicate = ''
  const params: Record<string, any> = {}

  if (typeof featured === 'boolean') predicate += ` && featured == ${featured ? 'true' : 'false'}`

  // status: rely on stored status OR compute via dates if you prefer
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
    sanityServerClient.fetch(listQuery, params),
    sanityServerClient.fetch(countQuery, params),
  ])

  const items = (itemsRaw || []).map(mapProject)
  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

export async function getProjectBySlug(slug: string) {
  const p = await sanityServerClient.fetch(PROJECT_BY_SLUG, { slug })
  if (!p) return null
  return {
    ...p,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : null,
    startLabel: p.startDate ? formatDateLabel(p.startDate) : null,
    endLabel: p.endDate ? formatDateLabel(p.endDate) : null,
  }
}


export async function fetchFeaturedProjects(limit = 3): Promise<ProjectItem[]> {
  try {
    // Try to fetch featured projects first
    let raw: any[] | null = await sanityServerClient.fetch(PROJECTS_FEATURED)

    // If no featured projects found, fall back to the full list
    if (!raw || raw.length === 0) {
      raw = await sanityServerClient.fetch(PROJECTS_LIST)
    }

    // DEV-only debug helper (uncomment when debugging)
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('fetchFeaturedProjects raw sample:', JSON.stringify(raw?.slice(0, 5), null, 2))
    // }

    const mapped = (raw || []).map((p: any) => {
      // Prefer the pre-resolved coverImageUrl from GROQ (coverImage.asset->url)
      // otherwise build one with urlFor (image builder).
      const coverImageUrl =
        p?.coverImageUrl ??
        (p?.coverImage ? urlFor(p.coverImage).width(1400).auto('format').url() : null)

      return {
        _id: p._id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        coverImageUrl,
        featured: p.featured ?? false,
        order: p.order ?? null,
      } as ProjectItem
    })

    return mapped.slice(0, limit)
  } catch (err) {
    console.error('fetchFeaturedProjects error', err)
    return []
  }
}
export async function fetchProjectsList(): Promise<ProjectItem[]> {
  const raw = await sanityServerClient.fetch(PROJECTS_LIST)
  return (raw || []).map((p: any) => {
    const coverImageUrl = p?.coverImageUrl ?? (p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : null)
    return { ...p, coverImageUrl }
  })
}