// // src/app/page.tsx
// import HeroEnhanced from '@/components/HeroEnhanced'
// import FeatureTiles from '@/components/FeatureTiles'
// import EventsStrip from '@/components/EventsStrip'
// import ResourcesGrid from '@/components/ResourcesGrid'
// import StatsCounter from '@/components/StatsCounter'
// import CTABar from '@/components/CTABar'
// import SectionWrapper from '@/components/SectionWrapper'
// import Footer from '@/components/Footer'
// import ProjectsSection from '@/components/ProjectsSection' // new component (client)
// import { fetchFeaturedProjects } from '@/lib/fetchers/projects'
// import { fetchFeaturedEvents } from '@/lib/fetchers/events'
// import EventsSection from '@/components/EventsSection'

// export const revalidate = 60
// export default async function HomePage() {
//   const projects = await fetchFeaturedProjects(3) // server-side fetch
//    const events = await fetchFeaturedEvents(3)
//   // ... other mock lists (events/resources) remain or you can fetch them similarly
//   const stats = [
//     { id: 's1', label: 'Students taught', value: 1200 },
//     { id: 's2', label: 'Volunteers', value: 350 },
//     { id: 's3', label: 'Events held', value: 150 },
//     { id: 's4', label: 'Years serving', value: 20 },
//   ]

//   return (
//     <>
//       <HeroEnhanced
//         title="Empowering Our Community"
//         subtitle="Knowledge • Faith • Service"
//         ctaText="Explore Projects"
//         ctaLink="/projects"
//         imageUrl="https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG"
//       />

//       <SectionWrapper className="pt-12 pb-8">
//         <FeatureTiles />
//       </SectionWrapper>

//       <SectionWrapper id="projects" className="py-12 bg-white">
//          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Featured Projects</h2>
//         <ProjectsSection projects={projects} />
//       </SectionWrapper>

//     <SectionWrapper id="events" className="py-10">
//         <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Upcoming Events</h2>
//         <EventsSection events={events} />
//       </SectionWrapper>
      
//       <SectionWrapper className="py-16">
//         <div className="max-w-5xl mx-auto">
//           <StatsCounter stats={stats} />
//         </div>
//       </SectionWrapper>
 
//       <CTABar title="Support our work — Join or donate" subtitle="Help us deliver programs and services." ctaText="Donate" ctaLink="/donate" />
//     </>
//   )
// }

// src/app/page.tsx
import HeroParallax from '@/components/HeroParallax'
import SectionWrapper from '@/components/SectionWrapper'
import FeatureTiles from '@/components/FeatureTiles'
import ProjectsSection from '@/components/ProjectsSection'
import EventsSection from '@/components/EventsSection'
import StatsCounter from '@/components/StatsCounter'
import CTABar from '@/components/CTABar'

import { fetchFeaturedProjects } from '@/lib/fetchers/projects'
import { fetchFeaturedEvents } from '@/lib/fetchers/events'
export const revalidate = 60

const amirs = "/images/ifada-amirs.jpg"
export default async function HomePage() {
  const projects = await fetchFeaturedProjects(3)
  const events = await fetchFeaturedEvents(3)

  // sample resources + stats (replace with real fetchers later)
  const stats = [
    { id: 's1', label: 'Active participants who drive change', value: 500 },
    { id: 's2', label: 'Leaders who inspire communities (Amirs)', value: 80 },
    { id: 's3', label: 'Hadras', value: 50 },
  ]
  return (
    <>
      <HeroParallax
        title="Connecting youth with spirituality and fulfilling social responsibility"
        subtitle="رَبِّي فَاجْعَلْ مُجْتَمَعَنَا غَايَةُ حُسْنِ الْخِتَامِ"
        ctaText="Explore More"
        ctaLink="/about"
        imageUrl={amirs}
        watermarkSide="left"
      />

      <SectionWrapper className="section-tight">
        <FeatureTiles />
      </SectionWrapper>

      <SectionWrapper id="projects" className="section-tight bg-white" overlap="up">
        <div className=" bottom-0 left-0 right-0 h-12 pointer-events-none z-20">
       <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path d="M1200,0 V20 L0,0 Z" fill="rgba(255, 200, 0, 0.95)" /> </svg>
        </div>
        
        <ProjectsSection projects={projects} />
      </SectionWrapper>

      <SectionWrapper id="events" className="section-tight" overlap="up">
        <div className=" bottom-0 left-0 right-0 h-12 pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" className="w-full h-full"><path d="M0,0 V20 L1200,0 Z" fill="rgba(255, 200, 0, 0.95)"/></svg>
      </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Upcoming Events</h2>
        <EventsSection events={events} />
      </SectionWrapper>

      {/* <SectionWrapper className="section-tight bg-gray-50" overlap="up">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Latest Resources</h2>
        <ResourcesGrid items={resources} />
      </SectionWrapper> */}

      <SectionWrapper className="section-tight">
        <div className=" bottom-0 left-0 right-0 h-12 pointer-events-none z-20">
       <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path d="M1200,0 V20 L0,0 Z" fill="rgba(255, 200, 0, 0.95)" /> </svg>
        </div>
         <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Stats</h2>
        <div className="max-w-5xl mx-auto">
          <StatsCounter stats={stats} />
        </div>
      </SectionWrapper>

      <CTABar
        title="Support our work — Join or donate"
        subtitle="Help us deliver Projects, events and services that uplift the community."
        ctaText="Join / Donate"
        ctaLink="/donate"
      />

    </>
  )
}
