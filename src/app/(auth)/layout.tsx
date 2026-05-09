import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME, ROUTES } from '@/constants';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Logo */}
      <Link
        href={ROUTES.HOME}
        className="mb-8 flex items-center gap-2 font-bold text-xl"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        {APP_NAME}
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        {children}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </div>
  );
}
