// src/components/ProjectsSection.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProjectItem } from '@/lib/fetchers/projects'

type Props = {
  projects: ProjectItem[]
  backgroundImage?: string | null
  alt?: string
}

export default function ProjectsSection({ projects = [], backgroundImage = null, alt = 'Projects background' }: Props) {
  const displayed = (projects || []).slice(0, 3) // show up to 3

  return (
    <section className="relative overflow-hidden">
      {/* Background image (blurred, scaled) */}
      <div className="absolute inset-0 -z-10">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={alt}
            fill
            priority={false}
            sizes="100vw"
            style={{ objectFit: 'cover', transform: 'scale(1.03)' }}
            className="filter-blur-backdrop"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/15 to-transparent" />
        )}

        {/* dark overlay to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent mix-blend-multiply" />
      </div>

      {/* Frosted container */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto rounded-2xl overflow-visible">
          {/* Frosted panel: translucent + backdrop blur */}
          <div className="relative rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 md:p-8">
            {/* optional: small top label */}
            <div className="mb-4 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">Featured Projects</h2>
              <p className="text-sm text-white/80 mt-1">A selection of our latest and most impactful work</p>
            </div>

            {/* Cards grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.map((p, i) => (
                <motion.article
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={p.slug ? `/projects/${p.slug}` : '#'} className="block">
                    <div className="relative h-44 w-full bg-gray-100">
                      {p.coverImageUrl ? (
                        <Image
                          src={p.coverImageUrl}
                          alt={p.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="h-44 bg-gray-100" />
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{p.title}</h3>
                      {p.excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{p.excerpt}</p>}
                      <div className="mt-4">
                        <span className="text-primary font-medium">Explore project →</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <Link href="/projects" className="inline-block px-6 py-2 border border-white/30 text-white rounded hover:bg-white/10 transition">
                View all projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
