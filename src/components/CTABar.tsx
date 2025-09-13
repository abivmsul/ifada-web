// src/components/CTABar.tsx
'use client'
import Button from './Button'
import Link from 'next/link'

export default function CTABar({ title, subtitle, ctaText, ctaLink }: { title:string; subtitle?:string; ctaText?:string; ctaLink?:string }) {
  return (
    <section className="py-12 bg-gradient-to-r from-primary to-primary-600 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          {subtitle && <p className="mt-2 text-white/90">{subtitle}</p>}
        </div>

        <div>
          {ctaLink ? <Link href={ctaLink}><Button className="mt-8 inline-block bg-secondary text-white px-6 py-3 rounded-full shadow-lg">{ctaText}</Button></Link> : <Button>{ctaText}</Button>}
        </div>
      </div>
    </section>
  )
}
