// src/components/ProjectCard.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import NavLink from './NavLink'

type Props = {
  title: string
  excerpt?: string
  imageUrl?: string
  href?: string
  status?: string
  startLabel?: string | null
}

export default function ProjectCard({ title, excerpt, imageUrl, href = '#', status, startLabel }: Props) {
  return (
    <motion.article whileHover={{ y: -6 }} className="bg-white rounded-lg shadow-md overflow-hidden">
      <NavLink href={href} className="block">
        {imageUrl ? (
          <div className="relative w-full h-44 sm:h-52 overflow-hidden">
            <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="h-44 sm:h-52 bg-gray-100" />
        )}

        <div className="p-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {status && <span className="text-xs px-2 py-1 rounded text-white" style={{ background: status === 'completed' ? '#0f9d58' : status === 'ongoing' ? '#f59e0b' : '#3b82f6' }}>{status}</span>}
          </div>

          {startLabel && <div className="text-sm text-secondary mb-2">{startLabel}</div>}
          {excerpt && <p className="text-sm text-gray-700 line-clamp-3">{excerpt}</p>}

          <div className="mt-3 text-sm text-primary font-medium">View project →</div>
        </div>
      </NavLink>
    </motion.article>
  )
}
