import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event, categoryLabels } from '@/types/events';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard = ({ event, featured = false }: EventCardProps) => {
  const formattedDate = format(parseISO(event.date), 'EEE, MMM d');
  const formattedTime = event.time;

  return (
    <Link href={`/event/${event.id}`} aria-label={`${event.title} — ${formattedDate} at ${event.venue.name}`}>
      <article
        className={`group overflow-hidden transition-all duration-300 bg-card border border-border hover:border-foreground/20 ${
          featured ? 'md:flex' : ''
        }`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-muted ${
            featured ? 'md:w-2/5 h-56 md:h-auto' : 'h-48'
          }`}
        >
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-secondary flex items-center justify-center">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/95 text-foreground border-0 font-medium uppercase text-xs tracking-wide">
              {categoryLabels[event.category]}
            </Badge>
          </div>

          {/* Featured Badge */}
          {event.isFeatured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-foreground text-background border-0 font-medium uppercase text-xs tracking-wide">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 ${featured ? 'md:flex-1 md:p-8 md:flex md:flex-col md:justify-center' : ''}`}>
          <div className="space-y-3">
            {/* Date & Time */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{formattedTime}{event.endTime && ` \u2013 ${event.endTime}`}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`font-display font-semibold text-foreground group-hover:text-muted-foreground transition-colors ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {event.title}
            </h3>

            {/* Description */}
            <p className={`text-muted-foreground line-clamp-2 ${featured ? 'md:line-clamp-3' : ''}`}>
              {event.description}
            </p>

            {/* Venue */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{event.venue.name}</span>
            </div>

            {/* Price */}
            {event.price && (
              <div className="pt-2">
                <span className="inline-block text-sm font-medium text-foreground">
                  {event.price}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
