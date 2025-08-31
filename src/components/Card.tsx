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
    <article className="flex flex-col h-full">
      {imageUrl && (
        <div className="h-44 w-full relative rounded-md overflow-hidden mb-4">
          <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
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
      {href ? <Link href={href}>{content}</Link> : content}
    </motion.div>
  )
}
