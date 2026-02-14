import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Only name is required
    if (!body.name) {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      )
    }

    // Handle image upload if provided as base64 data URL
    let imageAsset = undefined
    if (body.imageData) {
      const base64Data = body.imageData.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      const asset = await writeClient.assets.upload('image', buffer, {
        filename: body.imageFilename || 'business-image.jpg',
      })
      imageAsset = {
        _type: 'image' as const,
        asset: { _type: 'reference' as const, _ref: asset._id },
      }
    }

    const doc = {
      _type: 'business',
      name: body.name,
      description: body.description || undefined,
      category: body.category || undefined,
      address: body.address || undefined,
      phone: body.phone || undefined,
      email: body.email || undefined,
      website: body.website || undefined,
      openingHours: body.openingHours || undefined,
      status: 'pending',
      isFeatured: false,
      ...(imageAsset && { image: imageAsset }),
    }

    const result = await writeClient.create(doc)

    return NextResponse.json({ success: true, id: result._id })
  } catch (error) {
    console.error('Submit business error:', error)
    return NextResponse.json(
      { error: 'Failed to submit business' },
      { status: 500 }
    )
  }
}
