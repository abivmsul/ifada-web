// src/lib/queries/posts.ts
export const POSTS_LIST = `
*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  tags,
  featured
}
`

export const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  tags,
  body,
  // authorName in case you store it as a simple string
  authorName
}`
