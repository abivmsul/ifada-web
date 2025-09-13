// install types if not already: npm i -D @portabletext/types
import { PortableTextBlock } from '@portabletext/types'

export default function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null

  return (
    <div className="prose">
      {value.map((block, idx) => {
        if (block._type === 'block') {
          return <p key={idx}>{(block as any).children?.map((c:any) => c.text).join('') ?? ''}</p>
        }
        // handle other block types...
        return null
      })}
    </div>
  )
}
