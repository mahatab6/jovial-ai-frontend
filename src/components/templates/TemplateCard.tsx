'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    previewText: string;
  };
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/templates/${template.id}`}>
        <Card className="group relative h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
          {/* Glassmorphism gradient effect */}
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {template.category}
              </Badge>
              <div className="flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-0.5 backdrop-blur-md">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span className="text-xs font-bold">{template.rating.toFixed(1)}</span>
              </div>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
              {template.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm leading-relaxed">
              {template.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="relative rounded-xl border border-border/50 bg-background/40 p-4 backdrop-blur-sm">
              <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-primary opacity-20" />
              <p className="line-clamp-3 text-xs italic text-muted-foreground leading-relaxed">
                "{template.previewText}"
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                {template.reviewCount} Community Reviews
              </span>
              <div className="flex items-center gap-1 text-sm font-bold text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                Explore <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
