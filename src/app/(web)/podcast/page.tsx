// src/app/podcast/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import { fetchPodcastList } from '@/lib/fetchers/podcasts'
import PodcastCard from '@/components/PodcastCard'
import Link from 'next/link'

export const revalidate = 60

export default async function PodcastPage() {
  const episodes = await fetchPodcastList()

  return (
    <main>
      <SectionWrapper id="podcast" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Podcast</h1>
              <p className="text-sm text-gray-600">Listen to our latest episodes on YouTube.</p>
            </div>
            <Link href="/contact" className="text-sm text-primary underline">Suggest an episode</Link>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map(ep => (
              <PodcastCard
                key={ep._id}
                title={ep.title}
                episodeNumber={ep.episodeNumber}
                excerpt={ep.excerpt}
                slug={ep.slug}
                youtubeUrl={ep.youtubeUrl}
                coverImageUrl={ep.coverImageUrl ?? undefined}
                publishedLabel={ep.publishedLabel ?? undefined}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
