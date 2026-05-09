'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, TrendingUp, Sparkles, Layers, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';
import { ChartConfig } from '@/components/ui/chart';
import { DashboardGridSkeleton, ChartSkeleton } from '@/components/dashboard/skeletons/DashboardSkeleton';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// Step 29: Dynamic Imports for performance
const DashboardLineChart = dynamic(
  () => import('@/components/dashboard/charts/DashboardLineChart').then((mod) => mod.DashboardLineChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const DashboardPieChart = dynamic(
  () => import('@/components/dashboard/charts/DashboardPieChart').then((mod) => mod.DashboardPieChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const chartConfig: ChartConfig = {
  tokens: {
    label: 'Tokens Used',
    color: 'hsl(var(--primary))',
  },
  blog: {
    label: 'Blog Post',
    color: 'hsl(var(--primary))',
  },
  social: {
    label: 'Social Post',
    color: 'hsl(var(--destructive))',
  },
  email: {
    label: 'Email',
    color: '#10b981',
  },
  product: {
    label: 'Product Desc',
    color: '#f59e0b',
  },
};

function AnalyticsContent() {
  // 1. Fetch usage stats
  const { data: usageData } = useQuery({
    queryKey: ['stats-usage-analytics'],
    queryFn: async () => {
      const res = await api.get('/api/v1/stats/usage');
      return res.data;
    },
  });

  // 2. Fetch content type distribution
  const { data: typeData } = useQuery({
    queryKey: ['stats-content-type'],
    queryFn: async () => {
      try {
        const res = await api.get('/api/v1/stats/content-type');
        return res.data?.data || [];
      } catch (err) {
        return [
          { name: 'BLOG', value: 45 },
          { name: 'SOCIAL_POST', value: 30 },
          { name: 'EMAIL', value: 15 },
          { name: 'PRODUCT_DESC', value: 10 },
        ];
      }
    },
  });

  const timeSeriesData = [
    { date: 'Mon', tokens: 1200 },
    { date: 'Tue', tokens: 2100 },
    { date: 'Wed', tokens: 800 },
    { date: 'Thu', tokens: 3400 },
    { date: 'Fri', tokens: 1500 },
    { date: 'Sat', tokens: 4000 },
    { date: 'Sun', tokens: 2800 },
  ];

  const aggregate = usageData || { totalGenerations: 0, tokensUsed: 0, creditsRemaining: 0 };

  return (
    <div className="space-y-8">
      {/* Aggregate Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Generations</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{aggregate.totalGenerations || 0}</span>
            <span className="text-xs text-emerald-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12%
            </span>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Tokens Used</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{(aggregate.tokensUsed || 0).toLocaleString()}</span>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm flex flex-col justify-center bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-primary">Credits Remaining</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{aggregate.creditsRemaining || 0}</span>
            <Badge variant="secondary" className="ml-2 text-[10px]">Active Plan</Badge>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ErrorBoundary>
            <DashboardLineChart
              title="Token Usage Trends"
              description="Daily token consumption over the last week."
              data={timeSeriesData}
              config={chartConfig}
              dataKey="tokens"
            />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <DashboardPieChart
            title="Content Distribution"
            description="Breakdown by content type."
            data={typeData}
            config={chartConfig}
            dataKey="value"
            nameKey="name"
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      <PageHeader
        title="Analytics Overview"
        description="Monitor your token usage, generation history, and content performance metrics."
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
      </PageHeader>

      <Suspense fallback={<DashboardGridSkeleton />}>
        <ErrorBoundary>
          <AnalyticsContent />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
