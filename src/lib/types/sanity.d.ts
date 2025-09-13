// src/lib/types/sanity.d.ts

// Define a proper type for Sanity image asset
interface SanityImageAsset {
  _ref?: string;
  _type?: string;
  _id?: string;
}

// Define a proper type for Sanity image
export type SanityImage = { 
  _type: 'image'; 
  asset: SanityImageAsset | { _id: string } 
}

// Define a proper type for Portable Text blocks (minimal version)
interface PortableTextBlock {
  _key: string;
  _type: string;
  children: Array<{
    _key: string;
    _type: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
  style?: string;
  [key: string]: unknown;
}

export interface Program {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  coverImage?: SanityImage // Replace 'any' with proper type
  body?: PortableTextBlock[] // Replace 'any[]' with proper type
  order?: number
  featured?: boolean
}