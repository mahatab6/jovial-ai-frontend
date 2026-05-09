'use client';

import { motion } from 'framer-motion';
import { FileText, Layers, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/PageHeader';

const steps = [
  {
    icon: FileText,
    label: 'Prompt',
    description: 'Describe what you want with type, tone, and keywords.',
    color: 'bg-violet-500',
  },
  {
    icon: Layers,
    label: 'Queue',
    description: 'BullMQ picks up your job with priority based on your role.',
    color: 'bg-blue-500',
  },
  {
    icon: Cpu,
    label: 'AI Processing',
    description: 'GPT-4o or Gemini generates structured content with SEO metadata.',
    color: 'bg-emerald-500',
  },
  {
    icon: TrendingUp,
    label: 'Analytics',
    description: 'Token usage, credits, and SEO scores are tracked automatically.',
    color: 'bg-orange-500',
  },
];

export function WorkflowSection() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Workflow</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          From prompt to published
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Our queue-backed pipeline ensures every generation is reliable, tracked, and SEO-ready — even for long content.
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-start">
        {steps.map(({ icon: Icon, label, description, color }, i) => (
          <div key={label} className="flex flex-1 flex-col md:items-center md:text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-row gap-4 md:flex-col md:items-center"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${color} text-white shadow-lg`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">{label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="my-2 flex justify-center md:my-0 md:mt-6">
                <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground md:rotate-0" />
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
