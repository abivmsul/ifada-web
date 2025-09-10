// src/lib/queries/gallery.ts
export const GALLERY_CATEGORIES_WITH_ITEMS = `*[_type == "galleryCategory"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  description,
  "items": *[_type == "galleryItem" && references(^._id)] | order(order asc) {
    _id,
    title,
    type,
    videoUrl,
    "image": media,
    relatedProject-> { _id, title, "slug": slug.current },
    "caption": title
  }
}`
