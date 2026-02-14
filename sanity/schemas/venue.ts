import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: PinIcon,
  fields: [
    orderRankField({ type: 'venue' }),
    defineField({
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      validation: (Rule) => Rule.min(1).integer()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address',
      media: 'image'
    }
  },
  orderings: [orderRankOrdering]
})
