'use client';

import React from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] items-center justify-center p-6">
          <Card className="w-full max-w-md border-destructive/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p className="mb-2">An unexpected error occurred while rendering this component.</p>
              {this.state.error && (
                <div className="mt-4 rounded-md bg-muted p-3 text-left text-xs font-mono overflow-auto max-h-32">
                  {this.state.error.message}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={this.handleReset}
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button 
                variant="default" 
                onClick={() => window.location.href = '/dashboard'}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Also export a simpler ErrorFallback for use with react-error-boundary or similar
export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const router = useRouter();
  
  return (
    <div className="flex min-h-[400px] items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold">Component Error</h2>
        <p className="text-muted-foreground max-w-xs">{error.message}</p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={resetErrorBoundary} size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button variant="ghost" onClick={() => router.push('/dashboard')} size="sm">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
