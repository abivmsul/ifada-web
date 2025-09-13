// // src/components/PortableTextRenderer.tsx
import React from 'react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.server'

// Component mapping
const components = {
  block: {
    // map block styles to nice classes
    h1: ({ children }: any) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold my-4">{children}</h3>,
    normal: ({ children }: any) => <p className="leading-7 my-3">{children}</p>,
    lead: ({ children }: any) => <p className="text-lg text-gray-700 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
  },

  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="bg-gray-100 px-1 rounded text-sm font-mono">{children}</code>,

    // link handling (external vs internal)
    link: ({ children, value }: any) => {
      const href = value?.href || '#'
      const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
      return isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline">{children}</a>
      ) : (
        <a href={href} className="text-primary underline">{children}</a>
      )
    },

    // example of a custom mark 'highlight' you might use in Sanity
    highlight: ({ children }: any) => <span className="bg-yellow-100 px-1 rounded">{children}</span>,
  },

  types: {
    image: ({ value }: any) => {
      // value.asset -> reference. We build URL with urlFor
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

    code: ({ value }: any) => {
      // schema type for code might be named 'code' or 'codeBlock'
      return (
        <pre className="bg-gray-900 text-white p-4 rounded my-4 overflow-auto text-sm">
          <code>{value.code}</code>
        </pre>
      )
    },

    embed: ({ value }: any) => {
      // if you store embed provider/url/iframe
      if (!value || !value.url) return null
      return (
        <div className="my-6 aspect-video">
          <iframe src={value.url} title={value.title || 'embed'} className="w-full h-full" frameBorder="0" allowFullScreen />
        </div>
      )
    },

    pullquote: ({ value }: any) => (
      <div className="border-l-4 pl-4 italic text-lg text-gray-700 my-6">{value.text}</div>
    ),

    // if you have a custom 'button' block
    ctaButton: ({ value }: any) => (
      <div className="my-4">
        <a href={value.url || '#'} className="inline-block bg-primary text-white px-5 py-2 rounded">
          {value.text || 'Learn more'}
        </a>
      </div>
    ),
  },

  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
}

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
