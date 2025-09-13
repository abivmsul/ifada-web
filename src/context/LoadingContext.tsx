// src/context/LoadingContext.tsx
'use client'

import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type LoadingCtx = {
  show: (opts?: { reason?: string; target?: string }) => void
  hide: () => void
  isLoading: boolean
  targetPath?: string | null
}

const LoadingContext = createContext<LoadingCtx | null>(null)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [targetPath, setTargetPath] = useState<string | null>(null)

  // ensure overlay stays visible at least this long to avoid flicker
  const minShowMs = 300
  const showTimestamp = useRef<number | null>(null)
  const hideTimer = useRef<number | null>(null)

  const show = useCallback((opts?: { reason?: string; target?: string }) => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
    if (opts?.target) setTargetPath(opts.target)
    showTimestamp.current = Date.now()
    setIsLoading(true)
  }, [])

  const hide = useCallback(() => {
    const since = showTimestamp.current ? Date.now() - showTimestamp.current : Infinity
    const finishHide = () => {
      setIsLoading(false)
      showTimestamp.current = null
      setTargetPath(null)
    }

    if (since >= minShowMs) {
      finishHide()
    } else {
      const remaining = Math.max(0, minShowMs - (showTimestamp.current ? Date.now() - showTimestamp.current : 0))
      hideTimer.current = window.setTimeout(() => {
        finishHide()
        hideTimer.current = null
      }, remaining)
    }
  }, [])

  // watch pathname changes — when the route changes to the targetPath, hide the overlay
  const pathname = usePathname()
  useEffect(() => {
    if (!isLoading) return
    if (!targetPath) return
    // normalize by removing trailing slash for comparison
    const normalize = (p?: string | null) => (p ? p.replace(/\/+$/, '') : '')
    const current = normalize(pathname)
    const target = normalize(targetPath)
    // If the current path matches (or startsWith for routes that are subpaths), hide overlay
    try {
      if (current === target || current.startsWith(target + '/')) {
        hide()
      }
    } catch {
      // fallback: hide in case of errors
      hide()
    }
    // intentionally depend on pathname and targetPath
  }, [pathname, targetPath, isLoading, hide])

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading, targetPath }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be used inside LoadingProvider')
  return ctx
}
