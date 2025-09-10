// src/lib/fetchers/posts.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { POSTS_LIST, POST_BY_SLUG } from '@/lib/queries/posts'

type PostMini = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: any
  coverImageUrl?: string | null
  publishedAt?: string
  publishedLabel?: string | null
  tags?: string[]
  featured?: boolean
}

export async function fetchPostsList(): Promise<PostMini[]> {
  const raw = await sanityServerClient.fetch(POSTS_LIST)
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  return (raw || []).map((p: any) => {
    const coverImageUrl = p.mainImage ? urlFor(p.mainImage).width(1200).auto('format').url() : null
    const publishedLabel = p.publishedAt ? formatter.format(new Date(p.publishedAt)) : null
    return { ...p, coverImageUrl, publishedLabel }
  })
}

export async function fetchPostBySlug(slug: string) {
  const p = await sanityServerClient.fetch(POST_BY_SLUG, { slug })
  if (!p) return null
  const coverImageUrl = p.mainImage ? urlFor(p.mainImage).width(1600).auto('format').url() : null
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const publishedLabel = p.publishedAt ? formatter.format(new Date(p.publishedAt)) : null
  return { ...p, coverImageUrl, publishedLabel }
}
