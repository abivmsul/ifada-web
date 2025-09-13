// src/lib/fetchers/projects.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { projectsListQuery, projectsCountQuery, PROJECT_BY_SLUG , PROJECTS_FEATURED, PROJECTS_LIST} from '@/lib/queries/projects'

// Define proper types for Sanity image
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  [key: string]: unknown;
}

// Define proper types for raw data from Sanity
interface SanityProject {
  _id: string;
  title: string;
  slug?: {
    current: string;
    [key: string]: unknown;
  };
  status?: string;
  startDate?: string;
  endDate?: string;
  excerpt?: string;
  coverImage?: SanityImage;
  coverImageUrl?: string;
  featured?: boolean;
  order?: number;
  body?: unknown; // Portable text content
  [key: string]: unknown;
}

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
  body?: unknown[] // Portable text content
}

export type ProjectItem = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: SanityImage
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

function mapProject(p: SanityProject): ProjectDTO {
  const mapped: ProjectDTO = {
    _id: p._id,
    title: p.title,
    slug: p.slug?.current,
    status: p.status,
    startDate: p.startDate || null,
    endDate: p.endDate || null,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1400).auto('format').url() : null,
    featured: p.featured || false,
    order: p.order || 0,
    body: p.body as unknown[] || [],
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
}): Promise<{ items: ProjectDTO[]; total: number; page: number; pageSize: number }> {
  const pageNum = Math.max(1, Number(page || 1))
  const size = Math.max(1, Number(pageSize || 9))
  const offset = (pageNum - 1) * size

  let predicate = ''
  const params: Record<string, string> = {}

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
    sanityServerClient.fetch<SanityProject[]>(listQuery, params),
    sanityServerClient.fetch<number>(countQuery, params),
  ])

  const items = (itemsRaw || []).map(mapProject)
  return { items, total: Number(total || 0), page: pageNum, pageSize: size }
}

export async function getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
  const p = await sanityServerClient.fetch<SanityProject>(PROJECT_BY_SLUG, { slug })
  if (!p) return null
  return {
    ...p,
    slug: p.slug?.current,
    coverImageUrl: p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : null,
    startLabel: p.startDate ? formatDateLabel(p.startDate) : null,
    endLabel: p.endDate ? formatDateLabel(p.endDate) : null,
  } as ProjectDTO
}

export async function fetchFeaturedProjects(limit = 3): Promise<ProjectItem[]> {
  try {
    // Try to fetch featured projects first
    let raw: SanityProject[] | null = await sanityServerClient.fetch<SanityProject[]>(PROJECTS_FEATURED)

    // If no featured projects found, fall back to the full list
    if (!raw || raw.length === 0) {
      raw = await sanityServerClient.fetch<SanityProject[]>(PROJECTS_LIST)
    }

    const mapped = (raw || []).map((p: SanityProject) => {
      // Prefer the pre-resolved coverImageUrl from GROQ (coverImage.asset->url)
      // otherwise build one with urlFor (image builder).
      const coverImageUrl =
        p.coverImageUrl ??
        (p.coverImage ? urlFor(p.coverImage).width(1400).auto('format').url() : null)

      return {
        _id: p._id,
        title: p.title,
        slug: p.slug?.current,
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
  const raw = await sanityServerClient.fetch<SanityProject[]>(PROJECTS_LIST)
  return (raw || []).map((p: SanityProject) => {
    const coverImageUrl = p.coverImageUrl ?? (p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : null)
    return { 
      ...p, 
      slug: p.slug?.current,
      coverImageUrl 
    } as ProjectItem
  })
}