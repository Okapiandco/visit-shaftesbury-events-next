import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { Venue } from '@/types/events';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <Link href={`/venue/${venue.id}`}>
      <article className="group overflow-hidden transition-all duration-300 bg-card border border-border hover:border-foreground/20">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          {venue.imageUrl ? (
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-secondary flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="space-y-3">
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
              {venue.name}
            </h3>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{venue.address}</span>
            </div>

            {venue.capacity && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Capacity: {venue.capacity.toLocaleString()}</span>
              </div>
            )}

            {venue.description && (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {venue.description}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default VenueCard;
