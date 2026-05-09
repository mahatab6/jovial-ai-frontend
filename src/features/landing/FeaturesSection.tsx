'use client';

import { motion } from 'framer-motion';
import { Wand2, MessageSquare, BarChart3, Search, Shield, Zap } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/PageHeader';

const features = [
  {
    icon: Wand2,
    title: 'AI Content Generator',
    description: 'Generate blog posts, emails, product descriptions and social content with structured JSON outputs and SEO optimization baked in.',
    color: 'from-violet-500/10 to-purple-500/10 border-violet-500/20',
    iconColor: 'text-violet-500',
  },
  {
    icon: MessageSquare,
    title: 'Multi-Model AI',
    description: 'Choose from GPT-4o, GPT-4o Mini, Gemini 1.5 Flash, or Gemini 1.5 Pro. Mix models per request for the best quality/cost ratio.',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: BarChart3,
    title: 'Usage Analytics',
    description: 'Track tokens, credits, and content performance. Team managers get full visibility into their members\' usage.',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Every piece of content comes with an SEO score, keyword analysis, and reading time — ready for publishing.',
    color: 'from-orange-500/10 to-amber-500/10 border-orange-500/20',
    iconColor: 'text-orange-500',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Full RBAC with USER, MANAGER, and ADMIN roles. Managers oversee team content; Admins control the entire system.',
    color: 'from-rose-500/10 to-pink-500/10 border-rose-500/20',
    iconColor: 'text-rose-500',
  },
  {
    icon: Zap,
    title: 'Background Queue',
    description: 'Powered by BullMQ + Redis for reliable async processing. Long content runs in the background while you keep working.',
    color: 'from-yellow-500/10 to-lime-500/10 border-yellow-500/20',
    iconColor: 'text-yellow-500',
  },
];

export function FeaturesSection() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-primary"
        >
          Features
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Everything you need to scale content
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl mx-auto text-muted-foreground"
        >
          A full-featured AI platform — not just a wrapper. Built with queue-backed generation, team analytics, and enterprise-grade security.
        </motion.p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description, color, iconColor }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className={`rounded-2xl border bg-gradient-to-br ${color} p-6 transition-all hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background/70 ${iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
