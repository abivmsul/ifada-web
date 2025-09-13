// src/components/LoadingOverlay.tsx
'use client'

import { useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'
import cn from 'classnames'

export default function LoadingOverlay() {
  const { isLoading } = useLoading()

  // optional: disable body scroll while loading
  useEffect(() => {
    if (isLoading) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isLoading])

  return (
    <div
      aria-hidden={!isLoading}
      className={cn(
        'pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200',
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0'
      )}
    >
      {/* dim + blur background */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

      {/* centered panel */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-6 rounded-lg">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10">
          {/* spinner */}
          <svg className="w-10 h-10 animate-spin text-secondary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>

        <div className="text-white text-center">
          <p className="text-lg font-semibold">Loading…</p>
          <p className="text-sm text-white/80">Please wait while it loads.</p>
        </div>
      </div>
    </div>
  )
}
