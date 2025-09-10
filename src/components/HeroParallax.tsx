// src/components/HeroParallax.tsx
'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button'
import Link from 'next/link'
import BackgroundPattern from './BackgroundPattern'
import React from 'react'

type Props = {
  title: string
  subtitle?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
  watermarkSide?: 'left' | 'right'
  overlayStrength?: number // 0..1, default 0.6 (higher = darker)
}

export default function HeroParallax({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaLink,
  watermarkSide = 'left',
  overlayStrength = 0.6,
}: Props) {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 500], [0, -80])
  const contentY = useTransform(scrollY, [0, 500], [0, -18])

  const overlay = Math.max(0, Math.min(1, overlayStrength))

  return (
    <header className="relative h-[72vh] md:h-[82vh] overflow-hidden flex items-center justify-center text-center">
      {/* background + overlays */}
      <motion.div
        style={{ y: bgY } as any}
        className="absolute inset-0 z-0"
        aria-hidden
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="hero-bg-image"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary to-primary/70" />
        )}

        {/* Softer gradient overlay */}
        <div
          style={{
            background: `linear-gradient(90deg,
              rgba(2,34,70,${overlay * 0.5}) 0%,
              rgba(2,34,70,${overlay * 0.35}) 25%,
              rgba(0,0,0,${overlay * 0.25}) 75%,
              rgba(0,0,0,0) 100%)`,
          }}
          className="absolute inset-0"
        />

        {/* Softer veil */}
        <div className="absolute inset-0 bg-black/20" />

        {/* vignette */}
        <div
          style={{
            background:
              'radial-gradient(60% 50% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.29) 60%, rgba(0, 0, 0, 0.47) 100%)',
            pointerEvents: 'none',
          }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* watermark logo */}
      <motion.div
        style={{ y: contentY }}
        className={`absolute inset-y-0 ${
          watermarkSide === 'left' ? 'left-0' : 'right-0'
        } w-1/2 pointer-events-none z-5`}
      >
        <Image
          src="/ifada-logo.svg"
          alt="watermark"
          fill
          style={{
            objectFit: 'cover',
            objectPosition:
              watermarkSide === 'left' ? 'left center' : 'right center',
          }}
          className="logo-watermark"
          priority
        />
      </motion.div>

      {/* decorative pattern */}
      <BackgroundPattern
        side={watermarkSide === 'left' ? 'right' : 'left'}
        className="hidden md:block text-white/06 z-10"
      />

      {/* centered content */}
      <motion.div
        style={{ y: contentY } as any}
        className="relative z-20 flex flex-col items-center justify-center px-6 max-w-4xl"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-lg md:text-2xl text-white/90 drop-shadow-sm max-w-2xl">
            {subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          {ctaText && ctaLink && (
            <Link href={ctaLink} className="inline-block">
              <Button>{ctaText}</Button>
            </Link>
          )}

          <a
            href="#projects"
            className="inline-flex items-center text-white/90 underline hover:text-white transition"
          >
            View projects
          </a>
        </div>
      </motion.div>

      {/* subtle bottom wave separator */}
      {/* subtle bottom SVG separator */}
      <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" className="w-full h-full"><path d="M0,0 V20 L1200,0 Z" fill="rgba(255, 200, 0, 0.95)"/></svg>
      </div>

      <style jsx>{`
        .hero-bg-image {
          filter: brightness(${1 - overlay * 0.4}) contrast(0.98) saturate(0.98);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-image {
            transition: none !important;
          }
        }
      `}</style>
    </header>
  )
}
