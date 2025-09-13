// src/components/TopProgressBar.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'

export default function TopProgressBar() {
  const pathname = usePathname()
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    // when pathname changes, start NProgress after a short delay (avoid quick flashes)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      NProgress.start()
    }, 80)

    // finish after short time or on cleanup
    const finish = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
      NProgress.done()
    }

    // finish NProgress when route change settles (we'll call after a small timeout)
    const finishTimeout = window.setTimeout(finish, 900) // safety finish after 900ms

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      clearTimeout(finishTimeout)
      NProgress.done()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
