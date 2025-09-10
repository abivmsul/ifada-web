// src/app/projects/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import ProjectsListClient from '@/components/ProjectsListClient'
import { fetchProjectsServer } from '@/lib/fetchers/projects'

export const revalidate = 60

export default async function ProjectsPage() {
  const initial = await fetchProjectsServer({ page: 1, pageSize: 9 })
  return (
    <main>
      <SectionWrapper id="projects" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Projects</h1>
            <p className="text-sm text-gray-600">Portfolio of our completed and upcoming work.</p>
          </div>

          <ProjectsListClient initialData={initial} />
        </div>
      </SectionWrapper>
    </main>
  )
}
