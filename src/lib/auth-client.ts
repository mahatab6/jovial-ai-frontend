import { createAuthClient } from 'better-auth/react';

/**
 * AUTH CLIENT SINGLETON
 * 
 * Exporting a single instance ensures that the application never creates
 * multiple client instances, which prevents duplicate session polling and
 * state inconsistencies.
 */
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    fetchOptions: {
        credentials: 'include', // Crucial for Better Auth cookie sharing
    },
});

export default authClient;