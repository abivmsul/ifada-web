// src/components/BlogCard.tsx
'use client'

import Image from 'next/image'
import NavLink from './NavLink'

type Props = {
  title: string
  excerpt?: string
  imageUrl?: string
  href?: string
  dateLabel?: string
  tags?: string[]
}

export default function BlogCard({ title, excerpt, imageUrl, href = '#', dateLabel, tags = [] }: Props) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden group">
      <NavLink href={href} className="block">
        {imageUrl ? (
          <div className="relative h-44 w-full">
            <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 33vw" />
          </div>
        ) : (
          <div className="h-44 bg-gray-100" />
        )}

        <div className="p-5">
          <div className="flex items-center justify-between text-sm text-secondary mb-2">
            <div>{dateLabel}</div>
            <div className="flex gap-2">
              {tags.slice(0,3).map(t => <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>)}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {excerpt && <p className="text-sm text-gray-700 mb-4 line-clamp-3">{excerpt}</p>}
          <div className="text-sm text-primary font-medium">Read article →</div>
        </div>
      </NavLink>
    </article>
  )
}
