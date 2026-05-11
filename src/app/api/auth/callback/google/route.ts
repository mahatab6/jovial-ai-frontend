/**
 * This route should NOT exist on the frontend.
 * The Google OAuth callback must go directly to the BACKEND.
 *
 * If you see requests hitting this URL, it means the Google Cloud Console
 * OAuth redirect URI is incorrectly set to the frontend URL.
 *
 * CORRECT redirect URI: https://jovial-backend-production.up.railway.app/api/auth/callback/google
 * WRONG redirect URI:   https://jovial-ai-frontend.vercel.app/api/auth/callback/google
 *
 * This handler exists only to provide a helpful redirect/error page.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Forward all query params to the backend callback handler
  const url = new URL(request.url);
  const backendCallback = new URL(`/api/auth/callback/google${url.search}`, backendUrl);

  // Proxy/redirect to the correct backend endpoint
  return NextResponse.redirect(backendCallback.toString());
}
