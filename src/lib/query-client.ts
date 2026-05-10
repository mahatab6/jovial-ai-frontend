import { QueryClient } from '@tanstack/react-query';

// 30 minutes in milliseconds - used for both staleTime and gcTime
// This ensures that data is considered fresh for 30 minutes and 
// stays in cache for the same duration, drastically reducing API load.
const THIRTY_MIN = 30 * 60 * 1000;

/**
 * Global QueryClient with conservative defaults to prevent excessive network requests.
 * 
 * WHY THESE DEFAULTS?
 * - staleTime: Keeps data "fresh" for 30m so navigating between pages doesn't trigger refetches.
 * - gcTime: Keeps data in memory for 30m even if no components are using it.
 * - retry: false - Prevents infinite loading loops or spamming the server on failure.
 * - refetchOnWindowFocus/Reconnect/Mount: false - Stops the "continuous refetching" 
 *   behavior the user experienced when switching tabs or mounting components.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: THIRTY_MIN,
      gcTime: THIRTY_MIN,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

export default queryClient;
