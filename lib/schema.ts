import { Event, Venue, Business, BusinessCategory } from '@/types/events'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://visitshaftesbury.co.uk'
const SITE_NAME = 'Visit Shaftesbury'
const ORG_LOGO = `${SITE_URL}/logo.png`

// ─── Helpers ─────────────────────────────────────────────

function shaftesburyAddress(streetAddress: string) {
  return {
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality: 'Shaftesbury',
    addressRegion: 'Dorset',
    addressCountry: 'GB',
  }
}

const BUSINESS_CATEGORY_SCHEMA_MAP: Record<BusinessCategory, string> = {
  restaurant: 'Restaurant',
  cafe: 'CafeOrCoffeeShop',
  pub: 'BarOrPub',
  shop: 'Store',
  salon: 'BeautySalon',
  health: 'HealthAndBeautyBusiness',
  accommodation: 'LodgingBusiness',
  professional: 'ProfessionalService',
  trades: 'HomeAndConstructionBusiness',
  other: 'LocalBusiness',
}

// ─── Document Wrappers ───────────────────────────────────

/** Wraps one or more schema nodes into a JSON-LD document with @context and @graph */
export function jsonLdDocument(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

/** Returns props for a <script> element to render JSON-LD */
export function jsonLdScriptProps(document: Record<string, unknown>) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(document),
    },
  }
}

// ─── Site-wide Schemas ───────────────────────────────────

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: ORG_LOGO,
      contentUrl: ORG_LOGO,
      caption: SITE_NAME,
    },
    image: { '@id': `${SITE_URL}/#logo` },
    description: 'Discover events, shops, services and things to do in Shaftesbury, Dorset. Your guide to this historic hilltop town.',
    areaServed: {
      '@type': 'City',
      name: 'Shaftesbury',
    },
  }
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-GB',
  }
}

// ─── Page-level Schemas ──────────────────────────────────

export function webPageSchema(opts: {
  name: string
  description: string
  url: string
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage'
}) {
  return {
    '@type': opts.type || 'WebPage',
    '@id': `${SITE_URL}${opts.url}/#webpage`,
    url: `${SITE_URL}${opts.url}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-GB',
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

// ─── Content Schemas ─────────────────────────────────────

export function touristDestinationSchema() {
  return {
    '@type': 'TouristDestination',
    name: 'Shaftesbury',
    description: "One of England's oldest hilltop towns, founded by King Alfred the Great in 880 AD. Famous for Gold Hill and stunning views over the Blackmore Vale in Dorset.",
    url: SITE_URL,
    image: ORG_LOGO,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shaftesbury',
      addressRegion: 'Dorset',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0054,
      longitude: -2.1986,
    },
    touristType: [
      'History enthusiasts',
      'Countryside walkers',
      'Families',
    ],
  }
}

export function eventSchema(event: Event) {
  const startDateTime = `${event.date}T${event.time}:00`
  const endDateTime = event.endTime ? `${event.date}T${event.endTime}:00` : undefined

  return {
    '@type': 'Event',
    '@id': `${SITE_URL}/event/${event.id}/#event`,
    name: event.title,
    description: event.description,
    startDate: startDateTime,
    ...(endDateTime && { endDate: endDateTime }),
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: shaftesburyAddress(event.venue.address),
    },
    ...(event.imageUrl && { image: event.imageUrl }),
    ...(event.organizer && {
      organizer: {
        '@type': 'Organization',
        name: event.organizer,
      },
    }),
    ...(event.price !== undefined && event.price !== null && {
      offers: {
        '@type': 'Offer',
        ...(event.price === '0' || event.price.toLowerCase() === 'free'
          ? { price: 0, priceCurrency: 'GBP' }
          : { price: event.price, priceCurrency: 'GBP' }),
        ...(event.ticketUrl && { url: event.ticketUrl }),
        availability: 'https://schema.org/InStock',
      },
    }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${SITE_URL}/event/${event.id}`,
  }
}

export function businessSchema(business: Business) {
  const schemaType = business.category
    ? BUSINESS_CATEGORY_SCHEMA_MAP[business.category] || 'LocalBusiness'
    : 'LocalBusiness'

  return {
    '@type': schemaType,
    '@id': `${SITE_URL}/directory/${business.id}/#business`,
    name: business.name,
    ...(business.description && { description: business.description }),
    ...(business.address && {
      address: shaftesburyAddress(business.address),
    }),
    ...(business.phone && { telephone: business.phone }),
    ...(business.email && { email: business.email }),
    ...(business.website && { url: business.website }),
    ...(business.imageUrl && { image: business.imageUrl }),
    ...(business.openingHours && { openingHours: business.openingHours }),
  }
}

export function venueSchema(venue: Venue) {
  return {
    '@type': 'Place',
    '@id': `${SITE_URL}/venue/${venue.id}/#place`,
    name: venue.name,
    description: venue.description || `${venue.name} in Shaftesbury, Dorset`,
    address: shaftesburyAddress(venue.address),
    ...(venue.imageUrl && { image: venue.imageUrl }),
    ...(venue.capacity && { maximumAttendeeCapacity: venue.capacity }),
    url: `${SITE_URL}/venue/${venue.id}`,
  }
}

// ─── ItemList Schemas ────────────────────────────────────

export function eventListSchema(events: Event[]) {
  return {
    '@type': 'ItemList',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/event/${event.id}`,
    })),
  }
}

export function businessListSchema(businesses: Business[]) {
  return {
    '@type': 'ItemList',
    itemListElement: businesses.map((business, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/directory/${business.id}`,
    })),
  }
}

export function venueListSchema(venues: Venue[]) {
  return {
    '@type': 'ItemList',
    itemListElement: venues.map((venue, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/venue/${venue.id}`,
    })),
  }
}
