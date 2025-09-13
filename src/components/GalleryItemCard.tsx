// src/components/GalleryItemCard.tsx
'use client'

import Image from 'next/image'

export default function GalleryItemCard({
  title,
  caption,
  imageUrl,
  videoUrl,
  onOpen,
}: {
  title?: string
  caption?: string
  imageUrl?: string
  videoUrl?: string
  onOpen?: () => void
}) {
  return (
    <button onClick={onOpen} className="block w-full text-left group focus:outline-none" aria-label={`Open ${title || 'image'}`}>
      <div className="relative w-full h-52 overflow-hidden rounded-lg bg-gray-100">
        {imageUrl ? (
          <Image src={imageUrl} alt={caption || title || 'image'} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>

      <div className="mt-2">
        <div className="text-sm font-medium line-clamp-1">{title}</div>
        {caption && <div className="text-xs text-secondary line-clamp-2">{caption}</div>}
      </div>
    </button>
  )
}
