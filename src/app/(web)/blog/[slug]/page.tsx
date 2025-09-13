// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SectionWrapper from '@/components/SectionWrapper'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { fetchPostBySlug } from '@/lib/fetchers/posts'

export const revalidate = 60

// define a minimal Post type — extend to match your real shape
type Post = {
  title: string
  slug: string
  coverImageUrl?: string | null
  body: any
  publishedLabel?: string | null
  authorName?: string | null
  tags?: string[] | null
  description?: string | null
}

/** Generate metadata for the post page (title, description, open graph) */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug) as Post | null

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.description ?? post.publishedLabel ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? post.publishedLabel ?? undefined,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = (await fetchPostBySlug(params.slug)) as Post | null

  if (!post) return notFound()

  return (
    <main>
      <SectionWrapper id="post" className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {post.coverImageUrl ? (
            <div className="relative h-64 md:h-96 mb-8 rounded overflow-hidden">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(min-width: 768px) 800px, 100vw"
                priority
              />
            </div>
          ) : (
            <div className="h-32 md:h-48 mb-8 rounded bg-gray-100 dark:bg-gray-800" />
          )}

          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

          <div className="text-sm text-gray-500 mb-6">
            <span className="text-secondary">{post.publishedLabel ?? 'Unpublished'}</span>
            {post.authorName ? ` • ${post.authorName}` : ' • Ifada Communication'}
          </div>

          <article className="prose max-w-none">
            <PortableTextRenderer value={post.body} />
          </article>

          {post.tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </SectionWrapper>
    </main>
  )
}
