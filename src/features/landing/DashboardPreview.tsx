'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/PageHeader';
import { BarChart3, Wand2, TrendingUp, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockStats = [
  { label: 'Total Generations', value: '1,247', icon: Wand2, trend: '+12% this week' },
  { label: 'Tokens Used', value: '842K', icon: BarChart3, trend: 'This month' },
  { label: 'Credits', value: '350', icon: CreditCard, trend: 'Remaining' },
];

export function DashboardPreview() {
  return (
    <SectionWrapper className="bg-muted/20">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Dashboard</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your command center
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          A powerful dashboard gives you full visibility into your AI usage, team activity, and content performance.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
      >
        {/* Mock browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
          <span className="ml-4 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
            app.jovial.ai/dashboard
          </span>
        </div>

        {/* Mock dashboard content */}
        <div className="flex h-[420px]">
          {/* Sidebar */}
          <div className="hidden w-48 flex-col gap-1 border-r border-border bg-card p-3 sm:flex">
            {['Dashboard', 'AI Generator', 'History', 'Analytics', 'Profile'].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                  i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
                {item}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 overflow-hidden p-5">
            <p className="mb-4 text-sm font-semibold">Welcome back, Alex 👋</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {mockStats.map(({ label, value, icon: Icon, trend }) => (
                <div key={label} className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{trend}</p>
                </div>
              ))}
            </div>

            {/* Mock chart bars */}
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-semibold">Weekly Generations</p>
              <div className="flex h-24 items-end gap-2">
                {[30, 55, 40, 80, 65, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-primary/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
