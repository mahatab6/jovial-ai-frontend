'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authClient } from '@/lib/auth-client';

interface AuthContextType {
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AUTH PROVIDER
 * 
 * Manages the user session state globally. 
 * 
 * OPTIMIZATIONS:
 * - Uses a manual `fetchSession` called only on mount to prevent the aggressive 
 *   refetching behavior often seen in library-provided `useSession` hooks.
 * - Uses `authClient.getSession()` directly for predictable behavior.
 * - Uses a ref to track if a fetch is already in progress to avoid concurrent requests.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const isFetching = useRef(false);

  const fetchSession = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    
    setIsLoading(true);
    try {
      // Direct call to get session. This is cleaner and more predictable than hooks.
      // Better Auth stores the session in a cookie which is automatically handled by the browser.
      const response = await (authClient as any).getSession();

      if (response?.data?.user) {
        const user = response.data.user;
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          role: (user as any).role || 'USER',
          credits: (user as any).credits || 0,
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('[Auth Provider Error]:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, [setUser]);

  useEffect(() => {
    // Run only once on mount. 
    // This avoids repeated /api/auth/get-session calls on window focus or re-renders.
    fetchSession();
  }, [fetchSession]);

  return (
    <AuthContext.Provider value={{ isLoading, refreshSession: fetchSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
