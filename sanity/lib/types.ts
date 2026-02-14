import type { SanityImageSource } from '@sanity/image-url'

export interface SanityVenue {
  _id: string
  name: string
  address: string
  capacity?: number
  description?: string
  image?: SanityImageSource
}

export interface SanityEvent {
  _id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  category: string
  venue: SanityVenue
  image?: SanityImageSource
  organizer: string
  contactEmail?: string
  price?: string
  ticketUrl?: string
  status: 'pending' | 'approved' | 'rejected'
  isFeatured?: boolean
}

export interface SanityBusiness {
  _id: string
  name: string
  description?: string
  category?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  image?: SanityImageSource
  openingHours?: string
  status: 'pending' | 'approved' | 'rejected'
  isFeatured?: boolean
}

export interface SanityBlock {
  _type: string
  _key: string
  style?: string
  children?: Array<{
    _type: string
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
  asset?: {
    _ref: string
    _type: string
  }
  alt?: string
  caption?: string
}

export interface SanityPage {
  _id: string
  title: string
  slug: string
  subtitle?: string
  heroImage?: SanityImageSource
  content: SanityBlock[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  publishedAt?: string
}

export interface HomepageSettings {
  heroTitle: string
  heroSubtitle: string
  heroImage?: SanityImageSource
  featuredSectionTitle?: string
  allEventsSectionTitle?: string
  welcomeMessage?: SanityBlock[]
  showWelcomeMessage?: boolean
}
