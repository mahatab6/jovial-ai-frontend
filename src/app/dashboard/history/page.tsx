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
    queryKey: ['ai-history', page, debouncedSearch, typeFilter],
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
  });

  const contentList = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8">
      <PageHeader
        title="Content History"
        description="Browse, search, and export your previously generated AI content."
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
      </PageHeader>

      {/* Filters and Search Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm border-border">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={typeFilter} onValueChange={(val) => { setTypeFilter(val); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-[180px] h-10">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="BLOG">Blog Post</SelectItem>
              <SelectItem value="SOCIAL_POST">Social Media</SelectItem>
              <SelectItem value="EMAIL">Email</SelectItem>
              <SelectItem value="PRODUCT_DESC">Product Desc</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden shadow-sm border-border">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-destructive">
                  Failed to load content history.
                </TableCell>
              </TableRow>
            ) : contentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-muted-foreground">
                  No content found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              contentList.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer group"
                  onClick={() => setSelectedContent(item)}
                >
                  <TableCell className="font-medium max-w-[200px] truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.model}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!isLoading && contentList.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/10">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium">{(meta.page - 1) * meta.limit + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(meta.page * meta.limit, meta.total)}
              </span>{' '}
              of <span className="font-medium">{meta.total}</span> entries
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Result Viewer Sheet */}
      <Sheet open={!!selectedContent} onOpenChange={(open) => !open && setSelectedContent(null)}>
        <SheetContent side="right" className="w-full sm:max-w-2xl lg:max-w-3xl p-0 border-l border-border">
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
