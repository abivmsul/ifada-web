'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import cn from 'classnames'

type Milestone = {
  year: string
  title: string
  body?: string
  bullets?: string[]
  highlight?: boolean
}

// Small SVG icons
const OpenBookIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V6H6.5A2.5 2.5 0 0 0 4 8.5V19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 6V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const SealIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M18 22l-3-2-3 2-3-2-3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const NetworkIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M12 8v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7.4 16.2L10.6 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16.6 16.2L13.4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const CalendarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const ProgramIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export default function Timeline({ items = [] as Milestone[] }: { items?: Milestone[] }) {
  const data: Milestone[] = items.length
    ? items
    : [
       {
  year: 'July 14, 2022',
  title: 'Foundation of Ifada Islamic Organization (Hadra)',
  bullets: [
    "From Fuad Muna's 'Smile Gathering / ፈገግታ መጅሊስ' (Telegram Live)",
    'Established to revive spirituality and reflection'
  ],
  body: "The Ifada Islamic Organization was founded from Fuad Muna's Telegram Live 'Smile Gathering' and aimed at reviving spirituality through collective reflection."
},
{
  year: 'July 2022 — 2023',
  title: 'Growth of Hadra Movement',
  bullets: [
    'Became a spiritual hub for youth',
    'Ifada books introduced to the market',
    'Vision of Hadra Chain accepted by members'
  ],
  body: 'Hadra quickly grew into a spiritual hub for youth, with Ifada books reaching the market and members embracing the idea of a Hadra Chain.'
},
{
  year: 'November 13, 2023',
  title: 'Establishment of the Ifada Community Hadra Chain',
  highlight: true,
  bullets: [
    'Official formation of the Hadra chain',
    'Built on Faithful Traditions Hadra',
    'Structured spiritual community for youth'
  ],
  body: 'The Ifada Community Hadra Chain was officially established, creating a structured and organized framework for youth spirituality.'
},
{
  year: 'July 28, 2024',
  title: 'Expansion — Project Move 1',
  bullets: [
    'Opened 11 new Hadra Chains',
    'Expanded from 10 to 21 branches'
  ],
  body: 'Project Move 1 expanded the Hadra Chain, strengthening youth connection to spirituality and improving organizational capacity.'
},
{
  year: 'September 9, 2024',
  title: 'Legal Recognition',
  highlight: true,
  bullets: [
    'Approved by the Supreme Council of Islamic Affairs of Ethiopia',
    'Enabled legal activities and financial processes'
  ],
  body: 'The Ifada Community Hadra Chain received official legal recognition, empowering it to conduct activities and manage finances formally.'
},
{
  year: '2023 — Present',
  title: 'Weekly Programs & Member Duties',
  bullets: [
    'Fridays 3:00 PM — 4:45 PM: Quran, Hadith, Seerah, Family traditions',
    'Daily: ≥1 Juz recitation',
    'Daily: ≥100 Salawat',
    'Active social responsibility campaigns'
  ],
  body: 'Weekly gatherings focus on Quranic reflection, Hadith perspectives, Seerah, and family traditions, while members maintain daily commitments and engage in community service.'
}

      ]

  const icons = [OpenBookIcon, ProgramIcon, SealIcon, NetworkIcon, CalendarIcon, ProgramIcon]

  const [active, setActive] = useState<Milestone | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!scrollRef.current) return
    // more vertical space to avoid cropping
    scrollRef.current.style.minHeight = '500px'
  }, [])

  function scrollBy(offset: number) {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section aria-label="Ifada Hadra timeline" className="relative py-2 md:py-2">
      {/* Desktop vertical center line (strong and visible) */}
      <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-secondary transform -translate-x-1/2 z-10" />

      {/* Mobile horizontal center line (visible) */}
      <div className="md:hidden absolute left-0 right-0 top-1/2 h-px bg-secondary/40 transform -translate-y-1/2 z-10" />

      {/* DESKTOP: swapped card and dot positions (interchanged) */}
      <div className="hidden md:block space-y-18 relative">
        {data.map((m, i) => {
          const left = i % 2 === 0
          const Icon = icons[i % icons.length]

          if (left) {
            // LEFT: date (outer left) -> spacer -> DOT -> gap -> CARD -> spacer
            return (
              <article key={i} className="relative grid grid-cols-14 items-center gap-4">
                <div className="col-span-4 flex justify-start pl-40">
                  <div className="font-semibold text-lg text-gray-800">{m.year}</div>
                </div>

                <div className="col-span-2" />

                <div className="col-span-1 flex items-center justify-center z-40">
                  <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white shadow-md" aria-hidden />
                </div>

                <div className="col-span-1" />

                <div className="col-span-6 pl-6 pr-2">
                  <div className={cn('relative rounded-2xl p-6 shadow-lg transform transition-transform duration-300 hover:-translate-y-2 z-50 md:ring-1 md:ring-white', m.highlight ? 'bg-secondary/10 border border-secondary/20' : 'bg-white border')}>
                    <div className="flex items-center gap-3">
                      <span className="text-secondary"><Icon className="w-5 h-5" /></span>
                      <div>
                        <h4 className="text-xl font-semibold">{m.title}</h4>
                      </div>
                    </div>

                    {m.bullets && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.bullets.slice(0, 3).map((b, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">{b}</span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 text-sm text-right">
                      <button onClick={() => setActive(m)} className="font-medium underline">Read more--</button>
                    </div>

                    {/* connector to dot (card is right now) */}
                    <div className="hidden md:block absolute left-[-48px] top-1/2 w-12 h-0.5 bg-secondary transform -translate-y-1/2 z-20" aria-hidden />
                  </div>
                </div>

                <div className="col-span-3" />
              </article>
            )
          }

          // RIGHT: spacer -> CARD -> gap -> DOT -> spacer -> date outer right
          return (
            <article key={i} className="relative grid grid-cols-14 items-center gap-4">
              

              <div className="col-span-6 pr-6 pl-2">
                <div className={cn('relative rounded-2xl p-6 shadow-lg transform transition-transform duration-300 hover:-translate-y-2 z-50 md:ring-1 md:ring-white', m.highlight ? 'bg-secondary border border-secondary' : 'bg-white border')}>
                  <div className="flex items-center gap-3">
                    <span className="text-secondary"><Icon className="w-5 h-5" /></span>
                    <div>
                      <h4 className="text-xl font-semibold">{m.title}</h4>
                    </div>
                  </div>

                  {m.bullets && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.bullets.slice(0, 3).map((b, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">{b}</span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 text-sm text-left">
                    <button onClick={() => setActive(m)} className="font-medium underline">Read more</button>
                  </div>

                  {/* connector to dot (card is left now) */}
                  <div className="hidden md:block absolute right-[-48px] top-1/2 w-12 h-0.5 bg-secondary transform -translate-y-1/2 z-20" aria-hidden />
                </div>
              </div>

              <div className="col-span-1" />

              <div className="col-span-1 flex items-center justify-center z-40">
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white shadow-md" aria-hidden />
              </div>

              <div className="col-span-3 flex justify-end pr-3">
                <div className="font-semibold text-lg text-gray-800">{m.year}</div>
              </div>
            </article>
          )
        })}

        {/* vertical center line */}
        <div className="absolute left-1/2 top-8 bottom-8 w-2 bg-secondary/90 transform -translate-x-1/2 z-10" aria-hidden />
      </div>

      {/* MOBILE: unchanged (horizontal line and placement preserved) */}
      <div className="md:hidden relative overflow-hidden">
        {/* horizontal line (visible, behind dots) */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-secondary transform -translate-y-1/2 z-10" />

        {/* Left transparent arrow */}
        <button aria-label="Scroll left" onClick={() => scrollBy(-200)} className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-1 opacity-60 hover:opacity-100">
          <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right transparent arrow */}
        <button aria-label="Scroll right" onClick={() => scrollBy(200)} className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-1 opacity-60 hover:opacity-100">
          <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div ref={scrollRef} className="overflow-x-auto no-scrollbar px-6 py-2" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex items-center gap-6 relative" style={{ minHeight: '480px' }}>
            {data.map((m, i) => {
              const top = i % 2 === 0
              const Icon = icons[i % icons.length]

              // position values
              const cardTranslate = top ? '-120px' : '120px'
              const dateTop = top ? 'calc(50% + 96px)' : 'calc(50% - 96px)'

              return (
                <div key={i} className="min-w-[180px] max-w-[250px] shrink-0 relative">
                  {/* Card (above or below) */}
                  <div
                    className={cn(
                      'rounded-2xl p-2 shadow-md w-full min-h-[90px] transition-transform z-40',
                      m.highlight ? 'bg-secondary/10 border border-secondary/20' : 'bg-white border'
                    )}
                    style={{ transform: `translateY(${cardTranslate})` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary"><Icon className="w-5 h-5" /></span>
                        <div>
                          <h4 className="text-sm font-semibold">{m.title}</h4>
                        </div>
                      </div>

                      {m.highlight && <span className="text-xs px-2 py-1 rounded-full bg-secondary text-white">Milestone</span>}
                    </div>

                    {m.bullets && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.bullets.slice(0, 2).map((b, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">{b}</span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2">
                      <button onClick={() => setActive(m)} className="text-xs font-medium underline">Read more</button>
                    </div>
                  </div>

                  {/* Dot centered on horizontal line (darker, with white border) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-5 h-5 rounded-full bg-secondary border-2 border-white z-40" />

                  {/* Date placed vertically opposite the card, centered horizontally under/above the dot */}
                  <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: dateTop }} className="font-semibold text-sm text-gray-800 z-10">
                    {m.year}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal / Read more */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActive(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-20 max-w-2xl w-[94%] bg-white rounded-2xl p-6 shadow-2xl" role="dialog" aria-modal="true">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gray-400">{active.year}</div>
                <h3 className="text-lg font-semibold">{active.title}</h3>
              </div>
              <button onClick={() => setActive(null)} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="mt-4 text-sm text-gray-700 space-y-3">
              {active.bullets && (
                <div className="flex flex-wrap gap-2">
                  {active.bullets.map((b, i) => (
                    <span key={i} className="text-sm px-3 py-1 bg-gray-100 rounded-full">{b}</span>
                  ))}
                </div>
              )}

              {active.body && <p className="pt-2 border-t border-gray-100">{active.body}</p>}
            </div>
          </motion.div>
        </div>
      )}

      <div className="mt-8 md:mt-12 text-sm text-gray-500">Tip: on mobile use the arrows to navigate the timeline horizontally.</div>
    </section>
  )
}
