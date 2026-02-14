import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type } = body

    // Revalidate relevant paths based on the Sanity document type
    switch (_type) {
      case 'event':
        revalidatePath('/')
        revalidatePath('/event/[id]', 'page')
        revalidatePath('/venues')
        revalidatePath('/venue/[id]', 'page')
        break
      case 'venue':
        revalidatePath('/venues')
        revalidatePath('/venue/[id]', 'page')
        revalidatePath('/submit')
        break
      case 'business':
        revalidatePath('/directory')
        revalidatePath('/directory/[id]', 'page')
        break
      case 'page':
        revalidatePath('/page/[slug]', 'page')
        break
      case 'homepageSettings':
        revalidatePath('/')
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
