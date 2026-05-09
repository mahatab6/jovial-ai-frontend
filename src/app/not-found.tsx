'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Ghost className="h-12 w-12 animate-bounce" />
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-[10px] font-bold">
              404
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Lost in Space?
          </h1>
          <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved to a different orbit.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="gap-2 px-8"
              render={<Link href="/" />}
            >
              <Home className="h-4 w-4" />
              Go Back Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 px-8"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Page
            </Button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 opacity-20"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>
      </div>
      
      {/* Footer hint */}
      <p className="absolute bottom-8 text-sm text-muted-foreground opacity-50">
        © 2026 Jovial AI · All Rights Reserved
      </p>
    </div>
  );
}
