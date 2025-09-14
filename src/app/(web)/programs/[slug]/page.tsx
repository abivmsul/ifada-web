// src/app/programs/[slug]/page.tsx
import { getProgramBySlug } from '@/lib/fetchers/programs'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SectionWrapper from '@/components/SectionWrapper'

export const revalidate = 60

// local Props shape used after awaiting/casting
interface Props {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProgramDetail(props: unknown) {
  // await props then cast to our Props shape to avoid Next's PageProps compile-time check
  const { params } = (await props) as Props
  const { slug } = params

  const program = await getProgramBySlug(slug)
  if (!program) return notFound()

  return (
    <main>
      <SectionWrapper id="program-detail" className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          {program.coverImageUrl && (
            <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
              <Image src={program.coverImageUrl} alt={program.title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
          {program.excerpt && <p className="text-secondary mb-6">{program.excerpt}</p>}

          {program.body && (
            <div className="prose max-w-none">
              <PortableTextRenderer value={program.body} />
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}
