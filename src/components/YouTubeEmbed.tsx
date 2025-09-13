// src/components/YouTubeEmbed.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { extractYouTubeId, youtubeEmbedUrl, youtubeThumbnail } from '@/lib/youtube'
import cn from 'classnames'

export default function YouTubeEmbed({ url, title }: { url: string; title?: string }) {
  const id = extractYouTubeId(url)
  const [play, setPlay] = useState(false)
  if (!id) return null
  const embed = youtubeEmbedUrl(id, true)
  const thumb = youtubeThumbnail(id, 'hqdefault')

  return (
    <div className="w-full max-w-full aspect-video bg-black rounded overflow-hidden relative">
      {!play ? (
        <button aria-label="Play video" onClick={() => setPlay(true)} className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="relative w-full h-full">
            <Image src={thumb} alt={title || 'video thumbnail'} fill style={{ objectFit: 'cover' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 shadow">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <iframe
          title={title || 'YouTube player'}
          src={embed}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}
