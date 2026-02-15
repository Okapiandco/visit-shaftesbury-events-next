"use client";

import { EventCategory, categoryLabels } from '@/types/events';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories: (EventCategory | 'all')[] = [
    'all',
    'community',
    'music',
    'sports',
    'arts',
    'education',
    'markets',
    'charity',
    'council',
    'other',
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap" role="group" aria-label="Filter events by category">
      <div className="flex gap-2 pb-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            aria-pressed={selectedCategory === category}
            className="shrink-0 uppercase text-xs tracking-wide"
          >
            {category === 'all' ? 'All' : categoryLabels[category]}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryFilter;
