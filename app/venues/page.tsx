import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VenueCard from '@/components/VenueCard'
import { getVenues } from '@/sanity/lib/fetchers'
import { jsonLdDocument, jsonLdScriptProps, venueListSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Venues',
  description: 'Explore venues in Shaftesbury — halls, churches, pubs and spaces available for community events.',
  openGraph: {
    title: 'Venues in Shaftesbury',
    description: 'Explore venues in Shaftesbury — halls, churches, pubs and spaces available for community events.',
    url: '/venues',
  },
  alternates: { canonical: '/venues' },
}

export default async function VenuesPage() {
  const venues = await getVenues()

  const schemas = jsonLdDocument(
    webPageSchema({
      name: 'Venues in Shaftesbury',
      description: 'Explore venues in Shaftesbury — halls, churches, pubs and spaces available for community events.',
      url: '/venues',
      type: 'CollectionPage',
    }),
    venueListSchema(venues),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Venues', url: '/venues' },
    ]),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <script {...jsonLdScriptProps(schemas)} />
        {/* Hero */}
        <section className="bg-navy py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-1 bg-gold mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              Venues in Shaftesbury
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Explore halls, churches, pubs and community spaces across Shaftesbury and the
              surrounding area — perfect for events, meetings, celebrations and gatherings.
            </p>
          </div>
        </section>

        {/* Venues Grid */}
        <section className="container mx-auto px-4 py-16">
          {venues.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue, index) => (
                <div
                  key={venue.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <VenueCard venue={venue} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No venues found.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
