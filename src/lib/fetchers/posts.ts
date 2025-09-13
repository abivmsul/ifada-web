// src/lib/fetchers/posts.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { POSTS_LIST, POST_BY_SLUG } from '@/lib/queries/posts'

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
interface SanityPost {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  tags?: string[];
  featured?: boolean;
  body?: unknown; // Portable text content
  [key: string]: unknown;
}

export type PostMini = {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: SanityImage
  coverImageUrl?: string | null
  publishedAt?: string
  publishedLabel?: string | null
  tags?: string[]
  featured?: boolean
}

export async function fetchPostsList(): Promise<PostMini[]> {
  const raw = await sanityServerClient.fetch<SanityPost[]>(POSTS_LIST)
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  return (raw || []).map((p: SanityPost) => {
    const coverImageUrl = p.mainImage ? urlFor(p.mainImage).width(1200).auto('format').url() : null
    const publishedLabel = p.publishedAt ? formatter.format(new Date(p.publishedAt)) : null
    return { 
      ...p, 
      coverImage: p.mainImage,
      coverImageUrl, 
      publishedLabel 
    }
  })
}

export async function fetchPostBySlug(slug: string): Promise<PostMini | null> {
  const p = await sanityServerClient.fetch<SanityPost>(POST_BY_SLUG, { slug })
  if (!p) return null
  const coverImageUrl = p.mainImage ? urlFor(p.mainImage).width(1600).auto('format').url() : null
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const publishedLabel = p.publishedAt ? formatter.format(new Date(p.publishedAt)) : null
  return { 
    ...p, 
    coverImage: p.mainImage,
    coverImageUrl, 
    publishedLabel 
  }
}