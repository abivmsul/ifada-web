// // src/app/programs/page.tsx
// import Hero from '@/components/Hero'
// import SectionWrapper from '@/components/SectionWrapper'
// import Card from '@/components/Card'
// import Link from 'next/link'
// import Button from '@/components/Button'

// export const metadata = {
//   title: 'Programs — Ifada',
//   description: 'Explore our education, counseling and outreach programs.',
// }

// const MOCK_PROGRAMS = [
//   { title: 'Youth Classes', imageUrl: '/images/youth.jpg', href: '/programs/youth-classes', excerpt: 'Quran, tajweed and character.' },
//   { title: 'Community Outreach', imageUrl: '/images/outreach.jpg', href: '/programs/community-outreach', excerpt: 'Food drives & interfaith events.' },
//   { title: 'Counseling Services', imageUrl: '/images/counsel.jpg', href: '/programs/counseling-services', excerpt: 'Family & youth support.' },
// ]

// export default function ProgramsPage() {
//   return (
//     <main>
//       <Hero
//         title="Our Programs"
//         subtitle="Education, outreach, and support for every stage of life."
//         imageUrl="https://ifadaislamic.org/images/showcase-img/programs-hero.jpg"
//         ctaText="Join a Program"
//         ctaLink="/contact"
//       />

//       <SectionWrapper id="programsList" className="bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <h3 className="text-3xl font-semibold text-center mb-6">Featured Programs</h3>
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {MOCK_PROGRAMS.map((p) => (
//               <Card
//                 key={p.title}
//                 title={p.title}
//                 imageUrl={p.imageUrl}
//                 excerpt={p.excerpt}
//                 href={p.href}
//               />
//             ))}
//           </div>
//         </div>
//       </SectionWrapper>
//     </main>
//   )
// }


// src/app/programs/page.tsx
// src/app/programs/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import ProgramsListClient from '@/components/ProgramsListClient'
import { fetchProgramsServer } from '@/lib/fetchers/programs'

export const revalidate = 60

export default async function ProgramsPage() {
  // fetch first page for SEO (page=1)
  const initial = await fetchProgramsServer({ page: 1, pageSize: 9 })
  return (
    <main>
      <SectionWrapper id="programs" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Ifada Hadrels</h1>
            {/* you can add extra server-side links/buttons here if needed */}
          </div>

          {/* Client component receives initial data */}
          <ProgramsListClient initialData={initial} />
        </div>
      </SectionWrapper>
    </main>
  )
}
