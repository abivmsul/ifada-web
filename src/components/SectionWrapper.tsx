'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import cn from 'classnames'

type SectionWrapperProps = {
  id?: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn('min-h-screen snap-start flex flex-col justify-center py-12 px-6', className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
