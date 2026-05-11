import axios from 'axios';
import { toast } from 'sonner';

/**
 * CENTRALIZED API CLIENT
 *
 * Token-based authentication using localStorage.
 * The token is stored under the key "token" and attached
 * as a Bearer Authorization header on every request.
 */

// ─── Token Helpers ────────────────────────────────────────────────────────────

const TOKEN_KEY = 'token';

/** Retrieve the auth token from localStorage. */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

/** Persist the auth token to localStorage. */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

/** Remove the auth token from localStorage (e.g. on logout). */
export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials removed — we use token-based auth via localStorage
});

// Guard to avoid attaching interceptors multiple times during HMR
if (!(api as any).__interceptorsAttached) {
  (api as any).__interceptorsAttached = true;

  // REQUEST INTERCEPTOR — attach Bearer token from localStorage
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE INTERCEPTOR — global error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Network / no-response errors
      if (!error.response) {
        toast.error('Network Error', { description: 'Please check your internet connection.' });
        return Promise.reject(error);
      }

      const status = error.response.status;
      const message = error.response.data?.message || 'Something went wrong';

      switch (status) {
        case 401:
          // Token expired or invalid — clear it so the user is prompted to re-login
          removeToken();
          break;
        case 429:
          toast.error('Too Many Requests', { description: 'Please slow down and try again later.' });
          break;
        default:
          if (status >= 500) {
            toast.error('Server Error', { description: message });
          }
      }

      return Promise.reject(error);
    }
  );
}

export default api;