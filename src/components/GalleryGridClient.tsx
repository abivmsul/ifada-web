// src/components/GalleryGridClient.tsx
'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import cn from 'classnames'
import GalleryItemCard from './GalleryItemCard'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type GalleryItemDTO = {
  _id: string
  title?: string
  caption?: string
  imageUrl?: string | null
  videoUrl?: string | null
  type?: string
  relatedProject?: { title?: string; slug?: string } | null
}

type Category = {
  _id: string
  title: string
  slug?: string
  description?: string
  items: GalleryItemDTO[]
}

export default function GalleryGridClient({ initialCategories }: { initialCategories: Category[] }) {
  const categories = initialCategories || []
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?._id ?? null)
  const [query, setQuery] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [lightboxItems, setLightboxItems] = useState<GalleryItemDTO[]>([])

  // derive items for active category
  const activeItems = useMemo(() => {
    const cat = categories.find((c) => c._id === activeCategory) ?? categories[0]
    if (!cat) return []
    const q = query.trim().toLowerCase()
    return cat.items.filter((it) => !q || (it.caption || it.title || '').toLowerCase().includes(q))
  }, [categories, activeCategory, query])

  // Open lightbox at specific index
  const openLightbox = useCallback((index: number) => {
    setLightboxItems(activeItems)
    setLightboxIndex(index)
    // lock scroll
    document.body.style.overflow = 'hidden'
  }, [activeItems])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setLightboxItems([])
    document.body.style.overflow = ''
  }, [])

  // keyboard navigation for lightbox
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : Math.min((lightboxItems?.length ?? 1) - 1, i + 1)))
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : Math.max(0, i - 1)))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, lightboxItems, closeLightbox])

  // when category changes reset search & lightbox
  useEffect(() => {
    setQuery('')
    setLightboxIndex(null)
  }, [activeCategory])

  return (
    <div>
      {/* Category tabs + search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setActiveCategory(c._id)}
              className={cn('px-3 py-1 rounded-full text-sm border', activeCategory === c._id ? 'bg-primary text-white' : 'bg-white text-gray-700')}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search captions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-3 py-2 w-[220px]"
            aria-label="Search gallery captions"
          />
        </div>
      </div>

      {/* Masonry-like grid using CSS columns for simple responsive masonry */}
      <div className="gallery-grid">
        {/* CSS will make columns; map items */}
        {activeItems.map((it, idx) => (
          <div key={it._id} className="break-inside-avoid mb-4">
            <GalleryItemCard
              title={it.title}
              caption={it.caption}
              imageUrl={it.imageUrl ?? undefined}
              videoUrl={it.videoUrl ?? undefined}
              onOpen={() => openLightbox(idx)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxItems.length > 0 && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeLightbox}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl w-full max-h-full overflow-hidden rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black">
                {/* Display media */}
                {lightboxItems[lightboxIndex].imageUrl ? (
                  <div className="relative w-full h-[60vh] sm:h-[70vh]">
                    <Image src={lightboxItems[lightboxIndex].imageUrl} alt={lightboxItems[lightboxIndex].caption || 'gallery image'} fill style={{ objectFit: 'contain' }} />
                  </div>
                ) : lightboxItems[lightboxIndex].videoUrl ? (
                  <div className="w-full h-[60vh] sm:h-[70vh]">
                    <iframe
                      src={lightboxItems[lightboxIndex].videoUrl}
                      title={lightboxItems[lightboxIndex].caption || 'video'}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : null}

                {/* Caption & controls */}
                <div className="p-4 bg-black/80 text-white flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-semibold">{lightboxItems[lightboxIndex].title}</div>
                    <div className="text-sm text-gray-300">{lightboxItems[lightboxIndex].caption}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLightboxIndex((i) => (i === null ? null : Math.max(0, i - 1)))}
                      className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setLightboxIndex((i) => (i === null ? null : Math.min(lightboxItems.length - 1, i + 1)))}
                      className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                    >
                      →
                    </button>
                    <button onClick={closeLightbox} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 ml-2">Close</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        /* CSS columns for masonry effect */
        .gallery-grid {
          column-gap: 1rem;
          /* change number of columns by breakpoints */
          column-count: 1;
        }
        @media (min-width: 640px) {
          .gallery-grid { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .gallery-grid { column-count: 3; }
        }
        @media (min-width: 1280px) {
          .gallery-grid { column-count: 4; }
        }
        /* avoid break inside items */
        .gallery-grid > div { break-inside: avoid; -webkit-column-break-inside: avoid; -moz-column-break-inside: avoid; }
      `}</style>
    </div>
  )
}
