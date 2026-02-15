import { client } from './client'
import {
  approvedEventsQuery,
  eventByIdQuery,
  venuesQuery,
  venueByIdQuery,
  eventsByVenueQuery,
  publishedPagesQuery,
  pageBySlugQuery,
  homepageSettingsQuery,
  approvedBusinessesQuery,
  businessByIdQuery,
} from './queries'
import { SanityEvent, SanityVenue, SanityBusiness, SanityPage, HomepageSettings } from './types'
import { transformSanityEvent, transformSanityVenue, transformSanityBusiness } from '@/lib/transformers'
import { Event, Venue, Business } from '@/types/events'

const isDev = process.env.NODE_ENV === 'development'

function revalidate(seconds: number) {
  return isDev ? { next: { revalidate: 0 } } : { next: { revalidate: seconds } }
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

export async function getEvents(): Promise<Event[]> {
  const events = await client.fetch<SanityEvent[]>(
    approvedEventsQuery,
    { today: getTodayDate() },
    revalidate(60)
  )
  return events.map(transformSanityEvent)
}

export async function getEvent(id: string): Promise<Event | null> {
  const event = await client.fetch<SanityEvent | null>(
    eventByIdQuery,
    { id },
    revalidate(60)
  )
  return event ? transformSanityEvent(event) : null
}

export async function getVenues(): Promise<Venue[]> {
  const venues = await client.fetch<SanityVenue[]>(
    venuesQuery,
    {},
    revalidate(300)
  )
  return venues.map(transformSanityVenue)
}

export async function getVenue(id: string): Promise<Venue | null> {
  const venue = await client.fetch<SanityVenue | null>(
    venueByIdQuery,
    { id },
    revalidate(300)
  )
  return venue ? transformSanityVenue(venue) : null
}

export async function getEventsByVenue(venueId: string): Promise<Event[]> {
  const events = await client.fetch<SanityEvent[]>(
    eventsByVenueQuery,
    { venueId, today: getTodayDate() },
    revalidate(60)
  )
  return events.map(transformSanityEvent)
}

export async function getPages(): Promise<SanityPage[]> {
  return client.fetch<SanityPage[]>(
    publishedPagesQuery,
    {},
    revalidate(300)
  )
}

export async function getPage(slug: string): Promise<SanityPage | null> {
  return client.fetch<SanityPage | null>(
    pageBySlugQuery,
    { slug },
    revalidate(300)
  )
}

export async function getBusinesses(): Promise<Business[]> {
  const businesses = await client.fetch<SanityBusiness[]>(
    approvedBusinessesQuery,
    {},
    revalidate(300)
  )
  return businesses.map(transformSanityBusiness)
}

export async function getBusiness(id: string): Promise<Business | null> {
  const business = await client.fetch<SanityBusiness | null>(
    businessByIdQuery,
    { id },
    revalidate(300)
  )
  return business ? transformSanityBusiness(business) : null
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return client.fetch<HomepageSettings | null>(
    homepageSettingsQuery,
    {},
    revalidate(60)
  )
}
