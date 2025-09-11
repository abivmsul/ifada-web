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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Gallery</h1>
            <p className="text-sm text-secondary">Browse photos & videos </p>
          </div>
<svg viewBox="0 0 1200 30" className="w-full h-auto" preserveAspectRatio="none">
  <path d="M0,8 L600,0 L1200,8 L600,16 Z" fill="rgba(255, 200, 0, 0.95)" />
</svg>

          {/* Client-driven interactive grid; initial data passed for instant load */}
          <GalleryGridClient initialCategories={categories} />
        </div>
      </SectionWrapper>
    </main>
  )
}
