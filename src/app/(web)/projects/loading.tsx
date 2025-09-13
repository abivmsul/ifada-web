// src/app/projects/loading.tsx
import SectionWrapper from '@/components/SectionWrapper'
import ProjectsListSkeleton from '@/components/skeletons/ProjectsListSkeleton'

export default function LoadingProjects() {
  return (
    <main>
      <SectionWrapper id="projects" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-sm text-secondary">Portfolio of our work.</p>
          </div>

          <svg viewBox="0 0 1200 30" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0,8 L600,0 L1200,8 L600,16 Z" fill="rgba(255, 200, 0, 0.95)" />
          </svg>

          <div className="mt-6">
            <ProjectsListSkeleton count={9} />
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
