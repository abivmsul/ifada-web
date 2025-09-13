// src/components/ResourcesGrid.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ResourcesGrid({ items }: { items: { id:string; title:string; image?:string; href?:string }[] }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <motion.article key={r.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.06 }} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={r.href ?? '#'} className="block">
              <div className="relative h-44">
                {r.image ? <Image src={r.image} alt={r.title} fill style={{ objectFit: 'cover' }} /> : <div className="h-44 bg-gray-100" />}
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{r.title}</h4>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
