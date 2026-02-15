import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DirectorySection from '@/components/DirectorySection'
import { getBusinesses } from '@/sanity/lib/fetchers'

export const metadata: Metadata = {
  title: 'Directory',
  description: 'Discover local shops, restaurants, cafes, pubs and professional services in Shaftesbury, Dorset.',
  openGraph: {
    title: 'Shops & Services in Shaftesbury',
    description: 'Discover local shops, restaurants, cafes, pubs and professional services in Shaftesbury, Dorset.',
    url: '/directory',
  },
  alternates: { canonical: '/directory' },
}

export default async function DirectoryPage() {
  const businesses = await getBusinesses()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-1 bg-gold mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              Shops & Services
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Find independent shops, professional services, pubs & caf&eacute;s in Shaftesbury,
              Dorset — from boutique fashion to legal services and local hospitality.
            </p>
          </div>
        </section>

        <DirectorySection businesses={businesses} />
      </main>

      <Footer />
    </div>
  )
}
