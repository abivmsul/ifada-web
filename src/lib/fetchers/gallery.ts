// src/lib/fetchers/gallery.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { GALLERY_CATEGORIES_WITH_ITEMS } from '@/lib/queries/gallery'

export type GalleryItemDTO = {
  _id: string
  title?: string
  type?: string
  videoUrl?: string | null
  image?: any
  imageUrl?: string | null
  caption?: string
  relatedProject?: { _id: string; title: string; slug?: string } | null
}

export type GalleryCategoryDTO = {
  _id: string
  title: string
  slug?: string
  description?: string
  items: GalleryItemDTO[]
}

export async function fetchGalleryCategories(): Promise<GalleryCategoryDTO[]> {
  const raw = await sanityServerClient.fetch(GALLERY_CATEGORIES_WITH_ITEMS)
  const mapped = (raw || []).map((cat: any) => ({
    _id: cat._id,
    title: cat.title,
    slug: cat.slug,
    description: cat.description,
    items: (cat.items || []).map((it: any) => ({
      _id: it._id,
      title: it.title,
      type: it.type,
      videoUrl: it.videoUrl ?? null,
      image: it.image ?? null,
      imageUrl: it.image ? urlFor(it.image).width(1600).auto('format').url() : null,
      caption: it.caption ?? it.title ?? '',
      relatedProject: it.relatedProject ?? null,
    })),
  }))
  return mapped
}
