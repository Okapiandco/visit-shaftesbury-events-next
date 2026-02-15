import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VenueCard from '@/components/VenueCard'
import { getVenues } from '@/sanity/lib/fetchers'

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-racing-green py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              Venues in Shaftesbury
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover the wonderful spaces available for community events
              across Shaftesbury and the surrounding area.
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
