import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function getImageUrl(
  source: SanityImageSource | undefined,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'jpg' | 'png' | 'webp'
  } = {}
): string | undefined {
  if (!source) return undefined

  let url = builder.image(source)

  if (options.width) url = url.width(options.width)
  if (options.height) url = url.height(options.height)
  if (options.quality) url = url.quality(options.quality)
  if (options.format) url = url.format(options.format)

  return url.url()
}
