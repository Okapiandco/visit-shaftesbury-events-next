import { defineField, defineType } from 'sanity'
import { BasketIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'business',
  title: 'Business',
  type: 'document',
  icon: BasketIcon,
  fields: [
    orderRankField({ type: 'business' }),
    defineField({
      name: 'name',
      title: 'Business Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Shop', value: 'shop' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Cafe', value: 'cafe' },
          { title: 'Pub', value: 'pub' },
          { title: 'Salon & Beauty', value: 'salon' },
          { title: 'Professional Services', value: 'professional' },
          { title: 'Trades & Services', value: 'trades' },
          { title: 'Health & Wellbeing', value: 'health' },
          { title: 'Other', value: 'other' }
        ],
        layout: 'dropdown'
      },
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email()
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Business Image',
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
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'text',
      rows: 3,
      description: 'e.g., Mon-Fri 9am-5pm, Sat 10am-4pm'
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
      title: 'Featured Business',
      type: 'boolean',
      initialValue: false,
      description: 'Featured businesses appear prominently in the directory',
    })
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'image',
      status: 'status'
    },
    prepare({ title, category, media, status }) {
      return {
        title,
        subtitle: `${category || 'uncategorised'} \u2022 ${status}`,
        media
      }
    }
  },
  orderings: [
    orderRankOrdering,
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }]
    }
  ]
})
