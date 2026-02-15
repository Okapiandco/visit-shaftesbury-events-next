export const approvedEventsQuery = `
  *[_type == "event" && status == "approved" && date >= $today] | order(date asc) {
    _id,
    title,
    description,
    date,
    time,
    endTime,
    category,
    "venue": venue->{
      _id,
      name,
      address,
      capacity,
      description,
      image
    },
    image,
    organizer,
    contactEmail,
    price,
    ticketUrl,
    status,
    isFeatured
  }
`

export const eventByIdQuery = `
  *[_type == "event" && _id == $id][0] {
    _id,
    title,
    description,
    date,
    time,
    endTime,
    category,
    "venue": venue->{
      _id,
      name,
      address,
      capacity,
      description,
      image
    },
    image,
    organizer,
    contactEmail,
    price,
    ticketUrl,
    status,
    isFeatured
  }
`

export const venuesQuery = `
  *[_type == "venue"] | order(name asc) {
    _id,
    name,
    address,
    capacity,
    description,
    image
  }
`

export const venueByIdQuery = `
  *[_type == "venue" && _id == $id][0] {
    _id,
    name,
    address,
    capacity,
    description,
    image
  }
`

export const eventsByVenueQuery = `
  *[_type == "event" && venue._ref == $venueId && status == "approved" && date >= $today] | order(date asc) {
    _id,
    title,
    description,
    date,
    time,
    endTime,
    category,
    "venue": venue->{
      _id,
      name,
      address,
      capacity,
      description,
      image
    },
    image,
    organizer,
    price,
    ticketUrl,
    status,
    isFeatured
  }
`

export const publishedPagesQuery = `
  *[_type == "page" && isPublished == true] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    heroImage,
    content,
    seo,
    publishedAt
  }
`

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    heroImage,
    content,
    seo,
    publishedAt
  }
`

export const approvedBusinessesQuery = `
  *[_type == "business" && status == "approved"] | order(name asc) {
    _id,
    name,
    description,
    category,
    address,
    phone,
    email,
    website,
    image,
    openingHours,
    status,
    isFeatured
  }
`

export const businessByIdQuery = `
  *[_type == "business" && _id == $id][0] {
    _id,
    name,
    description,
    category,
    address,
    phone,
    email,
    website,
    image,
    openingHours,
    status,
    isFeatured
  }
`

export const homepageSettingsQuery = `
  *[_type == "homepageSettings"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    featuredSectionTitle,
    allEventsSectionTitle,
    welcomeMessage,
    showWelcomeMessage,
    contentSections,
    aboutTitle,
    aboutText,
    aboutImage,
    aboutLinkText,
    aboutLinkUrl
  }
`
