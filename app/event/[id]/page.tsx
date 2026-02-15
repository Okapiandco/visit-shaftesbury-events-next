import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventDetailContent from '@/components/EventDetailContent'
import { getEvent, getEvents } from '@/sanity/lib/fetchers'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const event = await getEvent(id)
  if (!event) return { title: 'Event Not Found' }

  const description = event.description?.slice(0, 160) || `${event.title} in Shaftesbury, Dorset`

  return {
    title: event.title,
    description,
    openGraph: {
      title: event.title,
      description,
      url: `/event/${id}`,
      type: 'article',
      ...(event.imageUrl && { images: [{ url: event.imageUrl, width: 1200, height: 630, alt: event.title }] }),
    },
    alternates: { canonical: `/event/${id}` },
  }
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ id: event.id }))
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params
  const event = await getEvent(id)
  if (!event) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: `${event.date}T${event.time}:00`,
    ...(event.endTime && { endDate: `${event.date}T${event.endTime}:00` }),
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.address,
        addressLocality: 'Shaftesbury',
        addressRegion: 'Dorset',
        addressCountry: 'GB',
      },
    },
    ...(event.imageUrl && { image: event.imageUrl }),
    ...(event.organizer && { organizer: { '@type': 'Organization', name: event.organizer } }),
    ...(event.price && { offers: { '@type': 'Offer', price: event.price, priceCurrency: 'GBP', url: event.ticketUrl } }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EventDetailContent event={event} />
      </main>
      <Footer />
    </div>
  )
}
