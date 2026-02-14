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
  return {
    title: event.title,
    description: event.description?.slice(0, 160),
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <EventDetailContent event={event} />
      </main>
      <Footer />
    </div>
  )
}
