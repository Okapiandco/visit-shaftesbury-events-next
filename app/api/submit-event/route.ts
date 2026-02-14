import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const required = [
      'title',
      'description',
      'date',
      'time',
      'category',
      'venueId',
      'organizer',
      'contactEmail',
    ]
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Handle image upload if provided as base64 data URL
    let imageAsset = undefined
    if (body.imageData) {
      const base64Data = body.imageData.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      const asset = await writeClient.assets.upload('image', buffer, {
        filename: body.imageFilename || 'event-image.jpg',
      })
      imageAsset = {
        _type: 'image' as const,
        asset: { _type: 'reference' as const, _ref: asset._id },
      }
    } else if (body.imageAssetId) {
      // Support pre-uploaded asset ID (matches original Netlify function)
      imageAsset = {
        _type: 'image' as const,
        asset: { _type: 'reference' as const, _ref: body.imageAssetId },
      }
    }

    const doc = {
      _type: 'event',
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time,
      endTime: body.endTime || undefined,
      category: body.category,
      venue: {
        _type: 'reference' as const,
        _ref: body.venueId,
      },
      organizer: body.organizer,
      contactEmail: body.contactEmail,
      price: body.price || undefined,
      ticketUrl: body.ticketUrl || undefined,
      status: 'pending',
      isFeatured: false,
      ...(imageAsset && { image: imageAsset }),
    }

    const result = await writeClient.create(doc)

    return NextResponse.json({ success: true, id: result._id })
  } catch (error) {
    console.error('Submit event error:', error)
    return NextResponse.json(
      { error: 'Failed to submit event' },
      { status: 500 }
    )
  }
}
