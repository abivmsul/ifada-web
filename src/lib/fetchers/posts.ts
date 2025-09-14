// src/lib/fetchers/posts.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { POSTS_LIST, POST_BY_SLUG } from '@/lib/queries/posts'
import type { PortableTextBlock } from '@portabletext/types'

// Define proper types for Sanity image
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    // sometimes Sanity may include url directly
    url?: string
  }
  [key: string]: unknown
}

// Define proper types for raw data from Sanity
interface SanityPost {
  _id: string
  title: string
  slug?: { current?: string } | string
  excerpt?: string
  mainImage?: SanityImage
  publishedAt?: string
  tags?: string[]
  featured?: boolean
  body?: PortableTextBlock[]  // <-- typed portable text
  [key: string]: unknown
}

export type PostMini = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: SanityImage | null
  coverImageUrl?: string | null
  publishedAt?: string
  publishedLabel?: string | null
  tags?: string[]
  featured?: boolean
  body?: PortableTextBlock[] | null
}

export async function fetchPostsList(): Promise<PostMini[]> {
  const raw = await sanityServerClient.fetch<SanityPost[]>(POSTS_LIST)
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  return (raw || []).map((p: SanityPost) => {
    const coverImageUrl = p.mainImage ? urlFor(p.mainImage).width(1200).auto('format').url() : null
    const publishedLabel = p.publishedAt ? formatter.format(new Date(p.publishedAt)) : null

    // normalize slug
    const slugValue = typeof p.slug === 'string' ? p.slug : p.slug?.current

    return {
      _id: p._id,
      title: p.title,
      slug: slugValue,
      excerpt: p.excerpt,
      coverImage: p.mainImage ?? null,
      coverImageUrl,
      publishedAt: p.publishedAt,
      publishedLabel,
      tags: p.tags ?? [],
      featured: Boolean(p.featured),
      body: (p.body ?? null) as PortableTextBlock[] | null,
    }
  })
}

export async function fetchPostBySlug(slug: string): Promise<PostMini | null> {
  const p = await sanityServerClient.fetch<SanityPost>(POST_BY_SLUG, { slug })
  if (!p) return null
  const coverImageUrl = p.mainImage ? urlFor(p.mainImage).width(1600).auto('format').url() : null
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const publishedLabel = p.publishedAt ? formatter.format(new Date(p.publishedAt)) : null

  const slugValue = typeof p.slug === 'string' ? p.slug : p.slug?.current

  return {
    _id: p._id,
    title: p.title,
    slug: slugValue,
    excerpt: p.excerpt,
    coverImage: p.mainImage ?? null,
    coverImageUrl,
    publishedAt: p.publishedAt,
    publishedLabel,
    tags: p.tags ?? [],
    featured: Boolean(p.featured),
    body: (p.body ?? null) as PortableTextBlock[] | null,
  }
}
