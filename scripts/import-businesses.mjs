import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import https from 'https'
import http from 'http'

const client = createClient({
  projectId: 'cpjyb702',
  dataset: 'production',
  apiVersion: '2024-02-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// Map JSON categories to Sanity schema categories
function mapCategory(jsonCategory, description) {
  switch (jsonCategory) {
    case 'shops':
      return 'shop'
    case 'food and drink':
      // Check description to decide between pub/restaurant
      if (description?.toLowerCase().includes('pub')) return 'pub'
      return 'restaurant'
    case 'service':
      return 'professional'
    case 'accommodation':
      return 'other' // No accommodation category in schema
    default:
      return 'other'
  }
}

// Download image from URL and upload to Sanity
async function uploadImage(imageUrl, businessName) {
  // Skip non-image URLs (e.g. TripAdvisor pages)
  if (!imageUrl || imageUrl.includes('tripadvisor.com/Restaurant_Review')) {
    console.log(`  Skipping non-image URL for ${businessName}`)
    return null
  }

  return new Promise((resolve) => {
    const protocol = imageUrl.startsWith('https') ? https : http

    protocol.get(imageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    }, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`  Following redirect for ${businessName}...`)
        uploadImage(response.headers.location, businessName).then(resolve)
        return
      }

      if (response.statusCode !== 200) {
        console.log(`  Failed to download image for ${businessName} (HTTP ${response.statusCode})`)
        resolve(null)
        return
      }

      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks)
          if (buffer.length < 100) {
            console.log(`  Image too small for ${businessName}, skipping`)
            resolve(null)
            return
          }
          const asset = await client.assets.upload('image', buffer, {
            filename: `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
          })
          console.log(`  Uploaded image for ${businessName}`)
          resolve({
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
            alt: businessName,
          })
        } catch (err) {
          console.log(`  Failed to upload image for ${businessName}: ${err.message}`)
          resolve(null)
        }
      })
      response.on('error', () => {
        console.log(`  Image download error for ${businessName}`)
        resolve(null)
      })
    }).on('error', () => {
      console.log(`  Image request error for ${businessName}`)
      resolve(null)
    })
  })
}

const businesses = [
  {
    business_title: "The Grosvenor Arms",
    description: "Boutique hotel in Shaftesbury with Georgian features, contemporary design, and fabulous seasonal menus. It features 17 high-end bedrooms, a restaurant, and a bar.",
    website_url: "https://grosvenorarms.co.uk/",
    contact_number: "01747 850580",
    address: "The Commons, Shaftesbury, Dorset SP7 8JA",
    opening_hours: "Open all day; Restaurant: breakfast 7.30am-11am Mon-Sat, to 11am Sun",
    image_url: "https://grosvenorarms.co.uk/media/2023/08/0JEP9460-1-scaled.jpg",
    category: "accommodation"
  },
  {
    business_title: "Best Western Royal Chase Hotel",
    description: "A former 17th-century monastery and one of the oldest and most historically interesting hotels in Dorset, situated in the heart of Thomas Hardy country.",
    website_url: "https://www.theroyalchasehotel.co.uk/",
    contact_number: "01747 853355",
    address: "Royal Chase Roundabout, Shaftesbury, England SP7 8DB",
    opening_hours: "24/7 for hotel guests",
    image_url: "https://www.theroyalchasehotel.co.uk/assets/images/logos/bw-core-h-small.png",
    category: "accommodation"
  },
  {
    business_title: "La Fleur de Lys",
    description: "A luxury family-run hotel and award-winning restaurant offering elegant rooms and fine cuisine on the edge of the town centre.",
    website_url: "https://lafleurdelys.co.uk/",
    contact_number: "01747 853717",
    address: "Bleke Street, Shaftesbury, SP7 8AW",
    opening_hours: "Tuesday to Saturday 6:30pm - 10:00pm (Restaurant)",
    image_url: "https://cdn.prod.website-files.com/682bb0749f13caaf160f7985/687e33f06b34ee568d966f3b_Interior.jpg",
    category: "accommodation"
  },
  {
    business_title: "The Mitre",
    description: "A traditional high-street pub famous for its tiered outdoor terrace with stunning views across the Blackmore Vale, serving British seasonal dishes.",
    website_url: "https://www.themitredorset.co.uk/",
    contact_number: "01747 853002",
    address: "23 High Street, Shaftesbury, Dorset SP7 8JE",
    opening_hours: "Open Today: 10am - 11pm (Food Service 10am - 9pm)",
    image_url: null, // TripAdvisor URL, not a direct image
    category: "food and drink"
  },
  {
    business_title: "Shirley Allum Boutique",
    description: "Dorset's leading independent fashion boutique offering a wide range of women's clothing, footwear, and lingerie.",
    website_url: "https://www.shirleyallum.co.uk/",
    contact_number: "01747 852444",
    address: "30 High St, Shaftesbury, Dorset SP7 8JG",
    opening_hours: "09:00 - 17:00",
    image_url: "https://www.shirleyallum.co.uk/cdn/shop/files/1202-monari-shirley-allum-boutique.jpg",
    category: "shops"
  },
  {
    business_title: "Farnfields Solicitors",
    description: "A well-established law firm providing legal services for businesses and individuals, specialising in property, family, and commercial law.",
    website_url: "https://farnfields.com/",
    contact_number: "01747 854244",
    address: "4 Church Lane, Shaftesbury, Dorset SP7 8JT",
    opening_hours: "Monday - Friday 9:00am - 5:00pm",
    image_url: "https://farnfields.com/wp-content/themes/farnfields/library/images/logo.png",
    category: "service"
  },
  {
    business_title: "Mine Boutique",
    description: "An independent lifestyle boutique in Shaftesbury providing a beautiful environment to find unique gifts and clothing.",
    website_url: "https://mine-boutique.co.uk/",
    contact_number: "01747 685477",
    address: "25 High Street, Shaftesbury, SP7 8JE",
    opening_hours: "10am - 6pm Tuesday - Saturday",
    image_url: "https://mine-boutique.co.uk/cdn/shop/files/Screenshot_2022-03-01_at_13.03.47_200x200.png",
    category: "shops"
  },
  {
    business_title: "Willow",
    description: "Independent shop on Shaftesbury High Street specialising in sustainable and natural boutique clothing and lifestyle items.",
    website_url: "https://willow-natural.co.uk/",
    contact_number: "01747 855101",
    address: "9 High St, Shaftesbury, Dorset SP7 8JS",
    opening_hours: "Monday - Saturday 10:00am - 5:00pm",
    image_url: "https://cdn11.bigcommerce.com/s-fwhcnwkz7l/images/stencil/original/carousel/191/Ewaiwalla2.png",
    category: "shops"
  },
  {
    business_title: "The Half Moon",
    description: "A beautiful and historic pub located at the northern gateway to Dorset, offering delightful dining and a wide selection of drinks.",
    website_url: "https://www.halfmoonshaftesbury.co.uk/",
    contact_number: "01747 852456",
    address: "Salisbury Road, Shaftesbury, Dorset SP7 8BS",
    opening_hours: "Monday to Sunday All Day from 11am",
    image_url: "https://s3-eu-west-1.amazonaws.com/hall-woodhouse/media/original/uploads/47/88/880c8fbeaf644f61735c158926d1dafa0afa2ede.jpg",
    category: "food and drink"
  },
  {
    business_title: "Rutters Solicitors",
    description: "A law firm with over 180 years of history in Dorset, providing expertise in property, probate, and commercial law.",
    website_url: "https://rutterslaw.co.uk/",
    contact_number: "01747 852377",
    address: "2 Bimport, Shaftesbury, Dorset SP7 8AY",
    opening_hours: "Monday - Friday 9:00am - 5:00pm",
    image_url: "https://rutterslaw.co.uk/wp-content/uploads/2025/08/rutters-logo.png",
    category: "service"
  }
]

async function importBusinesses() {
  console.log(`Importing ${businesses.length} businesses to Sanity...\n`)

  for (const biz of businesses) {
    console.log(`Processing: ${biz.business_title}`)

    const category = mapCategory(biz.category, biz.description)

    // Try to upload image
    let image = null
    if (biz.image_url) {
      image = await uploadImage(biz.image_url, biz.business_title)
    }

    const doc = {
      _type: 'business',
      name: biz.business_title,
      description: biz.description,
      category,
      address: biz.address,
      phone: biz.contact_number,
      website: biz.website_url,
      openingHours: biz.opening_hours,
      status: 'approved',
      isFeatured: false,
    }

    if (image) {
      doc.image = image
    }

    try {
      const result = await client.create(doc)
      console.log(`  Created: ${result._id}\n`)
    } catch (err) {
      console.error(`  ERROR creating ${biz.business_title}: ${err.message}\n`)
    }
  }

  console.log('Import complete!')
}

importBusinesses()
