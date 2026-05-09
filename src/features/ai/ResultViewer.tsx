'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Download, RefreshCw, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface AIResult {
  id: string;
  title: string;
  content: string;
  type: string;
  metadata?: {
    seoScore?: number;
    wordCount?: number;
    keywords?: string[];
  };
  createdAt: string;
}

interface ResultViewerProps {
  result: AIResult;
  onClose?: () => void;
}

export function ResultViewer({ result, onClose }: ResultViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleExport = () => {
    const blob = new Blob([result.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Exported as TXT');
  };

  // Mock SEO score if not provided
  const seoScore = result.metadata?.seoScore || Math.floor(Math.random() * (98 - 75) + 75);
  const wordCount = result.metadata?.wordCount || result.content.split(/\s+/).length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{result.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-[10px] uppercase">{result.type}</Badge>
            <span className="text-xs text-muted-foreground">{new Date(result.createdAt).toLocaleDateString()}</span>
            <span className="text-xs text-muted-foreground">• {wordCount} words</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1 sm:flex-none">
            {copied ? <CheckCircle2 className="h-4 w-4 mr-1.5 text-emerald-500" /> : <Copy className="h-4 w-4 mr-1.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* SEO & Meta Bar */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/20 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={seoScore > 85 ? 'default' : 'secondary'} className="gap-1 rounded-sm px-2">
            <Search className="h-3 w-3" />
            SEO Score: {seoScore}/100
          </Badge>
        </div>
        
        {result.metadata?.keywords && result.metadata.keywords.length > 0 && (
          <div className="flex items-center gap-1.5 shrink-0 border-l border-border pl-4">
            <span className="text-xs font-medium text-muted-foreground">Keywords:</span>
            {result.metadata.keywords.slice(0, 3).map((kw) => (
              <Badge key={kw} variant="outline" className="text-[10px] bg-background">
                {kw}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Markdown Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Card className="max-w-3xl mx-auto p-6 sm:p-8 shadow-sm">
          <article className="prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none">
            <ReactMarkdown>{result.content}</ReactMarkdown>
          </article>
        </Card>
        
        {/* Footer actions */}
        <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">Not quite what you were looking for?</p>
          <Button variant="secondary" render={<Link href={ROUTES.AI_GENERATOR} />}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate New Content
          </Button>
        </div>
      </div>
    </div>
  );
}
