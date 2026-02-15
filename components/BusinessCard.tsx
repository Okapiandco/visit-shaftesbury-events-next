import Link from 'next/link';
import { MapPin, Phone, Store } from 'lucide-react';
import { Business, BusinessCategory, businessCategoryLabels, businessCategoryColors } from '@/types/events';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Link href={`/directory/${business.id}`} aria-label={`${business.name}${business.category ? ` — ${business.category}` : ''}`}>
      <article className="group overflow-hidden transition-all duration-300 bg-card border border-border hover:border-foreground/20">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          {business.imageUrl ? (
            <img
              src={business.imageUrl}
              alt={business.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-secondary flex items-center justify-center">
              <Store className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          {business.category && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium ${businessCategoryColors[business.category]}`}>
              {businessCategoryLabels[business.category]}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="space-y-3">
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
              {business.name}
            </h3>

            {business.address && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{business.address}</span>
              </div>
            )}

            {business.phone && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{business.phone}</span>
              </div>
            )}

            {business.description && (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {business.description}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BusinessCard;
