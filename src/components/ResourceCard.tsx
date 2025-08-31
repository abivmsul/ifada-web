'use client'

import { motion } from 'framer-motion'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  link: string
  description?: string
  imageUrl?: string
  className?: string
}

export default function ResourceCard({ title, link, description, imageUrl, className }: Props) {
  return (
    <motion.div
      className={cn('bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition', className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      {imageUrl && (
        <div className="relative h-40 w-full">
          <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}

      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        {description && <p className="text-gray-600 mb-4 text-sm">{description}</p>}
        <div>
          <Link href={link} className="text-sm text-primary underline">Read / Download →</Link>
        </div>
      </div>
    </motion.div>
  )
}
