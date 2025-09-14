// src/app/(web)/blog/[slug]/page.tsx
import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { fetchPostBySlug } from '@/lib/fetchers/posts'

/**
 * Local Props shape we expect once Next resolves the incoming props object.
 * We keep this local and cast inside the functions to avoid Next's type-level
 * PageProps constraint complaining about Promise-like params.
 */
interface Props {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

/**
 * generateMetadata: accept unknown, await and then cast.
 * This avoids Next.js compile-time mismatch while keeping internal typing.
 */
export async function generateMetadata(props: unknown): Promise<Metadata> {
  const { params } = (await props) as Props
  const post = await fetchPostBySlug(params.slug)
  if (!post) return { title: 'Post not found' }

  return {
    title: post.title ?? 'Blog post',
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title ?? undefined,
      description: post.excerpt ?? undefined,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  }
}

/**
 * Page component: keep the same pattern (props: unknown -> await -> cast).
 */
export default async function BlogPostPage(props: unknown) {
  const { params } = (await props) as Props
  const { slug } = params

  const post = await fetchPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <article>
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">{post.title}</h1>

          {post.coverImageUrl && (
            <div className="mt-4 w-full h-64 relative rounded overflow-hidden">
              <Image src={post.coverImageUrl} alt={post.title ?? 'cover'} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          {post.publishedLabel && <p className="mt-3 text-sm text-gray-600">{post.publishedLabel}</p>}
        </header>

        <section className="prose max-w-none">
          <PortableTextRenderer value={post.body ?? null} />
        </section>
      </article>
    </main>
  )
}
