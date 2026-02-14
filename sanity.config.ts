'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Visit Shaftesbury Events',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage Settings')
              .child(
                S.document()
                  .schemaType('homepageSettings')
                  .documentId('homepageSettings')
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: 'event',
              title: 'Events (Drag to Reorder)',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'venue',
              title: 'Venues (Drag to Reorder)',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'business',
              title: 'Directory (Drag to Reorder)',
              S,
              context,
            }),
            S.divider(),
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),
          ])
      },
    }),
    visionTool({
      defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-01',
      defaultDataset: 'production',
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
