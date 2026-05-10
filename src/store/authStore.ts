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
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      initialize: async () => {
        try {
          // Use the official authClient to get session. 
          // This ensures consistent cookie and data handling.
          const { authClient } = await import('@/lib/auth-client');
          const response = await (authClient as any).getSession();
          
          if (response?.data?.user) {
            const user = response.data.user;
            set({ 
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: (user as any).role || 'USER',
                credits: (user as any).credits || 0,
                updatedAt: (user as any).updatedAt || new Date().toISOString(),
              }, 
              isAuthenticated: true 
            });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          set({ user: null, isAuthenticated: false });
        }
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
        set({ token, isAuthenticated: !!token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
