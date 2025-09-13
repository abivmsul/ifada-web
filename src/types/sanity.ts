// src/types/sanity.ts
export interface Program {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: any
  // coverImageUrl will be a derived string we add after fetching if needed
  coverImageUrl?: string
  body?: any[] // Portable Text blocks
  order?: number
  featured?: boolean
}
