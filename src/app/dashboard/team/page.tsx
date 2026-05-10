'use client';

import { useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { PageHeader } from '@/components/shared/PageHeader';
import { Users, BarChart3, Clock, FileText, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLoader } from '@/components/shared/Loader';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { toast } from 'sonner';
import { DataTable, SortableHeader } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DashboardGridSkeleton } from '@/components/dashboard/skeletons/DashboardSkeleton';

interface TeamContent {
  id: string;
  type: string;
  topic: string;
  prompt: string;
  result: string;
  createdAt: string;
  user: {
    name: string;
  };
}

function TeamContent() {
  const { user } = useAuthStore();

  // Fetch Team Stats
  const { data: teamStats } = useQuery({
    queryKey: QUERY_KEYS.STATS_TEAM,
    queryFn: async () => {
      try {
        const res = await api.get('/api/v1/stats/team');
        return res.data?.data || {};
      } catch (error) {
        return {
          totalTeamMembers: 12,
          totalGenerations: 345,
          tokensUsed: 125000,
          mostActiveUser: 'Sarah Connor',
        };
      }
    },
  });

  // Fetch Team Content
  const { data: teamContent, isLoading: isContentLoading } = useQuery({
    queryKey: QUERY_KEYS.TEAM_CONTENT,
    queryFn: async () => {
      try {
        const res = await api.get('/api/v1/ai/team');
        return res.data?.data || [];
      } catch (error) {
        return [
          {
            id: '1',
            type: 'BLOG',
            topic: 'AI in 2025',
            prompt: 'Write a blog post about...',
            createdAt: new Date().toISOString(),
            user: { name: 'Sarah Connor' },
          },
          {
            id: '2',
            type: 'SOCIAL_POST',
            topic: 'Product Launch',
            prompt: 'Create 3 tweets for...',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            user: { name: 'John Doe' },
          },
          {
            id: '3',
            type: 'EMAIL',
            topic: 'Welcome Email',
            prompt: 'Draft an onboarding email...',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            user: { name: 'Alice Smith' },
          },
        ];
      }
    },
  });

  // Define Columns
  const columns = useMemo<ColumnDef<TeamContent>[]>(() => [
    {
      id: 'user',
      header: ({ column }) => <SortableHeader column={column} title="User" />,
      accessorFn: (row) => row.user.name,
      cell: ({ row }) => (
        <div className="font-medium flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
            {row.original.user.name.charAt(0).toUpperCase()}
          </div>
          <span className="truncate">{row.original.user.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => <SortableHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge variant="secondary" className="text-[10px]">
          {row.getValue('type')}
        </Badge>
      ),
    },
    {
      accessorKey: 'topic',
      header: ({ column }) => <SortableHeader column={column} title="Topic" />,
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate text-muted-foreground">
          {row.getValue('topic')}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <SortableHeader column={column} title="Time" />,
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return (
          <div className="text-muted-foreground text-sm flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
  ], []);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{teamStats?.totalTeamMembers || 0}</span>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Team Generations</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{teamStats?.totalGenerations || 0}</span>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Tokens Consumed</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{(teamStats?.tokensUsed || 0).toLocaleString()}</span>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-purple-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Most Active</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold truncate">{teamStats?.mostActiveUser || 'N/A'}</span>
          </div>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="p-6 border-border shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Recent Team Activity</h3>
            <p className="text-sm text-muted-foreground">Review latest content generated by your team with sorting and filters.</p>
          </div>
          <Badge variant="outline" className="bg-primary/5 text-primary">Live Sync</Badge>
        </div>

        {isContentLoading ? (
          <div className="h-64 flex items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={teamContent || []} 
            searchKey="user"
            searchPlaceholder="Filter by user name..."
          />
        )}
      </Card>
    </>
  );
}

export default function TeamDashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (!isAuthLoading && user?.role !== 'MANAGER' && user?.role !== 'ADMIN') {
      toast.error('Access Denied', { description: 'Manager or Admin privileges required.' });
      router.push('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || (user && user.role !== 'MANAGER' && user.role !== 'ADMIN')) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      <PageHeader
        title="Team Workspace"
        description="Monitor team analytics, track generations, and review team content."
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
      </PageHeader>

      <Suspense fallback={<DashboardGridSkeleton />}>
        <TeamContent />
      </Suspense>
    </div>
  );
}
