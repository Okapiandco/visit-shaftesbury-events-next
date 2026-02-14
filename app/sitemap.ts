import type { MetadataRoute } from 'next'
import { getEvents, getVenues, getBusinesses, getPages } from '@/sanity/lib/fetchers'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://visitshaftesbury.co.uk'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, venues, businesses, pages] = await Promise.all([
    getEvents(),
    getVenues(),
    getBusinesses(),
    getPages(),
  ])

  const eventUrls: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE_URL}/event/${event.id}`,
    lastModified: new Date(),
  }))

  const venueUrls: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${BASE_URL}/venue/${venue.id}`,
    lastModified: new Date(),
  }))

  const businessUrls: MetadataRoute.Sitemap = businesses.map((business) => ({
    url: `${BASE_URL}/directory/${business.id}`,
    lastModified: new Date(),
  }))

  const pageUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${BASE_URL}/page/${page.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/events`, lastModified: new Date() },
    { url: `${BASE_URL}/directory`, lastModified: new Date() },
    { url: `${BASE_URL}/venues`, lastModified: new Date() },
    { url: `${BASE_URL}/travel`, lastModified: new Date() },
    { url: `${BASE_URL}/submit`, lastModified: new Date() },
    { url: `${BASE_URL}/submit-business`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    ...eventUrls,
    ...venueUrls,
    ...businessUrls,
    ...pageUrls,
  ]
}
