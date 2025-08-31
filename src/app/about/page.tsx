// src/app/about/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import Timeline from '@/components/Timeline' // optional: create fallback if missing
import TeamGrid from '@/components/TeamGrid' // optional: create fallback if missing
import Link from 'next/link'
import Button from '@/components/Button'

export const metadata = {
  title: 'About — Ifada Islamic Foundation',
  description: 'Learn about our mission, history and team.',
}

export default function AboutPage() {
  return (
    <main>
      <Hero
        title="About Ifada Islamic Foundation"
        subtitle="Building a resilient, compassionate community"
        imageUrl="https://ifadaislamic.org/images/hadra-gallery/miras.jpg"
        ctaText="Our Programs"
        ctaLink="/programs"
      />

      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12"><path d="M0,0 V120 L1200,0 Z" fill="#f9fafb" /></svg>
      </div>

      <SectionWrapper id="mission" className="bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-3">Our Mission & Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to empower the community through faith-based education,
            compassionate outreach, and holistic support services.
          </p>
          <div className="mt-6">
            <Link href="/contact"><Button>Get In Touch</Button></Link>
          </div>
        </div>
      </SectionWrapper>

      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12"><path d="M0,120 V0 L1200,120 Z" fill="#ffffff" /></svg>
      </div>

      <SectionWrapper id="history" className="bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-6">Our History</h3>
          {/* Timeline component: show milestones */}
          <Timeline />
        </div>
      </SectionWrapper>

      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12"><path d="M0,0 V120 L1200,0 Z" fill="#f9fafb" /></svg>
      </div>

      <SectionWrapper id="team" className="bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h3>
          <TeamGrid />
        </div>
      </SectionWrapper>
    </main>
  )
}
