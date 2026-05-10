/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants';

const TYPING_PHRASES = [
  'Blog Posts in Seconds.',
  'Social Content That Converts.',
  'Emails That Get Opened.',
  'SEO Copy That Ranks.',
  'Product Descriptions That Sell.',
];

function useTypingEffect(phrases: string[], speed = 60, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, phrases, speed, pause]);

  return display;
}

export function HeroSection() {
  const typed = useTypingEffect(TYPING_PHRASES);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-sm">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Powered by GPT-4o & Gemini 1.5
        </Badge>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-foreground">Generate AI</span>
          <span className="mt-2 block min-h-[1.2em] text-emerald-500">
            {typed}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Jovial AI is a production-grade content generation platform. Write, optimize, and scale your content with multi-model AI, role-based teams, and real-time analytics.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2 px-8 text-base shadow-lg shadow-primary/25" render={<Link href={ROUTES.REGISTER} />}>
            <Sparkles className="h-5 w-5" />
            Start Generating Free
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-base" render={<Link href="/#features" />}>
            See How It Works <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required · 50 free generations
        </p>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 w-full max-w-3xl"
      >
        <div className="relative rounded-2xl border border-border bg-card/50 p-1 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-muted-foreground">jovial-ai · AI Generator</span>
          </div>
          <div className="rounded-xl bg-muted/50 p-6 font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-primary">✦ prompt:</span> Write a compelling blog post about the future of AI in content creation
            </p>
            <p className="mt-3 text-muted-foreground">
              <span className="text-emerald-500">✦ type:</span> BLOG · <span className="text-emerald-500">tone:</span> professional · <span className="text-emerald-500">model:</span> gpt-4o
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs">Generating... 87% complete</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
