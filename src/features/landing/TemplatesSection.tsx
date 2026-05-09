'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { FileText, Share2, Mail, ShoppingBag, Sparkles } from 'lucide-react';

const templates = [
  {
    type: 'BLOG',
    icon: FileText,
    title: 'Blog Post',
    description: 'Long-form articles with headings, intro, body, and conclusion. SEO-optimized by default.',
    tags: ['SEO', 'Long-form', 'Structured'],
    color: 'from-violet-500/10 to-purple-500/5',
    badge: 'Most Popular',
  },
  {
    type: 'SOCIAL_POST',
    icon: Share2,
    title: 'Social Post',
    description: 'Punchy, engaging posts for LinkedIn, Twitter, and Instagram. Includes hashtag suggestions.',
    tags: ['LinkedIn', 'Twitter', 'Instagram'],
    color: 'from-blue-500/10 to-cyan-500/5',
    badge: null,
  },
  {
    type: 'EMAIL',
    icon: Mail,
    title: 'Email Campaign',
    description: 'Cold outreach, newsletters, and follow-ups. Personalization tokens included.',
    tags: ['Cold Email', 'Newsletter', 'Follow-up'],
    color: 'from-emerald-500/10 to-teal-500/5',
    badge: null,
  },
  {
    type: 'PRODUCT_DESC',
    icon: ShoppingBag,
    title: 'Product Description',
    description: 'Convert features to benefits. Optimized for ecommerce with keyword density control.',
    tags: ['E-commerce', 'Features', 'Benefits'],
    color: 'from-orange-500/10 to-amber-500/5',
    badge: 'New',
  },
];

export function TemplatesSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Templates</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Content for every use case
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Pick a template, add your prompt, and let the AI do the rest. Each template is fine-tuned for its content type.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map(({ icon: Icon, title, description, tags, color, badge, type }, i) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl border bg-gradient-to-br ${color} p-5 transition-all hover:-translate-y-1 hover:shadow-md`}
          >
            {badge && (
              <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                {badge}
              </span>
            )}
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background/70">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
