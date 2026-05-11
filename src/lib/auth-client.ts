import { createAuthClient } from 'better-auth/react';
import { setToken } from '@/lib/axios';

/**
 * AUTH CLIENT SINGLETON
 *
 * Exporting a single instance ensures that the application never creates
 * multiple client instances, which prevents duplicate session polling and
 * state inconsistencies.
 *
 * The `onSuccess` fetchOptions hook captures the Bearer token that
 * Better Auth sends back in the `set-auth-token` response header after
 * any successful auth operation (login, Google OAuth, etc.) and persists
 * it to localStorage so subsequent API requests can attach it.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  fetchOptions: {
    credentials: 'include', // needed for cookie-based session fallback
    onSuccess: (ctx) => {
      // Better Auth's bearer plugin sends the session token in this header
      const token = ctx.response.headers.get('set-auth-token');
      if (token) {
        setToken(token);
      }
    },
  },
});

export default authClient;