import { PortableText as PortableTextReact, PortableTextComponents } from '@portabletext/react'
import { SanityBlock } from '@/sanity/lib/types'
import { getImageUrl } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-6">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-foreground/80 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary hover:underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const imageUrl = getImageUrl(value, {
        width: 1200,
        quality: 85,
        format: 'webp'
      })

      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || 'Image from Visit Shaftesbury'}
            className="w-full h-auto rounded-lg shadow-md"
          />
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextProps {
  value: SanityBlock[]
  className?: string
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}
