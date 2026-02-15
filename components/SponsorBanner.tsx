import Link from 'next/link'
import { SponsorData } from '@/sanity/lib/fetchers'

interface SponsorBannerProps {
  sponsor: SponsorData
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <section className="bg-navy">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={sponsor.directoryUrl || '#'}
          className="flex flex-col md:flex-row items-center justify-center gap-6 group"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">
            Proudly supporting our local town of Shaftesbury
          </p>

          <div className="w-px h-6 bg-white/20 hidden md:block" />

          <div className="flex items-center gap-4">
            {sponsor.imageUrl && (
              <img
                src={sponsor.imageUrl}
                alt={sponsor.name}
                className="h-12 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
              />
            )}
            <div className="text-white">
              <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                Sponsored by
              </p>
              <p className="text-lg font-display font-semibold group-hover:text-gold transition-colors">
                {sponsor.name}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
