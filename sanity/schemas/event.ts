import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    orderRankField({ type: 'event' }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Start Time',
      type: 'string',
      description: 'Format: HH:MM (e.g., 14:00)',
      validation: (Rule) =>
        Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          name: 'time',
          invert: false
        }).error('Time must be in HH:MM format')
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'Format: HH:MM (e.g., 16:00)',
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
          name: 'time',
          invert: false
        })
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Community', value: 'community' },
          { title: 'Music & Entertainment', value: 'music' },
          { title: 'Sports & Recreation', value: 'sports' },
          { title: 'Arts & Culture', value: 'arts' },
          { title: 'Education & Workshops', value: 'education' },
          { title: 'Markets & Fairs', value: 'markets' },
          { title: 'Charity & Fundraising', value: 'charity' },
          { title: 'Council Meeting', value: 'council' },
          { title: 'Other', value: 'other' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{ type: 'venue' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email()
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "Free", "£10", "£5-15"'
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ],
        layout: 'radio'
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Featured events appear prominently on the homepage',
    })
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      venue: 'venue.name',
      media: 'image',
      status: 'status'
    },
    prepare({ title, date, venue, media, status }) {
      return {
        title,
        subtitle: `${date} at ${venue} • ${status}`,
        media
      }
    }
  },
  orderings: [
    orderRankOrdering,
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    },
    {
      title: 'Date (Oldest First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }]
    }
  ]
})
