"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event, categoryLabels } from '@/types/events';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  ArrowLeft,
  ExternalLink,
  Share2,
  Users
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

interface EventDetailContentProps {
  event: Event;
}

const EventDetailContent = ({ event }: EventDetailContentProps) => {
  const formattedDate = format(parseISO(event.date), 'EEEE, MMMM d, yyyy');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <main className="flex-1">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-secondary" />
        )}
        <div className="absolute inset-0 hero-overlay" />

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-6 left-6">
          <Badge className="bg-background text-foreground border-0 font-medium uppercase text-xs tracking-wide px-4 py-1.5">
            {categoryLabels[event.category]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-fade-up">
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">
                {event.title}
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{event.time}{event.endTime && ` \u2013 ${event.endTime}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.venue.name}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>

              {/* Organizer */}
              <div className="flex items-center gap-4 pt-8 border-t border-border mt-8">
                <div className="h-14 w-14 bg-secondary flex items-center justify-center">
                  <User className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organised by</p>
                  <p className="font-semibold text-foreground text-lg">{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {/* Action Card */}
            <div className="border border-border p-6 space-y-5">
              {event.price && (
                <div className="text-center pb-5 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Entry</p>
                  <p className="text-2xl font-display font-semibold text-foreground">{event.price}</p>
                </div>
              )}

              <div className="space-y-3">
                {event.ticketUrl && (
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" size="lg" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Get Tickets
                    </Button>
                  </a>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share Event
                </Button>
              </div>

              {event.contactEmail && (
                <div className="pt-5 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Questions?</p>
                  <a
                    href={`mailto:${event.contactEmail}`}
                    className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {event.contactEmail}
                  </a>
                </div>
              )}
            </div>

            {/* Venue Card */}
            <div className="border border-border overflow-hidden">
              {event.venue.imageUrl && (
                <img
                  src={event.venue.imageUrl}
                  alt={event.venue.name}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {event.venue.name}
                </h3>

                <div className="flex items-start gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>{event.venue.address}</span>
                </div>

                {event.venue.capacity && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Users className="h-4 w-4" />
                    <span>Capacity: {event.venue.capacity.toLocaleString()}</span>
                  </div>
                )}

                <Link href={`/venue/${event.venue.id}`}>
                  <Button variant="ghost" size="sm" className="w-full mt-2 uppercase text-xs tracking-wide">
                    View Venue Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailContent;
