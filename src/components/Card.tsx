// src/components/Card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import cn from 'classnames'

type Props = {
  title: string
  excerpt?: string
  imageUrl?: string
  href?: string
  className?: string
}

export default function Card({ title, excerpt, imageUrl, href = '#', className }: Props) {
  const content = (
    <article className="flex flex-col h-full" aria-labelledby={`card-${title}`}>
      {imageUrl ? (
        <div className="h-44 w-full relative rounded-md overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>
      ) : (
        <div className="h-44 w-full rounded-md overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
          <span className="text-sm text-gray-400">No image</span>
        </div>
      )}

      <h3 id={`card-${title}`} className="text-lg font-semibold mb-2">{title}</h3>

      {excerpt && <p className="text-gray-700 flex-1">{excerpt}</p>}

      <div className="mt-4">
        <span className="inline-block text-sm text-primary underline">Learn more →</span>
      </div>
    </article>
  )

  return (
    <motion.div
      className={cn('bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition', className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      {href ? <Link href={href} aria-label={`View ${title}`}>{content}</Link> : content}
    </motion.div>
  )
}
