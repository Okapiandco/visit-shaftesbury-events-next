import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HomepageSettings } from '@/sanity/lib/types';
import { getImageUrl } from '@/sanity/lib/image';

interface HeroSectionProps {
  settings: HomepageSettings | null;
}

const HeroSection = ({ settings }: HeroSectionProps) => {
  const title = settings?.heroTitle || 'Visit Shaftesbury';
  const subtitle = settings?.heroSubtitle || 'Discover events, shops, restaurants and services in Dorset\'s historic hilltop town.';
  const backgroundImage = settings?.heroImage
    ? getImageUrl(settings.heroImage, { width: 1920, quality: 85, format: 'webp' })
    : '/langport-hero.jpg';

  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[550px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Shaftesbury, Dorset - historic hilltop town"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-up">
            <span className="text-sm tracking-[0.4em] text-white/80 font-medium uppercase block mb-2">
              Welcome to
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 tracking-tight">
              {title}
            </h1>
          </div>

          <p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up font-light"
            style={{ animationDelay: '0.15s' }}
          >
            {subtitle}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a href="#explore">
              <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto bg-gold text-navy hover:bg-gold-light font-semibold">
                Explore Shaftesbury
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
