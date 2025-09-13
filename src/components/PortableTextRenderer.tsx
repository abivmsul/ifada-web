// src/components/PortableTextRenderer.tsx
import type { PortableTextBlock } from '@portabletext/types'

type PortableText = PortableTextBlock[]

export default function PortableTextRenderer({ value }: { value: PortableText }) {
  if (!value) return null
  return (
    <div>
      {value.map((block, i) => {
        // narrow/render by block._type or similar
        if (block._type === 'block' && 'children' in block) {
          // block is PortableTextBlock; render its children safely
          return <p key={i}>{(block as any).children?.map((c: any) => c.text).join('') ?? null}</p>
        }
        // add renderers for images, lists, etc.
        return null
      })}
    </div>
  )
}
