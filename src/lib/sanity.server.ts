// src/lib/sanity.server.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityServerClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-07-01',
  useCdn: false, // false in dev so you always get fresh data; toggle in prod if desired
  token: process.env.SANITY_READ_TOKEN, // server-only token for drafts/private datasets
})

const builder = imageUrlBuilder(sanityServerClient)
export const urlFor = (source: any) => builder.image(source)
