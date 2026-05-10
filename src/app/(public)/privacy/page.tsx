import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Server, Bell, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Jovial AI',
  description:
    'Jovial AI Privacy Policy — how we collect, use, and protect your personal data.',
};

const sections = [
  {
    icon: FileText,
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      'Account information (name, email address, password hash) when you register.',
      'Content you generate using the AI Generator, stored so you can access your History.',
      'Usage analytics (credits consumed, feature interactions) to improve the platform.',
      'Billing information processed securely by our payment provider (Stripe). We do not store raw card numbers.',
      'Log data including IP address, browser type, and pages visited for security and debugging.',
    ],
  },
  {
    icon: Eye,
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: [
      'To provide, operate, and improve the Jovial AI platform.',
      'To authenticate your identity and enforce role-based access controls.',
      'To send transactional emails (password resets, usage alerts). We do not send marketing emails without your consent.',
      'To monitor platform performance, detect abuse, and ensure uptime.',
      'To comply with applicable laws and respond to lawful government requests.',
    ],
  },
  {
    icon: Lock,
    id: 'data-sharing',
    title: '3. Data Sharing & Third Parties',
    content: [
      'We share your prompts with OpenAI and Google (Gemini) only to fulfil AI generation requests. Both providers have enterprise data privacy agreements.',
      'We use Stripe for payments, Vercel for hosting, and Resend for transactional email — each under strict data processing agreements.',
      'We do not sell or rent your personal data to advertisers or data brokers.',
      'Aggregate, anonymised analytics may be shared publicly (e.g., "50 000 content pieces generated").',
    ],
  },
  {
    icon: Server,
    id: 'data-retention',
    title: '4. Data Retention',
    content: [
      'Account data is retained for the lifetime of your account plus 30 days after deletion.',
      'Generated content is stored for 12 months by default. You can delete individual items at any time from your History page.',
      'Log data is retained for 90 days for security purposes.',
    ],
  },
  {
    icon: Shield,
    id: 'security',
    title: '5. Security',
    content: [
      'All data is encrypted in transit using TLS 1.3 and at rest using AES-256.',
      'Passwords are hashed using bcrypt — we never store plaintext passwords.',
      'We perform regular third-party security audits and penetration tests.',
      'We follow SOC-2 Type II principles for our infrastructure and access management.',
    ],
  },
  {
    icon: Bell,
    id: 'your-rights',
    title: '6. Your Rights',
    content: [
      'Access: Request a copy of all personal data we hold about you.',
      'Correction: Update inaccurate information from your Account Settings page.',
      'Deletion: Request full account deletion at any time — we will process within 30 days.',
      'Portability: Export your generated content history as JSON or CSV.',
      'To exercise any right, email privacy@jovial.ai.',
    ],
  },
];

export default function PrivacyPage() {
  const lastUpdated = 'May 10, 2026';

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Shield className="h-3.5 w-3.5" /> Legal
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          We believe privacy is a right, not a feature. This policy explains exactly what data we
          collect, why, and how you can control it.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Contents
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {sections.map(({ icon: Icon, id, title, content }) => (
              <div
                key={id}
                id={id}
                className="rounded-2xl border border-border bg-card p-7 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">{title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {content.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center">
              <p className="font-semibold">Questions about this policy?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Email us at{' '}
                <a href="mailto:privacy@jovial.ai" className="text-primary hover:underline">
                  privacy@jovial.ai
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
