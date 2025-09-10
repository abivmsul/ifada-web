// src/lib/types/sanity.d.ts
export type SanityImage = { _type: 'image'; asset: { _ref?: string; _type?: string; _ref?: string; _id?: string } | { _id: string } }

export interface Program {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: any
  body?: any[]
  order?: number
  featured?: boolean
}
