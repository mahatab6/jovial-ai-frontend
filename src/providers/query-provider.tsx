'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import queryClient from '@/lib/query-client';

// Wraps the global `queryClient` singleton so the React tree gets a stable client.
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // keep a stable reference for the provider lifecycle
  const [client] = useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
