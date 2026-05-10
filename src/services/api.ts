import api from '@/lib/axios';

// Re-export the centralized axios instance from `lib/axios` so the rest of the app
// uses a single configured instance (prevents duplicate interceptors and loops).
export default api;
