'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Wand2,
  History,
  BarChart3,
  User,
  LogOut,
  Settings,
  Users,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { APP_NAME, ROUTES } from '@/constants';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[];
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'AI Generator', href: ROUTES.AI_GENERATOR, icon: Wand2 },
  { label: 'History', href: ROUTES.HISTORY, icon: History },
  { label: 'Analytics', href: ROUTES.ANALYTICS, icon: BarChart3 },
  { label: 'Team', href: ROUTES.TEAM, icon: Users, roles: ['MANAGER', 'ADMIN'] },
  { label: 'Admin Panel', href: ROUTES.ADMIN, icon: Shield, roles: ['ADMIN'] },
  { label: 'Profile', href: ROUTES.PROFILE, icon: User },
];

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const filtered = navItems.filter(
    (item) => !item.roles || (user?.role && item.roles.includes(user.role))
  );

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className={cn('flex h-16 items-center gap-2.5 border-b border-border px-4', collapsed && 'justify-center px-2')}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="font-bold text-lg">{APP_NAME}</span>}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filtered.map(({ label, href, icon: Icon, badge }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', isActive && 'text-primary')} />
              {!collapsed && (
                <>
                  <span>{label}</span>
                  {badge && (
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className={cn('border-t border-border p-3', collapsed && 'flex justify-center')}>
        {collapsed ? (
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                {user?.role}
              </Badge>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ─────────────────────────────────────────────────────────

export function Sidebar() {
  const { isCollapsed, setCollapsed } = useSidebarStore();

  return (
    <aside
      className={cn(
        'relative hidden h-screen flex-col border-r border-border bg-card transition-all duration-300 lg:flex',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarContent collapsed={isCollapsed} />

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-accent transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}

// ─── Mobile Sidebar Sheet ────────────────────────────────────────────────────

interface MobileSidebarProps {
  trigger?: React.ReactNode;
}

export function MobileSidebar({ trigger }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
