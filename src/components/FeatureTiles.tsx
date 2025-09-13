// src/components/FeatureTiles.tsx
'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaBookOpen,
  FaHandsHelping,
  FaComments,
  FaPuzzlePiece,
  FaHeart,
  FaUsers,
} from 'react-icons/fa'

const tiles = [
  { title: 'With joined arms', text: 'በተያያዙ ክንዶች', icon: FaHandsHelping },
  { title: 'In an Islamic family', text: 'በኢስላማዊ ቤተሰብነት', icon: FaUsers },
  { title: 'Remembering what was forgotten', text: 'የተረሳውን ማስታወስ', icon: FaComments },

  // New ones
  { title: 'Filling what was missing', text: 'የጎደለውን መሙላት', icon: FaPuzzlePiece },
  { title: 'Connecting hearts', text: 'በልብ ለልብ ትስስር', icon: FaHeart },
  { title: 'Reminding about Islam', text: 'ስለ እስልምና መተዋወስ', icon: FaBookOpen },
]

export default function FeatureTiles() {
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const topOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 0.45, 0.75, 1])
  const topScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.98, 1.02, 1])
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 0.35, 0.7, 1])
  const bottomScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.98, 1.01, 1])

  return (
    <section ref={ref} className="relative py-8">
      {/* Top decorative bar */}
      
      <motion.div
        style={{ opacity: topOpacity, scale: topScale }}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -top-6 h-8 md:-top-8 md:h-10"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ft-top-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#0057B8" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#0057B8" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
            </linearGradient>
            <filter id="ft-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feBlend in="SourceGraphic" in2="b" mode="normal" />
            </filter>
          </defs>
          <rect
            x="0"
            y="0"
            width="1200"
            height="10"
            fill="url(#ft-top-grad)"
            filter="url(#ft-blur)"
          />
          <path
            d="M0 28 C200 10, 400 40, 600 28 C800 16, 1000 36, 1200 20"
            stroke="#0057B8"
            strokeOpacity="0.06"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Content container */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-white rounded-lg shadow-elevate overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-primary/10" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/10" />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 p-6">
            {tiles.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 p-3 rounded-md bg-primary/10 text-primary">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t.title}</h3>
                    <p className="text-sm text-secondary mt-1">{t.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <motion.div
        style={{ opacity: bottomOpacity, scale: bottomScale }}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -bottom-6 h-8 md:-bottom-8 md:h-10"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ft-bottom-grad" x1="1" x2="0" y1="0" y2="0">
              <stop offset="0%" stopColor="#D9A03C" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#D9A03C" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
            </linearGradient>
            <filter id="ft-blur-b" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feBlend in="SourceGraphic" in2="b" mode="normal" />
            </filter>
          </defs>
          <rect
            x="0"
            y="0"
            width="1200"
            height="10"
            fill="url(#ft-bottom-grad)"
            filter="url(#ft-blur-b)"
          />
          <path
            d="M0 12 C200 30, 400 6, 600 14 C800 24, 1000 8, 1200 18"
            stroke="#D9A03C"
            strokeOpacity="0.06"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </motion.div>
    </section>
  )
}
