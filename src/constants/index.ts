// ─── App Constants ────────────────────────────────────────────────────────────

export const APP_NAME = 'Jovial AI';
export const APP_DESCRIPTION =
  'Production-grade AI content generation platform for modern teams.';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Content Types ────────────────────────────────────────────────────────────

export const CONTENT_TYPES = [
  { value: 'BLOG', label: 'Blog Post' },
  { value: 'SOCIAL_POST', label: 'Social Post' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'PRODUCT_DESC', label: 'Product Description' },
  { value: 'OTHER', label: 'Other' },
] as const;

export const CONTENT_LENGTHS = [
  { value: 'short', label: 'Short (~200 words)' },
  { value: 'medium', label: 'Medium (~500 words)' },
  { value: 'long', label: 'Long (~1000+ words)' },
] as const;

export const CONTENT_TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'formal', label: 'Formal' },
] as const;

// ─── AI Models ────────────────────────────────────────────────────────────────

export const AI_MODELS = [
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast)' },
  { value: 'gpt-4o', label: 'GPT-4o (Powerful)' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
] as const;

// ─── Routes ───────────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  AI_GENERATOR: '/dashboard/generate',
  HISTORY: '/dashboard/history',
  ANALYTICS: '/dashboard/analytics',
  PROFILE: '/dashboard/profile',
  TEAM: '/dashboard/team',
  ADMIN: '/dashboard/admin',
} as const;

// ─── TanStack Query Keys ──────────────────────────────────────────────────────

export const QUERY_KEYS = {
  USER_ME: ['user', 'me'],
  CONTENT_LIST: ['content', 'list'],
  JOB: (id: string) => ['job', id],
  STATS_USAGE: ['stats', 'usage'],
  STATS_CONTENT_TYPE: ['stats', 'content-type'],
  STATS_TEAM: ['stats', 'team'],
  STATS_ADMIN: ['stats', 'admin'],
  HISTORY: ['history'],
  USERS: ['users'],
  TEAM_CONTENT: ['team', 'content'],
  ADMIN_DASHBOARD: ['admin', 'dashboard'],
  ADMIN_USERS: ['admin', 'users'],
} as const;
