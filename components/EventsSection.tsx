"use client";

import { useState, useMemo } from 'react';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Event, EventCategory } from '@/types/events';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface EventsSectionProps {
  events: Event[];
}

const EventsSection = ({ events }: EventsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredEvents = events.filter(e => e.isFeatured);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.venue.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <main className="flex-1 bg-background">
      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Featured Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredEvents.slice(0, 2).map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} featured />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Events */}
      <section id="events" className="container mx-auto px-4 py-16 scroll-mt-24 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              What&apos;s On
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover upcoming events, festivals, markets and community gatherings in and around our beautiful hilltop town in Dorset.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-border">
            <p className="text-muted-foreground text-lg">
              No events found matching your criteria.
            </p>
            <p className="text-muted-foreground/70 mt-2">
              Try adjusting your search or filter settings.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default EventsSection;
