// src/app/blog/[slug]/page.tsx
import { fetchPostBySlug } from '@/lib/fetchers/posts'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SectionWrapper from '@/components/SectionWrapper'
import PortableTextRenderer from '@/components/PortableTextRenderer'

export const revalidate = 60

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug)
  if (!post) return notFound()

  return (
    <main>
      <SectionWrapper id="post" className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {post.coverImageUrl && (
            <div className="relative h-64 md:h-96 mb-8 rounded overflow-hidden">
              <Image src={post.coverImageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            {post.publishedLabel} {post.authorName ? ` • ${post.authorName}` : ''}
          </div>

          {/* Portable text content — this respects the exact block and mark types from Sanity */}
          <article className="prose max-w-none">
            <PortableTextRenderer value={post.body} />
          </article>

          {/* tags */}
          {post.tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((t: string) => (
                <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>
              ))}
            </div>
          ) : null}
        </div>
      </SectionWrapper>
    </main>
  )
}
