'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AuthContextType {
  isLoading: boolean;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AUTH PROVIDER
 *
 * Restores auth state from localStorage on mount by calling `initialize()`
 * from the authStore. This is the single source of truth for token-based auth.
 *
 * No network calls are made here — the persisted token + user from
 * zustand-persist is sufficient to restore the session.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialize, isLoading } = useAuthStore();

  useEffect(() => {
    // Synchronously read localStorage and restore isAuthenticated / isLoading
    initialize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ isLoading, refreshSession: initialize }}>
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
