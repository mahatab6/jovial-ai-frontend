'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Search, Filter, Loader2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ResultViewer } from '@/features/ai/ResultViewer';
import api from '@/services/api';
import { QUERY_KEYS } from '@/constants';

// Define the interface based on typical API response
interface AIContent {
  id: string;
  title: string;
  content: string;
  type: string;
  model: string;
  createdAt: string;
  metadata?: {
    seoScore?: number;
    wordCount?: number;
  };
}

interface PaginatedResponse {
  data: AIContent[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  
  // Sheet state for the viewer
  const [selectedContent, setSelectedContent] = useState<AIContent | null>(null);

  // Debounced search term for API
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Simple debounce implementation without external deps
  useState(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [...QUERY_KEYS.HISTORY, page, debouncedSearch, typeFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });
      if (debouncedSearch) params.append('searchTerm', debouncedSearch);
      if (typeFilter !== 'ALL') params.append('type', typeFilter);

      const res = await api.get(`/api/v1/ai?${params.toString()}`);
      return res.data as PaginatedResponse;
    },
    // History is user-driven. Global defaults handle the TTL.
  });

  const contentList = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      <PageHeader
        title="Content History"
        description="Your personal library of AI-generated content. Search, filter, and export your work."
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
          <FileText className="h-6 w-6 text-primary" />
        </div>
      </PageHeader>

      {/* Filters and Search Bar */}
      <Card className="p-2 flex flex-col sm:flex-row items-center gap-2 shadow-xl shadow-primary/5 border-border/50 bg-card/50 backdrop-blur-md rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
          <Input
            placeholder="Search by title or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 w-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 p-1 sm:p-0">
          <div className="h-8 w-px bg-border/50 hidden sm:block mx-2" />
          <Select value={typeFilter} onValueChange={(val) => { setTypeFilter(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[200px] h-10 border-none bg-muted/50 hover:bg-muted transition-colors rounded-xl font-medium">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/50 shadow-2xl">
              <SelectItem value="ALL">All Categories</SelectItem>
              <SelectItem value="BLOG">Blog Posts</SelectItem>
              <SelectItem value="SOCIAL_POST">Social Media</SelectItem>
              <SelectItem value="EMAIL">Email Marketing</SelectItem>
              <SelectItem value="PRODUCT_DESC">Product Descriptions</SelectItem>
              <SelectItem value="OTHER">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden shadow-2xl shadow-primary/5 border-border/50 bg-card/30 backdrop-blur-sm rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="py-4 font-bold text-xs uppercase tracking-widest text-muted-foreground">Title & Information</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Category</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Engine</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground text-right pr-8">Created Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                      <p className="text-sm text-muted-foreground font-medium animate-pulse">Retrieving your library...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-2 text-destructive">
                      <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
                        <Filter className="h-6 w-6" />
                      </div>
                      <p className="font-bold">Sync Error</p>
                      <p className="text-sm opacity-80">We couldn't load your content history at this time.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : contentList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-80 text-center">
                    <div className="flex flex-col items-center gap-4 py-10">
                      <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-2 grayscale opacity-50">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="max-w-xs mx-auto">
                        <p className="font-bold text-lg">No Results Found</p>
                        <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or start generating new content.</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 rounded-full" onClick={() => {setSearchTerm(''); setTypeFilter('ALL');}}>
                        Clear All Filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                contentList.map((item, idx) => (
                  <TableRow 
                    key={item.id} 
                    className="cursor-pointer group hover:bg-primary/5 border-border/30 transition-all duration-200"
                    onClick={() => setSelectedContent(item)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <TableCell className="py-5 pl-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">{item.title}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tighter">ID: {item.id.substring(0, 8)}...</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-background/50 border-primary/20 text-primary hover:bg-primary/10 transition-colors font-bold text-[10px] py-0.5 px-2 rounded-lg">
                        {item.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-xs font-medium text-muted-foreground/80">{item.model}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-foreground/80">{format(new Date(item.createdAt), 'MMM dd, yyyy')}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{format(new Date(item.createdAt), 'hh:mm aa')}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && contentList.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 border-t border-border/50 bg-muted/5 gap-4">
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground font-medium bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                <span className="text-foreground font-bold">{(meta.page - 1) * meta.limit + 1}</span> - {' '}
                <span className="text-foreground font-bold">
                  {Math.min(meta.page * meta.limit, meta.total)}
                </span>{' '}
                of <span className="text-foreground font-bold">{meta.total}</span> entries
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30 px-4"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center px-4 rounded-xl bg-primary/5 text-primary text-xs font-bold border border-primary/10">
                Page {page} of {meta.totalPages}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30 px-4"
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Result Viewer Sheet */}
      <Sheet open={!!selectedContent} onOpenChange={(open) => !open && setSelectedContent(null)}>
        <SheetContent side="right" className="w-full sm:max-w-2xl lg:max-w-3xl p-0 border-l border-border/50 bg-background/95 backdrop-blur-xl">
          {selectedContent && (
            <ResultViewer 
              result={selectedContent} 
              onClose={() => setSelectedContent(null)} 
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
