// schemas/podcastEpisode.ts
import type { Rule } from '@sanity/types';

// schemas/podcastEpisode.ts
export default {
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'episodeNumber', title: 'Episode #', type: 'number' },
    { name: 'youtubeUrl', title: 'YouTube URL', type: 'url', validation: (Rule: Rule) => Rule.uri({ scheme: ['http','https'] }) },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'duration', title: 'Duration (e.g. 43:12)', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Order', type: 'number' }, // for manual ordering
    { name: 'body', title: 'Notes / Show notes (Portable Text)', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'episodeNumber',
      media: 'coverImage'
    }
  }
}
