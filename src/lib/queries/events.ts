// src/lib/queries/events.ts
export const EVENT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  start,
  end,
  location,
  isOnline,
  registrationUrl,
  coverImage,
  excerpt,
  featured,
  order
`

// list slice (offset..offset+limit) with optional predicate
export function eventsListQuery(offset = 0, limit = 9, predicate = '') {
  return `*[_type == "event" ${predicate}] | order(start asc) [${offset}...${offset + limit}] { ${EVENT_FIELDS} }`
}

export function eventsCountQuery(predicate = '') {
  return `count(*[_type == "event" ${predicate}])`
}

// single event
export const EVENT_BY_SLUG = `*[_type == "event" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, start, end, location, isOnline, registrationUrl, coverImage, excerpt, body, speakers[]-> { _id, name, role, "slug": slug.current }, gallery[]-> { _id, title, "imageUrl": media.asset->url }
}`

export const EVENTS_FEATURED = `*[_type == "event" && featured == true && !(_id in path("drafts.**"))] | order(order asc, start asc)[0...3]{
  ${EVENT_FIELDS},
  "imageUrl": coverImage.asset->url
}`

export const EVENTS_LIST = `*[_type == "event" && !(_id in path("drafts.**"))] | order(start asc){
  ${EVENT_FIELDS},
  "imageUrl": coverImage.asset->url
}`
