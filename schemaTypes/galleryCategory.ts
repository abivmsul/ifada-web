// ifada-cms/schemaTypes/galleryCategory.ts
import { defineType, defineField } from 'sanity'

export const galleryCategory = defineType({
  name: 'galleryCategory',
  title: 'Gallery Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'title' } },
})
