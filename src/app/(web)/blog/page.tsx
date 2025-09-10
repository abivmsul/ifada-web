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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Blogs / News ...</h1>
            <p className="text-sm text-gray-600">Insights, news and reflections.</p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
