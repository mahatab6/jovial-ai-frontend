'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, CheckCircle2, XCircle, FileText, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';
import { ROUTES, QUERY_KEYS } from '@/constants';
import Link from 'next/link';
import { ResultViewer } from './ResultViewer';

interface JobTrackerProps {
  jobId: string;
  onReset: () => void;
}

interface JobStatus {
  jobId: string;
  status: 'waiting' | 'active' | 'completed' | 'failed' | 'queued';
  progress: number;
  contentId: string | null;
  content: string | null;
  title: string | null;
  metadata: any;
  failedReason: string | null;
  timestamps: {
    queuedAt: string;
    processedAt: string | null;
    finishedAt: string | null;
  };
}

export function JobTracker({ jobId, onReset }: JobTrackerProps) {
  // POLLING SYSTEM: 
  // Poll the job status API every 5 seconds until it's completed or failed
  const { data, error, isError } = useQuery({
    queryKey: QUERY_KEYS.JOB(jobId),
    queryFn: async () => {
      const res = await api.get(`/api/v1/ai/job-status/${jobId}`);
      return res.data.data as JobStatus;
    },
    // POLLING OPTIMIZATION:
    // Only poll while the job is active or waiting. Stop once finished.
    // Interval set to 5000ms (5 seconds) as requested.
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'completed' || status === 'failed' ? false : 5000;
    },
    // Explicitly disable other triggers to avoid duplicate requests during polling
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    enabled: !!jobId,
  });

  const status = data?.status || 'queued';
  const progress = data?.progress || 0;

  // If completed and we have content, show the ResultViewer
  if (status === 'completed' && data?.content) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <div>
              <p className="font-bold text-emerald-700">Generation Complete!</p>
              <p className="text-xs text-emerald-600/80">Your content is ready below.</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} className="text-emerald-700 hover:bg-emerald-500/20">
            Generate New
          </Button>
        </div>
        
        <ResultViewer 
          result={{
            id: data.contentId || '',
            title: data.title || 'Generated Content',
            content: data.content,
            type: 'AI Generated',
            metadata: data.metadata,
            createdAt: data.timestamps.finishedAt || new Date().toISOString()
          }} 
        />
      </div>
    );
  }

  return (
    <Card className="p-8 border-border shadow-sm max-w-3xl mx-auto w-full bg-card/50 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Status Icon */}
        <div className="relative flex items-center justify-center h-24 w-24">
          {(status === 'queued' || status === 'waiting') && (
            <>
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
              <Loader2 className="h-12 w-12 text-primary animate-spin opacity-80" />
            </>
          )}
          
          {status === 'active' && (
            <>
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
              <div className="relative">
                <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500 animate-bounce" />
              </div>
            </>
          )}
          
          {status === 'failed' && <XCircle className="h-16 w-16 text-destructive" />}
          {isError && <XCircle className="h-16 w-16 text-destructive" />}
        </div>

        {/* Status Text & Progress */}
        <div className="space-y-3 w-full max-w-md">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-2">
            {status}
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight">
            {(status === 'queued' || status === 'waiting') && 'Standing by...'}
            {status === 'active' && 'AI is Crafting...'}
            {status === 'failed' && 'Generation Interrupted'}
            {status === 'completed' && 'Finalizing...'}
            {isError && 'Connection Lost'}
            {!['queued', 'waiting', 'active', 'failed', 'completed'].includes(status) && 'AI is Processing...'}
          </h3>
          
          {(status === 'queued' || status === 'waiting' || status === 'active') && (
            <div className="space-y-3 pt-2">
              <div className="h-3 w-full bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000 ease-in-out"
                  style={{ width: `${Math.max(progress, 8)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground font-semibold">
                <span>{status === 'active' ? 'Synthesizing knowledge...' : 'Waking up the workers...'}</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="text-left bg-destructive/5 p-4 rounded-xl border border-destructive/20 mt-4">
              <p className="text-xs font-bold text-destructive uppercase mb-1">Error Details</p>
              <p className="text-sm text-destructive/90 leading-relaxed">
                {data?.failedReason || 'An unexpected error occurred during generation. Please check your prompt and try again.'}
              </p>
            </div>
          )}
        </div>

        {/* Retry on Failure */}
        {(status === 'failed' || isError) && (
          <div className="flex gap-4 w-full max-w-xs pt-4">
            <Button variant="outline" onClick={onReset} className="w-full">
              Cancel
            </Button>
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry
            </Button>
          </div>
        )}

        {/* Informational footer */}
        {(status === 'queued' || status === 'waiting' || status === 'active') && (
          <p className="text-xs text-muted-foreground italic pt-4">
            This typically takes 10-30 seconds. Feel free to stay on this page.
          </p>
        )}
      </div>
    </Card>
  );
}
