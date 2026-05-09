'use client';

import { DashboardGridSkeleton } from '@/components/dashboard/skeletons/DashboardSkeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl">
      <DashboardGridSkeleton />
    </div>
  );
}
