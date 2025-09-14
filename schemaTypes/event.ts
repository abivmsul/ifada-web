// ifada-cms/schemaTypes/event.ts
import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(150),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'start',
      title: 'Start (date & time)',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'end',
      title: 'End (optional)',
      type: 'datetime',
      description: 'Optional end date/time. If provided it must be after Start.',
      validation: (Rule) =>
        Rule.custom((end, context) => {
          // Narrow the context.parent type so TypeScript knows `.start` exists
          const parent = context.parent as { start?: string | Date } | undefined
          const start = parent?.start
          if (end && start) {
            const s = new Date(start as string)
            const e = new Date(end as string)
            if (e < s) return 'End date/time must be after Start date/time'
          }
          return true
        }),
    }),

    defineField({
      name: 'isOnline',
      title: 'Is this event online?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'onlineUrl',
      title: 'Online URL (Zoom / YouTube / Stream)',
      type: 'url',
      description: 'Provide link if the event is online. Leave empty for physical events.',
      hidden: ({ parent }) => {
        // parent may be {} by the compiler — narrow it for safety
        const p = parent as { isOnline?: boolean } | undefined
        return !p?.isOnline
      },
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context.parent as { isOnline?: boolean } | undefined
          if (parent?.isOnline && !url) return 'Online events should have an Online URL'
          return true
        }),
    }),

    defineField({
      name: 'location',
      title: 'Location (if physical)',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'address', title: 'Address', type: 'string' }),
        defineField({ name: 'map', title: 'Map (geopoint)', type: 'geopoint' }),
      ],
      hidden: ({ parent }) => {
        const p = parent as { isOnline?: boolean } | undefined
        return p?.isOnline === true
      },
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary used for cards and previews',
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'body',
      title: 'Details / Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),

    defineField({
      name: 'speakers',
      title: 'Speakers / Hosts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      description: 'Reference team members or external speakers',
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery (related media)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'galleryItem' }] }],
    }),

    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'External registration link if you use an external form/service',
    }),

    defineField({
      name: 'registrationForm',
      title: 'Built-in Registration Form (optional)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          title: 'Form field',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({
              name: 'fieldType',
              title: 'Field type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Telephone', value: 'tel' },
                  { title: 'Select', value: 'select' },
                  { title: 'Checkbox', value: 'checkbox' },
                ],
              },
            }),
            defineField({ name: 'required', title: 'Required', type: 'boolean', initialValue: false }),
            defineField({
              name: 'options',
              title: 'Options (for select)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => {
                const p = parent as { fieldType?: string } | undefined
                return p?.fieldType !== 'select'
              },
            }),
          ],
        },
      ],
      description: 'If you want to accept registrations through your site, define form fields here. Alternatively use Registration URL above.',
    }),

    defineField({
      name: 'capacity',
      title: 'Capacity (max attendees)',
      type: 'number',
      description: 'Optional. Leave empty for unlimited.',
      validation: (Rule) => Rule.min(1).integer(),
    }),

    defineField({
      name: 'price',
      title: 'Price (optional)',
      type: 'string',
      description: 'A simple string like "Free" or "$10" — keep formatting simple.',
    }),

    defineField({
      name: 'featured',
      title: 'Featured (show on home / promos)',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Order (manual sort)',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],

  // Helpful preview for the studio list
  preview: {
    select: {
      title: 'title',
      start: 'start',
      media: 'coverImage',
      locationName: 'location.name',
    },
    prepare(selection) {
      const { title, start, media, locationName } = selection
      const startLabel = start ? new Date(start).toLocaleString() : 'No date'
      return {
        title,
        subtitle: `${startLabel}${locationName ? ' • ' + locationName : ''}`,
        media,
      }
    },
  },
})
