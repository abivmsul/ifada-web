// src/lib/queries/programs.ts
export const PROGRAMS_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  featured,
  order
`

// list query will be sliced by the API (offset...offset+limit)
export function programsListQuery(offset = 0, limit = 9, filterPredicate = '') {
  // filterPredicate should be a safe predicate string like `&& featured == true` or `&& (title match $search || excerpt match $search)`
  return `*[_type == "program" ${filterPredicate}] | order(order asc) [${offset}...${offset + limit}] { ${PROGRAMS_FIELDS} }`
}

// count query using the same predicate
export function programsCountQuery(filterPredicate = '') {
  return `count(*[_type == "program" ${filterPredicate}])`
}
