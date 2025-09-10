// src/app/gallery/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import GalleryGridClient from '@/components/GalleryGridClient'
import { fetchGalleryCategories } from '@/lib/fetchers/gallery'

export const revalidate = 60

export default async function GalleryPage() {
  const categories = await fetchGalleryCategories()

  return (
    <main>
      <SectionWrapper id="gallery" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Gallery</h1>
            <p className="text-sm text-gray-600">Browse photos & videos grouped by category.</p>
          </div>

          {/* Client-driven interactive grid; initial data passed for instant load */}
          <GalleryGridClient initialCategories={categories} />
        </div>
      </SectionWrapper>
    </main>
  )
}
