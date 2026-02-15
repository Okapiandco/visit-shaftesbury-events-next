import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventsSection from '@/components/EventsSection'
import { getEvents } from '@/sanity/lib/fetchers'

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-racing-green py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            What's On in Shaftesbury
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Find events, festivals, markets and community gatherings happening
            in and around our beautiful hilltop town.
          </p>
        </div>
      </section>

      <EventsSection events={events} />

      <Footer />
    </div>
  )
}
