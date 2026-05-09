'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export function CTASection() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-purple-600 px-8 py-16 text-center text-primary-foreground shadow-2xl"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Start generating in seconds
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80 text-lg">
            Join thousands of teams using Jovial AI to create better content, faster. No credit card required.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 px-8 text-base font-semibold shadow-lg"
              asChild
            >
              <Link href={ROUTES.REGISTER}>
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <Link href={ROUTES.LOGIN}>
                Sign In <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            50 free generations · No credit card · Cancel anytime
          </p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
