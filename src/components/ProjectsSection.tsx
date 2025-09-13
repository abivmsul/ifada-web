'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ProjectItem } from '@/lib/fetchers/projects'
import styles from './ProjectsSection.module.css'
import NavLink from './NavLink'

// Define proper types for the extended project properties
interface ExtendedProjectItem extends ProjectItem {
  startLabel?: string;
  startDate?: string;
  endLabel?: string;
  endDate?: string;
  status?: string;
}

type Props = {
  projects: ExtendedProjectItem[]
  backgroundStaticPath?: string | null
}

function buildDateLabel(p: ExtendedProjectItem) {
  // prefer already formatted labels (from server), otherwise try simple fallback
  const start = p.startLabel ?? p.startDate ?? null
  const end = p.endLabel ?? p.endDate ?? null
  if (start && end) {
    return `${start} — ${end}`
  }
  return start ?? end ?? null
}

export default function ProjectsSection({
  projects = [],
  backgroundStaticPath = '/images/background.jpg',
}: Props) {
  const displayed = (projects || []).slice(0, 3) // show up to 3

  const inlineStyle: React.CSSProperties | undefined = backgroundStaticPath
    ? { '--projects-bg': `url(${backgroundStaticPath})` } as React.CSSProperties
    : undefined

  return (
    <section
      className={styles.root}
      style={inlineStyle}
      aria-label="Featured projects section"
    >
      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Featured Projects</h2>
            <p className="text-sm text-white/85 mt-2 max-w-2xl mx-auto">
              A selection of our latest and most impactful work — join us and explore how we serve the community.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((p, i) => {
              const dateLabel = buildDateLabel(p)
              const isFeatured = Boolean(p.featured)
              const status = p.status ?? null

              return (
                <motion.article
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className={styles.card}
                >
                  <NavLink href={p.slug ? `/projects/${p.slug}` : '#'} className={styles.cardLink} aria-label={`Open project ${p.title}`}>
                    <div className={styles.media}>
                      {p.coverImageUrl ? (
                        // Replace img with Next.js Image component
                        <div className="relative w-full h-full">
                          <Image
                            src={p.coverImageUrl}
                            alt={p.title ?? 'Project cover'}
                            fill
                            style={{ objectFit: 'cover' }}
                            className={styles.mediaImg}
                          />
                        </div>
                      ) : (
                        <div className={styles.mediaPlaceholder} aria-hidden />
                      )}

                      {/* badges in the image corner */}
                      <div className={styles.badgeRow}>
                        {isFeatured && <span className={styles.featuredBadge} title="Featured">★ Featured</span>}
                        {status && <span className={styles.statusBadge}>{status}</span>}
                      </div>

                      <div className={styles.mediaTitle}>
                        {/* <h3 className="text-lg font-semibold leading-tight">{p.title}</h3> */}
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                       <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                      <p className={styles.excerpt}>
                        {p.excerpt ? p.excerpt : 'Learn more about this project and the difference it makes in the community.'}
                      </p>

                      <div className={styles.meta}>
                        {dateLabel ? <span className={styles.dateBadge}>{dateLabel}</span> : <span className={styles.datePlaceholder} />}
                        <span className={styles.spacer} />
                        <span className={styles.cta}>Explore project →</span>
                      </div>
                    </div>
                  </NavLink>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-6 text-center">
        <NavLink
            href="/projects"
            className="inline-block px-6 py-2 border border-white text-white rounded-lg 
                      transition-all duration-300 ease-in-out 
                      hover:bg-primary hover:text-white hover:shadow-lg hover:scale-[1.02]"
          >
            View all Projects
        </NavLink>

      </div>
        </div>
      </div>
    </section>
  )
}