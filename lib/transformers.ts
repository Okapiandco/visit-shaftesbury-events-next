import { SanityEvent, SanityVenue, SanityBusiness } from '@/sanity/lib/types'
import { Event, Venue, Business } from '@/types/events'
import { getImageUrl } from '@/sanity/lib/image'

export function transformSanityVenue(sanityVenue: SanityVenue): Venue {
  return {
    id: sanityVenue._id,
    name: sanityVenue.name,
    address: sanityVenue.address,
    capacity: sanityVenue.capacity,
    description: sanityVenue.description,
    imageUrl: getImageUrl(sanityVenue.image, {
      width: 800,
      quality: 85,
      format: 'webp'
    }),
  }
}

export function transformSanityBusiness(sanityBusiness: SanityBusiness): Business {
  return {
    id: sanityBusiness._id,
    name: sanityBusiness.name,
    description: sanityBusiness.description,
    category: sanityBusiness.category as any,
    address: sanityBusiness.address,
    phone: sanityBusiness.phone,
    email: sanityBusiness.email,
    website: sanityBusiness.website,
    imageUrl: getImageUrl(sanityBusiness.image, {
      width: 800,
      quality: 85,
      format: 'webp'
    }),
    openingHours: sanityBusiness.openingHours,
    isFeatured: sanityBusiness.isFeatured || false,
  }
}

export function transformSanityEvent(sanityEvent: SanityEvent): Event {
  return {
    id: sanityEvent._id,
    title: sanityEvent.title,
    description: sanityEvent.description,
    date: sanityEvent.date,
    time: sanityEvent.time,
    endTime: sanityEvent.endTime,
    category: sanityEvent.category as any,
    venue: transformSanityVenue(sanityEvent.venue),
    imageUrl: getImageUrl(sanityEvent.image, {
      width: 1200,
      quality: 85,
      format: 'webp'
    }),
    organizer: sanityEvent.organizer,
    contactEmail: sanityEvent.contactEmail,
    status: sanityEvent.status,
    isFeatured: sanityEvent.isFeatured || false,
    ticketUrl: sanityEvent.ticketUrl,
    price: sanityEvent.price,
  }
}
