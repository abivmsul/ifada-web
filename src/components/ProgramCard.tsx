// src/components/ProgramCard.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import cn from 'classnames'

type Props = {
  id: string
  title: string
  slug?: string
  excerpt?: string
  imageUrl?: string
  className?: string
}

export default function ProgramCard({ id, title, slug, excerpt, imageUrl, className }: Props) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className={cn('bg-white rounded-lg shadow-md overflow-hidden', className)}
    >
      <Link href={`/programs/${slug || id}`} className="block">
        {imageUrl ? (
          <div className="relative w-full h-44">
            <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ) : (
          <div className="h-44 bg-gray-100" />
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{excerpt}</p>}
        </div>
      </Link>
    </motion.article>
  )
}
