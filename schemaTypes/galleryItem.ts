// ifada-cms/schemaTypes/galleryItem.ts
import { defineType, defineField } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title / Caption', type: 'string' }),
    defineField({
      name: 'media',
      title: 'Image / Media',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'videoUrl', title: 'Video URL (optional)', type: 'url' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: [{ title: 'Photo', value: 'photo' }, { title: 'Video', value: 'video' }] },
      initialValue: 'photo',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'galleryCategory' }] }],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'relatedEvent',
      title: 'Related Event',
      type: 'reference',
      to: [{ type: 'event' }],
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'media',
    },
  },
})
