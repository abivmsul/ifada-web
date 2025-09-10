// src/components/HeroEnhanced.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Button from './Button'
import Link from 'next/link'

type Props = {
  title: string
  subtitle?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroEnhanced({ title, subtitle, imageUrl, ctaText, ctaLink }: Props) {
  return (
    <header className="relative h-[80vh] md:h-[90vh] flex items-center">
      {imageUrl && (
        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} sizes="100vw" priority className="object-center" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent mix-blend-multiply" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-5xl mx-auto px-6 text-white">
          <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12, duration: 0.6 }} className="mt-4 text-lg md:text-2xl text-white/90 max-w-3xl">
              {subtitle}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="mt-8 flex gap-4">
              {ctaText && ctaLink && (
                <Link href={ctaLink}><Button>{ctaText}</Button></Link>
              )}
              <a href="#programs" className="inline-flex items-center text-white/90 underline">View Programs</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* subtle scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 animate-bounce">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </header>
  )
}
