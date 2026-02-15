import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventsSection from '@/components/EventsSection'
import { getEvents } from '@/sanity/lib/fetchers'
import { jsonLdDocument, jsonLdScriptProps, eventListSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: "What's On",
  description: 'Discover events, festivals, markets and community gatherings happening in Shaftesbury, Dorset.',
  openGraph: {
    title: "What's On in Shaftesbury",
    description: 'Discover events, festivals, markets and community gatherings happening in Shaftesbury, Dorset.',
    url: '/events',
  },
  alternates: { canonical: '/events' },
}

export default async function EventsPage() {
  const events = await getEvents()

  const schemas = jsonLdDocument(
    webPageSchema({
      name: "What's On in Shaftesbury",
      description: 'Discover events, festivals, markets and community gatherings happening in Shaftesbury, Dorset.',
      url: '/events',
      type: 'CollectionPage',
    }),
    eventListSchema(events),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: "What's On", url: '/events' },
    ]),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script {...jsonLdScriptProps(schemas)} />

      {/* Hero */}
      <section id="main-content" className="bg-navy py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-gold mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            What&apos;s On in Shaftesbury
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover upcoming events, festivals, markets and community gatherings in and around
            our beautiful hilltop town in Dorset — from live music and theatre to charity fundraisers
            and seasonal fairs.
          </p>
        </div>
      </section>

      <EventsSection events={events} />

      <Footer />
    </div>
  )
}
