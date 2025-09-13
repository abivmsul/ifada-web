// src/lib/queries/projects.ts
export const PROJECT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  status,
  startDate,
  endDate,
  excerpt,
  coverImage,
  featured,
  order
`

export function projectsListQuery(offset = 0, limit = 9, predicate = '') {
  return `*[_type == "project" ${predicate}] | order(order asc) [${offset}...${offset + limit}] { ${PROJECT_FIELDS} }`
}

export function projectsCountQuery(predicate = '') {
  return `count(*[_type == "project" ${predicate}])`
}

export const PROJECT_BY_SLUG = `*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, status, startDate, endDate, excerpt, coverImage, body, gallery[]-> { _id, title, "image": media }
}`

// src/lib/queries/projects.ts
export const PROJECTS_FEATURED = `
*[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  featured,
  order
}
`

export const PROJECTS_LIST = `
*[_type == "project" && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  featured,
  order
}
`
