import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SubmitEventForm from '@/components/SubmitEventForm'
import { getVenues } from '@/sanity/lib/fetchers'
import { jsonLdDocument, jsonLdScriptProps, webPageSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Submit an Event',
  description: 'Submit your event to be listed on Visit Shaftesbury. Community events, markets, festivals and more.',
  openGraph: {
    title: 'Submit an Event',
    description: 'Submit your event to be listed on Visit Shaftesbury.',
    url: '/submit',
  },
  alternates: { canonical: '/submit' },
}

const submitSchemas = jsonLdDocument(
  webPageSchema({
    name: 'Submit an Event',
    description: 'Submit your event to be listed on Visit Shaftesbury.',
    url: '/submit',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Submit an Event', url: '/submit' },
  ]),
)

export default async function SubmitPage() {
  const venues = await getVenues()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <script {...jsonLdScriptProps(submitSchemas)} />
        <SubmitEventForm venues={venues} />
      </main>
      <Footer />
    </div>
  )
}
