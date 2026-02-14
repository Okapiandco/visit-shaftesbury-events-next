import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SubmitEventForm from '@/components/SubmitEventForm'
import { getVenues } from '@/sanity/lib/fetchers'

export const metadata: Metadata = {
  title: 'Submit an Event',
  description: 'Submit your event to Visit Shaftesbury',
}

export default async function SubmitPage() {
  const venues = await getVenues()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SubmitEventForm venues={venues} />
      </main>
      <Footer />
    </div>
  )
}
