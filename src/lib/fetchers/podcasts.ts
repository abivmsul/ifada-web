// src/lib/fetchers/podcasts.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { PODCAST_LIST, PODCAST_BY_SLUG } from '@/lib/queries/podcasts'
import type { PortableTextBlock } from '@portabletext/types'

export type PortableText = PortableTextBlock[]

/** Sanity raw shapes */
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  [key: string]: unknown
}

interface SanityPodcast {
  _id: string
  title: string
  slug?: string
  episodeNumber?: number
  youtubeUrl?: string
  publishedAt?: string
  excerpt?: string
  coverImage?: SanityImage
  coverImageUrl?: string
  duration?: string
  tags?: string[]
  featured?: boolean
  order?: number
  body?: PortableText
  [key: string]: unknown
}

/** Mapped/consumed shape used in the app */
export type Episode = {
  _id: string
  title: string
  slug?: string
  episodeNumber?: number
  youtubeUrl?: string
  publishedAt?: string
  // normalized — undefined when missing
  publishedLabel?: string
  excerpt?: string
  // normalized — undefined when missing
  coverImageUrl?: string
  duration?: string
  tags?: string[]
  featured?: boolean
  order?: number
  body?: PortableText
}

function formatDateLabel(date?: string | undefined): string | undefined {
  if (!date) return undefined
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))
  } catch {
    return date
  }
}

export async function fetchPodcastList(): Promise<Episode[]> {
  const raw = await sanityServerClient.fetch<SanityPodcast[]>(PODCAST_LIST)
  return (raw || []).map((p: SanityPodcast) => {
    const coverImageUrl =
      p.coverImageUrl ??
      (p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : undefined)

    return {
      _id: p._id,
      title: p.title,
      slug: p.slug,
      episodeNumber: p.episodeNumber,
      youtubeUrl: p.youtubeUrl,
      publishedAt: p.publishedAt,
      publishedLabel: formatDateLabel(p.publishedAt),
      excerpt: p.excerpt ?? undefined,
      coverImageUrl,
      duration: p.duration,
      tags: p.tags,
      featured: p.featured ?? false,
      order: p.order,
      body: p.body ?? undefined,
    } as Episode
  })
}

export async function fetchPodcastBySlug(slug: string): Promise<Episode | null> {
  const p = await sanityServerClient.fetch<SanityPodcast>(PODCAST_BY_SLUG, { slug })
  if (!p) return null

  const coverImageUrl =
    p.coverImageUrl ??
    (p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : undefined)

  const mapped: Episode = {
    _id: p._id,
    title: p.title,
    slug: p.slug,
    episodeNumber: p.episodeNumber,
    youtubeUrl: p.youtubeUrl,
    publishedAt: p.publishedAt,
    publishedLabel: formatDateLabel(p.publishedAt),
    excerpt: p.excerpt ?? undefined,
    coverImageUrl,
    duration: p.duration,
    tags: p.tags,
    featured: p.featured ?? false,
    order: p.order,
    body: p.body ?? undefined,
  }

  return mapped
}
