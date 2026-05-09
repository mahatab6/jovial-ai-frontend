'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, CheckCircle2, XCircle, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';
import { ROUTES } from '@/constants';
import Link from 'next/link';

interface JobTrackerProps {
  jobId: string;
  onReset: () => void;
}

interface JobStatus {
  state: 'waiting' | 'active' | 'completed' | 'failed';
  progress: number;
  result: {
    contentId?: string;
    title?: string;
    content?: string; // Sometimes the content is returned here
  } | null;
  failedReason: string | null;
}

export function JobTracker({ jobId, onReset }: JobTrackerProps) {
  // Poll the job status API every 2 seconds until it's completed or failed
  const { data, error, isError } = useQuery({
    queryKey: ['job-status', jobId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/ai/job-status/${jobId}`);
      return res.data.data as JobStatus;
    },
    refetchInterval: (query) => {
      const state = query.state.data?.state;
      return state === 'completed' || state === 'failed' ? false : 2000;
    },
  });

  const status = data?.state || 'waiting';
  const progress = data?.progress || 0;
  const result = data?.result;

  return (
    <Card className="p-8 border-border shadow-sm max-w-3xl mx-auto w-full">
      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Status Icon */}
        <div className="relative flex items-center justify-center h-20 w-20">
          {status === 'waiting' && (
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          )}
          {status === 'waiting' && <Loader2 className="h-10 w-10 text-primary animate-spin" />}
          
          {status === 'active' && (
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
          )}
          {status === 'active' && <RefreshCw className="h-10 w-10 text-primary animate-spin" />}
          
          {status === 'completed' && <CheckCircle2 className="h-14 w-14 text-emerald-500" />}
          
          {status === 'failed' && <XCircle className="h-14 w-14 text-destructive" />}
          {isError && <XCircle className="h-14 w-14 text-destructive" />}
        </div>

        {/* Status Text & Progress */}
        <div className="space-y-2 w-full max-w-md">
          <h3 className="text-xl font-bold tracking-tight">
            {status === 'waiting' && 'Job Queued...'}
            {status === 'active' && 'Generating Content...'}
            {status === 'completed' && 'Generation Complete!'}
            {status === 'failed' && 'Generation Failed'}
            {isError && 'Error Fetching Status'}
          </h3>
          
          {(status === 'waiting' || status === 'active') && (
            <div className="space-y-2 pt-2">
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(progress, 5)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {status === 'waiting' ? 'Waiting for an available AI worker...' : `${progress}% Complete`}
              </p>
            </div>
          )}

          {status === 'failed' && (
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
              {data?.failedReason || 'An unknown error occurred during generation.'}
            </p>
          )}
        </div>

        {/* Completed Result Action */}
        {status === 'completed' && result && (
          <div className="w-full max-w-md pt-4 space-y-4">
            <div className="flex flex-col items-center p-4 bg-muted/30 rounded-xl border border-border">
              <FileText className="h-8 w-8 text-primary mb-2 opacity-80" />
              <p className="font-semibold text-foreground text-sm line-clamp-2">
                {result.title || 'Untitled Document'}
              </p>
              <Badge variant="secondary" className="mt-2 text-[10px]">
                Ready to view
              </Badge>
            </div>

            <div className="flex gap-3 justify-center w-full">
              <Button variant="outline" onClick={onReset} className="w-full">
                Generate Another
              </Button>
              <Button className="w-full gap-2 shadow-lg" render={<Link href={ROUTES.HISTORY} />}>
                View Content <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Retry on Failure */}
        {(status === 'failed' || isError) && (
          <Button variant="outline" onClick={onReset} className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
