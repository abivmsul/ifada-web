// src/lib/fetchers/gallery.ts
import { sanityServerClient, urlFor } from '@/lib/sanity.server'
import { GALLERY_CATEGORIES_WITH_ITEMS } from '@/lib/queries/gallery'

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
interface SanityGalleryItem {
  _id: string;
  title?: string;
  type?: string;
  videoUrl?: string;
  image?: SanityImage | null;
  caption?: string;
  relatedProject?: {
    _id: string;
    title?: string;
    slug?: string;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
}

interface SanityGalleryCategory {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  items?: SanityGalleryItem[] | null;
  [key: string]: unknown;
}

export type GalleryItemDTO = {
  _id: string
  title?: string
  type?: string
  videoUrl?: string | null
  image?: SanityImage
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
  const raw = await sanityServerClient.fetch<SanityGalleryCategory[] | null>(GALLERY_CATEGORIES_WITH_ITEMS)

  const mapped: GalleryCategoryDTO[] = (raw ?? []).map((cat) => {
    const items: GalleryItemDTO[] = (cat.items ?? []).map((it) => {
      // build image URL safely (urlFor may throw if shape is unexpected)
      let imageUrl: string | null = null
      if (it.image) {
        try {
          imageUrl = urlFor(it.image).width(1600).auto('format').url()
        } catch (e) {
          // fallback to null if builder fails for any reason
          imageUrl = null
        }
      }

      return {
        _id: it._id,
        title: it.title ?? '',
        type: it.type ?? undefined,
        videoUrl: it.videoUrl ?? null,
        image: it.image ?? undefined,
        imageUrl,
        caption: it.caption ?? it.title ?? '',
        relatedProject: it.relatedProject
          ? {
              _id: it.relatedProject._id,
              title: it.relatedProject.title ?? '',
              slug: it.relatedProject.slug,
            }
          : null,
      }
    })

    return {
      _id: cat._id,
      title: cat.title ?? '',
      slug: cat.slug,
      description: cat.description,
      items,
    }
  })

  return mapped
}
