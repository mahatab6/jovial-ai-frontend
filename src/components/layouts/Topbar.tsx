'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { MobileSidebar } from './Sidebar';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { user } = useAuthStore();

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4">
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-3">
        <MobileSidebar />
        {title && (
          <h2 className="text-sm font-semibold text-foreground hidden sm:block">{title}</h2>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-xs font-semibold">{user?.name}</span>
            <Badge variant="secondary" className="h-4 w-fit px-1 text-[10px]">
              {user?.role}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
