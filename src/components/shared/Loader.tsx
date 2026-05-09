'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullPage?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Loader({
  size = 'md',
  text,
  fullPage = false,
  className,
}: LoaderProps) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        {text && (
          <p className="mt-4 text-sm text-muted-foreground animate-pulse">{text}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeMap[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}
