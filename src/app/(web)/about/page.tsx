// src/app/about/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import Timeline from '@/components/Timeline'
import TeamGrid from '@/components/TeamGrid'
import Link from 'next/link'
import Button from '@/components/Button'

export const metadata = {
  title: 'About — Ifada Islamic Foundation',
  description: 'Learn about our mission, history and team.',
}
const about = "/images/about.jpg"
export default function AboutPage() {
  return (
    <main>
      <Hero
        title="About Ifada Islamic Organization"
        subtitle="Connecting youth with spirituality and fulfilling social responsibility"
        // pass both names in case your Hero expects one or the other
        imageUrl={about}
        ctaText="Explore Our Gallery"
        ctaLink="/gallery"
      />

      {/* gentle diagonal separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12"><path d="M0,0 V120 L1200,0 Z" fill="#f8fafc" /></svg>
      </div>

      {/* Mission & Vision */}
      <SectionWrapper id="mission" className="bg-gray-50">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Mission & Vision</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Ifada Islamic Foundation empowers individuals and families through faith-based education,
            community service, and compassionate support. We envision a community where knowledge,
            dignity, and spiritual growth are available to everyone.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-3">
            <Link href="/programs"><Button>Explore Programs</Button></Link>
            <Link href="/contact"><Button>Get in Touch</Button></Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Values + Stats */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Our Values</h3>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Education</h4>
                <p className="text-sm text-gray-600">High-quality religious & secular learning for all ages.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Service</h4>
                <p className="text-sm text-gray-600">Community outreach & support for those in need.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Compassion</h4>
                <p className="text-sm text-gray-600">Care-driven support that preserves dignity.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Integrity</h4>
                <p className="text-sm text-gray-600">Transparent, accountable stewardship of resources.</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-4">Impact in Numbers</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-gray-600">Students taught</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">350+</div>
                <div className="text-sm text-gray-600">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150</div>
                <div className="text-sm text-gray-600">Community events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-gray-600">Years serving</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Numbers are illustrative — we will wire real stats from the CMS later.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* diagonal separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12"><path d="M0,120 V0 L1200,120 Z" fill="#ffffff" /></svg>
      </div>

      {/* History / Timeline */}
      <SectionWrapper id="history" className="bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-8">Our History & Milestones</h3>

          <p className="max-w-3xl mx-auto text-center text-gray-700 mb-8">
            A brief timeline of key moments in Ifada’s growth — from founding to our latest initiatives.
          </p>

          <Timeline />
        </div>
      </SectionWrapper>

      {/* diagonal separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12"><path d="M0,0 V120 L1200,0 Z" fill="#f8fafc" /></svg>
      </div>

      {/* Team */}
      <SectionWrapper id="team" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h3>
          <p className="max-w-3xl mx-auto text-center text-gray-700 mb-6">
            A diverse group of volunteers and staff who run programs, coordinate events, and manage outreach.
          </p>

          <TeamGrid />
        </div>
      </SectionWrapper>

      {/* Partners & CTA */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h4 className="text-2xl font-semibold mb-4">Our Partners</h4>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <img src="/images/partner1.png" alt="partner 1" className="h-12 object-contain" />
            <img src="/images/partner2.png" alt="partner 2" className="h-12 object-contain" />
            <img src="/images/partner3.png" alt="partner 3" className="h-12 object-contain" />
          </div>

          <div className="max-w-3xl mx-auto">
            <h4 className="text-xl font-semibold mb-2">Join us in our mission</h4>
            <p className="text-gray-600 mb-4">Volunteer, donate, or partner with Ifada to support programs and events.</p>
            <div className="flex justify-center gap-4">
              <Link href="/donate"><Button>Donate</Button></Link>
              <Link href="/contact"><Button>Volunteer</Button></Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="h-12" />
    </main>
  )
}
