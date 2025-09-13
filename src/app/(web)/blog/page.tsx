// src/app/blog/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import BlogCard from '@/components/BlogCard'
import { fetchPostsList } from '@/lib/fetchers/posts'
import Link from 'next/link'

export const revalidate = 60

export default async function BlogIndex() {
  const posts = await fetchPostsList()

  return (
    <main>
      <SectionWrapper id="blog" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Posts </h1>
            <p className="text-sm text-secondary">Insights, news and reflections.</p>
          </div>
            <svg viewBox="0 0 1200 30" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0,8 L600,0 L1200,8 L600,16 Z" fill="rgba(255, 200, 0, 0.95)" />
            </svg>
          <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard
                key={p._id}
                title={p.title}
                excerpt={p.excerpt}
                imageUrl={p.coverImageUrl ?? undefined}
                href={`/blog/${p.slug ?? p._id}`}
                dateLabel={p.publishedLabel ?? undefined}
                tags={p.tags ?? []}
              />
            ))}
          </div>

          {/* <div className="mt-8 text-center">
            <Link href="/blog" className="text-primary underline">View all posts</Link>
          </div> */}
        </div>
      </SectionWrapper>
    </main>
  )
}
