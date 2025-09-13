// src/types/sanity.ts

// Define a proper type for Sanity image
interface SanityImage {
  _type: 'image';
  asset: {
    _ref?: string;
    _type?: string;
    _id?: string;
  };
  [key: string]: unknown;
}

// Define a proper type for Portable Text blocks
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
  // coverImageUrl will be a derived string we add after fetching if needed
  coverImageUrl?: string
  body?: PortableTextBlock[] // Replace 'any[]' with proper type
  order?: number
  featured?: boolean
}