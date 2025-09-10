// src/components/EventsStrip.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function EventsStrip({ events }: { events: { id:string; title:string; date?:string; image?:string; href?:string }[] }) {
  return (
    <div className="overflow-x-auto no-scrollbar px-4">
      <div className="flex gap-6 py-2 max-w-[1400px] mx-auto">
        {events.map((ev, i) => (
          <motion.div key={ev.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.06 }} className="min-w-[260px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0">
            <Link href={ev.href ?? '#'} className="block">
              <div className="relative h-40">
                {ev.image ? <Image src={ev.image} alt={ev.title} fill style={{ objectFit: 'cover' }} /> : <div className="h-40 bg-gray-100" />}
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-500">{ev.date}</div>
                <h4 className="font-semibold mt-1">{ev.title}</h4>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
