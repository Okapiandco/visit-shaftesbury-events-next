import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortableText from '@/components/PortableText'
import { getPage, getPages } from '@/sanity/lib/fetchers'
import { getImageUrl } from '@/sanity/lib/image'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: 'Page Not Found' }
  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || `${page.title} — Visit Shaftesbury`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/page/${slug}`,
    },
    alternates: { canonical: `/page/${slug}` },
  }
}

export async function generateStaticParams() {
  const pages = await getPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const heroImageUrl = page.heroImage
    ? getImageUrl(page.heroImage, { width: 1920, quality: 85, format: 'webp' })
    : undefined

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {heroImageUrl ? (
          <section
            className="relative bg-foreground py-24 md:py-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-white mb-4">
                {page.title}
              </h1>
              {page.subtitle && (
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  {page.subtitle}
                </p>
              )}
            </div>
          </section>
        ) : (
          <section className="bg-foreground py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary-foreground mb-4">
                {page.title}
              </h1>
              {page.subtitle && (
                <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
                  {page.subtitle}
                </p>
              )}
            </div>
          </section>
        )}

        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <PortableText value={page.content} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
