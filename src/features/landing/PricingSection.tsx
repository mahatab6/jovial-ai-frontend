'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started with AI content.',
    icon: Zap,
    features: [
      '50 AI generations/month',
      'GPT-4o Mini & Gemini Flash',
      'Blog, Email, Social templates',
      'Basic analytics',
      'Community support',
    ],
    cta: 'Start for Free',
    href: ROUTES.REGISTER,
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For power users who need more generations and advanced models.',
    icon: Users,
    features: [
      '500 AI generations/month',
      'All AI models (GPT-4o, Gemini Pro)',
      'All content templates',
      'Priority queue processing',
      'Full analytics & SEO scoring',
      'Email support',
    ],
    cta: 'Get Pro',
    href: ROUTES.REGISTER,
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams that need role-based access and team-wide analytics.',
    icon: Shield,
    features: [
      'Unlimited AI generations',
      'All AI models + custom models',
      'RBAC (USER / MANAGER / ADMIN)',
      'Team analytics dashboard',
      'Highest priority queue (Admin role)',
      'Dedicated support & SLA',
    ],
    cta: 'Contact Sales',
    href: ROUTES.REGISTER,
    highlighted: false,
    badge: null,
  },
];

export function PricingSection() {
  return (
    <SectionWrapper id="pricing" className="bg-muted/20">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          No hidden fees. Start free and scale as you grow. All plans include full access to the dashboard and API.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map(({ name, price, period, description, icon: Icon, features, cta, href, highlighted, badge }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              highlighted
                ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]'
                : 'border-border bg-card'
            }`}
          >
            {badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                {badge}
              </span>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-extrabold">{price}</span>
              <span className="ml-1 text-sm text-muted-foreground">/ {period}</span>
            </div>

            <ul className="flex-1 space-y-2.5 mb-6">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={highlighted ? 'default' : 'outline'}
              className="w-full"
              render={<Link href={href} />}
            >
              {cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
