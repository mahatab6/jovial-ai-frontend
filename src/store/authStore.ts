import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'MANAGER' | 'ADMIN';
  credits: number;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialize: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      /**
       * Called once by AuthProvider on mount.
       * Reads the persisted token from localStorage and restores auth state.
       * No network call needed — the token itself is the source of truth.
       */
      initialize: () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const user = get().user;
        set({
          token: token ?? get().token,
          isAuthenticated: !!(token || get().token),
          // If zustand-persist already rehydrated a user, keep it
          user: user ?? null,
          isLoading: false,
        });
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        if (typeof window !== 'undefined') {
          if (token) {
            localStorage.setItem('token', token);
          } else {
            localStorage.removeItem('token');
          }
        }
        set({ token, isAuthenticated: !!token });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      // Persist token AND user so both survive a page refresh
      partialize: (state) => ({ token: state.token, user: state.user }),
      // After zustand rehydrates from localStorage, mark isAuthenticated correctly
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!(state.token || state.user);
          // isLoading stays true until initialize() is explicitly called
        }
      },
    }
  )
);
