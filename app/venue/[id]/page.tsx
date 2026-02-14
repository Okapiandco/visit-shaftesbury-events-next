import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventCard from '@/components/EventCard'
import { getVenue, getEventsByVenue, getVenues } from '@/sanity/lib/fetchers'
import { getImageUrl } from '@/sanity/lib/image'
import { MapPin, Users, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const venue = await getVenue(id)
  if (!venue) return { title: 'Venue Not Found' }
  return {
    title: venue.name,
    description: venue.description || `Events at ${venue.name}`,
  }
}

export async function generateStaticParams() {
  const venues = await getVenues()
  return venues.map((venue) => ({ id: venue.id }))
}

export default async function VenueDetailPage({ params }: Props) {
  const { id } = await params
  const [venue, venueEvents] = await Promise.all([
    getVenue(id),
    getEventsByVenue(id),
  ])
  if (!venue) notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          {venue.imageUrl ? (
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-secondary" />
          )}
          <div className="absolute inset-0 hero-overlay" />

          {/* Back Button */}
          <div className="absolute top-6 left-6">
            <Link href="/venues">
              <Button variant="secondary" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Venues
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">
              {venue.name}
            </h1>

            <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{venue.address}</span>
              </div>
              {venue.capacity && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Capacity: {venue.capacity.toLocaleString()}</span>
                </div>
              )}
            </div>

            {venue.description && (
              <p className="text-lg text-foreground/80 leading-relaxed">
                {venue.description}
              </p>
            )}
          </div>

          {/* Events at this Venue */}
          {venueEvents && venueEvents.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="font-display text-3xl font-semibold text-foreground mb-8">
                Upcoming Events at {venue.name}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {venueEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
