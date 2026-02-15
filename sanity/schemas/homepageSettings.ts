import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Homepage Settings',
      readOnly: true,
      hidden: true
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading on the homepage',
      initialValue: 'Welcome to Shaftesbury'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Subtitle text below the main heading',
      initialValue: 'Discover what\'s happening in our historic Dorset hilltop town. From festivals to markets, find your next community event.'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large background image for the hero section (optional - defaults to current image)',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    }),
    defineField({
      name: 'featuredSectionTitle',
      title: 'Featured Events Section Title',
      type: 'string',
      initialValue: 'Featured Events',
      description: 'Heading for the featured events section'
    }),
    defineField({
      name: 'allEventsSectionTitle',
      title: 'All Events Section Title',
      type: 'string',
      initialValue: 'Upcoming Events',
      description: 'Heading for the all events section'
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional welcome message or announcement (appears below hero)'
    }),
    defineField({
      name: 'showWelcomeMessage',
      title: 'Show Welcome Message',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle welcome message visibility'
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      description: 'Heading for the About Shaftesbury section',
      initialValue: 'About Shaftesbury'
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Text content for the About Shaftesbury section'
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image for the About Shaftesbury section',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    }),
    defineField({
      name: 'aboutLinkText',
      title: 'About Section Link Text',
      type: 'string',
      description: 'Text for the link below the about section',
      initialValue: 'Learn more about Shaftesbury'
    }),
    defineField({
      name: 'aboutLinkUrl',
      title: 'About Section Link URL',
      type: 'string',
      description: 'URL for the about section link',
      initialValue: '/about'
    }),
    defineField({
      name: 'contentSections',
      title: 'Homepage Content Sections',
      type: 'array',
      description: 'Drag to reorder sections on the homepage',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'content', type: 'array', title: 'Content', of: [{ type: 'block' }] },
            {
              name: 'backgroundColor',
              type: 'string',
              title: 'Background Color',
              options: {
                list: [
                  { title: 'White', value: 'white' },
                  { title: 'Light Gray', value: 'gray' },
                  { title: 'Primary Color', value: 'primary' }
                ]
              },
              initialValue: 'white'
            }
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Text Section', subtitle: 'Text Content' }
            }
          }
        },
        {
          type: 'object',
          name: 'imageSection',
          title: 'Image Section',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'caption', type: 'string', title: 'Caption' },
            {
              name: 'layout',
              type: 'string',
              title: 'Layout',
              options: {
                list: [
                  { title: 'Full Width', value: 'full' },
                  { title: 'Contained', value: 'contained' }
                ]
              },
              initialValue: 'contained'
            }
          ],
          preview: {
            select: { media: 'image', caption: 'caption' },
            prepare({ media, caption }) {
              return { title: caption || 'Image Section', subtitle: 'Image Content', media }
            }
          }
        },
        {
          type: 'object',
          name: 'callToAction',
          title: 'Call to Action',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'text', type: 'text', title: 'Text', rows: 3 },
            { name: 'buttonText', type: 'string', title: 'Button Text' },
            { name: 'buttonLink', type: 'string', title: 'Button Link' }
          ],
          preview: {
            select: { title: 'heading', buttonText: 'buttonText' },
            prepare({ title, buttonText }) {
              return { title: title || 'Call to Action', subtitle: `Button: ${buttonText || 'No button'}` }
            }
          }
        },
        {
          type: 'object',
          name: 'featuredEventsSection',
          title: 'Featured Events Display',
          fields: [
            { name: 'show', type: 'boolean', title: 'Show Featured Events', initialValue: true },
            { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Featured Events' }
          ],
          preview: {
            select: { heading: 'heading', show: 'show' },
            prepare({ heading, show }) {
              return { title: heading || 'Featured Events', subtitle: show ? 'Visible' : 'Hidden' }
            }
          }
        },
        {
          type: 'object',
          name: 'allEventsSection',
          title: 'All Events Display',
          fields: [
            { name: 'show', type: 'boolean', title: 'Show All Events', initialValue: true },
            { name: 'heading', type: 'string', title: 'Section Heading', initialValue: 'Upcoming Events' }
          ],
          preview: {
            select: { heading: 'heading', show: 'show' },
            prepare({ heading, show }) {
              return { title: heading || 'All Events', subtitle: show ? 'Visible' : 'Hidden' }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: 'Homepage Settings', subtitle: title || 'Configure homepage content' }
    }
  }
})
