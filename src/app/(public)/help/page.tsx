'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, MessageSquare, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const categories = [
  { icon: Zap, label: 'Getting Started', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: BookOpen, label: 'Using the Generator', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: MessageSquare, label: 'Team & Billing', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { icon: HelpCircle, label: 'Troubleshooting', color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const faqs = [
  {
    category: 'Getting Started',
    q: 'How do I create my first piece of content?',
    a: 'After signing up, navigate to the AI Generator from your dashboard sidebar. Choose a content type (Blog, Email, Social Post, etc.), enter your prompt, select a tone and model, then click Generate. Your content will be ready in seconds.',
  },
  {
    category: 'Getting Started',
    q: 'What AI models does Jovial AI support?',
    a: 'We currently support GPT-4o Mini, GPT-4o, Gemini 1.5 Flash, and Gemini 1.5 Pro. You can switch between models on each generation to balance speed, quality, and cost.',
  },
  {
    category: 'Getting Started',
    q: 'How many free generations do I get?',
    a: 'New accounts start with 50 free content generation credits — no credit card required. Each generation costs 1–3 credits depending on the model and length selected.',
  },
  {
    category: 'Using the Generator',
    q: 'What content types are available?',
    a: 'Blog posts, social media posts, emails, product descriptions, and custom (Other). We add new templates regularly based on user feedback.',
  },
  {
    category: 'Using the Generator',
    q: 'Can I edit or copy the generated content?',
    a: 'Yes. Every generated piece has a full-screen editor, copy-to-clipboard button, and a history page where you can revisit and re-edit past generations.',
  },
  {
    category: 'Using the Generator',
    q: 'How do I pick the right tone?',
    a: 'Choose Professional for business content, Casual for social posts, Persuasive for ads, Friendly for newsletters, Humorous for brand personality, and Formal for legal or enterprise copy.',
  },
  {
    category: 'Team & Billing',
    q: 'How does role-based access work?',
    a: 'Admins can manage users, view all content, and access platform analytics. Managers oversee team content and view team stats. Users can generate and manage their own content.',
  },
  {
    category: 'Team & Billing',
    q: 'Can I invite my team?',
    a: 'Yes — Admins can invite unlimited team members from the Admin panel. Each member gets their own credit allocation which can be managed centrally.',
  },
  {
    category: 'Troubleshooting',
    q: 'My generation is stuck on "loading" — what do I do?',
    a: 'This is usually caused by a network timeout or an upstream AI API issue. Refresh the page and try again. If the problem persists, check our status page or contact support.',
  },
  {
    category: 'Troubleshooting',
    q: 'Why am I getting "Invalid email or password"?',
    a: 'Double-check your email and password. If you signed up with Google, use the "Continue with Google" button instead. You can also reset your password from the login page.',
  },
];

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    const matchesQuery =
      !query ||
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase());
    const matchesCat = !activeCategory || f.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <HelpCircle className="h-3.5 w-3.5" /> Help Center
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          How can we <span className="text-primary">help you?</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-lg">
          Search our knowledge base or browse by category below.
        </p>
        {/* Search */}
        <div className="relative mt-8 mx-auto max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="help-search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(null); }}
            className="pl-10"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-4xl px-4 pb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeCategory
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            All
          </button>
          {categories.map(({ icon: Icon, label, color, bg }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(activeCategory === label ? null : label)}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === label
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${activeCategory === label ? '' : color}`} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
              No articles match your search.{' '}
              <Link href="/contact" className="text-primary hover:underline">Contact support →</Link>
            </div>
          )}
          {filtered.map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/30">
              <button
                id={`faq-${i}`}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm leading-snug">{item.q}</span>
                {open === i ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-semibold">Still need help?</p>
          <p className="mt-1 text-sm text-muted-foreground">Our support team is standing by.</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="h-4 w-4" /> Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
