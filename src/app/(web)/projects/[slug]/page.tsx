// src/app/projects/[slug]/page.tsx
import { getProjectBySlug } from '@/lib/fetchers/projects'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SectionWrapper from '@/components/SectionWrapper'
import PortableTextRenderer from '@/components/PortableTextRenderer'

export const revalidate = 60

// Local props shape used after awaiting/casting
interface Props {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProjectDetail(props: unknown) {
  // await props (Next may provide promise-like params) and cast to our Props shape
  const { params } = (await props) as Props
  const { slug } = params

  const project = await getProjectBySlug(slug)
  if (!project) return notFound()

  return (
    <main>
      <SectionWrapper id="project-detail" className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          {project.coverImageUrl && (
            <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
              <Image src={project.coverImageUrl} alt={project.title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          <h1 className="text-3xl text-primary font-bold mb-2">{project.title}</h1>

          <div className="text-sm text-secondary mb-4">
            {project.status ? project.status.toUpperCase() : ''}
            {project.startLabel ? ` • ${project.startLabel}` : ''}
          </div>

          {project.excerpt && <p className="text-gray-900 mb-6">{project.excerpt}</p>}

          {project.body && (
            <div className="prose max-w-none">
              <PortableTextRenderer value={project.body} />
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}
