// ─── Auth & User Types ────────────────────────────────────────────────────────

export type UserRole = 'USER' | 'MANAGER' | 'ADMIN';
export type UserStatus = 'active' | 'blocked' | 'deleted';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits: number;
  status: UserStatus;
  managerId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Content & AI Types ───────────────────────────────────────────────────────

export type ContentType =
  | 'BLOG'
  | 'SOCIAL_POST'
  | 'EMAIL'
  | 'PRODUCT_DESC'
  | 'OTHER';

export type ContentLength = 'short' | 'medium' | 'long';
export type JobState = 'queued' | 'active' | 'completed' | 'failed' | 'waiting';

export interface ContentMetadata {
  seoScore?: number;
  keywords?: string[];
  readingTime?: number;
  wordCount?: number;
}

export interface Content {
  id: string;
  title: string;
  body: string;
  type: ContentType;
  metadata: ContentMetadata;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface GenerationJob {
  jobId: string;
  status: JobState;
  priority: 'normal' | 'high' | 'highest';
}

export interface JobStatus {
  state: JobState;
  progress: number;
  result?: { contentId: string; title: string };
  failedReason?: string;
}

// ─── AI Generate Request ──────────────────────────────────────────────────────

export interface GenerateRequest {
  prompt: string;
  type: ContentType;
  tone?: string;
  length?: ContentLength;
  keywords?: string[];
  model?: string;
}

// ─── Stats & Analytics ────────────────────────────────────────────────────────

export interface UsageStats {
  totalGenerations: number;
  tokensUsed: number;
  creditsRemaining: number;
  contentByType: Record<ContentType, number>;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  roles?: UserRole[];
  badge?: string;
}
