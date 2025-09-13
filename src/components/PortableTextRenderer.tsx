// src/components/PortableTextRenderer.tsx
import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.server'

/** ---- typed local props ---- */
interface BlockProps {
  children: React.ReactNode
}

interface MarkProps {
  children: React.ReactNode
  value?: {
    href?: string
  }
}

interface ImageTypeValue {
  asset?: {
    _ref?: string
    _type?: 'reference'
  }
  alt?: string
  caption?: string
}

interface ImageTypeProps {
  value: ImageTypeValue
}

interface CodeTypeValue {
  code: string
  language?: string
}

interface CodeTypeProps {
  value: CodeTypeValue
}

interface EmbedTypeValue {
  url?: string
  title?: string
}

interface EmbedTypeProps {
  value: EmbedTypeValue
}

interface PullquoteTypeValue {
  text?: string
}

interface PullquoteTypeProps {
  value: PullquoteTypeValue
}

interface CTAButtonTypeValue {
  url?: string
  text?: string
}

interface CTAButtonTypeProps {
  value: CTAButtonTypeValue
}

interface ListProps {
  children: React.ReactNode
}

interface ListItemProps {
  children: React.ReactNode
}

/** ---- PortableText components mapping ----
 * Note: PortableTextComponents is sufficiently generic for our mapping here.
 */
const components: PortableTextComponents = {
  block: {
    h1: ({ children }: BlockProps) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({ children }: BlockProps) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({ children }: BlockProps) => <h3 className="text-xl font-semibold my-4">{children}</h3>,
    normal: ({ children }: BlockProps) => <p className="leading-7 my-3">{children}</p>,
    lead: ({ children }: BlockProps) => <p className="text-lg text-gray-700 leading-relaxed">{children}</p>,
    blockquote: ({ children }: BlockProps) => <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
  },

  marks: {
    strong: ({ children }: MarkProps) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: MarkProps) => <em className="italic">{children}</em>,
    code: ({ children }: MarkProps) => <code className="bg-gray-100 px-1 rounded text-sm font-mono">{children}</code>,

    link: ({ children, value }: MarkProps) => {
      const href = value?.href || '#'
      const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
      return isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline">
          {children}
        </a>
      ) : (
        <a href={href} className="text-primary underline">
          {children}
        </a>
      )
    },

    highlight: ({ children }: MarkProps) => <span className="bg-yellow-100 px-1 rounded">{children}</span>,
  },

  types: {
    image: ({ value }: ImageTypeProps) => {
      // Build URL from Sanity image value
      const src = value?.asset ? urlFor(value).width(1600).auto('format').url() : null
      const alt = value?.alt || value?.caption || 'image'
      if (!src) return null
      return (
        <div className="my-6">
          <div className="relative w-full h-72 rounded overflow-hidden bg-gray-50">
            <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
          </div>
          {value.caption && <div className="text-sm text-gray-500 mt-2">{value.caption}</div>}
        </div>
      )
    },

    code: ({ value }: CodeTypeProps) => {
      return (
        <pre className="bg-gray-900 text-white p-4 rounded my-4 overflow-auto text-sm">
          <code>{value.code}</code>
        </pre>
      )
    },

    embed: ({ value }: EmbedTypeProps) => {
      if (!value || !value.url) return null
      return (
        <div className="my-6 aspect-video">
          <iframe src={value.url} title={value.title || 'embed'} className="w-full h-full" frameBorder="0" allowFullScreen />
        </div>
      )
    },

    pullquote: ({ value }: PullquoteTypeProps) => <div className="border-l-4 pl-4 italic text-lg text-gray-700 my-6">{value.text}</div>,

    ctaButton: ({ value }: CTAButtonTypeProps) => (
      <div className="my-4">
        <a href={value.url || '#'} className="inline-block bg-primary text-white px-5 py-2 rounded">
          {value.text || 'Learn more'}
        </a>
      </div>
    ),
  },

  list: {
    bullet: ({ children }: ListProps) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }: ListProps) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }: ListItemProps) => <li className="mb-1">{children}</li>,
  },
}

/** Props for the renderer: use PortableTextBlock[] for good typing */
interface PortableTextRendererProps {
  value?: PortableTextBlock[] | null
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}
