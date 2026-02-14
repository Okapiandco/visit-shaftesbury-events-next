import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { writeClient, client } from '@/sanity/lib/client'

interface WPEvent {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  link: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

interface ParsedEvent {
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  category: string
  price?: string
  ticketUrl?: string
  organizer: string
}

const SCRAPE_SECRET = process.env.REVALIDATION_SECRET
const CRON_SECRET = process.env.CRON_SECRET

// GET handler for Vercel Cron Jobs (runs every Monday at 9am)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return scrapeEvents('https://shaftesburyartscentre.org.uk/wp-json/wp/v2/ajde_events?per_page=20&_embed')
}

// POST handler for manual triggers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const secret = body.secret || request.headers.get('x-scrape-secret')

    if (secret !== SCRAPE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sourceUrl = body.sourceUrl || 'https://shaftesburyartscentre.org.uk/wp-json/wp/v2/ajde_events?per_page=20&_embed'

    return scrapeEvents(sourceUrl)
  } catch (error) {
    console.error('Scrape error:', error)
    return NextResponse.json(
      { error: `Scrape failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    )
  }
}

async function scrapeEvents(sourceUrl: string) {
  try {

    // 1. Fetch events from WordPress REST API
    const wpResponse = await fetch(sourceUrl, {
      headers: { 'User-Agent': 'VisitShaftesbury/1.0' },
    })

    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch events: ${wpResponse.status}` },
        { status: 502 }
      )
    }

    const wpEvents: WPEvent[] = await wpResponse.json()

    if (!wpEvents.length) {
      return NextResponse.json({ message: 'No events found', imported: 0 })
    }

    // 2. Check for existing events to avoid duplicates
    const existingTitles: string[] = await client.fetch(
      `*[_type == "event"]{ title }.title`
    )
    const existingSet = new Set(existingTitles.map(t => t?.toLowerCase().trim()))

    // 3. Ensure "Shaftesbury Arts Centre" venue exists
    let venueId = await client.fetch(
      `*[_type == "venue" && name == "Shaftesbury Arts Centre"][0]._id`
    )

    if (!venueId) {
      const venue = await writeClient.create({
        _type: 'venue',
        name: 'Shaftesbury Arts Centre',
        address: 'Bell Street, Shaftesbury, Dorset SP7 8AR',
        description: 'A vibrant community arts centre in the heart of Shaftesbury, hosting cinema, theatre, music, workshops and events.',
      })
      venueId = venue._id
    }

    // 4. Strip HTML tags helper
    function stripHtml(html: string): string {
      return html
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    }

    // 5. Use Claude to parse event details
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    })

    const eventsToProcess = wpEvents.filter(
      (e) => !existingSet.has(stripHtml(e.title.rendered).toLowerCase().trim())
    )

    if (!eventsToProcess.length) {
      return NextResponse.json({
        message: 'All events already exist',
        imported: 0,
        skipped: wpEvents.length,
      })
    }

    // Build a summary of events for Claude to parse
    const eventSummaries = eventsToProcess.map((e, i) => ({
      index: i,
      title: stripHtml(e.title.rendered),
      content: stripHtml(e.content.rendered).slice(0, 1500),
      link: e.link,
    }))

    const aiResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Parse these events from Shaftesbury Arts Centre into structured JSON. For each event, extract:

- title: clean event title (remove ratings like "(12)" "(15)" etc from title but keep the info in description)
- description: a concise 1-3 sentence description of the event
- date: in YYYY-MM-DD format (use the date from the data, events are in 2025-2026)
- time: start time in HH:MM 24hr format. If not specified, use "19:30" for evening events, "14:00" for matinees, "10:00" for morning events
- endTime: end time in HH:MM if determinable, otherwise omit
- category: one of: community, music, sports, arts, education, markets, charity, council, other. Use "arts" for films/cinema/theatre, "music" for music events, "education" for talks/workshops, "community" for general community events
- price: ticket price as string e.g. "£7.50", "Free", "£14-£16". If unknown omit
- ticketUrl: the event link URL
- organizer: the organizing group/person. Default to "Shaftesbury Arts Centre" if not clear

Return a JSON array of objects. Only return the JSON array, no other text.

Events:
${JSON.stringify(eventSummaries, null, 2)}`,
        },
      ],
    })

    const aiText =
      aiResponse.content[0].type === 'text' ? aiResponse.content[0].text : ''

    // Extract JSON from response
    const jsonMatch = aiText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Failed to parse AI response', raw: aiText },
        { status: 500 }
      )
    }

    const parsedEvents: ParsedEvent[] = JSON.parse(jsonMatch[0])

    // 6. Create events in Sanity
    const results: Array<{ title: string; id: string; status: string }> = []

    for (let i = 0; i < parsedEvents.length; i++) {
      const parsed = parsedEvents[i]
      const wpEvent = eventsToProcess[i]

      try {
        // Upload featured image if available
        let imageAsset = undefined
        const imageUrl =
          wpEvent._embedded?.['wp:featuredmedia']?.[0]?.source_url

        if (imageUrl) {
          try {
            const imgResponse = await fetch(imageUrl)
            if (imgResponse.ok) {
              const imgBuffer = Buffer.from(await imgResponse.arrayBuffer())
              const asset = await writeClient.assets.upload('image', imgBuffer, {
                filename: `arts-centre-${wpEvent.id}.jpg`,
              })
              imageAsset = {
                _type: 'image' as const,
                asset: { _type: 'reference' as const, _ref: asset._id },
                alt: stripHtml(wpEvent.title.rendered),
              }
            }
          } catch {
            // Skip image if upload fails
          }
        }

        const doc = {
          _type: 'event',
          title: parsed.title,
          description: parsed.description,
          date: parsed.date,
          time: parsed.time,
          endTime: parsed.endTime || undefined,
          category: parsed.category,
          venue: { _type: 'reference' as const, _ref: venueId },
          organizer: parsed.organizer,
          price: parsed.price || undefined,
          ticketUrl: parsed.ticketUrl || undefined,
          status: 'pending',
          isFeatured: false,
          ...(imageAsset && { image: imageAsset }),
        }

        const result = await writeClient.create(doc)
        results.push({
          title: parsed.title,
          id: result._id,
          status: 'created',
        })
      } catch (err) {
        results.push({
          title: parsed.title,
          id: '',
          status: `error: ${err instanceof Error ? err.message : 'unknown'}`,
        })
      }
    }

    return NextResponse.json({
      message: `Imported ${results.filter((r) => r.status === 'created').length} events`,
      imported: results.filter((r) => r.status === 'created').length,
      skipped: wpEvents.length - eventsToProcess.length,
      results,
    })
  } catch (error) {
    console.error('Scrape error:', error)
    return NextResponse.json(
      { error: `Scrape failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    )
  }
}
