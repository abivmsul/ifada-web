// src/components/SectionWrapper.tsx
'use client'
import { motion } from 'framer-motion'
import React from 'react'
import cn from 'classnames'

type Props = {
  id?: string
  children: React.ReactNode
  className?: string
  overlap?: 'up' | 'down' | false
}

export default function SectionWrapper({ id, children, className, overlap = false }: Props) {
  const overlapClass = overlap === 'up' ? 'md:-mt-14' : ''
  return (
    <motion.section
      id={id}
      className={cn('px-4 md:px-6', className, overlapClass)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
    >
      {children}
    </motion.section>
  )
}
