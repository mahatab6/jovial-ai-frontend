import type { Metadata } from 'next';
import { Sparkles, Zap, Shield, Users, Target, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Jovial AI',
  description:
    'Learn about Jovial AI — our mission to democratize AI-powered content creation for teams of all sizes.',
};

const stats = [
  { value: '50K+', label: 'Content Pieces Generated' },
  { value: '5K+', label: 'Teams Using Jovial AI' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9/5', label: 'Customer Rating' },
];

const values = [
  {
    icon: Zap,
    title: 'Speed First',
    description:
      'We believe great content should be generated in seconds, not hours. Every feature we ship is obsessed with speed and efficiency.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description:
      'Role-based access, audit logs, and SOC-2 compliance built from day one — because your data security is non-negotiable.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Users,
    title: 'Team Centric',
    description:
      'Designed for collaboration. From solo creators to enterprise teams, Jovial AI scales with your workflow.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description:
      'Real-time analytics let you measure exactly what content performs, so you always know where to focus.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Heart,
    title: 'Creator Focused',
    description:
      'We genuinely love content creation. Every design decision starts with the creator experience in mind.',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Sparkles,
    title: 'Always Evolving',
    description:
      'GPT-4o, Gemini, and whatever comes next — we integrate the best models so you never fall behind.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-28 pb-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Our Story
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Built for creators,{' '}
          <span className="text-primary">powered by AI</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Jovial AI was founded with a single belief: every team deserves access to world-class
          AI content tools. We combine the best large language models with an intuitive,
          team-first platform — so great content is always just seconds away.
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-primary md:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed text-base sm:text-lg">
          To democratize AI-powered content creation by giving every team — regardless of size or
          budget — the tools that were previously only available to large enterprises. We measure
          success by the quality and speed of content our users produce.
        </p>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">What We Stand For</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
