// src/components/TeamGrid.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TeamGrid({ team = [] as any[] }) {
  const sample = team.length ? team : [
    { id: '1', name: 'Sheikh Ahmed', role: 'Executive Director', bio: 'Founder...', photo: '/images/team/sheikh.jpg' },
    { id: '2', name: 'Amina', role: 'Programs Lead', bio: 'Leads programs...', photo: '/images/team/amina.jpg' },
  ]
  const [active, setActive] = useState<any | null>(null)

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {sample.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setActive(m)}
            whileHover={{ y: -6 }}
            className="bg-white rounded-lg p-4 shadow-sm text-left flex gap-4 items-start"
          >
            <div className="w-16 h-16 relative rounded-full overflow-hidden ring-2 ring-primary/30">
              {m.photo ? <Image src={m.photo} alt={m.name} fill style={{ objectFit: 'cover' }} /> : <div className="flex items-center justify-center h-full">{m.name.split(' ').map((n: string) => n[0]).join('')}</div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{m.name}</h4>
                <div className="text-xs text-gray-500">{m.role}</div>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{m.bio}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 relative rounded-full overflow-hidden ring-2 ring-primary/30">
                {active.photo && <Image src={active.photo} alt={active.name} fill style={{ objectFit: 'cover' }} />}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{active.name}</h3>
                <div className="text-sm text-gray-500">{active.role}</div>
              </div>
              <button className="ml-auto text-gray-500" onClick={() => setActive(null)}>Close</button>
            </div>
            <div className="mt-4 text-gray-700">{active.bio}</div>
          </div>
        </div>
      )}
    </>
  )
}
