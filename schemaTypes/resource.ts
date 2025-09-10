// ifada-cms/schemaTypes/resource.ts
import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: [
      { title: 'Guide (PDF)', value: 'guide' },
      { title: 'Audio', value: 'audio' },
      { title: 'Video', value: 'video' },
      { title: 'External Link', value: 'link' },
    ] } }),
    defineField({ name: 'file', title: 'File (pdf/audio)', type: 'file' }),
    defineField({ name: 'externalUrl', title: 'External URL', type: 'url' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'body', title: 'Body / Notes', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'related', title: 'Related Programs/Events', type: 'array', of: [
      { type: 'reference', to: [{ type: 'program' }, { type: 'event' }] }
    ] 
}),
  ],
  preview: { select: { title: 'title' } },
})
