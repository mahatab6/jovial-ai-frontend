'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { BarChart3, TrendingUp, Sparkles, Layers, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';
import { ChartConfig } from '@/components/ui/chart';
import { QUERY_KEYS } from '@/constants';
import { useAuthStore } from '@/store/authStore';
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
  const { user } = useAuthStore();
  
  // 1. Fetch usage stats
  const { data: usageData, isLoading: usageLoading } = useQuery({
    queryKey: QUERY_KEYS.STATS_USAGE,
    queryFn: async () => {
      const res = await api.get('/api/v1/stats/usage');
      return res.data.data;
    },
  });

  // 2. Fetch content type distribution
  const { data: typeData } = useQuery({
    queryKey: QUERY_KEYS.STATS_CONTENT_TYPE,
    queryFn: async () => {
      const res = await api.get('/api/v1/stats/content-type');
      const rawData = res.data?.data || [];
      // Map backend { type, count } to frontend { name, value }
      return rawData.map((item: any) => ({
        name: item.type.replace('_', ' '),
        value: item.count
      }));
    },
  });

  // Prepare time series data from dailyUsage
  const timeSeriesData = useMemo(() => {
    if (!usageData?.dailyUsage?.length) {
      // Fallback for visual if no data exists yet
      return [
        { date: 'No Data', tokens: 0 }
      ];
    }
    return usageData.dailyUsage.map((item: any) => ({
      date: format(new Date(item.date), 'MMM dd'),
      tokens: item.count // Currently backend returns count of items per day
    }));
  }, [usageData]);

  const aggregate = usageData || { totalContents: 0, totalTokens: 0, creditsRemaining: 0 };

  return (
    <div className="space-y-10">
      {/* Aggregate Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-md shadow-xl rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles className="h-12 w-12" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total Generations</h3>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <span className="text-4xl font-black tracking-tighter text-foreground">{aggregate.totalContents || 0}</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +100%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-4 font-medium">All-time content pieces created</p>
        </Card>

        <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-md shadow-xl rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="h-12 w-12" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-violet-500" />
            </div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Tokens Consumed</h3>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <span className="text-4xl font-black tracking-tighter text-foreground">{(aggregate.totalTokens || 0).toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-4 font-medium">Computing power utilized</p>
        </Card>

        <Card className="p-8 border-border/50 bg-primary/5 backdrop-blur-md shadow-xl rounded-3xl border-2 border-primary/20 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Credits Available</h3>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <span className="text-4xl font-black tracking-tighter text-primary">{aggregate.creditsRemaining || user?.credits || 0}</span>
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-none font-bold text-[10px]">Active Balance</Badge>
          </div>
          <p className="text-xs text-primary/70 mt-4 font-medium">Ready for your next generation</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <DashboardLineChart
              title="Activity Trends"
              description="Content pieces generated daily."
              data={timeSeriesData}
              config={chartConfig}
              dataKey="tokens" // Reusing tokens key for chart, though it maps to count
            />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <DashboardPieChart
            title="Category Mix"
            description="Content type distribution."
            data={typeData?.length ? typeData : []}
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
