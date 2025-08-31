// src/app/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import Card from '@/components/Card'
import EventCard from '@/components/EventCard'
import ResourceCard from '@/components/ResourceCard'
import Button from '@/components/Button'
import Link from 'next/link'

/**
 * Mock data for frontend (replace with Sanity fetch later)
 */
const programs = [
  {
    title: 'Youth Classes',
    imageUrl: '/images/youth.jpg',
    href: '/programs/youth-classes',
    excerpt: 'Weekly Quran & tajweed for ages 8–18.',
  },
  {
    title: 'Community Outreach',
    imageUrl: '/images/outreach.jpg',
    href: '/programs/community-outreach',
    excerpt: 'Food drives, interfaith panels & volunteer services.',
  },
  {
    title: 'Counseling Services',
    imageUrl: '/images/counsel.jpg',
    href: '/programs/counseling-services',
    excerpt: 'Family, youth and marital counseling.',
  },
]

const events = [
  {
    id: 'summer-lecture',
    title: 'Summer Lecture',
    date: '2025-08-10T18:00:00Z',
    location: 'Main Hall',
    imageUrl: 'https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG',
    excerpt: 'Tawhid in daily life — join us.',
  },
  {
    id: 'charity-bazaar',
    title: 'Charity Bazaar',
    date: '2025-09-05T10:00:00Z',
    location: 'Community Lawn',
    imageUrl: 'https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG',
    excerpt: 'Food, crafts and family fun.',
  },
]

const resources = [
  { title: 'Ramadan Guide', imageUrl: 'https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG', href: '/resources/ramadan-guide-2025', summary: 'Timetable, duas & tips.' },
  { title: 'Sermon Recording', imageUrl: 'https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG', href: '/resources/sermon-may-2025', summary: 'Audio & notes.' },
  { title: 'Volunteer Handbook', imageUrl: 'https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG', href: '/resources/volunteer', summary: 'How to get involved.' },
]

export default async function HomePage() {
  // If you add Sanity later, you can fetch here (server-side) and pass real data to components.
  // Example (placeholder):
  // const programs = await client.fetch(`*[_type == "program"] | order(order asc){...}`)
  //
  // For now we return UI with mock data.

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <Hero
        title="Empowering Our Community"
        subtitle="Knowledge  •  Faith  •  Service"
        imageUrl="https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG"
        ctaText="Read Our Story"
        ctaLink="/about"
      />
  
      {/* diagonal separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path d="M0,0 V120 L1200,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* ABOUT SNAPSHOT (light) */}
      <SectionWrapper id="about-snapshot" className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
          <div>
            <h2 className="text-3xl font-semibold mb-3">Who We Are</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Ifada Islamic Foundation brings faith-based education, community outreach,
              and counseling together under one roof to support and empower our neighbors.
            </p>
            <div className="flex gap-3">
              <Link href="/about"><Button>Read Our Story</Button></Link>
              {/* <Link href="/programs"><Button as="a" className="bg-white text-primary border">Programs</Button></Link> */}
              <Link href="/programs" passHref>
                <Button className="bg-white text-black">
                  Programs
                </Button>
              </Link>

            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="/images/about-snapshot.jpg" alt="About snapshot" className="w-full h-64 object-cover" />
          </div>
        </div>
      </SectionWrapper>

      {/* separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path d="M0,120 V0 L1200,120 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* FEATURED PROGRAMS (white) */}
      <SectionWrapper id="programs" className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Featured Programs</h3>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Card key={p.title} {...p} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/programs"><Button className="px-8">Explore All Programs</Button></Link>
          </div>
        </div>
      </SectionWrapper>

      {/* separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path d="M0,0 V120 L1200,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* UPCOMING EVENTS (light) */}
      <SectionWrapper id="events" className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Upcoming Events</h3>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
            {events.map((e) => (
              <div key={e.id} className="min-w-[300px] flex-shrink-0">
                <EventCard description={''} {...e} />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/events"><Button className="px-8">View All Events</Button></Link>
          </div>
        </div>
      </SectionWrapper>

      {/* separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path d="M0,120 V0 L1200,120 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* LATEST RESOURCES (white) */}
      <SectionWrapper id="resources" className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Latest Resources</h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <ResourceCard link={''} description={''} key={r.title} {...r} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/resources"><Button className="px-8">See All Resources</Button></Link>
          </div>
        </div>
      </SectionWrapper>

      {/* call to action */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path d="M0,0 V120 L1200,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      <SectionWrapper id="cta" className="bg-secondary text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">Stay Connected</h3>
          <p className="mb-6">Join our Telegram for real-time updates, event reminders and volunteer opportunities.</p>
          <div className="flex justify-center gap-4">
            <Button as="a" href="https://t.me/ifadaislamic">Join Telegram</Button>
            <Link href="/contact"><Button className="bg-white text-primary">Contact</Button></Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
