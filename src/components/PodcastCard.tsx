// src/components/PodcastCard.tsx
'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { extractYouTubeId, youtubeThumbnail } from '@/lib/youtube'
import NavLink from './NavLink'

export default function PodcastCard({
  title,
  episodeNumber,
  excerpt,
  slug,
  youtubeUrl,
  coverImageUrl,
  publishedLabel,
}: {
  title?: string
  episodeNumber?: number
  excerpt?: string
  slug?: string
  youtubeUrl?: string
  coverImageUrl?: string
  publishedLabel?: string
}) {
  const id = extractYouTubeId(youtubeUrl) ?? undefined
  const thumb = coverImageUrl ?? (id ? youtubeThumbnail(id) : undefined)

  return (
    <motion.article whileHover={{ y: -6 }} className="bg-white rounded-lg shadow-md overflow-hidden">
      <NavLink href={`/podcast/${slug}`} className="block">
        {thumb ? (
          <div className="relative w-full h-44 sm:h-48">
            <Image src={thumb} alt={title || 'podcast'} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 33vw" />
          </div>
        ) : (
          <div className="h-44 bg-gray-100" />
        )}

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{episodeNumber ? `Ep ${episodeNumber} — ${title}` : title}</h3>
            <div className="text-xs text-secondary">{publishedLabel}</div>
          </div>
          {excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{excerpt}</p>}
          <div className="mt-3 text-sm text-primary font-medium">Play on YouTube →</div>
        </div>
      </NavLink>
    </motion.article>
  )
}
