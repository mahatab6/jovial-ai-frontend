'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, LayoutGrid, Filter } from 'lucide-react';

interface TemplateFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  rating: string;
  setRating: (val: string) => void;
}

export const TemplateFilters = ({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  rating,
  setRating,
}: TemplateFiltersProps) => {
  const categories = ['All', 'Blog', 'Social Media', 'Email', 'Product', 'Video', 'Other'];

  return (
    <div className="group relative z-10 grid grid-cols-1 gap-4 md:grid-cols-4 lg:gap-6">
      <div className="relative md:col-span-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
        </div>
        <Input
          placeholder="Search AI templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 w-full pl-11 bg-card/40 border-border/50 backdrop-blur-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
        />
      </div>

      <div className="relative">
        <Select value={category} onValueChange={(val) => val && setCategory(val)}>
          <SelectTrigger className="h-12 bg-card/40 border-border/50 backdrop-blur-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium">
            <LayoutGrid className="mr-2 h-4 w-4 text-primary" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-2xl bg-card/90">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="font-medium focus:bg-primary focus:text-white cursor-pointer">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Select value={rating} onValueChange={(val) => val && setRating(val)}>
          <SelectTrigger className="h-12 bg-card/40 border-border/50 backdrop-blur-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium">
            <Filter className="mr-2 h-4 w-4 text-emerald-500" />
            <SelectValue placeholder="Minimum Rating" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-2xl bg-card/90">
            <SelectItem value="All" className="font-medium cursor-pointer">All Ratings</SelectItem>
            <SelectItem value="4.5" className="font-medium cursor-pointer">4.5+ Highly Rated</SelectItem>
            <SelectItem value="4.0" className="font-medium cursor-pointer">4.0+ Top Rated</SelectItem>
            <SelectItem value="3.0" className="font-medium cursor-pointer">3.0+ Average</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
