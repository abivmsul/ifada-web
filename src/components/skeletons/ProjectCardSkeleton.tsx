// src/components/skeletons/ProjectCardSkeleton.tsx
'use client'

import React from 'react'
import Skeleton from '@/components/ui/Skeleton'

export default function ProjectCardSkeleton() {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* image placeholder */}
      <div className="relative h-44 w-full bg-gray-100">
        <Skeleton className="absolute inset-0 rounded-t-md" />
      </div>

      {/* content */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="mt-3 w-full flex justify-end">
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </article>
  )
}
