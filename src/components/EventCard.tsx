'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import cn from 'classnames'
import { useState } from 'react'

type Props = {
  id?: string
  title: string
  date?: string
  location?: string
  imageUrl?: string
  description?: string
  onClick?: () => void
  className?: string
}

function formatDate(d?: string) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    return dt.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return d
  }
}

export default function EventCard({ title, date, location, imageUrl, description, onClick, className }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full max-w-sm',
        className
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      {imageUrl && (
        <div className="relative h-44 w-full">
          <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}

      <div className="p-4">
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        {date && <time className="text-sm text-gray-500 block mb-1">{formatDate(date)}</time>}
        {location && <div className="text-sm text-gray-500 mb-2">{location}</div>}
        {description && <p className="text-gray-700 text-sm">{description}</p>}
      </div>
    </motion.article>
  )
}
