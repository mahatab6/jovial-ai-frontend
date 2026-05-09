'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'AI Generations', value: 2400000, suffix: '+', display: '2.4M+' },
  { label: 'Active Users', value: 18000, suffix: '+', display: '18K+' },
  { label: 'Uptime SLA', value: 99.9, suffix: '%', display: '99.9%' },
  { label: 'AI Models', value: 4, suffix: '', display: '4' },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(({ label, display }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl font-extrabold text-foreground md:text-4xl">{display}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
