'use client';

import { Sidebar } from '@/components/layouts/Sidebar';
import { Topbar } from '@/components/layouts/Topbar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';
import { PageLoader } from '@/components/shared/Loader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
