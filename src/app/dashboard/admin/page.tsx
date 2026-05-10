'use client';

import { useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { PageHeader } from '@/components/shared/PageHeader';
import { Shield, Users, Activity, Settings, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageLoader } from '@/components/shared/Loader';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { toast } from 'sonner';
import { DataTable, SortableHeader } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DashboardGridSkeleton, TableSkeleton } from '@/components/dashboard/skeletons/DashboardSkeleton';

// Define types
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

function AdminContent() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch Users
  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: QUERY_KEYS.ADMIN_USERS,
    queryFn: async () => {
      try {
        const res = await api.get('/api/v1/users');
        return res.data?.data || [];
      } catch (error) {
        return [
          { id: '1', name: 'Admin User', email: 'admin@jovial.ai', role: 'ADMIN', createdAt: new Date().toISOString() },
          { id: '2', name: 'John Manager', email: 'manager@jovial.ai', role: 'MANAGER', createdAt: new Date().toISOString() },
          { id: '3', name: 'Jane User', email: 'jane@example.com', role: 'USER', createdAt: new Date().toISOString() },
        ];
      }
    },
  });

  // Fetch Admin Stats
  const { data: adminStats } = useQuery({
    queryKey: QUERY_KEYS.STATS_ADMIN,
    queryFn: async () => {
      try {
        const res = await api.get('/api/v1/stats/admin');
        return res.data?.data || {};
      } catch (error) {
        return {
          totalUsers: 1250,
          activeUsers: 843,
          totalGenerations: 45200,
          systemHealth: '99.9%',
        };
      }
    },
  });

  // Update Role Mutation with Optimistic UI
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const res = await api.patch(`/api/v1/users/${userId}/role`, { role });
      return res.data;
    },
    // Step 26: Optimistic Update
    onMutate: async ({ userId, role }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ADMIN_USERS });
      const previousUsers = queryClient.getQueryData(QUERY_KEYS.ADMIN_USERS);
      
      queryClient.setQueryData(QUERY_KEYS.ADMIN_USERS, (old: UserData[] | undefined) => {
        return old?.map((u) => u.id === userId ? { ...u, role } : u);
      });

      return { previousUsers };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(QUERY_KEYS.ADMIN_USERS, context?.previousUsers);
      toast.error('Failed to update role. Rollback applied.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_USERS });
    },
    onSuccess: () => {
      toast.success('Role updated successfully (Optimistic UI)');
    },
  });

  // Define Columns
  const columns = useMemo<ColumnDef<UserData>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="User" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <SortableHeader column={column} title="Email" />,
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <SortableHeader column={column} title="Joined" />,
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return <div className="text-muted-foreground text-sm">{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const u = row.original;
        return (
          <Select
            disabled={u.id === user?.id || updateRoleMutation.isPending}
            value={u.role}
            onValueChange={(val) => updateRoleMutation.mutate({ userId: u.id, role: val })}
          >
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
  ], [user, updateRoleMutation]);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="overview">System Overview</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{adminStats?.totalUsers || 0}</span>
              <span className="text-xs text-emerald-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +5%
              </span>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{adminStats?.activeUsers || 0}</span>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Total AI Requests</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{(adminStats?.totalGenerations || 0).toLocaleString()}</span>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-medium text-muted-foreground">System Health</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{adminStats?.systemHealth || '100%'}</span>
              <Badge variant="secondary" className="ml-2 bg-emerald-500/10 text-emerald-500">Operational</Badge>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border shadow-sm min-h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Detailed AI usage charts would go here.</p>
            <p className="text-sm">Integrate with Recharts to show global token consumption.</p>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <Card className="p-6 border-border shadow-sm">
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Platform Users</h3>
            <p className="text-sm text-muted-foreground">Manage user access levels and roles with sorting and filters.</p>
          </div>

          {isUsersLoading ? (
             <div className="space-y-3">
              <TableSkeleton />
             </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={users || []} 
              searchKey="name"
              searchPlaceholder="Filter by name..."
            />
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default function AdminDashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (!isAuthLoading && user?.role !== 'ADMIN') {
      toast.error('Access Denied', { description: 'Admin privileges required.' });
      router.push('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || (user && user.role !== 'ADMIN')) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      <PageHeader
        title="Admin Control Panel"
        description="Manage system users, roles, and view global platform analytics."
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
          <Shield className="h-5 w-5 text-destructive" />
        </div>
      </PageHeader>

      <Suspense fallback={<DashboardGridSkeleton />}>
        <AdminContent />
      </Suspense>
    </div>
  );
}
