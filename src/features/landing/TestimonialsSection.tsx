'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/PageHeader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Lead, GrowthStack',
    initials: 'SC',
    quote: 'Jovial AI cut our content production time by 70%. The SEO scoring is a game-changer — we went from ranking page 5 to page 1 in 3 months.',
    rating: 5,
  },
  {
    name: 'Marcus Webb',
    role: 'Founder, Launchpad SaaS',
    initials: 'MW',
    quote: 'The team management features are incredible. As a manager I can see all my team\'s generations, approve content, and track usage from one place.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Marketing Manager, Techflow',
    initials: 'PN',
    quote: 'We generate 200+ blog posts a month now. The BullMQ queue means I never have to wait — I submit and come back to finished content.',
    rating: 5,
  },
  {
    name: 'James Okafor',
    role: 'E-commerce Director, NovaMart',
    initials: 'JO',
    quote: 'Product descriptions used to take us hours per SKU. Now we batch-generate hundreds in minutes. The ROI is insane.',
    rating: 5,
  },
  {
    name: 'Lisa Huang',
    role: 'Growth Hacker, ScaleUp',
    initials: 'LH',
    quote: 'The multi-model support is brilliant. I use Gemini for creative copy and GPT-4o for technical content. Best of both worlds.',
    rating: 5,
  },
  {
    name: 'David Torres',
    role: 'CTO, PixelCraft',
    initials: 'DT',
    quote: 'We integrated Jovial AI into our workflow in a day. The API is clean, the docs are excellent, and the support is responsive.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Trusted by content teams worldwide
        </h2>
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {testimonials.map(({ name, role, initials, quote, rating }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            viewport={{ once: true }}
            className="mb-5 break-inside-avoid rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex mb-3">
              {Array.from({ length: rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
