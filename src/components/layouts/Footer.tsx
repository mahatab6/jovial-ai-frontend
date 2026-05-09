'use client';

import Link from 'next/link';
import { Globe, Share2, ExternalLink, Sparkles } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/constants';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'AI Generator', href: ROUTES.AI_GENERATOR },
    { label: 'Analytics', href: ROUTES.ANALYTICS },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socials = [
  { icon: Globe, href: 'https://github.com', label: 'GitHub' },
  { icon: Share2, href: 'https://twitter.com', label: 'Twitter' },
  { icon: ExternalLink, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">{APP_NAME}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Production-grade AI content platform for teams. Generate, analyze, and scale your content with intelligent automation.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js · Powered by OpenAI & Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}
