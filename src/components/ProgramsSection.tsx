// src/components/ProgramsSection.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProgramsSection({ programs }: { programs: { id:string; title:string; excerpt?:string; image?:string; href?:string }[] }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => (
          <motion.article key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.08 }} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={p.href ?? '#'} className="block">
              <div className="relative h-44 w-full">
                {p.image ? <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} /> : <div className="h-44 bg-gray-100" />}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
                <div className="mt-4 text-primary font-medium">Explore →</div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
