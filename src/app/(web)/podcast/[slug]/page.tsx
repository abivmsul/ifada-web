// src/app/podcast/[slug]/page.tsx
import { fetchPodcastBySlug } from '@/lib/fetchers/podcasts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import SectionWrapper from '@/components/SectionWrapper'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import PortableTextRenderer from '@/components/PortableTextRenderer'

export const revalidate = 60

// local Props shape used after awaiting/casting
interface Props {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function PodcastDetail(props: unknown) {
  // await props (Next may pass promise-like params) then cast to our Props shape
  const { params } = (await props) as Props
  const { slug } = params

  const episode = await fetchPodcastBySlug(slug)
  if (!episode) return notFound()

  return (
    <main>
      <SectionWrapper id="podcast-detail" className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          {episode.coverImageUrl && (
            <div className="relative w-full h-60 md:h-96 rounded overflow-hidden mb-6">
              <Image src={episode.coverImageUrl} alt={episode.title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            <span className="text-secondary">
              {episode.episodeNumber ? `Episode ${episode.episodeNumber} • ` : ''}
            </span>
            {episode.publishedLabel ?? ''}
            {episode.duration ? ` • ${episode.duration}` : ''}
          </div>

          {/* embed */}
          <div className="mb-6">
            <YouTubeEmbed url={episode.youtubeUrl ?? ''} title={episode.title ?? 'Podcast episode'} />
          </div>

          {episode.excerpt && <p className="text-gray-700 mb-4">{episode.excerpt}</p>}

          {episode.body && (
            <article className="prose max-w-none">
              <PortableTextRenderer value={episode.body} />
            </article>
          )}

          <div className="mt-6">
            <a
              href={episode.youtubeUrl ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="bg-secondary text-white px-4 py-2 rounded"
            >
              Open on YouTube
            </a>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
