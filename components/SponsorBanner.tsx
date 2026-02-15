import Link from 'next/link'
import { SponsorData } from '@/sanity/lib/fetchers'

interface SponsorBannerProps {
  sponsor: SponsorData
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Proudly supporting our local town of Shaftesbury
          </p>
          <Link
            href={sponsor.directoryUrl || '#'}
            className="flex flex-col items-center gap-3 group"
          >
            {sponsor.imageUrl && (
              <img
                src={sponsor.imageUrl}
                alt={sponsor.name}
                className="h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
            )}
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Sponsored by <span className="font-medium">{sponsor.name}</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
