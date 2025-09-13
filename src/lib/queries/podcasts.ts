// src/lib/queries/podcasts.ts
export const PODCAST_LIST = `*[_type == "podcastEpisode" ] | order(order asc, publishedAt desc){
  _id,
  title,
  episodeNumber,
  "slug": slug.current,
  youtubeUrl,
  publishedAt,
  excerpt,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  duration,
  tags,
  featured,
  order
}`

export const PODCAST_BY_SLUG = `*[_type == "podcastEpisode" && slug.current == $slug][0]{
  _id,
  title,
  episodeNumber,
  "slug": slug.current,
  youtubeUrl,
  publishedAt,
  excerpt,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  duration,
  tags,
  featured,
  order,
  body
}`
