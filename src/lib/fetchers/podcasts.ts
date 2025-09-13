// src/lib/fetchers/podcasts.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { PODCAST_LIST, PODCAST_BY_SLUG } from '@/lib/queries/podcasts'

type Episode = {
  _id: string
  title: string
  slug?: string
  episodeNumber?: number
  youtubeUrl?: string
  publishedAt?: string
  publishedLabel?: string | null
  excerpt?: string
  coverImageUrl?: string | null
  duration?: string
  tags?: string[]
  featured?: boolean
  order?: number
  body?: any
}

function formatDateLabel(date?: string | null) {
  if (!date) return null
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))
  } catch {
    return date
  }
}

export async function fetchPodcastList(): Promise<Episode[]> {
  const raw = await sanityServerClient.fetch(PODCAST_LIST)
  return (raw || []).map((p: any) => {
    const coverImageUrl = p.coverImageUrl || (p.coverImage ? urlFor(p.coverImage).width(1200).auto('format').url() : null)
    return {
      ...p,
      coverImageUrl,
      publishedLabel: formatDateLabel(p.publishedAt)
    } as Episode
  })
}

export async function fetchPodcastBySlug(slug: string): Promise<Episode | null> {
  const p = await sanityServerClient.fetch(PODCAST_BY_SLUG, { slug })
  if (!p) return null
  const coverImageUrl = p.coverImageUrl || (p.coverImage ? urlFor(p.coverImage).width(1600).auto('format').url() : null)
  return { ...p, coverImageUrl, publishedLabel: formatDateLabel(p.publishedAt) } as Episode
}
