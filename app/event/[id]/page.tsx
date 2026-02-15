import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventDetailContent from '@/components/EventDetailContent'
import { getEvent, getEvents } from '@/sanity/lib/fetchers'
import { jsonLdDocument, jsonLdScriptProps, eventSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema'

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

  const schemas = jsonLdDocument(
    eventSchema(event),
    webPageSchema({
      name: event.title,
      description: event.description?.slice(0, 160) || `${event.title} in Shaftesbury, Dorset`,
      url: `/event/${id}`,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: "What's On", url: '/events' },
      { name: event.title, url: `/event/${id}` },
    ]),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <script {...jsonLdScriptProps(schemas)} />
        <EventDetailContent event={event} />
      </main>
      <Footer />
    </div>
  )
}
