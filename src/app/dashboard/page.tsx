'use client';

import { useQuery } from '@tanstack/react-query';
import { Wand2, BarChart3, History, CreditCard, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { useAuthStore } from '@/store/authStore';
import { QUERY_KEYS, ROUTES } from '@/constants';
import api from '@/services/api';

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color = 'primary',
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color?: string;
}) {
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();

  const { data: stats, isLoading } = useQuery({
    queryKey: QUERY_KEYS.STATS_USAGE,
    queryFn: async () => {
      const res = await api.get('/api/v1/stats/usage');
      return res.data.data;
    },
  });

  const { data: recent, isLoading: recentLoading } = useQuery({
    queryKey: [...QUERY_KEYS.CONTENT_LIST, { page: 1, limit: 5 }],
    queryFn: async () => {
      const res = await api.get('/api/v1/ai', { params: { page: 1, limit: 5 } });
      return res.data.data;
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good day, ${user?.name?.split(' ')[0] ?? 'there'} 👋`}
        description="Here's what's happening with your AI content today."
      >
        <Button size="sm" render={<Link href={ROUTES.AI_GENERATOR} />}>
          <Wand2 className="mr-1.5 h-4 w-4" />
          Generate Content
        </Button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))
        ) : (
          <>
            <StatCard
              label="Total Generations"
              value={stats?.totalGenerations ?? 0}
              icon={Wand2}
              trend="All time"
            />
            <StatCard
              label="Tokens Used"
              value={stats?.tokensUsed?.toLocaleString() ?? 0}
              icon={BarChart3}
              trend="This month"
            />
            <StatCard
              label="Credits Remaining"
              value={stats?.creditsRemaining ?? user?.credits ?? 0}
              icon={CreditCard}
              trend="Available"
            />
            <StatCard
              label="Content Pieces"
              value={stats?.totalContent ?? 0}
              icon={History}
              trend="In library"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { href: ROUTES.AI_GENERATOR, icon: Wand2, label: 'AI Generator', desc: 'Create blog posts, emails, social content & more', color: 'from-violet-500/10 to-purple-500/10 border-violet-500/20' },
          { href: ROUTES.HISTORY, icon: History, label: 'Content History', desc: 'Browse and manage your generated content library', color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
          { href: ROUTES.ANALYTICS, icon: TrendingUp, label: 'Analytics', desc: 'Track usage, tokens, and content performance', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' },
        ].map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href}>
            <Card className={`group h-full cursor-pointer bg-gradient-to-br ${color} border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/50 mb-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Chart Section */}
      <Card className="p-5">
        <div className="mb-4">
          <h3 className="font-semibold">Token Usage Overview</h3>
          <p className="text-sm text-muted-foreground">Tokens consumed over the last 7 days.</p>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { date: 'Mon', tokens: 1200 },
              { date: 'Tue', tokens: 2100 },
              { date: 'Wed', tokens: 800 },
              { date: 'Thu', tokens: 3400 },
              { date: 'Fri', tokens: 1500 },
              { date: 'Sat', tokens: 4000 },
              { date: 'Sun', tokens: 2800 },
            ]}>
              <defs>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Content */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Content</h3>
          <Button variant="ghost" size="sm" render={<Link href={ROUTES.HISTORY} />}>
            View all
          </Button>
        </div>
        {recentLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : recent?.items?.length ? (
          <div className="space-y-2">
            {recent.items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Wand2 className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.title || 'Untitled'}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">{item.type}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No content yet.{' '}
            <Link href={ROUTES.AI_GENERATOR} className="text-primary hover:underline">Generate your first piece!</Link>
          </p>
        )}
      </Card>
    </div>
  );
}
