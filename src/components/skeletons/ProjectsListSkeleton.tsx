// src/components/skeletons/ProjectsListSkeleton.tsx
'use client'

import React from 'react'
import ProjectCardSkeleton from './ProjectCardSkeleton'

export default function ProjectsListSkeleton({ count = 9 }: { count?: number }) {
  const items = Array.from({ length: count }).map((_, i) => <ProjectCardSkeleton key={i} />)
  return <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{items}</div>
}
