// src/components/Timeline.tsx
'use client'
import { motion } from 'framer-motion'
import cn from 'classnames'

type Milestone = { year: string; title: string; body?: string; highlight?: boolean }

export default function Timeline({ items = [] as Milestone[] }: { items?: Milestone[] }) {
  const data = items.length ? items : [
    { year: '2003', title: 'Founded', body: 'Ifada Islamic Foundation was founded...' },
    { year: '2008', title: 'Community Center Opened', body: 'Opened our first...' },
    { year: '2015', title: 'Outreach Expansion', body: 'Expanded outreach programs...' },
    { year: '2020', title: 'Digital Programs', body: 'Started online courses...' },
  ]

  return (
    <div className="relative">
      <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-gray-200" />
      <div className="space-y-8">
        {data.map((m, i) => {
          const left = i % 2 === 0
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:flex md:items-start md:gap-6">
              <div className={cn('md:w-1/2', left ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left')}>
                <div className="inline-block bg-white border rounded-lg p-5 shadow-elevate hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-gray-400">{m.year}</div>
                      <h4 className="text-lg font-semibold">{m.title}</h4>
                    </div>
                    {m.highlight && <div className="text-xs px-2 py-1 bg-primary text-white rounded">Milestone</div>}
                  </div>
                  {m.body && <p className="mt-3 text-gray-600">{m.body}</p>}
                </div>
              </div>

              <div className="md:w-12 md:flex md:items-center md:justify-center">
                <div className="w-6 h-6 rounded-full bg-white border-4 border-primary" />
              </div>

              <div className="md:w-1/2 hidden md:block" aria-hidden></div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
