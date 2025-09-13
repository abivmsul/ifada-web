// src/app/about/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import Timeline from '@/components/Timeline'
import TeamGrid from '@/components/TeamGrid'
import Button from '@/components/Button'
import NavLink from '@/components/NavLink'
import Image from 'next/image';

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
            Ifada Islamic Organization empowers individuals and communities through faith-based education,
            community service, and compassionate support. We envision a community where knowledge,
            dignity, and spiritual growth are available to the youth.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-3">
            <NavLink href="/projects"><Button>Explore Projects</Button></NavLink>
            <NavLink href="/contact"><Button className='bg-secondary text-white'>Get in Touch</Button></NavLink>
          </div>
        </div>
      </SectionWrapper>

      {/* Values + Stats */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Our Values</h3>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold text-primary">Value 1</h4>
                <p className="text-sm text-gray-600">Value</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold text-primary">Value 2</h4>
                <p className="text-sm text-gray-600">Value</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold text-primary">Value 3</h4>
                <p className="text-sm text-gray-600">Value</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold text-primary">Value 4</h4>
                <p className="text-sm text-gray-600">Value</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg">
            <h4 className="text-2xl font-semibold mb-4 text-center">Impact in Numbers</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500<span className="text-secondary">+</span></div>
                <div className="text-sm text-gray-600">Active participants who drive change</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100<span className="text-secondary">+</span></div>
                <div className="text-sm text-gray-600">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">80<span className="text-secondary">+</span></div>
                <div className="text-sm text-gray-600">Leaders who inspire communities (Amirs)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50<span className="text-secondary">+</span></div>
                <div className="text-sm text-">Hadras</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-secondary text-center">Numbers are illustrative</p>
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
        <div className="max-w-6xl mx-auto px-6 mt-16 mb-16">
          <h3 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h3>
          <p className="max-w-3xl mx-auto text-center text-gray-700 mb-6">
            A diverse group of volunteers and staff who run programs, manage proojects, coordinate events, and manage outreach.
          </p>

          <TeamGrid />
        </div>
      </SectionWrapper>

      {/* Partners & CTA */}
      <SectionWrapper className="bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h4 className="text-2xl font-semibold mb-12">Our Partners</h4>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <Image src="/images/partner1.png" alt="partner 1" className="h-12 object-contain" width={300} height={300} />
            <Image src="/images/partner1.png" alt="partner 2" className="h-12 object-contain" width={300} height={300} />
            <Image src="/images/partner1.png" alt="partner 3" className="h-12 object-contain" width={300} height={300} />
          </div>

          <div className="max-w-3xl mx-auto">
            <h4 className="text-xl font-semibold mb-4">Join us in our mission</h4>
            <p className="text-gray-600 mb-4">Volunteer, donate, or partner with Ifada to support Projects and events.</p>
            <div className="flex justify-center gap-4">
              <NavLink href="/contact"><Button>Contact</Button></NavLink>
              <NavLink href="https://t.me/ifadaislamicorg1" > <Button className="bg-secondary hover:bg-telegram">
                            <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 240 240" fill="currentColor"><path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.24 80.8l-19.7 93.01c-1.49 6.92-5.4 8.66-10.94 5.4l-30.27-22.35-14.6 14.06c-1.61 1.61-2.94 2.94-5.99 2.94l2.12-30.27 55.12-49.73c2.4-2.4-.52-3.75-3.72-1.35l-68.08 42.8-29.3-9.15c-6.36-2-6.49-6.36 1.32-9.4l114.47-44.15c5.32-2 10.02 1.35 8.32 9.15z"/></svg> Join Telegram</span>
                          </Button></NavLink>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="h-12" />
    </main>
  )
}
