import React from 'react'
import { PortableText, PortableTextComponents, PortableTextComponentProps } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.server'

/** ---- Typed local props for non-block types ---- */
interface MarkProps {
  children?: React.ReactNode
  value?: { href?: string }
}

// Define the image type according to Sanity's structure
interface ImageTypeValue {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

interface ImageTypeProps {
  value: ImageTypeValue
}
interface CodeTypeProps {
  value: { code: string; language?: string }
}
interface EmbedTypeProps {
  value: { url?: string; title?: string }
}
interface PullquoteTypeProps {
  value: { text?: string }
}
interface CTAButtonTypeProps {
  value: { url?: string; text?: string }
}

/** ---- PortableText components mapping ---- */
const components: PortableTextComponents = {
  block: {
    h1: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-3xl font-bold my-6">{props.children}</h1>
    ),
    h2: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-2xl font-semibold my-5">{props.children}</h2>
    ),
    h3: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-xl font-semibold my-4">{props.children}</h3>
    ),
    normal: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="leading-7 my-3">{props.children}</p>
    ),
    lead: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="text-lg text-gray-700 leading-relaxed">{props.children}</p>
    ),
    blockquote: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">{props.children}</blockquote>
    ),
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
        <a href={href} className="text-primary underline">{children}</a>
      )
    },
    highlight: ({ children }: MarkProps) => <span className="bg-yellow-100 px-1 rounded">{children}</span>,
  },
  types: {
    image: ({ value }: ImageTypeProps) => {
      // Use a type assertion to ensure compatibility with urlFor
      const src = value ? urlFor(value as unknown as Parameters<typeof urlFor>[0]).width(1600).auto('format').url() : null
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
    code: ({ value }: CodeTypeProps) => (
      <pre className="bg-gray-900 text-white p-4 rounded my-4 overflow-auto text-sm">
        <code>{value.code}</code>
      </pre>
    ),
    embed: ({ value }: EmbedTypeProps) => {
      if (!value?.url) return null
      return (
        <div className="my-6 aspect-video">
          <iframe
            src={value.url}
            title={value.title || 'embed'}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )
    },
    pullquote: ({ value }: PullquoteTypeProps) => (
      <div className="border-l-4 pl-4 italic text-lg text-gray-700 my-6">{value.text}</div>
    ),
    ctaButton: ({ value }: CTAButtonTypeProps) => (
      <div className="my-4">
        <a href={value.url || '#'} className="inline-block bg-primary text-white px-5 py-2 rounded">
          {value.text || 'Learn more'}
        </a>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
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