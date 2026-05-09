import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For Better Auth session cookies if available
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check for token in localStorage if using Bearer token strategy
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Global error handling
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      const message = data?.message || 'An unexpected error occurred';

      switch (status) {
        case 401:
          // Unauthorized - handle session expiry
          if (typeof window !== 'undefined') {
            // localStorage.removeItem('token');
            // window.location.href = '/login';
          }
          break;
        case 403:
          toast.error('Access Denied', {
            description: "You don't have permission to perform this action.",
          });
          break;
        case 429:
          toast.error('Too Many Requests', {
            description: 'Please slow down and try again later.',
          });
          break;
        case 500:
          toast.error('Server Error', {
            description: 'Something went wrong on our end. We are looking into it.',
          });
          break;
        default:
          toast.error('Error', {
            description: message,
          });
      }
    } else if (error.request) {
      // Network error
      toast.error('Network Error', {
        description: 'Please check your internet connection.',
      });
    }

    return Promise.reject(error);
  }
);

export default api;
