// src/app/podcast/[slug]/page.tsx
import { fetchPodcastBySlug } from '@/lib/fetchers/podcasts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import SectionWrapper from '@/components/SectionWrapper'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { PortableTextBlock } from '@portabletext/types'

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

  // Narrow frequently-used fields so JSX doesn't see `unknown`
  const title = episode.title as string | undefined
  const coverImageUrl = episode.coverImageUrl as string | undefined
  const episodeNumber = typeof episode.episodeNumber === 'number' ? episode.episodeNumber : undefined
  const publishedLabel = episode.publishedLabel as string | undefined
  const duration = episode.duration as string | undefined
  const youtubeUrl = episode.youtubeUrl as string | undefined

  // excerpt and body were `unknown` — narrow them
  const excerpt = episode.excerpt as string | undefined
  const body = episode.body as PortableTextBlock[] | undefined

  return (
    <main>
      <SectionWrapper id="podcast-detail" className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          {coverImageUrl && (
            <div className="relative w-full h-60 md:h-96 rounded overflow-hidden mb-6">
              <Image src={coverImageUrl} alt={title ?? 'Podcast episode'} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            <span className="text-secondary">
              {episodeNumber ? `Episode ${episodeNumber} • ` : ''}
            </span>
            {publishedLabel ?? ''}
            {duration ? ` • ${duration}` : ''}
          </div>

          {/* embed */}
          <div className="mb-6">
            <YouTubeEmbed url={youtubeUrl ?? ''} title={title ?? 'Podcast episode'} />
          </div>

          {excerpt && <p className="text-gray-700 mb-4">{excerpt}</p>}

          {body && (
            <article className="prose max-w-none">
              <PortableTextRenderer value={body} />
            </article>
          )}

          <div className="mt-6">
            <a
              href={youtubeUrl ?? '#'}
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
