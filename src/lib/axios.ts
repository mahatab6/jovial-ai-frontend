import axios from 'axios';
import { toast } from 'sonner';

/**
 * CENTRALIZED API CLIENT
 * 
 * Using a single axios instance with `withCredentials: true` ensures that 
 * Better Auth cookies are automatically sent with every request.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for cookie-based sessions
});

// Guard to avoid attaching interceptors multiple times during HMR
if (!(api as any).__interceptorsAttached) {
  (api as any).__interceptorsAttached = true;

  // REQUEST INTERCEPTOR
  api.interceptors.request.use(
    (config) => {
      // NOTE: We rely on Cookies for authentication. 
      // Manual Authorization headers are removed to avoid conflicts and stale token issues.
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE INTERCEPTOR
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Avoid processing errors if they don't have a response (network errors)
      if (!error.response) {
        toast.error('Network Error', { description: 'Please check your internet connection.' });
        return Promise.reject(error);
      }

      const status = error.response.status;
      const message = error.response.data?.message || 'Something went wrong';

      // Global Error Handling
      switch (status) {
        case 401:
          // Unauthorized: The cookie might be expired. 
          // We don't auto-redirect here to avoid loops in protected routes.
          break;
        case 429:
          // Rate Limiting: Critical for preventing spam
          toast.error('Too Many Requests', { description: 'Please slow down and try again later.' });
          break;
        default:
          // Generic error feedback
          if (status >= 500) {
            toast.error('Server Error', { description: 'A server-side error occurred.' });
          }
      }

      return Promise.reject(error);
    }
  );
}

export default api;