// src/components/Hero.tsx  (server component)
import ParallaxProviderClient from './ParallaxProviderClient'
import ParallaxHero from './ParallaxHero'
import Image from 'next/image'
import React from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
}

export default function Hero({ title, subtitle, imageUrl, ctaText, ctaLink }: HeroProps) {
  return (
    <>
      {/* Server-rendered SEO-friendly hero using next/image */}
      <section
        aria-label="Hero"
        className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-black text-white overflow-hidden"
      >
        {imageUrl && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        <div className="z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
          {subtitle && <p className="mt-3 text-lg md:text-xl text-white/90">{subtitle}</p>}
        </div>
      </section>

      {/* Client-only interactive parallax */}
      <ParallaxProviderClient>
        <ParallaxHero
          title={title}
          subtitle={subtitle}
          imageUrl={imageUrl}
          ctaText={ctaText}
          ctaLink={ctaLink}
        />
      </ParallaxProviderClient>
    </>
  )
}
