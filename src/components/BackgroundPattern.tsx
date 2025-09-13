// src/components/BackgroundPattern.tsx
'use client'
export default function BackgroundPattern({ className = '', side = 'right' }: { className?: string; side?: 'left' | 'right' }) {
  const transform = side === 'left' ? 'translate(-10%, -5%)' : 'translate(10%, -5%)'
  const anchor = side === 'left' ? 'left-0 -translate-x-1/3' : 'right-0 translate-x-1/3'
  return (
    <div className={`pointer-events-none absolute top-10 ${anchor} ${className}`} style={{ transform }}>
      <svg width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
        <defs/>
        <g opacity="0.9">
          <circle cx="190" cy="190" r="160" stroke="currentColor" strokeWidth="1" />
          {/* geometric / arabesque like pattern — keep simple for performance */}
          <path d="M190 40 L230 120 L310 120 L245 170 L270 250 L190 200 L110 250 L135 170 L70 120 L150 120 Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
        </g>
      </svg>
    </div>
  )
}
