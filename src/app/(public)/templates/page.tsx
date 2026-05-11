'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { useDebounce } from '@/hooks/use-debounce';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { TemplateFilters } from '@/components/templates/TemplateFilters';
import { PageLoader } from '@/components/shared/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, SortAsc, Zap, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [rating, setRating] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [page, setPage] = useState(1);
  const limit = 9;

  const debouncedSearch = useDebounce(searchQuery, 400);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, rating, sortBy]);

  const { data: templatesData, isLoading } = useQuery({
    queryKey: [...QUERY_KEYS.TEMPLATES_LIST, debouncedSearch, category, rating, sortBy, page],
    queryFn: async () => {
      const res = await api.get('/api/v1/templates', {
        params: {
          searchTerm: debouncedSearch,
          category,
          rating,
          sortBy,
          page,
          limit,
        },
      });
      return res.data || { data: [], meta: { page: 1, limit: 9, total: 0, totalPages: 0 } };
    },
  });

  const templates = templatesData?.data || [];
  const meta = templatesData?.meta || { page: 1, limit: 9, total: 0, totalPages: 0 };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">

      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        </div>

        <div className="container relative mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="mb-12 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Sparkles className="h-3 w-3" /> Explore the Future
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            >
              AI Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Templates</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              Discover professional-grade AI templates designed to supercharge your workflow and generate high-converting content in seconds.
            </motion.p>
          </div>

          {/* Filters Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 space-y-8"
          >
            <TemplateFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              category={category}
              setCategory={setCategory}
              rating={rating}
              setRating={setRating}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/50 pb-6">
              <p className="text-sm font-medium text-muted-foreground">
                Showing <span className="text-foreground font-bold">{meta.total || 0}</span> specialized templates
              </p>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort By</span>
                <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
                  <SelectTrigger className="w-44 h-10 bg-card/40 border-border/50 backdrop-blur-xl">
                    <SortAsc className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-2xl">
                    <SelectItem value="Most Popular" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5" /> Most Popular
                      </div>
                    </SelectItem>
                    <SelectItem value="Newest" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5" /> Newest First
                      </div>
                    </SelectItem>
                    <SelectItem value="A-Z" className="cursor-pointer">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Templates Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <PageLoader />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {!templates || templates.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24 rounded-3xl border border-dashed border-border/60 bg-muted/20"
                >
                  <Search className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-20" />
                  <h3 className="text-2xl font-bold mb-2">No templates found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms to find what you need.</p>
                </motion.div>
              ) : (
                <div className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {templates.map((template: any, index: number) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <TemplateCard template={template} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination UI */}
                  {meta.totalPages > 1 && (
                    <div className="flex justify-center pt-8 border-t border-border/30">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) setPage(page - 1);
                              }}
                              className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          
                          {[...Array(meta.totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            // Show first, last, and pages around current
                            if (
                              pageNum === 1 || 
                              pageNum === meta.totalPages || 
                              (pageNum >= page - 1 && pageNum <= page + 1)
                            ) {
                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationLink 
                                    href="#" 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setPage(pageNum);
                                    }}
                                    isActive={page === pageNum}
                                    className="cursor-pointer"
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            }
                            if (pageNum === page - 2 || pageNum === page + 2) {
                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (page < meta.totalPages) setPage(page + 1);
                              }}
                              className={page === meta.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
