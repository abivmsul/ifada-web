// ifada-cms/schemaTypes/program.ts
import { defineType, defineField } from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Short excerpt', type: 'text' }),
    defineField({ name: 'body', title: 'Details', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'howToParticipate', title: 'How to participate', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'impactStories', title: 'Impact stories', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }] }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
  ],
  preview: { select: { title: 'title', media: 'coverImage', subtitle: 'excerpt' } },
})
