'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function StatCardSkeleton() {
  return (
    <Card className="p-6 border-border shadow-sm flex flex-col justify-center overflow-hidden relative">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-baseline gap-2">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-3 w-8" />
      </div>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex flex-col justify-end gap-2 px-2">
          <div className="flex items-end justify-between h-full gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton 
                key={i} 
                className="w-full rounded-t-sm" 
                style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }} 
              />
            ))}
          </div>
          <div className="flex justify-between w-full">
             {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-8" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card className="p-6 border-border shadow-sm">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </Card>
  );
}

export function DashboardGridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ChartSkeleton />
        </div>
        <ChartSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
