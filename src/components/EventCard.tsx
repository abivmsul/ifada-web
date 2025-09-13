// src/components/EventCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import cn from 'classnames'
import NavLink from './NavLink'

type Props = {
  title: string
  start?: string
  end?: string | null
  startLabel?: string | null
  endLabel?: string | null
  excerpt?: string
  imageUrl?: string
  isOnline?: boolean
  location?: any
  href?: string
  className?: string
}

export default function EventCard({
  title,
  start,
  end,
  startLabel,
  endLabel,
  excerpt,
  imageUrl,
  isOnline,
  location,
  href = '#',
  className,
}: Props) {
  // use server-provided label; if missing, fall back to raw ISO (safe)
  const startDisplay = startLabel ?? (start ? new Date(start).toISOString() : '')
  const endDisplay = endLabel ?? (end ? new Date(end).toISOString() : '')

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}
    >
      <NavLink href={href} className="block">
        {/* Responsive image heights: small devices shorter, larger devices taller */}
        {imageUrl ? (
          <div className="relative w-full h-40 sm:h-44 md:h-56 lg:h-48">
            <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          </div>
        ) : (
          <div className="h-40 sm:h-44 md:h-56 lg:h-48 bg-gray-100" />
        )}

        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-semibold leading-snug">{title}</h3>
            
              <time className="text-xs sm:text-sm text-primary whitespace-nowrap">{startDisplay}</time>
{/*            
            {isOnline ? (
              <span className="text-sm text-telegram font-medium whitespace-nowrap">Online</span>
            ) : (
              ''
            )} */}
          </div>

          {excerpt && <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>}

          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="text-secondary text-xs sm:text-sm truncate">{location?.name ?? (isOnline ? 'Online' : '')}</div>
            <div className="text-primary font-medium whitespace-nowrap">View details →</div>
          </div>
        </div>
      </NavLink>
    </motion.article>
  )
}
