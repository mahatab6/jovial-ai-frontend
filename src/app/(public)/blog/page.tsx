import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog — Jovial AI',
  description:
    'Insights, tutorials, and product updates from the Jovial AI team. Learn how to get the most from AI content generation.',
};

const posts = [
  {
    slug: 'gpt-4o-vs-gemini',
    tag: 'Comparison',
    tagColor: 'bg-purple-500/15 text-purple-500',
    title: 'GPT-4o vs Gemini 1.5 Pro: Which AI Model Wins for Content?',
    excerpt:
      'We ran 500 content generation tasks across both models and compared quality, speed, and cost. The results may surprise you.',
    author: 'Alex Rivera',
    date: 'May 8, 2026',
    readTime: '7 min read',
    featured: true,
  },
  {
    slug: 'role-based-teams',
    tag: 'Product',
    tagColor: 'bg-primary/15 text-primary',
    title: 'How to Set Up Role-Based Teams in Jovial AI',
    excerpt:
      'A step-by-step guide to inviting team members, assigning Admin/Manager/User roles, and managing permissions at scale.',
    author: 'Priya Nair',
    date: 'May 5, 2026',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'seo-blog-ai',
    tag: 'Tutorial',
    tagColor: 'bg-emerald-500/15 text-emerald-500',
    title: '10 Prompting Techniques for SEO-Optimized Blog Posts',
    excerpt:
      'Learn the exact prompt patterns that produce long-form, keyword-rich blog content that ranks on Google within weeks.',
    author: 'Sam Chen',
    date: 'Apr 29, 2026',
    readTime: '9 min read',
    featured: false,
  },
  {
    slug: 'analytics-content-roi',
    tag: 'Analytics',
    tagColor: 'bg-amber-500/15 text-amber-500',
    title: 'Measuring Content ROI with Jovial AI Analytics',
    excerpt:
      'Our analytics dashboard gives you credits used, content volume, and team performance in one place. Here is how to read it.',
    author: 'Alex Rivera',
    date: 'Apr 21, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'email-campaigns-ai',
    tag: 'Tutorial',
    tagColor: 'bg-emerald-500/15 text-emerald-500',
    title: 'Writing High-Converting Email Campaigns with AI',
    excerpt:
      'Subject lines, body copy, and CTAs — how to use Jovial AI to generate full email sequences that convert.',
    author: 'Priya Nair',
    date: 'Apr 14, 2026',
    readTime: '8 min read',
    featured: false,
  },
  {
    slug: 'product-launch-v2',
    tag: 'Announcement',
    tagColor: 'bg-rose-500/15 text-rose-500',
    title: 'Jovial AI v2.0 — What\'s New',
    excerpt:
      'Dashboard redesign, Gemini 1.5 Pro support, team analytics, and 40% faster generation times. Everything in one update.',
    author: 'Sam Chen',
    date: 'Apr 7, 2026',
    readTime: '4 min read',
    featured: false,
  },
];

const [featured, ...rest] = posts;

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <BookOpen className="h-3.5 w-3.5" /> Jovial AI Blog
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Insights & <span className="text-primary">Tutorials</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-lg">
          Product updates, AI writing tips, and team productivity guides — all from the Jovial AI team.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 space-y-12">
        {/* Featured Post */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Featured
          </h2>
          <Link
            href={`/blog/${featured.slug}`}
            className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-md md:flex-row"
          >
            {/* Placeholder art */}
            <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 md:h-auto md:w-64">
              <BookOpen className="h-12 w-12 text-primary/40" />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${featured.tagColor}`}>
                <Tag className="h-3 w-3" /> {featured.tag}
              </span>
              <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors sm:text-2xl">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <Clock className="h-3 w-3" />
                <span>{featured.readTime}</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Latest Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold mb-3 ${post.tagColor}`}>
                  <Tag className="h-3 w-3" /> {post.tag}
                </span>
                <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>{post.author}</span>
                  <span>·</span>
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
