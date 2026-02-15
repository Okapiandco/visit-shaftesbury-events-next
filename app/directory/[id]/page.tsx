import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBusiness, getBusinesses } from '@/sanity/lib/fetchers'
import { businessCategoryLabels, businessCategoryColors, BusinessCategory } from '@/types/events'
import { MapPin, Phone, Mail, Globe, Clock, ArrowLeft, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { jsonLdDocument, jsonLdScriptProps, businessSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema'

export async function generateStaticParams() {
  const businesses = await getBusinesses()
  return businesses.map((business) => ({
    id: business.id,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const business = await getBusiness(id)

  if (!business) {
    return { title: 'Business Not Found' }
  }

  const description = business.description?.slice(0, 160) || `${business.name} in Shaftesbury, Dorset`

  return {
    title: business.name,
    description,
    openGraph: {
      title: business.name,
      description,
      url: `/directory/${id}`,
      ...(business.imageUrl && { images: [{ url: business.imageUrl, width: 800, height: 600, alt: business.name }] }),
    },
    alternates: { canonical: `/directory/${id}` },
  }
}

export default async function BusinessDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const business = await getBusiness(id)

  if (!business) {
    notFound()
  }

  const schemas = jsonLdDocument(
    businessSchema(business),
    webPageSchema({
      name: business.name,
      description: business.description?.slice(0, 160) || `${business.name} in Shaftesbury, Dorset`,
      url: `/directory/${id}`,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Shops & Services', url: '/directory' },
      { name: business.name, url: `/directory/${id}` },
    ]),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <script {...jsonLdScriptProps(schemas)} />
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 bg-muted">
          {business.imageUrl ? (
            <img
              src={business.imageUrl}
              alt={business.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-secondary flex items-center justify-center">
              <Store className="h-20 w-20 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Directory
            </Link>

            {/* Header */}
            <div className="mb-8">
              {business.category && (
                <span className={`inline-block px-3 py-1 text-xs font-medium mb-4 ${businessCategoryColors[business.category]}`}>
                  {businessCategoryLabels[business.category]}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
                {business.name}
              </h1>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="md:col-span-2 space-y-6">
                {business.description && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3">About</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {business.description}
                    </p>
                  </div>
                )}

                {business.openingHours && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3">Opening Hours</h2>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p className="whitespace-pre-line">{business.openingHours}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="border border-border p-6 space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">Contact Details</h3>

                  {business.address && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{business.address}</span>
                    </div>
                  )}

                  {business.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a href={`tel:${business.phone}`} className="text-foreground hover:underline">
                        {business.phone}
                      </a>
                    </div>
                  )}

                  {business.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${business.email}`} className="text-foreground hover:underline break-all">
                        {business.email}
                      </a>
                    </div>
                  )}

                  {business.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {!business.address && !business.phone && !business.email && !business.website && (
                    <p className="text-sm text-muted-foreground">No contact details provided.</p>
                  )}
                </div>

                <Link href="/submit-business">
                  <Button variant="outline" className="w-full gap-2 uppercase tracking-wide text-xs">
                    List Your Business
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
