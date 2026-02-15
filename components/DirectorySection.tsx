"use client";

import { useState, useMemo } from 'react';
import BusinessCard from '@/components/BusinessCard';
import { Business, BusinessCategory, businessCategoryLabels } from '@/types/events';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DirectorySectionProps {
  businesses: Business[];
}

const categories: BusinessCategory[] = [
  'shop', 'restaurant', 'cafe', 'pub', 'accommodation', 'salon', 'professional', 'trades', 'health', 'other'
];

const DirectorySection = ({ businesses }: DirectorySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (business.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (business.address || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [businesses, selectedCategory, searchQuery]);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Browse Directory
          </h2>
          <p className="text-muted-foreground mt-2">
            Find independent shops, professional services, pubs & caf&eacute;s in Shaftesbury, Dorset — from boutique fashion to legal services and local hospitality.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-none"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-sm font-medium border transition-colors ${
            selectedCategory === 'all'
              ? 'bg-navy text-white border-navy'
              : 'bg-background text-muted-foreground border-border hover:border-navy/50'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm font-medium border transition-colors ${
              selectedCategory === cat
                ? 'bg-navy text-white border-navy'
                : 'bg-background text-muted-foreground border-border hover:border-navy/50'
            }`}
          >
            {businessCategoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business, index) => (
            <div
              key={business.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-border">
          <p className="text-muted-foreground text-lg">
            No businesses found matching your criteria.
          </p>
          <p className="text-muted-foreground/70 mt-2">
            Try adjusting your search or filter settings.
          </p>
        </div>
      )}
    </section>
  );
};

export default DirectorySection;
