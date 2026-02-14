import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import EventCard from '@/components/EventCard'
import { getEvents, getHomepageSettings } from '@/sanity/lib/fetchers'
import { Calendar, Store, MapPin, Train, Info, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const [events, settings] = await Promise.all([
    getEvents(),
    getHomepageSettings(),
  ])

  const featuredEvents = events.filter(e => e.isFeatured)
  const upcomingEvents = events.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection settings={settings} />

        {/* Explore Sections */}
        <section id="explore" className="container mx-auto px-4 py-16 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Explore Shaftesbury
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover our beautiful hilltop town in Dorset
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* What's On */}
            <Link href="/events" className="group">
              <div className="border border-border p-6 h-full transition-all duration-300 hover:border-racing-green hover:shadow-lg">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-racing-green" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-racing-green transition-colors">
                  What's On
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Events, festivals, markets and community gatherings happening in Shaftesbury.
                </p>
                <span className="text-racing-green text-sm font-medium inline-flex items-center gap-1">
                  View Events <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Directory */}
            <Link href="/directory" className="group">
              <div className="border border-border p-6 h-full transition-all duration-300 hover:border-racing-green hover:shadow-lg">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center mb-4">
                  <Store className="h-6 w-6 text-racing-green" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-racing-green transition-colors">
                  Shops & Services
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Browse local shops, restaurants, cafes, pubs and professional services.
                </p>
                <span className="text-racing-green text-sm font-medium inline-flex items-center gap-1">
                  Browse Directory <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Venues */}
            <Link href="/venues" className="group">
              <div className="border border-border p-6 h-full transition-all duration-300 hover:border-racing-green hover:shadow-lg">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-racing-green" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-racing-green transition-colors">
                  Venues
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Discover halls, churches, pubs and spaces available for community events.
                </p>
                <span className="text-racing-green text-sm font-medium inline-flex items-center gap-1">
                  View Venues <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Travel */}
            <Link href="/travel" className="group">
              <div className="border border-border p-6 h-full transition-all duration-300 hover:border-racing-green hover:shadow-lg">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center mb-4">
                  <Train className="h-6 w-6 text-racing-green" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-racing-green transition-colors">
                  Travel & Transport
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  How to get here by train, bus or car. Parking, EV charging and more.
                </p>
                <span className="text-racing-green text-sm font-medium inline-flex items-center gap-1">
                  Plan Your Visit <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Featured / Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section id="events" className="bg-secondary/50 scroll-mt-24">
            <div className="container mx-auto px-4 py-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                    {featuredEvents.length > 0 ? 'Featured Events' : "What's On"}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Upcoming events in and around Shaftesbury
                  </p>
                </div>
                <Link
                  href="/events"
                  className="text-racing-green font-medium inline-flex items-center gap-1 hover:underline"
                >
                  View all events <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(featuredEvents.length > 0 ? featuredEvents.slice(0, 3) : upcomingEvents.slice(0, 3)).map((event, index) => (
                  <div
                    key={event.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About Shaftesbury */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                About Shaftesbury
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Perched on a hilltop 215 metres above sea level, Shaftesbury is one of England's
                  oldest and most picturesque towns. Founded by King Alfred the Great in 880 AD,
                  the town is famous for Gold Hill — the iconic cobbled street featured in the
                  beloved Hovis bread advertisement.
                </p>
                <p>
                  With stunning views over the Blackmore Vale, a thriving high street of independent
                  shops and cafes, and a vibrant calendar of community events, Shaftesbury is a
                  wonderful place to visit, live and work.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-racing-green font-medium mt-6 hover:underline"
              >
                Learn more about Shaftesbury <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative h-80 md:h-96">
              <img
                src="/langport-hero.jpg"
                alt="View of Shaftesbury"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
