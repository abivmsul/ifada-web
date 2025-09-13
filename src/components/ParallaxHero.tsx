'use client'
import { ParallaxBanner } from 'react-scroll-parallax'
import { motion } from 'framer-motion'
import Link from 'next/link'
import NavLink from './NavLink'

interface ParallaxHeroProps {
  title: string
  subtitle?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
}

export default function ParallaxHero({ title, subtitle, imageUrl, ctaText, ctaLink }: ParallaxHeroProps) {
  return (
    <ParallaxBanner
      className="h-screen relative"
      layers={[
        { image: imageUrl ?? '', speed: -20 },
        // you can add more layers if desired
      ]}
      style={{ backgroundColor: '#000' }}
    >
      <div className="absolute inset-0 bg-black/45 flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-4 text-lg md:text-2xl text-white/90 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}

        {ctaText && ctaLink && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <NavLink href={ctaLink} className="mt-8 inline-block bg-secondary text-white px-4 py-2 rounded shadow-lg">
              {ctaText}
            </NavLink>
          </motion.div>
        )}
      </div>
    </ParallaxBanner>
  )
}
