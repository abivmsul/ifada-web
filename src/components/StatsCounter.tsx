// src/components/StatsCounter.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export default function StatsCounter({ stats }: { stats: { id:string; label:string; value:number }[] }) {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-4">
      {stats.map((s) => <Stat key={s.id} label={s.label} value={s.value} />)}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let raf = 0
    let started = false

    function step() {
      setCount((prev) => {
        const next = Math.min(value, Math.floor(prev + value / 30))
        return next
      })
      if (count < value) raf = requestAnimationFrame(step)
    }

    // observe when visible
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !started) {
          started = true
          raf = requestAnimationFrame(step)
        }
      })
    }, { threshold: 0.3 })

    if (ref.current) obs.observe(ref.current)

    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div ref={ref} className="bg-white rounded-lg p-6 text-center shadow-elevate">
      <div className="text-3xl font-bold text-primary">{count}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  )
}
