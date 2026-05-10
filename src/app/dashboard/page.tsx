'use client';

import { useQuery } from '@tanstack/react-query';
import { Wand2, BarChart3, History, CreditCard, TrendingUp, Users, Sparkles } from 'lucide-react';
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
    <Card className="p-6 flex flex-col gap-4 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border/40 bg-card/40 backdrop-blur-md">
      <div className="absolute -right-4 -top-4 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rotate-12 group-hover:rotate-0">
        <Icon className="h-24 w-24" />
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {trend && (
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[10px] px-2 py-0.5 rounded-full">
            +100%
          </Badge>
        )}
      </div>

      <div className="relative z-10 mt-2">
        <p className="text-sm font-bold text-muted-foreground/70 uppercase tracking-widest">{label}</p>
        <p className="text-4xl font-black tracking-tighter text-foreground mt-1 group-hover:translate-x-1 transition-transform duration-300">{value}</p>
        <p className="text-[11px] text-muted-foreground/60 mt-3 font-medium flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-primary/40" />
          {trend}
        </p>
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
    <div className="space-y-10 pb-12">
      <PageHeader
        title={`Hello, ${user?.name?.split(' ')[0] ?? 'Creator'} 👋`}
        description="Ready to transform your ideas into reality? Let's start generating."
      >
        <Button size="lg" className="rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5" render={<Link href={ROUTES.AI_GENERATOR} />}>
          <Wand2 className="mr-2 h-5 w-5" />
          Create New Content
        </Button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6 border-border/50 bg-card/30 backdrop-blur-sm h-40">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-10 w-20 mb-6" />
              <Skeleton className="h-3 w-32" />
            </Card>
          ))
        ) : (
          <>
            <StatCard
              label="Generations"
              value={stats?.totalGenerations ?? 0}
              icon={Wand2}
              trend="Content pieces created"
            />
            <StatCard
              label="Tokens"
              value={stats?.totalTokens?.toLocaleString() ?? 0}
              icon={BarChart3}
              trend="Computational usage"
            />
            <StatCard
              label="Balance"
              value={stats?.creditsRemaining ?? user?.credits ?? 0}
              icon={CreditCard}
              trend="Available credits"
            />
            <StatCard
              label="Library"
              value={stats?.totalContents ?? 0}
              icon={History}
              trend="Saved documents"
            />
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chart Section */}
        <Card className="lg:col-span-2 p-8 border-border/40 bg-card/40 backdrop-blur-md shadow-2xl rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors duration-1000" />
          
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-black tracking-tight text-foreground">Usage Analytics</h3>
              <p className="text-sm text-muted-foreground/80 mt-1 font-medium">Monitoring your activity for the past week.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Real-time</span>
            </div>
          </div>

          <div className="h-[320px] w-full relative z-10">
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
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6, fontWeight: 700 }} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.6, fontWeight: 700 }} 
                  dx={-15} 
                  tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid hsl(var(--border)/0.5)', 
                    backgroundColor: 'hsl(var(--card)/0.8)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 800, fontSize: '13px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 800, marginBottom: '4px' }}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '6 6', opacity: 0.5 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tokens" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTokens)" 
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">Shortcuts</h3>
            <div className="h-px flex-1 bg-border/40 ml-4" />
          </div>
          {[
            { href: ROUTES.AI_GENERATOR, icon: Wand2, label: 'New AI Task', desc: 'Craft high-converting content', color: 'from-violet-600/20 to-indigo-600/20 border-violet-500/20 text-violet-500' },
            { href: ROUTES.HISTORY, icon: History, label: 'Content Library', desc: 'Manage your previous drafts', color: 'from-blue-600/20 to-cyan-600/20 border-blue-500/20 text-blue-500' },
            { href: ROUTES.ANALYTICS, icon: TrendingUp, label: 'Performance', desc: 'Detailed usage statistics', color: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/20 text-emerald-500' },
          ].map(({ href, icon: Icon, label, desc, color }) => (
            <Link key={href} href={href}>
              <Card className={`group cursor-pointer bg-gradient-to-br ${color} border backdrop-blur-md p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl border-white/5`}>
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/60 shadow-inner transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground group-hover:translate-x-1 transition-transform duration-300 tracking-tight">{label}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground/80 font-medium">{desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Content */}
      <Card className="p-8 border-border/40 bg-card/40 backdrop-blur-md shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h3 className="text-xl font-black tracking-tight text-foreground">Recent Generations</h3>
            <p className="text-sm text-muted-foreground/80 mt-1 font-medium">Your latest masterpieces in one place.</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-bold bg-background/50" render={<Link href={ROUTES.HISTORY} />}>
            View Library
          </Button>
        </div>
        
        {recentLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border/20">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : recent?.items?.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {recent.items.map((item: any) => (
              <div key={item.id} className="group flex items-center gap-5 rounded-3xl p-4 bg-background/30 border border-border/20 hover:bg-background/50 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Wand2 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-foreground group-hover:text-primary transition-colors">{item.title || 'Untitled Generation'}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">{new Date(item.createdAt).toLocaleDateString()}</p>
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">{item.type?.replace('_', ' ')}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-widest bg-primary/10 text-primary border-none">
                  Completed
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-[2rem] border border-dashed border-border/50">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary/40" />
            </div>
            <p className="text-lg font-bold text-foreground">No content created yet</p>
            <p className="text-sm text-muted-foreground max-w-xs text-center mt-2 font-medium">Start your journey by creating your first AI-powered masterpiece.</p>
            <Button size="lg" className="mt-8 rounded-2xl px-8" render={<Link href={ROUTES.AI_GENERATOR} />}>
              Generate Now
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
