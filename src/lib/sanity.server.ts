// src/lib/sanity.server.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Define a proper type for Sanity image source
interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  [key: string]: unknown;
}

export const sanityServerClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-07-01',
  useCdn: false, // false in dev so you always get fresh data; toggle in prod if desired
  token: process.env.SANITY_READ_TOKEN, // server-only token for drafts/private datasets
})

const builder = imageUrlBuilder(sanityServerClient)
export const urlFor = (source: SanityImageSource | string) => builder.image(source)